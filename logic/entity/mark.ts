import { CharacterEntity } from "./character";

export type MarkID = string;

export interface MarkDex{
    readonly [ID:MarkID]:Readonly<MarkSpecies>
}

export interface MarkSpecies{
    id: MarkID;
    name:string;
    unstable:boolean;//在更换精灵时是否会印记是否会消失
    stackable:boolean;//是否可以堆叠
    hasRemainTurn:boolean;//是否有剩余回合
    description:string;//描述
    priority:number;//优先级

    beforeSelfClacDamage?:any;
    beforeClacDamage?:any;
}

export interface MarkEntity{
    destroyed:boolean
    owner: CharacterEntity;
    markSpecies: MarkSpecies;
    stacks: number;
    remainTurns: number|null;//null means infinite
}
