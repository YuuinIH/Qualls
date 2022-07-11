
interface BattleOption{

}

export type GameType = 'single' | 'double';

interface BattleOption{
    format?: string;
    formatid?: string;
    debug?: boolean;
    gameType: GameType;
    PRngSeed?: string;
}

class Player{
    
}

export class Battle{
    readonly id: number;
    readonly debug: boolean;

    readonly gametype: GameType;
    readonly PRngSeed: string;

    readonly callback: (this:Battle, event:string, ...args:any[])=>void[];

    turn: number;
    queue: Event[];

    constructor(BattleOption:BattleOption){
        this.id = 0;
        this.debug = BattleOption.debug || false;
        this.gametype = 'single';
        this.PRngSeed = BattleOption.PRngSeed || '0';
        this.turn = 0;
    }
}