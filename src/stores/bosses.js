import { defineStore } from 'pinia'

import { getBosses } from '@/api/boss'

export const useBossStore = defineStore({
  id: 'bosses',
  state: () => ({
    bosses: [],
  }),
  getters: {
    allBosses: (state) => state.bosses,
  },
  actions: {
    async getBosses() {
      this.bosses = await getBosses()
    },
  },
})
