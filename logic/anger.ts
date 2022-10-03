import { Side } from "./entity/battle";


export interface AngerSystem {
    costAnger(side:Side,anger: number): boolean;
    addAnger(side:Side,anger: number): boolean;
}
export class AngerSystem implements AngerSystem {
    costAnger(side:Side,anger: number): boolean {
        if (side.anger < anger) {
            return false;
        }
        side.anger -= anger;
        return true;
    }
    addAnger(side:Side,anger: number): boolean {
        side.anger += anger;
        if (side.anger > 100) {
            side.anger = 100;
        }
        return true;
    }
    costAngerPercent(side:Side,percent: number): boolean {
        if (side.anger < percent * 100) {
            return false;
        }
        side.anger -= percent * 100;
        return true;
    }
    addAngerPercent(side:Side,percent: number): boolean {
        side.anger += percent * 100;
        if (side.anger > 100) {
            side.anger = 100;
        }
        return true;
    }
}