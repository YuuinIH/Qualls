import { MarkSystem } from "./mark";
import { NatureSystem } from "./nature";
import { MoveSystem } from "./move";
import { CharacterDex, CharacterEntity, CharacterOnBuild } from "./entity/character";
import { MarkID } from "./entity/mark";

export class CharacterSystem {
    readonly NatureSystem: NatureSystem;
    readonly MarkSystem: MarkSystem;
    readonly MoveSystem: MoveSystem;

    readonly CharacterDex: CharacterDex;

    constructor(
        NatureSystem: NatureSystem,
        MarkSystem: MarkSystem,
        MoveSystem: MoveSystem,
        CharacterDex: CharacterDex
    ) {
        //TODO: 检查数据完整性
        this.CharacterDex = CharacterDex;

        this.MarkSystem = MarkSystem;
        this.NatureSystem = NatureSystem;
        this.MoveSystem = MoveSystem;
    }

    NewCharacter(build: CharacterOnBuild): CharacterEntity {
        const species = this.CharacterDex[build.species];
        if (!species) throw new Error("Species not found: " + build.species);
        const character: CharacterEntity = {
            species,
            level: build.level,
            types: species.types,
            nature: this.NatureSystem.GetNatureIdByName(build.nature),
            gender: build.gender,
            moveSlots: [],
            ivs: build.ivs,
            evs: build.evs,

            maxhp: 0,
            hp: 0,
            stat: {
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0,
            },

            fainted: false,

            faintQueued: false,
            lastMove: null,
            lastMoveSelect: null,
            lastDamage: 0,
            weightkg: species.weightkg,
            heightm: species.heightm,
            mark: [],
        };
        for (const move of build.moves) {
            let slot = this.MoveSystem.NewMoveSlot(move);
            character.moveSlots.push(slot);
        }
        this.UpdateMaxHP(character, true);
        this.UpdateStat(character);
        return character;
    }

    //TODO:在最大HP变化时，更新HP
    UpdateMaxHP(character: CharacterEntity, init: boolean = false) {
        const species = character.species;
        const level = character.level;
        const iv = character.ivs;
        const ev = character.evs.hp;
        const base = species.baseStats.hp;
        //计算公式: (2*基础值+个体值+努力值/4)*等级/100+等级+10
        let newMaxHP = Math.floor(
            Math.floor(
                (Math.floor(2 * base + iv + Math.floor(ev / 4)) * level) / 100
            ) +
            level +
            10
        );
        character.maxhp = newMaxHP;
        if (init) character.hp = newMaxHP;
    }

    //TODO: 能力加成
    UpdateStat(character: CharacterEntity) {
        const nature = character.nature;
        const natureEffect = this.NatureSystem.GetNatureStatAffect(nature);
        for (const stat in natureEffect) {
            let statValue = 0;
            //计算公式: (2*基础值+个体值+努力值/4)*等级/100+5
            statValue =
                ((2 * character.species.baseStats[stat] +
                    character.ivs +
                    Math.floor(character.evs[stat as keyof StatsTable] / 4)) *
                    character.level) /
                100 +
                5;
            //计算性格加成
            statValue *= natureEffect[stat as keyof StatsExceptHPTable];

            character.stat[stat as keyof StatsExceptHPTable] = Math.floor(statValue);
        }
    }

    //TODO:..
    AddMark(character: CharacterEntity, markID: MarkID, ...opt: any) {
        for (const mark of character.mark) {
            if (mark.markSpecies.id === markID) {
                //TODO: 重复标记时的处理
                return;
            }
        }
        
    }
}