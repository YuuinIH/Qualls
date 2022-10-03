import { CharacterEntity,CharacterOnBuild } from "./character";
import { MarkEntity } from "./mark";

export interface BattleOption {
  Format?: string;
  Formatid?: string;
  Debug?: boolean;
  GameType: GameType;//游戏类型
  PRngSeed?: number;//随机数种子
  SideOptions: [SideOption, SideOption];

  StartAnger: number;//初始怒气
  AngerAddperTurn?: number;//每回合增加的愤怒值 默认为15
  SwitchCostPercent?: number;//每次换精灵的愤怒值消耗百分比 默认为20
  MaxStatusConditionHpCost?: number;//异常状态可以造成的最大伤害
  MaxStatusConditionHpCostPercent?: number;//异常状态可以造成的最大伤害百分比
}

export interface SideOption {
  name: string;
  CharacterBuild: CharacterOnBuild[];
}

export type GameType = "single";

export enum SideID {
    p1,
    p2,
}

export type Side = {
  readonly Id: SideID;
  readonly name: string;

  character: CharacterEntity[]; // 数组第一个角色为当前在场角色

  characterLeft: number;

  anger: number;
}

export type Battle = {
  readonly Id: number;
  readonly Debug: boolean;

  readonly GameType: GameType;
  readonly PRngSeed: number;

  Side: Side[];
  Turn: number;

  readonly mark: MarkEntity[];
  readonly character: CharacterEntity[];
}
