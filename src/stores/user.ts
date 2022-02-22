import { defineStore } from 'pinia'

import type { ItemsInterface } from '@/common/interfaces'


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
