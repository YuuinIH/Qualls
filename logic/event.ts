import { MoveEvent,MoveSlot } from "./entity/move";
import { CharacterEntity } from "./entity/character";
import { MarkEntity } from "./entity/mark";
import { Side } from "./entity/battle";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export type EventQueue = PriorityQueue<Events>;

/*事件的优先级，所有的事件发生遵循以下原则：
1. 优先级高的事件先发生
2. 如果是释放技能的事件，技能优先级高的先发生 //TODO:可变的优先级
3. 优先级相同的事件，事件产生者速度快的先发生
4. 速度相同的事件，按照side的id顺序发生
*/
export const compareEventPriority = <T extends Event,EventHasSource,EventHasTarget,EventMove>(a: T, b: T) => {
    //不同类型的事件的比较，按照下方的defaultpriority从小到大排序
    if (a.priority != b.priority) {
        return b.priority - a.priority;
    }
    //TODO:可变的优先级
    //todo:优先级相同的事件，事件产生者速度快的先发生

    //有源事件之间的比较
    if ((b as EventHasSource).source&&(a as EventHasSource).source){
        //技能本身的先制度
        if ((b as EventMove).move.priority != (a as EventMove).move.priority) {
            return (b as EventMove).move.priority - (a as EventMove).move.priority;
        }
        if ((b as EventMove).source.stat.spd != (a as EventMove).source.stat.spd) {
            return (b as EventMove).source.stat.spd - (a as EventMove).source.stat.spd;
        }
    }
    return a.side.Id - b.side.Id;
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
    priority: number;
    side:Side
}

export interface EventHasSource extends Event{
    source:CharacterEntity|MarkEntity
}

export interface EventHasTarget extends EventHasSource{
    target:CharacterEntity
}

export interface EventTryUseMove extends EventHasTarget{
    select: MoveSlot;
}

export interface EventMove extends EventHasTarget{
    source:CharacterEntity;
    move: MoveEvent;
    cost: number;
}

export interface EventDamage extends EventMove{
    crit: boolean;
    damage: number;
}

export interface EventSwitchCharacter extends Event{
    newCharacter: CharacterEntity;
}
