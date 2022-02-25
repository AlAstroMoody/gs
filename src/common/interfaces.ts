export interface GoblinsInterface {
  class: string,
  mainParam: string,
  id: number,
  src: string,
  name: string,
  description: string
  stats: ParamsInterface
}

export interface ParamsInterface {
  strength: number,
  agility: number,
  intelligence: number
}

export interface ItemsInterface {
  name: string,
  src: string,
  id: number,
  level?: number,
  class: number[],
  parents?: number[],
  children?: number[],
  stats?: ParamsInterface
}

export interface CommonSelect {
  name: string,
  id?: number
}