import { Battle } from "./battle";
import { Elf } from "./elves";

export interface CommonEventHandle{
    
}

export interface EventMethod{
    onBeforeTurn?: (this:Battle, turn:number)=>void;
    onBeforeHit?: (this:Battle, target:Elf, move:string, damage:number)=>void;
    onDamageHit?:(this:Battle, damage:number,target:Elf,source:Elf)=>void;
}