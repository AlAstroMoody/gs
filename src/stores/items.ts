import { defineStore } from 'pinia'

import { getItems } from "@/api/items"
import type { ItemsInterface } from '@/common/interfaces'


export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: <ItemsInterface[]>[],
  }),
  getters: {
    allItems: (state) => state.items,
  },
  actions: {
    async getItems() {
      this.items = await getItems()
    },
  },
})
