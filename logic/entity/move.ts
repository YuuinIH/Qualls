import { CharacterEntity,GameType } from "./character";
import { Battle } from "./battle";

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
    type: GameType;
    priority: number;

    damage?: number | "level" | false | null;

    isClimax?: boolean;

    heal?: number[] | null;
    recoil?: [number, number];
    drain?: [number, number];

    ignoreAbility?: boolean;
    ignoreAccuracy?: boolean;
    ignoreDefensive?: boolean;

    multihit?: number | number[];

    alwayCrit?: boolean;
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
