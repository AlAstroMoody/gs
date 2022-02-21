import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    inventory: [

    ],
  }),
  getters: {
    userInventory: (state) => state.inventory,
  },
  actions: {
    addItem(item) {
      this.inventory.push(item)
    }
  },
})
