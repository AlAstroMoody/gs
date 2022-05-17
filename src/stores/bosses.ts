import { defineStore } from 'pinia'

import { getBosses } from "@/api/boss"
import type { BossInterface } from '@/common/interfaces'


export const useBossStore = defineStore({
  id: 'bosses',
  state: () => ({
    bosses: <BossInterface[]>[],
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
