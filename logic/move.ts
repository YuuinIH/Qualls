import { CharacterFragment } from "./character";
import { GameType } from "./typechart";

export type MoveName = string

export type MoveId = string

export interface MoveDex {
    readonly [name: MoveId]: MoveData;
}

export interface MoveData extends MoveEventListener{
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

export interface MoveEventListener {
    onTryHit?(this: Battle, source: CharacterFragment, target: CharacterFragment, activemove: MoveFragment): void;
    onBeforeClacDamage?(this: Battle, source:CharacterFragment, target:CharacterFragment, move: MoveFragment): void;
    onHit?(this: Battle, source: CharacterFragment, target: CharacterFragment, activemove: MoveFragment): void;
    onAfterHit?(this: Battle, source: CharacterFragment, target: CharacterFragment, activemove: MoveFragment): void;
    onBeforeHit?(this: Battle, source: CharacterFragment, target: CharacterFragment, activemove: MoveFragment): void;
}

//实际使用的技能，由于威力，先制度等因素会发生变动。
export type MoveFragment = {
    original: MoveData;
    source: CharacterFragment;
    target: CharacterFragment;
    cost: number;
    basePower: number;
    accuracy: number;
    category: "physical" | "special" | "status" | "climax";
    type: string;
    priority: number;
    
    fixedDamage?: number;
}

//角色所拥有的技能格子。
export interface MoveSlot{
    id: number;
    move: Readonly<MoveData>;
    cost: number;
}


export class MoveSystem{
    private readonly dex: MoveDex;
    constructor(dex: MoveDex) {
        this.dex = dex;
    }

    NewMoveSlot(name: MoveName): MoveSlot{
        const move = this.dex[name];
        if(!move) throw new Error("Move not found: "+name);
        return {
            id: 0,
            move: this.GetMoveByName(name),
            cost: move.cost,
        }
    }

    GetMoveByName(name: string): Readonly<MoveData>{
        for (const move in this.dex) {
            if (this.dex[move].name === name) return this.dex[move];
        }
        throw new Error("Move not found: "+name);
    }
}
