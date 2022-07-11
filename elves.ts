import { MarkSpecies } from "./mark";

export class ElvesSpecies{
    num: number;
    name: string;
    types: string[];
    abilities: string;
    baseStats: {[key:string]:number};
    heightm: number;
    weightkg: number;
}

interface MoveSlots{
    id: number;
    move: Move;
    cost: number;
    target?: string;
}

export class ElfOnBuild{
    //精灵名称，使用时请总是转换为对应的精灵ID
    species:string;
    //预留空间，为可选的特性做准备
    ability: string;
    //技能
    moves: string[];
    //性格
    nature: string;
    //性别
    gender: string;
    //学习力/努力值
    evs: StatsTable;
    //个体值/资质
    ivs: number;
    //等级，通常1-100 也支持0级甚至9999级等用于测试
    level: number;
    //是否携带纹章
    hasCoat: boolean;
}

export class Elf{
    readonly side: Side
    readonly level: number;
    readonly gender: GenderName;
    //可变，可能会发生变身
    species: ElvesSpecies;
    types: string[];

    moveSlots:MoveSlots[];

    maxhp:number;
    hp:number;

    fainted:boolean;
    faintQueued:boolean;

    lastMove: Move|null;
    lastMoveSelect: Move|null;
    moveThisTurn: Move|null;

    //上一次受到的伤害
    lastDamage: number;

    weighthg: number;
    heightm: number;
    speed: number;

    mark: Mark[];

    moveUsed(move:Move, target:Elf){
        this.lastMove = move;
    }

    gotHit(move:Move, damage:number|null, source:Elf){
        this.lastDamage = damage?damage:0;
    }
}