import { PriorityQueue } from "@datastructures-js/priority-queue";
import { AngerSystem } from "./anger";
import { Side } from "./battle";
import { CharacterFragment, CharacterSystem } from "./character";
import { Events, EventType, EventDefaultPriority } from "./event";
import { MoveFragment, MoveSystem } from "./move";
import { DamageAndHealSystem } from "./damage_heal";

//管理实际操作的组件
export class ActionSystem {
  readonly Battle: Battle;
  readonly CharacterSystem: CharacterSystem;
  readonly MoveSystem: MoveSystem;
  readonly AngerSystem: AngerSystem;
  readonly DamageAndHealSystem: DamageAndHealSystem;

  constructor(Battle:Battle,CharacterSystem: CharacterSystem, MoveSystem: MoveSystem,AngerSystem:AngerSystem,DamageAneHealSystem:DamageAndHealSystem) {
    this.Battle=Battle;
    this.CharacterSystem = CharacterSystem;
    this.MoveSystem = MoveSystem;
    this.AngerSystem = AngerSystem;
    this.DamageAndHealSystem = DamageAneHealSystem;
  }
  switchCharacter(
    side: Side,
    target: CharacterFragment
  ){
    if (target===side.character[0]){
        return
    }
    for (let i=0;i<side.character.length;i++){
        if (side.character[i]===target){
            [side.character[0],side.character[i]]=[side.character[i],side.character[0]]
            return;
        }
    }
    throw new Error("switchCharacter: target not found");
  }

  //检查是否存在一些限制性的效果导致无法正常使用技能。
  tryUseMove(
    queue: PriorityQueue<Events>,
    side: Side,
    character: CharacterFragment,
    move: MoveFragment
  ) {
    if (move.cost > side.anger) {
      return false;
    }
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
    queue: PriorityQueue<Events>,
    side: Side,
    character: CharacterFragment,
    move: MoveFragment
  ){
    let randomnumber = this.Battle.random(0, 100);
    if (randomnumber > move.accuracy) {
      return false;
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
    queue: PriorityQueue<Events>,
    side: Side,
    character: CharacterFragment,
    move: MoveFragment
  ){
    let randomnumber = this.Battle.random(0, 100);
    //TODO: 可变的暴击率
    let iscrit = randomnumber < 5;
    if (randomnumber > 5) {
      return false;
    }
    queue.enqueue({
      type: EventType.Damage,
      side: side,
      character: character,
      priority: EventDefaultPriority.Damage,
      move: move,
      crit: iscrit
    });
    return true;
  }
    hit(
        queue: PriorityQueue<Events>,
        side: Side,
        character: CharacterFragment,
        move: MoveFragment,
        crit: boolean
    ){
        if (move.category!="status"){
            this.DamageAndHealSystem.damage(character,move.target,move,crit);
        }
        //TODO:追加效果
        return true;
    }
}
