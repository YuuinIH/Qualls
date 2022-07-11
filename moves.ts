export interface MoveData{
    id: number;
    name: string;
    cost: number;
    basePower: number;
    accuracy: number;

    category: 'physical' | 'special' | 'status' | 'climax';
    type: string;
    priority: number;

    damage?: number | 'level' | false | null;

    isClimax?: boolean;

    heal?: number[] | null;
    recoil?: [number, number];
    drain?: [number, number];

    ignoreAbility?: boolean;
	ignoreAccuracy?: boolean;
	ignoreDefensive?: boolean;

    multihit?: number | number[];

    willCrit?: boolean;
}

interface MoveHitData{
    crit: boolean;

}