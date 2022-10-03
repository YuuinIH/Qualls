import { Nature, NatureDex, NatureID } from "./entity/character"


export interface NatureSystem{
    GetNature(ID:NatureID):Nature,
    GetNatureStatAffect(ID:NatureID):StatsExceptHPTable,
    IsValidNature(ID:NatureID):boolean,
}

export class NatureSystem implements NatureSystem{
    private readonly natureDex:NatureDex
    /*
        获取性格的加成
        返回值为一个StatsExceptHPTable，其中代表了数值所叠乘的倍率。
        exp:如果返回值为{atk:1.1,def:0.9}，则代表攻击加成10%，防御减少10%
    */
    GetNatureStatAffect(ID:NatureID):StatsExceptHPTable{
        return this.natureDex[ID].StatAffect
    }
    GetNature(ID: NatureID): Nature {
        return this.natureDex[ID]
    }
    GetNatureIdByName(name:string):NatureID{
        for (const id in this.natureDex) {
            if (this.natureDex[id].Name===name) {
                return this.natureDex[id].Id
            }
        }
        throw new Error("Nature not found")
    }

    IsValidNature(ID:NatureID):boolean{
        return this.natureDex[ID]!==undefined
    }
    constructor(natureDex:NatureDex){
        this.natureDex=natureDex
    }
}
