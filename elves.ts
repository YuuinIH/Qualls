export class ElvesSpecies{
    num: number;
    name: string;
    types: string[];
    abilities: string[];
}

interface MoveSlots{
    id: number;
    move: string;
    cost: number;
    target?: string;
}

export class Elf{
    readonly level: number;
    readonly gender: GenderName
    species: ElvesSpecies;

    moveSlots:MoveSlots[]
}