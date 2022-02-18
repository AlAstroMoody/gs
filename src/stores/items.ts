import { defineStore } from 'pinia'
export interface ItemsInterface {
  name: string,
  src: string,
  id: number,
}
export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: <ItemsInterface>[
      // temporary data, delete later
      { name: 'щит', src: './src/assets/images/armor.png', id: 0, level: 10 },
      { name: 'меч', src: './src/assets/images/armor.png', id: 1, level: 20 },
      { name: 'шлем', src: './src/assets/images/armor.png', id: 2, level: 10 },
      { name: 'сапоги', src: './src/assets/images/armor.png', id: 3, level: 20 },
      { name: 'перчатки', src: './src/assets/images/armor.png', id: 4, level: 10 },
      { name: 'щит2', src: './src/assets/images/armor.png', id: 5, level: 30 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 6, level: 10 },
      { name: 'перчатки1', src: './src/assets/images/armor.png', id: 7, level: 40 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 8, level: 70 },
      { name: 'щит4', src: './src/assets/images/armor.png', id: 9, level: 60 },
      { name: 'перчатки3', src: './src/assets/images/armor.png', id: 10, level: 110 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 11, level: 70 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 12, level: 70 },
      { name: 'щит5', src: './src/assets/images/armor.png', id: 13, level: 100 },
      { name: 'сапоги7', src: './src/assets/images/armor.png', id: 14, level: 150 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 15, level: 140 },
      { name: 'перчатки7', src: './src/assets/images/armor.png', id: 16, level: 130 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 17, level: 130 },
      { name: 'сапоги3', src: './src/assets/images/armor.png', id: 18, level: 200 },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 19, level: 0 },
    ],
  }),
  getters: {
    allItems: (state) => state.items,
  },
  actions: {
    getItems() {
      // here will receive data from server
    },
  },
})
