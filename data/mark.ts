export const MarkDex:{[MarkName:string]:MarkSpecies}={
    yishang:{
        id:1,
        name:"易伤",
        unstable:false,
        stackable:false,
        hasRemainTurn:false,
        description:"受到的伤害增加50%",
        beforeSelfClacDamage(this:Mark,source:Character,target:Character,move:ActiveMove){
            move.overrideNumber = move.overrideNumber*1.5
        }
    }
    yanggong:{
        id:2,
        name:"佯攻",
        unstable:false,
        stackable:false,
        hasRemainTurn:false,
        description:"下一个除“佯攻”以外的技能增加50点威力",
        beforeClacDamage(this:Mark,source:Character,target:Character,move:ActiveMove){
            if(move.name != "佯攻"){
                move.basePower += 50;
            }
        }
    }
}