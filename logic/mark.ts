import { CharacterFragment } from "./character";

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

export interface MarkFragment{
    destroyed:boolean
    owner: CharacterFragment;
    markSpecies: MarkSpecies;
    stacks: number;
    remainTurns: number|null;//null means infinite
}

export class MarkSystem{
    private readonly markDex:MarkDex
    constructor(markDex:MarkDex){
        this.markDex=markDex
    }

    GetMarkSpecies(ID:string):MarkSpecies{
        if (!this.IsValidMark(ID)) {
            throw new Error("Mark not found")
        }
        return this.markDex[ID]
    }

    IsValidMark(ID:string):boolean{
        return this.markDex[ID]!==undefined
    }

    NewMark(owner:CharacterFragment,markID:MarkID,remainTurns:number|null,stacks:number){
        const mark = {
            destroyed:false,
            owner,
            markSpecies:this.GetMarkSpecies(markID),
            stacks,
            remainTurns,
        }
        owner.mark.push(mark)
    }

    DestroyMark(mark:MarkFragment){
        mark.destroyed=true
    }
}
