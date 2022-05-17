import { defineStore } from 'pinia'

import { getGoblins } from "@/api/goblin"
import type { GoblinsInterface } from '@/common/interfaces'


export const useGoblinsStore = defineStore({
  id: 'goblins',
  state: () => ({
    goblins: <GoblinsInterface[]>[],
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
