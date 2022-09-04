import { Side } from "./battle";
import { Mark } from "./mark";


export interface CharactersSpecies{
    num: number;
    name: string;
    types: string[];
    abilities: string;
    baseStats: {[key:string]:number};
    heightm: number;
    weightkg: number;
}

export interface MoveSlots{
    id: number;
    move: Readonly<MoveData>;
    cost: number;
    target?: string;
}

export interface CharacterOnBuild{
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
    evs: EVS;
    //个体值/资质
    ivs: number;
    //等级，通常1-100 也支持0级甚至9999级等用于测试
    level: number;
    //是否携带纹章
    hasCoat: boolean;
}

export class Character{
    readonly side: Side
    readonly level?: number;
    readonly gender: GenderName;
    battle: Battle;
    //可变，可能会发生变身
    species: CharactersSpecies;
    types: string[];

    moveSlots:MoveSlots[];
    storestat:StatsExceptHPTable

    maxhp:number;
    hp:number;

    fainted:boolean;
    faintQueued:boolean;

    //上一个实际使用的技能
    lastMove: MoveData|null;
    //上一个选择的技能
    lastMoveSelect: MoveData|null;

    //上一次受到的伤害
    lastDamage: number;

    weighthg: number;
    heightm: number;
    speed: number;

    mark: Mark[];
    //battle and site should not be any ,battle:Battle,side:Side,
    //but In order to escape type check,Do it any for now
    constructor(battle:any,side: any, CharacterOnBuild?: CharacterOnBuild){
        this.side = side;
        this.level = CharacterOnBuild?.level;
        //TODO:性别
        // this.gender = CharacterOnBuild.gender;
        this.gender='N'

    }

    calculateStat(statName:StatIDExceptHP,boost: number,modifier?:number){  
        let stat = this.storestat[statName]
    }
    
    addMark(markname:string,stack?:number,remainTurns?:number|null){
        if (stack === undefined){
            stack = 1;
        }
        if (remainTurns === undefined){
            remainTurns = null;
        }
        let mark = this.mark.find(m=>m.markSpecies.name === markname);
        if (mark !== undefined){
            //TODO:堆叠
        }else{
            mark = new Mark(this.battle,this,this.battle.getMark(markname),remainTurns,stack);
        }
    }
}