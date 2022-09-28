import { PriorityQueue } from "@datastructures-js/priority-queue";
import {
  CharacterFragment,
  CharacterOnBuild,
  CharacterSystem,
} from "./character";
import { MarkFragment } from "./mark";
import { MoveFragment, MoveSlot, MoveSystem } from "./move";
import { EventListener } from "./eventListener";
import { ActionSystem } from "./action";
import { AngerSystem } from "./anger";
import { DamageAndHealSystem } from "./damage_heal";
import {
  EventDefaultPriority,
  compareEventPriority,
  Events,
  EventMove,
  EventType,
  EventDamage,
  EventSwitchCharacter,
} from "./event";
import { GameTypeDex } from "./typechart";

export type GameType = "single";

interface BattleOption {
  format?: string;
  formatid?: string;
  debug?: boolean;
  gameType: GameType;
  PRngSeed?: [number, number, number, number];
  side1Options: SideOption;
  side2Options: SideOption;
}

interface SideOption {
  name: string;
  elfbuild: CharacterOnBuild[];
}

export enum SideID {
  p1,
  p2,
}

export enum BattlePhase {
  BattleStart,
  Choose,
  BattleEnd,
}

export enum ChooseType {
  idle,
  Move,
  MoveClimax,
  SwitchCharacter,
  Surrender,
}

export interface ChooseOption {
  chooseType: ChooseType;
  target: CharacterFragment | null;
  move: MoveSlot | null;
}

export class Side {
  readonly Battle: Battle;
  readonly id: SideID;

  readonly name: string;

  character: CharacterFragment[]; // 数组第一个角色为当前在场角色

  choosen: ChooseOption | null;

  characterLeft: number;

  anger: number;

  constructor(battle: Battle, SideOption: SideOption, sideid: SideID) {
    this.Battle = battle;
    this.id = sideid;
    this.name = SideOption.name;
    this.character = new Array<CharacterFragment>(SideOption.elfbuild.length);
    for (let [index, elf] of SideOption.elfbuild.entries()) {
      this.character[index] = this.Battle.characterSystem.NewCharacter(elf);
    }
    this.characterLeft = this.character.length;
    this.choosen = null;
    this.anger = 20; //TODO: 可设置的初始怒气
  }

  choose(choose: ChooseOption) {
    this.choosen = choose;
  }

  cancleChoose() {
    this.choosen = null;
  }

  isReady() {
    return this.choosen !== null;
  }

  getchoose(): ChooseOption | null {
    return this.choosen;
  }
}

export class Battle {
  readonly actionSystem: ActionSystem;
  readonly eventListener: EventListener = new EventListener(this);
  readonly angerSystem: AngerSystem = new AngerSystem();
  readonly damageAndHealSystem: DamageAndHealSystem
  readonly moveSystem: MoveSystem;
  readonly characterSystem: CharacterSystem;

  readonly id: number;
  readonly debug: boolean;

  readonly gametype: GameType;
  readonly PRngSeed: [number, number, number, number];

  turn: number;
  state: BattlePhase;
  side: Side[];

  chosen: number;
  CharacterSystem: any;

  constructor(
    gametypeDex: GameTypeDex,
    battleOption: BattleOption,
    charactersystem: CharacterSystem,
    movesystem: MoveSystem,
    actionsystem:ActionSystem
  ) {
    this.id = 0;
    this.characterSystem = charactersystem;
    this.moveSystem = movesystem;
    this.actionSystem = actionsystem;
    this.damageAndHealSystem = new DamageAndHealSystem(gametypeDex);
    this.debug = battleOption.debug || false;
    this.gametype = "single";
    this.PRngSeed = battleOption.PRngSeed ?? [0, 0, 0, 0];
    this.state = BattlePhase.BattleStart;
    this.turn = 0;
    this.side = [];
    for (let side of [battleOption.side1Options, battleOption.side2Options]) {
      this.side.push(new Side(this, side, SideID.p1));
    }
    this.chosen = 0;
  }

  random(min: number, max: number): number {
    //TODO: seed
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  choose(sideID: SideID, chooseOption: ChooseOption): boolean {
    if (this.state !== BattlePhase.Choose) {
      return false;
    }
    this.side[sideID].choose(chooseOption);
    if (this.side[SideID.p1].isReady() && this.side[SideID.p2].isReady()) {
      this.commitDecision();
    }
    return true;
  }

  cancleChoose(sideID: SideID): boolean {
    if (this.state !== BattlePhase.Choose) {
      return false;
    }
    this.side[sideID].cancleChoose();
    return true;
  }

  commitDecision() {
    const queue = new PriorityQueue<Events>(compareEventPriority);
    for (const side of this.side) {
      let choose = side.getchoose();
      if (choose === null) {
        throw new Error("choose is null");
      }
      switch (choose.chooseType) {
        case ChooseType.Move:
          if (choose.target === undefined) {
            throw new Error("target is undefined");
          }
          if (choose.move === undefined || choose.move === null) {
            throw new Error("move is undefined");
          }
          queue.enqueue({
            type: EventType.TryUseMove,
            side: side,
            character: side.character[0],
            priority: EventDefaultPriority.TryUseMove,
            select: choose.move,
            cost: choose.move.cost,
          });
          break;
        case ChooseType.MoveClimax:
          if (choose.target === undefined) {
            throw new Error("target is undefined");
          }
          if (choose.move === undefined || choose.move === null) {
            throw new Error("move is undefined");
          }
          queue.enqueue({
            type: EventType.TryUseMove,
            side: side,
            character: side.character[0],
            priority: EventDefaultPriority.TryUseMove,
            select: choose.move,
            cost: choose.move.cost,
          });
          break;
        case ChooseType.SwitchCharacter:
          if (choose.target === undefined || choose.target === null) {
            throw new Error("target is undefined");
          }
          queue.enqueue({
            type: EventType.SwitchCharacter,
            side: side,
            character: side.character[0],
            priority: EventDefaultPriority.SwitchCharacter,
            target: choose.target,
          });
          break;
        case ChooseType.Surrender:
          //TODO: surrender
          return;
        default:
          throw new Error("chooseType is invalid");
      }
    }
    this.goTurn(queue);
  }

  goTurn(queue: PriorityQueue<Events>) {
    while (!queue.isEmpty()) {
      let event = queue.dequeue();
      if (event === null) {
        throw new Error("event is null");
      }
      switch (event.type) {
        case EventType.SwitchCharacter:
          this.actionSystem.switchCharacter(event.side, (event as EventSwitchCharacter).character);
        case EventType.TryUseMove:
          this.actionSystem.tryUseMove(queue,event.side,event.character,(event as EventMove).move);
          break;
        case EventType.CheckHit:
          this.actionSystem.checkHit(queue,event.side,event.character,(event as EventMove).move);
          break;
        case EventType.CheckCrit:
          this.actionSystem.checkCrit(queue,event.side,event.character,(event as EventMove).move);
          break;
        case EventType.Hit:
          this.actionSystem.hit(queue,event.side,event.character,(event as EventMove).move,(event as EventDamage).crit);
          break;
      }
    }

    //回合结束的流程
    for (const side of this.side){
      this.angerSystem.addAnger(side,20)
    }
    this.state = BattlePhase.Choose;
  }
}
