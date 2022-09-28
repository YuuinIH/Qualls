export type GameType = {
    readonly ID: string,
    readonly Name: string,
}

export interface GameTypeDex{
    readonly types :{
        readonly [GameTypeID:string]:GameType
    }
    readonly damageTakenMatrix: {
        [GameTypeID:string]:{
            readonly [GameTypeID:string]:number
        },
    }
}

export class TypeChartSystem{
    private readonly typeChartDex:GameTypeDex

    constructor(typeChartDex:GameTypeDex){
    /*  
        检查typeChartDex的合法性
        1.检查types是否有重复的ID
        2.检查types中的id和key是否一致
        3.检查types中所有的type是否都在damageTakenMatrix中
        4.检查damageTakenMatrix中所有的type对其他type是否完整
        5.检查damageTakenMatrix中所有的克制倍率是否非负
        
        注意:不检查冗余的type是否在damageTakenMatrix中
        TODO:编译期检查
    */
        const keySet = new Set()
        for (const typeID1 in typeChartDex.types) {
            //检查types是否有重复的ID
            if (!keySet.has(typeID1)) {
                keySet.add(typeID1)
            } else {
                throw new Error(`typeChartDex.types中存在重复的ID:${typeID1}`)
            }

            //检查types中的id和key是否一致
            if (typeChartDex.types.hasOwnProperty(typeID1)) {
                const type = typeChartDex.types[typeID1];
                if(type.ID!==typeID1){
                    throw new Error(`typeChartDex.types中的type的ID与其在types中的key不一致`)
                }
            }

            //检查types中所有的type是否都在damageTakenMatrix中
            if (!typeChartDex.damageTakenMatrix.hasOwnProperty(typeID1)) {
                throw new Error(`typeChartDex.types中的type:${typeID1}在damageTakenMatrix中不存在`)
            }
            
            for (const typeID2 in typeChartDex.types) {
                //检查damageTakenMatrix中所有的type对其他type是否完整
                if (!typeChartDex.damageTakenMatrix[typeID1].hasOwnProperty(typeID2)) {
                    throw new Error(`typeChartDex.damageTakenMatrix中的type:${typeID1}对type:${typeID2}的克制倍率不存在`)
                }
                const damageMultiplier = typeChartDex.damageTakenMatrix[typeID1][typeID2];
                if(damageMultiplier<0){
                    throw new Error(`typeChartDex.damageTakenMatrix中的type:${typeID1}对type:${typeID2}的克制倍率为负数`)
                }
            }
        }

        this.typeChartDex=typeChartDex
    }

    GetTypeByID(typeID:string):GameType|null{
        const type = this.typeChartDex.types[typeID]
        if (type) {
            return type
        }
        return null
    }

    GetEffectiveness(type1:GameType,type2:GameType):number{
        return this.typeChartDex.damageTakenMatrix[type1.ID][type2.ID]
    }
    IsValidType(type:GameType):boolean{
        return this.typeChartDex.types[type.ID]!==undefined
    }
    IsSameType(type1:GameType,type2:GameType):boolean{
        return type1.ID===type2.ID
    }
    IsDifferentType(type1:GameType,type2:GameType):boolean{
        return !this.IsSameType(type1,type2)
    }
}