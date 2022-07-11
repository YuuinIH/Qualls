export type GameType = 'single';

interface BattleOption{
    format?: string;
    formatid?: string;
    debug?: boolean;
    gameType: GameType;
    PRngSeed?: [number, number, number, number];
    side1Options: SideOption;
    side2Options: SideOption;
}

interface SideOption{
    name: string;
    elfbuild: ElfOnBuild[]
}

export enum SideID {
    p1 = 'p1',
    p2 = 'p2'
}

export type BattleState = 'turnStart' | 'turn' | '';

export class Side{
    readonly Battle: Battle;
    readonly id: SideID;
    
    name: string;
    elf: Elf[];
    activeElf: Elf;

    elfLeft: number;
}

export class Battle{
    readonly id: number;
    readonly debug: boolean;

    readonly gametype: GameType;
    readonly PRngSeed: [number, number, number, number];

    readonly callback: (this:Battle, event:string, ...args:any[])=>void[];

    turn: number;
    state: BattleState = '';
    queue: Event[];

    chosen: number;

    constructor(BattleOption:BattleOption){
        this.id = 0;
        this.debug = BattleOption.debug || false;
        this.gametype = 'single';
        this.PRngSeed = BattleOption.PRngSeed??[0,0,0,0];
        this.turn = 0;
    }

    choose(side:SideID, move:string){

    }

    commitDecision(){
        
    }
}