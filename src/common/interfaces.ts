export interface GoblinsInterface {
  class: string,
  mainParam: string,
  id: number,
  src: string,
  name: string,
}

export interface ItemsInterface {
  name: string,
  src: string,
  id: number,
  level?: number,
  class: number[],
  parents?: number[],
  children?: number[],
}

export interface CommonSelect {
  name: string,
  id?: number
}