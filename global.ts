type GenderName = "" | "M" | "F" | "N"

type Battle = import("./battle").Battle

type ElvesSpecies = import("./elves").ElvesSpecies

type Move = import("./moves").MoveData

type Elf = import("./elves").Elf
type ElfOnBuild = import("./elves").ElfOnBuild

type Side = import("./battle").Side

type Mark = import("./mark").Mark

type StatsTable = {[stat in StatID]: number};
type StatIDExceptHP = 'atk' | 'def' | 'spa' | 'spd' | 'spe';
type StatID = 'hp' | StatIDExceptHP;
type StatsExceptHPTable = {[stat in StatIDExceptHP]: number};