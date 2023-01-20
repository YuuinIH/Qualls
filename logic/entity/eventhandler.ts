import { EventMove, EventQueue } from "@/event";
import { Side } from "./battle";
import { BattleSystem } from "@/battle";
import { CharacterEntity } from "./character";
import { MarkEntity } from "./mark";
import { MoveEvent, MoveSlot } from "./move";

export interface EventObserver {
    onBattleStart?(battle:BattleSystem,queue:EventQueue): void;
    onBattleEnd?(battle:BattleSystem,queue:EventQueue): void;
    onTurnStart?(battle:BattleSystem,queue:EventQueue): void;
    onTurnEnd?(battle:BattleSystem,queue:EventQueue,source:MarkEntity): void;
    onSideTurnStart?(battle:BattleSystem,queue:EventQueue,side: Side): void;
    onSideTurnEnd?(battle:BattleSystem,queue:EventQueue,side: Side): void;

    onCharacterMove?(battle:BattleSystem,queue:EventQueue,source:MarkEntity|EventMove,character: CharacterEntity, move: MoveSlot): void;
    onCharacterMoveClimax?(battle:BattleSystem,queue:EventQueue,source:MarkEntity|EventMove,character: CharacterEntity, move: MoveSlot): void;

    onCharacterSwitch?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, target: CharacterEntity): void;
    onCharacterBeSwitched?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, target: CharacterEntity): void;

    onCharacterDamage?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, damage: number): void;
    onCharacterBeDamage?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, damage: number): void;

    onCharacterHit?(battle:BattleSystem,queue:EventQueue,source:MarkEntity|EventMove,character: CharacterEntity, moveEvent:MoveEvent): void;
    onCharacterBeHit?(battle:BattleSystem,queue:EventQueue,source:MarkEntity|EventMove,character: CharacterEntity, moveEvent:MoveEvent): void;

    onCharacterCrit?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, moveEvent:MoveEvent): void;
    onCharacterBeCrit?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, moveEvent:MoveEvent): void;

    onCharacterHeal?(battle:BattleSystem,queue:EventQueue,character: CharacterEntity, moveEvent:MoveEvent): void;

    onSideAngerChange?(battle:BattleSystem,queue:EventQueue,side: Side, anger: number): void;
    onSideAngerFull?(battle:BattleSystem,queue:EventQueue,side: Side): void;
    onSideAngerEmpty?(battle:BattleSystem,queue:EventQueue,side: Side): void;
    onSideAngerReset?(battle:BattleSystem,queue:EventQueue,side: Side): void;
    onSideAngerUse?(battle:BattleSystem,queue:EventQueue,side: Side, anger: number): void;
    onSideAngerGain?(battle:BattleSystem,queue:EventQueue,side: Side, anger: number): void;
    onSideAngerLose?(battle:BattleSystem,queue:EventQueue,side: Side, anger: number): void;
    onSideAngerOverflow?(battle:BattleSystem,queue:EventQueue,side: Side, anger: number): void;
    onSideAngerChange?(battle:BattleSystem,queue:EventQueue,side: Side, anger: number): void;

    onMarkCreate?(battle:BattleSystem,queue:EventQueue,mark: MarkEntity): void;
    onMarkDestroy?(battle:BattleSystem,queue:EventQueue,mark: MarkEntity): void;
}

export type EventHandler = (battle:BattleSystem,queue:EventQueue,source:MarkEntity|EventMove,character: CharacterEntity, move: MoveSlot)=>void;

export type KeyOfEvents = {
    [K in keyof EventObserver]: K extends `on${string}` ? K : EventHandler;
}

export type EventObserverWithPriority = {
    [K in keyof KeyOfEvents]: {
        priority: number;
        observer: EventHandler;
    }
}

