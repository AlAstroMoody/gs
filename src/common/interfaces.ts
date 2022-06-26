export interface GoblinsInterface {
  id: number,
  src: string,
  name: string,
  description: string,
  stats: ParamsInterface,
  mainParam: string,
}

export interface BossInterface {
  id: number,
  name: string,
  image: string,
  wave: number,
  items: ItemsInterface[],
}

export interface ParamsInterface {
  strength: number,
  agility: number,
  intelligence: number,
  attack: number,
  defence: number,
  visibility: number,
  luck: number,
  hp: number,
  mp: number,
  resist: number,
  hp_regeneration: number,
  mp_regeneration: number,
  stealth_detection: number,
  as: number,
  ms: number,
}

export interface ItemsInterface {
  name: string,
  description: string,
  src: string,
  id: number,
  level?: number,
  goblins: [],
  parents?: [ItemRelative],
  children?: [ItemRelative],
  params?: ParamsInterface
}

export interface ItemRelative {
  id: number,
  name: string
}

export interface CommonSelect {
  name: string,
  id?: number
}