import { Side } from "./battle";

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
}