import winston from "winston"
import { MonsterSet } from "./teams"

export class Battle {
    logger: winston.Logger = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        defaultMeta: { service: "battle" },
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
        ],
    })
    log: string[] = []

    id: string
    debug: boolean
    seed: number

    constructor(public readonly payload: BattlePayload) {
        this.logger.debug("Battle payload", payload)
        
        this.id = '';
        this.debug = payload.debug
        this.seed = payload.seed
    }
}

export interface BattlePayload {
    seed?: number
    battleType?: number
    battleId?: number
    debug: boolean
    playerPlayload: PlayerPayload[]
}

export interface PlayerPayload {
    playerId: number
    playerName: string
    team: MonsterSet[]
}
