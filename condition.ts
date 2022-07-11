import { Battle } from "./battle";
import { Elf } from "./elves";

export interface EventMethod{
    onDamageHit?:(this:Battle, damage:number,target:Elf,source:Elf)=>void;
}