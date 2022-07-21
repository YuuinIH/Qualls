export interface MoveData {
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

    condition?:MoveEvent;
}

export interface MoveEvent {
    onBeforeMove?(this: Battle, source: Elf, target: Elf, move: ActiveMove): boolean;
    onTryHit?(this: Battle, source: Elf, target: Elf, move: ActiveMove): boolean;
    onHit?(this: Battle, source: Elf, target: Elf, move: ActiveMove): boolean;
    onBeforeHit?(this: Battle, source: Elf, target: Elf, move: ActiveMove): boolean;
}

export interface ActiveMove extends MoveData {
    originMove: Readonly<MoveData>;
    overrideNumber?: number;
}
