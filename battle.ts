
interface BattleOption{

}

export type GameType = 'single' | 'double';

interface BattleOption{
    format?: string;
    formatid?: string;
    debug?: boolean;
}

export class Battle{
    readonly id: number;
    readonly debug: boolean;

    readonly gametype: GameType;
}