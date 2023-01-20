import { CharacterEntity } from "@/entity/character";
import { MarkEntity, MarkSpecies } from "@/entity/mark";
import { MoveEvent } from "@/entity/move";
import { EventQueue, EventType } from "@/event";

export const MarkDex: { [MarkName: string]: MarkSpecies } = {
  burn: {
    id: "burn",
    name: "燃烧",
    unstable: true,
    stackable: false,
    hasRemainTurn: true,
    description: "攻击力减半。回合结束时候，受到1/8的最大生命值的伤害",
    isNegativeStatus: true,
    isNegative: true,
    eventObserver: [
      {
        priority: 0,
        onTurnEnd: (_, eventQueue, mark) => {
          eventQueue.push({
            type: EventType.Damage,
            source: mark,
            target: mark.owner,
            damage: mark.owner.maxhp / 8,
          });
        },
      },
    ],
    statEffect: [
      {
        atk: -0.5,
      },
    ],
  },
  poison: {
    id: "poison",
    name: "中毒",
    unstable: true,
    stackable: false,
    hasRemainTurn: true,
    description: "回合结束时候，受到1/8的最大生命值的伤害",
    isNegativeStatus: true,
    isNegative: true,
    eventObserver: [
      {
        priority: 0,
        onTurnEnd: (_,eventQueue, mark) => {
          eventQueue.push({
            type: EventType.Damage,
            source: mark,
            target: mark.owner,
            damage: mark.owner.maxhp / 8,
          });
        },
      },
    ],
  },
  sleep: {
    id: "sleep",
    name: "睡眠",
    unstable: true,
    stackable: false,
    hasRemainTurn: true,
    description: "无法行动",
    isNegativeStatus: true,
    isNegative: true,
    eventObserver: [
      {
        priority: 0,
        onCharacterMove(queue, source, character, move) {
          //todo: 无法行动
          return false;
        },
      },
    ],
  },
  freeze: {
    id: "freeze",
    name: "冻结",
    unstable: true,
    stackable: false,
    hasRemainTurn: true,
    description: "无法行动",
    isNegativeStatus: true,
    isNegative: true,
    eventObserver: [
      {
        priority: 0,
        onCharacterMove(queue, source, character, move) {
          //todo: 无法行动
          return false;
        },
      },
    ],
  },
  stun: {
    id: "stun",
    name: "眩晕",
    unstable: true,
    stackable: false,
    hasRemainTurn: true,
    description: "无法行动",
    isNegativeStatus: true,
    isNegative: true,
    eventObserver: [
      {
        priority: 0,
        onCharacterMove(queue, source, character, move) {},
      },
    ],
  },
  paralysis: {
    id: "paralysis",
    name: "麻痹",
    unstable: true,
    stackable: false,
    hasRemainTurn: true,
    description: "速度减半，有一定几率无法行动",
    isNegativeStatus: true,
    isNegative: true,
    eventObserver: [
      {
        priority: 0,
        onCharacterMove(battle) {
            if (battle.RandomSystem.Bool(0.5)) {
                return false;
            }
            return true
        },
      },
    ],
    statEffect: [
      {
        spd: -0.5,
      },
    ],
  },
  yishang: {
    id: "yishang",
    name: "易伤",
    unstable: false,
    stackable: false,
    hasRemainTurn: false,
    description: "受到的伤害增加50%",
    isNegativeStatus: true,
    isNegative: true,

    beDamageMultiplier: 1.5,
  },
  yanggong: {
    id: "yanggong",
    name: "佯攻",
    unstable: false,
    stackable: false,
    hasRemainTurn: false,
    description: "下一个除“佯攻”以外的技能增加50点威力",
    eventObserver: [
      {
        priority: 0,
        onCharacterHit(_,_queue, source, _character, moveEvent) {
          if (moveEvent.original.id != "yanggong") {
            moveEvent.basePower += 50;
            (source as MarkEntity).destroyed = true;
          }
        },
      },
    ],
  },
};
