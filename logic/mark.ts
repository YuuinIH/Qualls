import { Character } from "./character";

export interface MarkSpecies{
    id: number;
    name:string;
    unstable:boolean;//在更换精灵时是否会印记是否会消失
    stackable:boolean;//是否可以堆叠
    hasRemainTurn:boolean;//是否有剩余回合
    description:string;//描述
    priority:number;//优先级

    getStack?():number;//如果可以堆叠，获取堆叠数量
}

export class MarkFragment{
    destroyed:boolean = false;
    battle: Battle;
    owner: Character;
    markSpecies: MarkSpecies;
    stacks: number;
    remainTurns: number|null;//null means infinite

    constructor(battle: Battle, owner: Character, markSpecies: MarkSpecies,remainTurns:number|null,stacks:number){
        this.battle = battle;
        this.owner = owner;
        this.markSpecies = markSpecies;
        this.remainTurns = remainTurns;
        this.stacks = stacks;
    }
}
