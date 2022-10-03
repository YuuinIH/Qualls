import { Battle } from "./fragment/battle"
import { CharacterEntity } from "./fragment/character"
import { MarkDex, MarkEntity, MarkID, MarkSpecies } from "./fragment/mark"


export class MarkSystem{
    private readonly markDex:MarkDex
    private readonly battle:Battle
    constructor(markDex:MarkDex,Battle:Battle){
        this.markDex=markDex
        this.battle=Battle
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

    NewMark(owner:CharacterEntity,markID:MarkID,remainTurns:number|null,stacks:number){
        const mark = {
            destroyed:false,
            owner,
            markSpecies:this.GetMarkSpecies(markID),
            stacks,
            remainTurns,
        }
        owner.mark.push(mark)
        this.battle.mark.push(mark)
    }

    DestroyMark(mark:MarkEntity){
        mark.destroyed=true
    }

    // Update all mark after a turn
    TurnUpdate(){
        for (const mark of this.battle.mark){
            //todo：如果有update方法，尝试update，否则只对剩余回合数进行count down

        }
    }
}
