import { defineStore } from 'pinia'

import { getGoblins } from "@/api/goblin"


export const useGoblinsStore = defineStore({
  id: 'goblins',
  state: () => ({
    goblins: [],
  }),
  getters: {
    allGoblins: (state) => state.goblins,
  },
  actions: {
    async getGoblins() {
      this.goblins = await getGoblins()
    },
  },
})
