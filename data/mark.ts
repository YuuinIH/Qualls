
import { CharactersSpecies } from "@/character";
import { MarkSpecies } from "@/mark";
import { MoveFragment } from "@/move";


export const MarkDex:{[MarkName:string]:MarkSpecies}={
    yishang:{
        id:"yishang",
        name:"易伤",
        unstable:false,
        stackable:false,
        hasRemainTurn:false,
        description:"受到的伤害增加50%",
        effect:{
            hittedDamageOverride: 1.5,
        }
    },
    yanggong:{
        id:"yanggong",
        name:"佯攻",
        unstable:false,
        stackable:false,
        hasRemainTurn:false,
        description:"下一个除“佯攻”以外的技能增加50点威力",
        onHit(move:MoveFragment){
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