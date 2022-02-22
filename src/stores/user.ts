import { defineStore } from 'pinia'

import type { ItemsInterface } from '@/stores/interfaces'


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    inventory: <ItemsInterface[]>[

    ],
  }),
  getters: {
    userInventory: (state) => state.inventory,
  },
  actions: {
    addItem(item: ItemsInterface) {
      this.inventory.push(item)
    }
  },
})
