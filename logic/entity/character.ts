import { MoveSlot,MoveData } from "./move";
import { MarkEntity } from "./mark";

export interface CharacterDex {
    [name: string]: CharacterSpecies;
}

export interface CharacterSpecies {
    num: number;
    name: string;
    types: GameType[];
    abilities: string;
    baseStats: { [key: string]: number };
    heightm: number;
    weightkg: number;
}

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

export interface CharacterOnBuild {
    //精灵名称，使用时请总是转换为对应的精灵ID
    species: string;
    //预留空间，为可选的特性做准备
    ability: string;
    //技能
    moves: string[];
    //性格
    nature: string;
    //性别
    gender: GenderName;
    //学习力/努力值
    evs: StatsTable;
    //个体值/资质
    ivs: number;
    //等级，通常1-100 也支持0级甚至9999级等用于测试
    level: number;

    //纹章
    coat: null | string;
}

export type CharacterEntity = {
    readonly level: number;
    readonly gender: GenderName;
    //可变，可能会发生变身
    species: CharacterSpecies;
    types: GameType[];
    nature: NatureID;

    moveSlots: MoveSlot[];

    maxhp: number;
    hp: number;
    ivs: number;
    evs: StatsTable;

    stat: StatsExceptHPTable;
    accuracy: number;
    evasion: number;

    fainted: boolean;
    faintQueued: boolean;

    //上一个实际使用的技能
    lastMove: MoveData | null;
    //上一个选择的技能
    lastMoveSelect: MoveData | null;

    //上一次受到的伤害
    lastDamage: number;

    weightkg: number;
    heightm: number;

    mark: MarkEntity[];
};

export type NatureID = string

export type Nature =  {
    readonly Id: NatureID;
    readonly Name: string;
    readonly StatAffect : Readonly<StatsExceptHPTable>
}

export interface NatureDex{
    readonly [ID:NatureID]:Readonly<Nature>
}