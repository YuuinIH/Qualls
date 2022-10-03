import {MersenneTwister19937 as mt,integer,bool,dice} from "random-js"

export class RandomSystem{
    seed: number;
    private ram:mt

    constructor(seed?: number){
        if (seed === undefined) {
            this.seed = Math.floor(Math.random() * 1000000);
        }
        else {
            this.seed = seed;
        }
        this.ram = mt.seed(this.seed);
    }

    // Return a random integer between min and max (both inclusive)
    Int(min: number, max: number): number {
        return integer(min, max)(this.ram);
    }

    Bool(percent?:number): boolean {
        return bool(percent)(this.ram);
    }

    Dice(diceCount: number, diceSize: number): number[] {
        return dice(diceCount, diceSize)(this.ram);
    }
}