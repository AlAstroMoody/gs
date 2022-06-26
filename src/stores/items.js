import { defineStore } from 'pinia'

import { getItems } from '@/api/items'

export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    items: [],
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
