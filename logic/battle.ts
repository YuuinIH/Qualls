import { PriorityQueue } from "@datastructures-js/priority-queue";
import { CharacterFragment,CharacterOnBuild, MoveSlots } from "./character";
import { MarkFragment } from "./mark";
import { MoveAction } from "./moves";

export type GameType = 'single';

interface BattleOption{
    format?: string;
    formatid?: string;
    debug?: boolean;
    gameType: GameType;
    PRngSeed?: [number, number, number, number];
    side1Options: SideOption;
    side2Options: SideOption;
}

interface SideOption{
    name: string;
    elfbuild: CharacterOnBuild[]
}

enum EventDefaultPriority {
    SwitchCharacter = 10000000,//切换角色，始终优先于其他事件
    
    BeforeMove = 9000,//技能前

    CostRage = 8000,//消耗怒气
    HitMove = 7000, //技能命中以及结算
    AfterMove = 6000,//技能后


    TryUseMove = 100, //尝试使用技能

    AfterTurn = 0,//回合结束
}

enum EventType{
    BeforeMove = 'BeforeMove',
    
    TryUseMove = 'TryUseMove',
    CostRage = 'CostRage',
    CheckHit = 'CheckHit',
    CheckCrit = 'CheckCrit',
    BeforeHit = 'BeforeHit',
    Damage = 'Damage',
    AfterHit = 'AfterHit',

    AddMark = 'AddMark',
    DestroyMark = 'DestroyMark',
    
    AfterMove = 'AfterMove',
    AfterTurn = 'AfterTurn',
    SwitchCharacter = 'SwitchCharacter',
}

interface Event{
    type: EventType;
    side: Side;
    character: CharacterFragment;
    priority: number;
}

interface EventMove extends Event{
    move: MoveAction;
    cost: number;
    target : CharacterFragment;
}

interface EventDamage extends Event{
    crit: boolean;
    target: CharacterFragment;
}

interface EventMark extends Event{
    mark: MarkFragment;
}

interface EventSwitchCharacter extends Event{
    newCharacter: CharacterFragment;
}

type Events = Event|EventMove|EventSwitchCharacter|EventDamage;

/*事件的优先级，所有的事件发生遵循以下原则：
1. 优先级高的事件先发生
2. 如果是释放技能的事件，技能优先级高的先发生 //TODO:可变的优先级
3. 优先级相同的事件，事件产生者速度快的先发生
4. 速度相同的事件，按照side的id顺序发生
*/
const compareEventPriority = (a: Events, b: Events) => {
    if (a.priority != b.priority) {
        return a.priority - b.priority;
    }
    if ((a as EventMove).move&&(b as EventMove).move){
        //技能本身的先制度
        if ((a as EventMove).move.priority != (b as EventMove).move.priority) {
            return (a as EventMove).move.priority - (b as EventMove).move.priority;
        }
    }
    if ((a as EventMark).mark&&(b as EventMark).mark){
        //标记的优先级
        if ((a as EventMark).mark.markSpecies.priority != (b as EventMark).mark.markSpecies.priority) {
            return (a as EventMark).mark.markSpecies.priority - (b as EventMark).mark.markSpecies.priority;
        }
    }
    if (a.character.speed != b.character.speed) {
        return a.character.speed - b.character.speed;
    }
    return a.side.id - b.side.id;
}

export enum SideID {
    p1,
    p2
}

export enum BattlePhase{
    BattleStart,
    Choose,
    BeforeTurn,
    Move,
    AfterTurn,
    BattleEnd
}

export enum ChooseType{
    idle,
    Move,
    MoveClimax,
    SwitchCharacter,
    Surrender
}

export interface ChooseOption{
    chooseType: ChooseType;
    target?: CharacterFragment;
    move?: MoveSlots;
}

export class Side{
    readonly Battle: Battle;
    readonly id: SideID;
    
    readonly name: string;

    character: CharacterFragment[];// 数组第一个角色为当前在场角色
    
    choosen: ChooseOption|null;

    characterLeft: number;

    rage: number;

    constructor(battle:Battle,SideOption:SideOption, sideid: SideID){
        this.Battle = battle;
        this.id = sideid;
        this.name = SideOption.name;
        this.character = new Array<CharacterFragment>(SideOption.elfbuild.length);
        for (let [index,elf] of SideOption.elfbuild.entries()){
            this.character[index] = new CharacterFragment(battle,this,elf);
        }
        this.characterLeft = this.character.length;
        this.choosen = null;
        this.rage = 20;//TODO: 可设置的初始怒气
    }

    choose(choose:ChooseOption){
        this.choosen = choose;
    }

    cancleChoose(){
        this.choosen = null;
    }

    isReady(){
        return this.choosen !== null;
    }

    getchoose():ChooseOption|null{
        return this.choosen;
    }
}

export class Battle{
    readonly id: number;
    readonly debug: boolean;

    readonly gametype: GameType;
    readonly PRngSeed: [number, number, number, number];

    turn: number;
    state: BattlePhase;
    side: Side[];

    chosen: number;

    constructor(battleOption:BattleOption){
        this.id = 0;
        this.debug = battleOption.debug || false;
        this.gametype = 'single';
        this.PRngSeed = battleOption.PRngSeed??[0,0,0,0];
        this.state = BattlePhase.BattleStart;
        this.turn = 0;
        this.side= []
        for (let side of [battleOption.side1Options,battleOption.side2Options]){
            this.side.push(new Side(this,side,SideID.p1));
        }
        this.chosen = 0;
    }

    random(min:number, max:number):number{
        //TODO: seed
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    choose(sideID:SideID, chooseOption:ChooseOption):boolean{
        if (this.state !== BattlePhase.Choose){
            return false;
        }
        this.side[sideID].choose(chooseOption);
        if (this.side[SideID.p1].isReady() && this.side[SideID.p2].isReady()){
            this.commitDecision();
        }
        return true;
    }

    cancleChoose(sideID:SideID):boolean{
        if (this.state !== BattlePhase.Choose){
            return false;
        }
        this.side[sideID].cancleChoose();
        return true
    }

    commitDecision(){
        const queue = new PriorityQueue<Events>(compareEventPriority);
        for (let side of this.side){
            let choose = side.getchoose();
            if (choose === null){
                throw new Error('choose is null');
            }
            switch (choose.chooseType){
                case ChooseType.Move:
                    if (choose.target === undefined){
                        throw new Error('target is undefined');
                    }
                    if (choose.move === undefined){
                        throw new Error('move is undefined');
                    }
                    queue.enqueue({
                        type: EventType.TryUseMove,
                        side: side,
                        character: side.character[0],
                        priority: EventDefaultPriority.TryUseMove,
                        move: new MoveAction(choose.move.move,side.character[0],choose.target),
                        cost: choose.move.cost
                    });
                    break;
                case ChooseType.MoveClimax:
                    if (choose.target === undefined){
                        throw new Error('target is undefined');
                    }
                    if (choose.move === undefined){
                        throw new Error('move is undefined');
                    }
                    queue.enqueue({
                        type: EventType.TryUseMove,
                        side: side,
                        character: side.character[0],
                        priority: EventDefaultPriority.TryUseMove,
                        move: new MoveAction(choose.move.move,side.character[0],choose.target),
                        cost: choose.move.cost
                    });
                    break;
                case ChooseType.SwitchCharacter:
                    if (choose.target === undefined){
                        throw new Error('target is undefined');
                    }
                    queue.enqueue({
                        type: EventType.SwitchCharacter,
                        side: side,
                        character: side.character[0],
                        priority: EventDefaultPriority.SwitchCharacter,
                        newCharacter: choose.target
                    });
                    break;
                case ChooseType.Surrender:
                    //TODO: surrender
                    return;
                default:
                    throw new Error('chooseType is invalid');
            }
        }
    }

    goTurn(queue:PriorityQueue<Events>){
        while (!queue.isEmpty()){
            let event = queue.dequeue();
            if (event === null){
                throw new Error('event is null');
            }
            switch (event.type){
                case EventType.TryUseMove:
                    if (this.tryUseMove(queue,event.side,event.character,(event as EventMove).move)){
                        queue.enqueue({
                            type: EventType.CostRage,
                            side: event.side,
                            character: event.character,
                            priority: EventDefaultPriority.CostRage,
                            move: (event as EventMove).move,
                            target: (event as EventMove).move.target,
                        });
                    }
                    break;
                case EventType.CostRage:
                    if (this.costRage(queue,event.side,event.character,(event as EventMove).move)){
                        queue.enqueue({
                            type: EventType.CheckHit,
                            side: event.side,
                            character: event.character,
                            priority: EventDefaultPriority.CheckHit,
                            move: (event as EventMove).move,
                            target: (event as EventMove).move.target,
                        });
                    }
                    break;
                case EventType.CheckHit:
                    if (this.checkHit(queue,event.side,event.character,(event as EventMove).move)){
                        queue.enqueue({
                            type: EventType.CheckCrit,
                            side: event.side,
                            character: event.character,
                            priority: EventDefaultPriority.CheckCrit,
                            move: (event as EventMove).move,
                            target: (event as EventMove).move.target,
                        });
                    }
                    break;
                case EventType.CheckCrit:
                    const iscrit = this.checkCrit(queue,event.side,event.character,(event as EventMove).target,(event as EventMove).move);
                    queue.enqueue({
                        type: EventType.Damage,
                        priority: EventDefaultPriority.Damage,
                        side: event.side,
                        character: event.character,
                        move: (event as EventMove).move,
                        crit: iscrit,
                    });
                    break;
                case EventType.Damage:
                    if (this.damage(queue,event.side,event.character,(event as EventMove).move)){
                        
                    }
                    break;
                
                }
            }
    }

    private tryUseMove(queue:PriorityQueue<Events>,side:Side, character:CharacterFragment, move:MoveAction){
        if (move.cost > side.rage){
            return false;
        }
        return true;
    }

    private costRage(queue:PriorityQueue<Events>,side:Side, character:CharacterFragment, move:MoveAction){
        if (move.cost > side.rage){
            return false;
        }
        side.rage -= move.cost;
        return true;
    }

    private checkHit(queue:PriorityQueue<Events>,side:Side, character:CharacterFragment, move:MoveAction){
        let randomnumber = this.random(0,100);
        //TODO: changeable accuracy
        if (randomnumber > move.original.accuracy){
            return false;
        }

        return true;
    }

    private checkCrit(queue:PriorityQueue<Events>,side:Side, character:CharacterFragment, target:CharacterFragment,move:MoveAction){
        let randomnumber = this.random(0,100);
        if (randomnumber > 5){
            return false;
        }
        return true;
    }

    setRage(sideID:SideID, rage:number){
        this.side[sideID].rage = rage;
    }

    useMove(sideID:SideID, move:MoveAction){

    }

}