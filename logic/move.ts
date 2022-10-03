import { MoveData, MoveDex, MoveName, MoveSlot } from "./entity/move";


export class MoveSystem{
    private readonly dex: MoveDex;
    constructor(dex: MoveDex) {
        this.dex = dex;
    }

    NewMoveSlot(name: MoveName): MoveSlot{
        const move = this.dex[name];
        if(!move) throw new Error("Move not found: "+name);
        return {
            id: 0,
            move: this.GetMoveByName(name),
            cost: move.cost,
        }
    }

    GetMoveByName(name: string): Readonly<MoveData>{
        for (const move in this.dex) {
            if (this.dex[move].name === name) return this.dex[move];
        }
        throw new Error("Move not found: "+name);
    }
}
