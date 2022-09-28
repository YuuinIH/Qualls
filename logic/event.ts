import { MoveFragment,MoveSlot } from "./move";
import { CharacterFragment } from "./character";
import { MarkFragment } from "./mark";
import { Side } from "./battle";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export type EventQueue = PriorityQueue<Events>;

/*事件的优先级，所有的事件发生遵循以下原则：
1. 优先级高的事件先发生
2. 如果是释放技能的事件，技能优先级高的先发生 //TODO:可变的优先级
3. 优先级相同的事件，事件产生者速度快的先发生
4. 速度相同的事件，按照side的id顺序发生
*/
export const compareEventPriority = (a: Events, b: Events) => {
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
    if (a.character.stat.spd != b.character.stat.spd) {
        return a.character.stat.spd - b.character.stat.spd;
    }
    return a.side.id - b.side.id;
}

export enum EventDefaultPriority {
    SwitchCharacter = 10000000,//切换角色，始终优先于其他事件
    
    BeforeMove = 9000,//技能前

    CostAnger = 8000,//消耗怒气
    CheckHit = 7000,//命中判定
    MissingHit = 6500,//未命中
    CheckCrit = 6000,//暴击判定
    Hit = 5000,//命中
    Damage = 4000,//伤害
    Effect = 3000,//效果
    AfterMove = 2000,//技能后

    TryUseMove = 100, //尝试使用技能

    AfterTurn = 0,//回合结束
}

export enum EventType{
    BeforeMove = 'BeforeMove',
    
    CostAnger = 'CostAnger',
    CheckHit = 'CheckHit',
    MissingHit = 'MissingHit',
    CheckCrit = 'CheckCrit',
    Hit = 'Hit',
    Damage = 'Damage',
    Effect = 'Effect',
    AfterMove = 'AfterMove',
    TryUseMove = 'TryUseMove',

    AfterTurn = 'AfterTurn',
    SwitchCharacter = 'SwitchCharacter',
}

export interface Event{
    type: EventType;
    side: Side;
    character: CharacterFragment;
    priority: number;
}

export interface EventTryUseMove extends Event{
    type: EventType.TryUseMove;
    select: MoveSlot;
}

export interface EventMove extends Event{
    move: MoveFragment;
    cost: number;
    target : CharacterFragment;
}

export interface EventDamage extends Event{
    crit: boolean;
    target: CharacterFragment;
}

export interface EventMark extends Event{
    mark: MarkFragment;
}

// export interface EventEffect extends Event{
//     effect: EffectFragment;
// }

export interface EventSwitchCharacter extends Event{
    newCharacter: CharacterFragment;
}

export type Events = Event|EventTryUseMove|EventMove|EventSwitchCharacter|EventDamage;
