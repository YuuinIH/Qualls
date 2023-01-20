import { PriorityQueue } from "@datastructures-js/priority-queue";
import { AngerSystem } from "./anger";
import { CharacterSystem } from "./character";
import { Event, EventType, EventDefaultPriority } from "./event";
import { MoveSystem } from "./move";
import { DamageAndHealSystem } from "./damage_heal";
import { Battle, BattleOption, Side } from "./entity/battle";
import { CharacterEntity } from "./entity/character";
import { MoveEvent } from "./entity/move";
import { RandomSystem } from "./random";

//管理实际操作的组件
export class ActionSystem {
  readonly Battle: Battle;
  readonly BattleOption: Readonly<BattleOption>;
  readonly CharacterSystem: CharacterSystem;
  readonly MoveSystem: MoveSystem;
  readonly AngerSystem: AngerSystem;
  readonly DamageAndHealSystem: DamageAndHealSystem;
  readonly RandomSystem: RandomSystem;

  constructor(
    Battle: Battle,
    BattleOption: BattleOption,
    CharacterSystem: CharacterSystem,
    MoveSystem: MoveSystem,
    AngerSystem: AngerSystem,
    DamageAneHealSystem: DamageAndHealSystem
  ) {
    this.Battle = Battle;
    this.BattleOption = BattleOption;
    this.CharacterSystem = CharacterSystem;
    this.MoveSystem = MoveSystem;
    this.AngerSystem = AngerSystem;
    this.DamageAndHealSystem = DamageAneHealSystem;
  }
  switchCharacter(side: Side, target: CharacterEntity) {
    if (target === side.character[0]) {
      return;
    }
    for (let i = 0; i < side.character.length; i++) {
      if (side.character[i] === target) {
        [side.character[0], side.character[i]] = [
          side.character[i],
          side.character[0],
        ];
        this.AngerSystem.costAngerPercent(
          side,
          this.BattleOption.SwitchCostPercent
        );
        return;
      }
    }
    throw new Error("switchCharacter: target not found");
  }

  //检查是否存在一些限制性的效果导致无法正常使用技能。
  tryUseMove(
    queue: PriorityQueue<Event>,
    side: Side,
    character: CharacterEntity,
    move: MoveEvent
  ) {
    if (!this.AngerSystem.costAnger(side, move.cost)) {
      return false;
    }
    queue.enqueue({
      type: EventType.CheckHit,
      side: side,
      character: character,
      target: move.target,
      priority: EventDefaultPriority.CheckHit,
      move: move,
    });
    return true;
  }
  checkHit(
    queue: PriorityQueue<Event>,
    side: Side,
    character: CharacterEntity,
    move: MoveEvent
  ) {
    if (!move.original.ignoreAccuracy) {
      const right = move.accuracy * character.accuracy * move.target.accuracy;
      if (this.RandomSystem.Bool(right)) {
        return false;
      }
    }
    queue.enqueue({
      type: EventType.CheckCrit,
      side: side,
      character: character,
      priority: EventDefaultPriority.CheckCrit,
      move: move,
    });
    return true;
  }
  checkCrit(
    queue: PriorityQueue<Event>,
    side: Side,
    character: CharacterEntity,
    move: MoveEvent
  ) {
    let crit = false;
    if (!move.original.alwayCrit) {
      if (this.RandomSystem.Bool(move.critRate)) {
        crit = true;
      }
    }
    queue.enqueue({
      type: EventType.Damage,
      side: side,
      character: character,
      priority: EventDefaultPriority.Damage,
      move: move,
      crit: true,
    });
    return true;
  }
  hit(
    queue: PriorityQueue<Event>,
    side: Side,
    character: CharacterEntity,
    move: MoveEvent,
    crit: boolean
  ) {
    if (move.category != "status") {
      this.DamageAndHealSystem.damage(character, move.target, move, crit);
    }
    //TODO:追加效果
    return true;
  }
}
