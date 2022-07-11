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

export class Elf{
    readonly level: number;
    readonly gender: GenderName;
    species: ElvesSpecies;

    moveSlots:MoveSlots[]
}