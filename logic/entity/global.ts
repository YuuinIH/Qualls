type GenderName = "" | "M" | "F" | "N"

type StatsTable = {[stat in StatID]?: number};
type StatIDExceptHP = 'atk' | 'def' | 'spa' | 'spd' | 'spe';
type StatID = 'hp' | StatIDExceptHP;

type EVS = StatIDExceptHP

type StatsExceptHPTable = {[stat in StatIDExceptHP]?: number};