import { CharacterSystem } from "./character";
import { Battle,BattleOption,Side,SideID } from "./entity/battle";
import { CharacterEntity, NatureDex} from "./entity/character";
import { MoveSlot } from "./entity/move";
import { compareEventPriority, EventDamage, EventDefaultPriority, EventMove, Events, EventSwitchCharacter, EventType } from "./event";
import { NatureSystem } from "./nature";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import { ActionSystem } from "./action";
import { AngerSystem } from "./anger";
import { RandomSystem } from "./random";
import { MoveSystem } from "./move";
import { MarkEntity } from "./entity/mark";

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
  target: CharacterEntity | null;
  move: MoveSlot | null;
}

export class BattleImpl implements Battle {
  Id: number;
  Debug: boolean;
  GameType: "single";
  PRngSeed: number;
  Side: Side[];
  Turn: number;
  mark: MarkEntity[];
  character: CharacterEntity[];
  constructor(
    Id: number,
    BattleOption: BattleOption,
    CharacterSystem: CharacterSystem,
  ){
    this.Id=Id;
    this.Debug=BattleOption.Debug;
    this.GameType=BattleOption.GameType;
    this.PRngSeed=BattleOption.PRngSeed;
    this.Side=[];
    this.Turn=0;
    this.mark=[];
    this.character=[];
    for(const [sideId,sideOption] of BattleOption.SideOptions.entries()){
      const side:Side={
      Id:sideId,
      name:sideOption.name,
      character:[],
      anger:BattleOption.StartAnger,
      characterLeft:sideOption.CharacterBuild.length,
    }
      for(const characterOption of sideOption.CharacterBuild){
        const character:CharacterEntity=CharacterSystem.NewCharacter(characterOption);
        side.character.push(character);
        this.character.push(character);
      }
      this.Side.push(side);
    }
  }
}

//处理用户输入，输出，以及承载回合逻辑的system
export class BattleSystem {
  readonly BattleOption: Readonly<BattleOption>;
  readonly Battle: Battle;

  readonly NatureDex:NatureDex
  readonly NatureSystem:NatureSystem
  readonly CharacterSystem:CharacterSystem
  readonly ActionSystem:ActionSystem
  readonly AngerSystem:AngerSystem
  readonly RandomSystem: RandomSystem;

  chosen: Map<SideID,ChooseOption>

  constructor(BattleOption: BattleOption,Battle: Battle) {
    this.BattleOption = BattleOption;
    this.Battle = Battle
  }

  choose(sideID: SideID, chooseOption: ChooseOption){
    this.chosen.set(sideID,chooseOption)
    if (this.chosen.size>=2){
      this.commitDecision()
    }
  }

  canclechoose(sideID:SideID){
    this.chosen.delete(sideID)
  }

  commitDecision(){
    if (this.chosen.size<2){
      throw new Error("not enough choose")
    }
    this.initTurn()
  }

  initTurn() {
    const queue = new PriorityQueue<Events>(compareEventPriority);
    const EvnetQueue = new Map<string, PriorityQueue<Events>>();
    for (const [sideId,choose] of this.chosen.entries()){ 
      if (choose === null) {
        throw new Error("choose is null");
      }
      const side = this.Battle.Side[sideId]
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
          const switchCharacterEvent = event as EventSwitchCharacter;
          this.ActionSystem.switchCharacter(switchCharacterEvent.side, switchCharacterEvent.newCharacter);
        case EventType.TryUseMove:
          this.ActionSystem.tryUseMove(queue,event.side,event.character,(event as EventMove).move);
          break;
        case EventType.CheckHit:
          this.ActionSystem.checkHit(queue,event.side,event.character,(event as EventMove).move);
          break;
        case EventType.CheckCrit:
          this.ActionSystem.checkCrit(queue,event.side,event.character,(event as EventMove).move);
          break;
        case EventType.Hit:
          this.ActionSystem.hit(queue,event.side,event.character,(event as EventMove).move,(event as EventDamage).crit);
          break;
      }
    }

    //回合结束的流程
    for (const side of this.Battle.Side){
      this.AngerSystem.addAnger(side,15)
    }
  }
}
