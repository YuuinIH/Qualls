type GenderName = "" | "M" | "F" | "N"

type Battle = import("./battle").Battle

type MoveData = import("./moves").MoveData


type Side = import("./battle").Side

type Mark = import("./mark").MarkFragment

type StatsTable = {[stat in StatID]: number};
type StatIDExceptHP = 'atk' | 'def' | 'spa' | 'spd' | 'spe';
type StatID = 'hp' | StatIDExceptHP;

type EVS = StatIDExceptHP

type StatsExceptHPTable = {[stat in StatIDExceptHP]: number};