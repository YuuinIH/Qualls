import { AngerSystem } from "./anger";
import { CharacterFragment } from "./character";
import { MarkFragment } from "./mark";
import { MoveFragment } from "./move";
import { GameTypeDex, TypeChartSystem } from "./typechart"

export interface DamageAndHealSystem {
    damage(source: CharacterFragment, target: CharacterFragment, move: MoveFragment,crit: boolean): void;
    heal(source: CharacterFragment, target: CharacterFragment, move: MoveFragment,crit: boolean): void;
}

export class DamageAndHealSystem implements DamageAndHealSystem{
    typeChartSystem: TypeChartSystem;
    constructor(typeChartDex: GameTypeDex) {
        this.typeChartSystem = new TypeChartSystem(typeChartDex)
    }
    calculateDamage(sourceAtk:number, targetDef:number, power:number, crit: boolean): number {
        return Math.floor(Math.floor(Math.floor(Math.floor(2 * sourceAtk / 5 + 2) * power * sourceAtk / targetDef) / 50) + 2) * (crit ? 2 : 1);
    }

    damage(source: CharacterFragment, target: CharacterFragment, move: MoveFragment, crit: boolean): void {
        let damage = 0 
        //TODO: 精神冲击like的技能
        //威力部分的计算
        switch (move.category) {
            case "physical":
                damage = this.calculateDamage(source.stat.atk, source.stat.def, move.basePower, crit);
                break;
            case "special":
                damage = this.calculateDamage(source.stat.spa, source.stat.spd, move.basePower, crit);
                break;
            case "climax":
                if (source.stat.atk > source.stat.spa) {
                    damage = this.calculateDamage(source.stat.atk, target.stat.def, move.basePower, crit);
                } else if (source.stat.atk < source.stat.spa) {
                    damage = this.calculateDamage(source.stat.spa, target.stat.spd, move.basePower, crit);
                } else {//atk == spa
                    damage = this.calculateDamage(source.stat.atk, Math.min(target.stat.def,target.stat.spd), move.basePower, crit);
                }
                break;
            default:
                break;
        }
        //属性计算
        const sourceType = this.typeChartSystem.GetTypeByID(move.type);
        if (!sourceType) {
            throw new Error("Type not found");
        }
        for (const targetType of target.types) {
            damage = Math.floor(damage * this.typeChartSystem.GetEffectiveness(sourceType, targetType));
        }

        if (move.fixedDamage) damage+=move.fixedDamage;

        //todo: 护盾类
        target.hp -= damage;
        if (target.hp < 0) {
            target.hp = 0;
        }
    }
}