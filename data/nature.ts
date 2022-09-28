import { NatureDex } from "@/nature";

export enum NatureName {
  Hardy="Hardy",
  Lonely="Lonely",
  Adamant="Adamant",
  Naughty="Naughty",
  Brave="Brave",
  Bold="Bold",
  Docile="Docile",
  Impish="Impish",
  Lax="Lax",
  Relaxed="Relaxed",
  Modest="Modest",
  Mild="Mild",
  Bashful="Bashful",
  Rash="Rash",
  Quiet="Quiet",
  Clam="Clam",
  Gentle="Gentle",
  Careful="Careful",
  Quirky="Quirky",
  Sassy="Sassy",
  Timid="Timid",
  Hasty="Hasty",
  Jolly="Jolly",
  Naive="Naive",
  Serious="Serious",

  Arrogant="Arrogant",
  Candor="Candor",
  Eccentric="Eccentric",
  Wild="Wild",
  Pure="Pure",
  Tender="Tender",
  Vivid="Vivid",
  Merciful="Merciful",
  Gloomy="Gloomy",
  Lovely="Lovely",
}

export const NatureData: NatureDex = {
  [NatureName.Hardy]: {
    Id: NatureName.Hardy,
    Name: "勤奋",
    StatAffect: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  },
  [NatureName.Lonely]: {
    Id: NatureName.Lonely,
    Name: "孤僻",
    StatAffect: { atk: 1.1, def: 0.9, spa: 1, spd: 1, spe: 1 },
  },
  [NatureName.Adamant]: {
    Id: NatureName.Adamant,
    Name: "固执",
    StatAffect: { atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1 },
  },
  [NatureName.Naughty]: {
    Id: NatureName.Naughty,
    Name: "顽皮",
    StatAffect: { atk: 1.1, def: 1, spa: 1, spd: 0.9, spe: 1 },
  },
  [NatureName.Brave]: {
    Id: NatureName.Brave,
    Name: "勇敢",
    StatAffect: { atk: 1.1, def: 1, spa: 1, spd: 1, spe: 0.9 },
  },
  [NatureName.Bold]: {
    Id: NatureName.Bold,
    Name: "大胆",
    StatAffect: { atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1 },
  },
  [NatureName.Docile]: {
    Id: NatureName.Docile,
    Name: "坦率",
    StatAffect: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  },
  [NatureName.Impish]: {
    Id: NatureName.Impish,
    Name: "淘气",
    StatAffect: { atk: 0.9, def: 1.1, spa: 0.9, spd: 1, spe: 1 },
  },
  [NatureName.Lax]: {
    Id: NatureName.Lax,
    Name: "乐天",
    StatAffect: { atk: 0.9, def: 1.1, spa: 1, spd: 0.9, spe: 1 },
  },
  [NatureName.Relaxed]: {
    Id: NatureName.Relaxed,
    Name: "悠闲",
    StatAffect: { atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 0.9 },
  },
  [NatureName.Modest]: {
    Id: NatureName.Modest,
    Name: "内敛",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1.1, spd: 1, spe: 1 },
  },
  [NatureName.Mild]: {
    Id: NatureName.Mild,
    Name: "慢吞吞",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1.1, spd: 1, spe: 1 },
  },
  [NatureName.Bashful]: {
    Id: NatureName.Bashful,
    Name: "害羞",
    StatAffect: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  },
  [NatureName.Rash]: {
    Id: NatureName.Rash,
    Name: "马虎",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1.1, spd: 0.9, spe: 1 },
  },
  [NatureName.Quiet]: {
    Id: NatureName.Quiet,
    Name: "冷静",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1.1, spd: 1, spe: 0.9 },
  },
  [NatureName.Clam]: {
    Id: NatureName.Clam,
    Name: "温和",
    StatAffect: { atk: 0.9, def: 0.9, spa: 0.9, spd: 1.1, spe: 1 },
  },
  [NatureName.Gentle]: {
    Id: NatureName.Gentle,
    Name: "温顺",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1, spd: 1.1, spe: 1 },
  },
  [NatureName.Careful]: {
    Id: NatureName.Careful,
    Name: "慎重",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1, spd: 1.1, spe: 1 },
  },
  [NatureName.Quirky]: {
    Id: NatureName.Quirky,
    Name: "浮躁",
    StatAffect: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  },
  [NatureName.Sassy]: {
    Id: NatureName.Sassy,
    Name: "自大",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1, spd: 0.9, spe: 1.1 },
  },
  [NatureName.Timid]: {
    Id: NatureName.Timid,
    Name: "胆小",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1, spd: 1, spe: 1.1 },
  },
  [NatureName.Hasty]: {
    Id: NatureName.Hasty,
    Name: "急躁",
    StatAffect: { atk: 0.9, def: 1, spa: 1, spd: 0.9, spe: 1.1 },
  },
  [NatureName.Jolly]: {
    Id: NatureName.Jolly,
    Name: "爽朗",
    StatAffect: { atk: 0.9, def: 1, spa: 1, spd: 1, spe: 1.1 },
  },
  [NatureName.Naive]: {
    Id: NatureName.Naive,
    Name: "天真",
    StatAffect: { atk: 1, def: 0.9, spa: 1, spd: 0.9, spe: 1.1 },
  },
  [NatureName.Serious]: {
    Id: NatureName.Serious,
    Name: "认真",
    StatAffect: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
  },

  [NatureName.Arrogant]: {
    Id: NatureName.Arrogant,
    Name: "孤傲",
    StatAffect: { atk: 1.1, def: 1.1, spa: 0.9, spd: 0.9, spe: 1 },
  },

  [NatureName.Candor]: {
    Id: NatureName.Candor,
    Name: "直率",
    StatAffect: { atk: 1.1, def: 0.9, spa: 1.1, spd: 0.9, spe: 1 },
  },

  [NatureName.Eccentric]: {
    Id: NatureName.Eccentric,
    Name: "古怪",
    StatAffect: { atk: 1.1, def: 0.9, spa: 0.9, spd: 1.1, spe: 1 },
  },

  [NatureName.Wild]: {
    Id: NatureName.Wild,
    Name: "狂野",
    StatAffect: { atk: 1.1, def: 0.9, spa: 1, spd: 0.9, spe: 1.1 },
  },
  [NatureName.Pure]: {
    Id: NatureName.Pure,
    Name: "清纯",
    StatAffect: { atk: 0.9, def: 1.1, spa: 1.1, spd: 0.9, spe: 1 },
  },
  [NatureName.Tender]: {
    Id: NatureName.Tender,
    Name: "温柔",
    StatAffect: { atk: 0.9, def: 1.1, spa: 0.9, spd: 1.1, spe: 1 },
  },
  [NatureName.Vivid]: {
    Id: NatureName.Vivid,
    Name: "活泼",
    StatAffect: { atk: 0.9, def: 1.1, spa: 0.9, spd: 1, spe: 1.1 },
  },
  [NatureName.Merciful]: {
    Id: NatureName.Merciful,
    Name: "温柔",
    StatAffect: { atk: 0.9, def: 0.9, spa: 1.1, spd: 1.1, spe: 1 },
  },
  [NatureName.Gloomy]: {
    Id: NatureName.Gloomy,
    Name: "忧郁",
    StatAffect: { atk: 1, def: 0.9, spa: 1.1, spd: 0.9, spe: 1.1 },
  },
  [NatureName.Lovely]: {
    Id: NatureName.Lovely,
    Name: "可爱",
    StatAffect: { atk: 0.9, def: 1, spa: 0.9, spd: 1.1, spe: 1.1 },
  },
};
