
import { CharactersSpecies } from "@/character";
import { MarkSpecies } from "@/mark";
import { MoveAction } from "@/moves";


export const MarkDex:{[MarkName:string]:MarkSpecies}={
    yishang:{
        id:1,
        name:"易伤",
        unstable:false,
        stackable:false,
        hasRemainTurn:false,
        description:"受到的伤害增加50%",
        beforeOwnerClacBeingDamage(mark:Mark,source:CharactersSpecies,owner:CharactersSpecies,move:MoveAction){
            move.overrideNumber = move.overrideNumber*1.5
        }
    },
    yanggong:{
        id:2,
        name:"佯攻",
        unstable:false,
        stackable:false,
        hasRemainTurn:false,
        description:"下一个除“佯攻”以外的技能增加50点威力",
        beforeOwnerClacDamage(mark:Mark,source:CharactersSpecies,target:CharactersSpecies,move:MoveAction){
            if(move.type=="status"){
                return
            }
            if(move.original.name == "佯攻"){
                return
            }
            move.basePower += 50;
        }
    }
}