import { defineStore } from 'pinia'
import type { ItemsInterface } from '@/stores/interfaces'

export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: <ItemsInterface>[
      // temporary data, delete later
      { name: 'щит', src: './src/assets/images/armor.png', id: 0, level: 10, class: [4] },
      { name: 'меч', src: './src/assets/images/armor.png', id: 1, level: 20, class: [5] },
      { name: 'шлем', src: './src/assets/images/armor.png', id: 2, level: 10, class: [2] },
      { name: 'сапоги', src: './src/assets/images/armor.png', id: 3, level: 20, class: [2] },
      { name: 'перчатки', src: './src/assets/images/armor.png', id: 4, level: 10, class: [6] },
      { name: 'щит2', src: './src/assets/images/armor.png', id: 5, level: 30, class: [2] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 6, level: 10, class: [0] },
      { name: 'перчатки1', src: './src/assets/images/armor.png', id: 7, level: 40, class: [5] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 8, level: 70, class: [0] },
      { name: 'щит4', src: './src/assets/images/armor.png', id: 9, level: 60, class: [0] },
      { name: 'перчатки3', src: './src/assets/images/armor.png', id: 10, level: 110, class: [1, 3] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 11, level: 70, class: [0] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 12, level: 70, class: [2] },
      { name: 'щит5', src: './src/assets/images/armor.png', id: 13, level: 100, class: [1, 3] },
      { name: 'сапоги7', src: './src/assets/images/armor.png', id: 14, level: 150, class: [1, 2] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 15, level: 140, class: [1, 2] },
      { name: 'перчатки7', src: './src/assets/images/armor.png', id: 16, level: 130, class: [1, 2] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 17, level: 130, class: [1, 2] },
      { name: 'сапоги3', src: './src/assets/images/armor.png', id: 18, level: 200, class: [1, 2] },
      { name: 'оружие', src: './src/assets/images/armor.png', id: 19, level: 0, class: [2] },
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
