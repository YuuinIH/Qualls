import { CharacterEntity,GameType } from "./character";
import { Battle } from "./battle";
import { KeyOfEvent, KeyOfEvents } from "./eventhandler";

export type MoveName = string

export type MoveId = string

export interface MoveDex {
    readonly [name: MoveId]: MoveData;
}

export interface MoveData{
    id: MoveId;
    name: MoveName;
    cost: number;
    basePower: number;
    accuracy: number;

    category: "physical" | "special" | "status" | "climax";
    type: string;
    priority: number;

    damage?: number | "level" | false | null;

    heal?: [number, number]| number;//百分比或固定数值
    recoil?: [number, number]| number;
    drain?: [number, number]| number;
    mininumDamage?: number;

    ignoreAbility?: boolean;
    ignoreAccuracy?: boolean;//无视命中判定，即为大多数情况的必中
    ignoreDefensive?: boolean;

    critBoost?: number;

    multihit?: number | [number, number];//固定次数或范围

    alwayCrit?: boolean;

    vampire?: number;

    secondary?:{
        chance?: number;
        boosts?: Partial<StatsTable>;
        status?: string;
    }
    self?: {
        chance?: number;
        boosts?: Partial<StatsTable>;
        status?: string;
    }
}

//实际使用的技能事件信息，由于威力，先制度等因素会发生变动，结算会根据这个结构体进行。
export type MoveEvent = {
    original: MoveData;
    source: CharacterEntity
    target: CharacterEntity;
    cost: number;
    basePower: number;
    accuracy: number;
    category: "physical" | "special" | "status" | "climax";
    type: string;
    priority: number;
    critRate: number;
    
    fixedDamage?: number;
}

//角色所拥有的技能格子。
export interface MoveSlot{
    id: number;
    move: Readonly<MoveData>;
    cost: number;
}
