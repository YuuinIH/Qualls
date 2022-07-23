import { Character } from "./character";

export interface MoveData extends MoveEventListener{
    id: number;
    name: string;
    cost: number;
    basePower: number;
    accuracy: number;

    category: "physical" | "special" | "status" | "climax";
    type: string;
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
    onTryHit?(this: Battle, source: Character, target: Character, activemove: ActiveMove): void;
    onBeforeClacDamage?(this: Battle, source:Character, target:Character, move: ActiveMove): void;
    onHit?(this: Battle, source: Character, target: Character, activemove: ActiveMove): void;
    onAfterHit?(this: Battle, source: Character, target: Character, activemove: ActiveMove): void;
    onBeforeHit?(this: Battle, source: Character, target: Character, activemove: ActiveMove): void;
}

//实际使用的技能，由于威力，先制度等因素会发生变动。
export class ActiveMove {
    original: MoveData;
    readonly battle: Battle;
    source: Character;
    target: Character;
    cost: number;
    basePower: number;
    accuracy: number;
    category: "physical" | "special" | "status" | "climax";
    type: string;
    priority: number;
    
    damage?: number;

    constructor(battle:Battle,original: MoveData, source: Character, target: Character){
        this.battle = battle;
        this.original = original;
        this.source = source;
        this.target = target;
        this.cost = original.cost;
        this.basePower = original.basePower;
        this.accuracy = original.accuracy;
        this.category = original.category;
        this.type = original.type;
        this.priority = original.priority;
        this.damage = 0;
    }
    ChangeMove(move: MoveData){
        this.original = move;
        this.cost = move.cost;
        this.basePower = move.basePower;
        this.accuracy = move.accuracy;
        this.category = move.category;
        this.type = move.type;
        this.priority = move.priority;
    }
    DamageCalculate(){
        if (this.category === "status") {
            this.damage = 0;
            return
        }
        let damage = this.basePower;
        return damage;
    }
}
