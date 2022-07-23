import { Character,CharacterOnBuild, MoveSlots } from "./character";
import { ActiveMove } from "./moves";

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

export enum Choose{
    idle,
    Move,
    MoveClimax,
    SwitchCharacter,
    Surrender
}

export interface ChooseOption{
    choose: Choose;
    target?: Character;
    move?: MoveSlots;
}

export class Side{
    readonly Battle: Battle;
    readonly id: SideID;
    
    readonly name: string;
    character: Character[];
    activeCharacter: Character[];
    
    choosen: ChooseOption|null;

    elfLeft: number;
    constructor(battle:Battle,SideOption:SideOption, sideid: SideID){
        this.Battle = battle;
        this.id = sideid;
        this.name = SideOption.name;
        this.character = new Array<Character>(SideOption.elfbuild.length);
        for (let [index,elf] of SideOption.elfbuild.entries()){
            this.character[index] = new Character(this,elf);
        }
        this.activeCharacter = this.character.slice();
        this.elfLeft = this.character.length;
        this.choosen = null;
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
}

export class Battle{
    readonly id: number;
    readonly debug: boolean;

    readonly gametype: GameType;
    readonly PRngSeed: [number, number, number, number];


    turn: number;
    state: BattlePhase;
    side1: Side;
    side2: Side;

    chosen: number;

    constructor(battleOption:BattleOption){
        this.id = 0;
        this.debug = battleOption.debug || false;
        this.gametype = 'single';
        this.PRngSeed = battleOption.PRngSeed??[0,0,0,0];
        this.state = BattlePhase.BattleStart;
        this.turn = 0;
        this.side1 = new Side(this,battleOption.side1Options,SideID.p1);
        this.side2 = new Side(this,battleOption.side2Options,SideID.p2);
        this.chosen = 0;
    }

    random(min:number, max:number):number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    choose(side:SideID, choose:ChooseOption):boolean{
        if (this.state !== BattlePhase.Choose){
            return false;
        }
        switch (side){
            case SideID.p1:
                this.side1.choose(choose);
                break;
            case SideID.p2:
                this.side2.choose(choose);
                break;
            default:
                return false;
        }
        if (this.side1.isReady() && this.side2.isReady()){
            this.commitDecision();
        }
        return true;
    }

    cancleChoose(side:SideID):boolean{
        if (this.state !== BattlePhase.Choose){
            return false;
        }
        switch (side){
            case SideID.p1:
                this.side1.cancleChoose();
                return true;
            case SideID.p2:
                this.side2.cancleChoose();
                return true;
            default:
                return false;
        }
    }


    commitDecision(){
        
    }

    go(){

    }
}