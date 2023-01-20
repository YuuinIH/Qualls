import { CharacterEntity } from "./character";
import { EventObserverWithPriority } from "./eventhandler";

export type MarkID = string;

export interface MarkDex{
    readonly [ID:MarkID]:Readonly<MarkSpecies>
}

export interface MarkSpecies{
    id: MarkID;
    name:string;

    unstable?:boolean;//在更换精灵时是否会印记是否会消失
    stackable?:boolean;//是否可以堆叠
    hasRemainTurn?:boolean;//是否有剩余回合

    description:string;//描述

    isBasicStat?:boolean;//是否是基础的能力提升印记
    isShield?:boolean;//是否是护盾
    isBasicBuff?:boolean;//是否是基础buff
    isSpecialStatus?:boolean;//是否是异常状态
    isNegativeStatus?:boolean;//是否为不良状态 
    isNegative?:boolean;//是否是副作用印记

    statEffect?:StatsExceptHPTable[];//基础能力提升印记的加成,下标0为百分比加成，下标1为固定值加成

    //当造成技能伤害时所产生的伤害倍率，取小数,在事件逻辑和固定伤害增加之前结算
    damageMultiplier?:number
    beDamageMultiplier?:number
    //技能命中时，额外增加的伤害数，在事件逻辑和伤害计算倍率之后计算,这个额外增加的伤害不受技能伤害倍率影响
    damageIncreaseInt?:number
    bedamageIncreaseInt?:number

    //事件处理器
    eventObserver?:EventObserverWithPriority[];
}

export interface MarkEntity{
    destroyed:boolean//是否已经被摧毁，摧毁的印记不会进行更新并且会在检测时被移除
    owner: CharacterEntity;//印记的拥有者
    markSpecies: MarkSpecies;//印记的原型
    stacks: number;//印记的层数或堆叠数，具体意义由印记的原型决定
    remainTurns: number|null;//null means infinite
}
