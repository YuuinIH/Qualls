import { Logger } from "log4js";

export class Battle {
  logger: Logger;

  constructor(public readonly payload: BattlePayload) {}
}

export class BattlePayload {
  seed: string;
  mode: string;
}
