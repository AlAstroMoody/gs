import { defineStore } from 'pinia'

import { goblinClass, MainParams } from '@/common/enums'
import type { GoblinsInterface } from '@/common/interfaces'


export const useGoblinsStore = defineStore({
  id: 'goblins',
  state: () => ({
    goblins: <GoblinsInterface[]>[
      // temporary data, delete later
      {
        name: goblinClass.STALKER,
        src: '/src/assets/images/armor.png',
        id: 0,
        mainParam: MainParams.STRENGTH,
        stats: { strength: 15, agility: 20, intelligence: 10 },
      },
      {
        name: goblinClass.PYROMANIAC,
        src: '/src/assets/images/armor.png',
        id: 1,
        mainParam: MainParams.STRENGTH,
        stats: { strength: 15, agility: 10, intelligence: 20 },
      },
      {
        name: goblinClass.ROCKET,
        src: '/src/assets/images/armor.png',
        id: 2,
        mainParam: MainParams.STRENGTH,
        stats: { strength: 20, agility: 10, intelligence: 10 },
      },
      {
        name: goblinClass.ENGINEER,
        src: '/src/assets/images/armor.png',
        id: 3,
        mainParam: MainParams.INTELLIGENCE,
        stats: { strength: 15, agility: 20, intelligence: 10 },
      },
      {
        name: goblinClass.MEDIC,
        src: '/src/assets/images/armor.png',
        id: 4,
        mainParam: MainParams.INTELLIGENCE,
        stats: { strength: 20, agility: 10, intelligence: 10 },
      },
      {
        name: goblinClass.EXPLODER,
        src: '/src/assets/images/armor.png',
        id: 5,
        mainParam: MainParams.INTELLIGENCE,
        stats: { strength: 15, agility: 20, intelligence: 10 },
      },
      {
        name: goblinClass.SNIPER,
        src: '/src/assets/images/armor.png',
        id: 6,
        mainParam: MainParams.AGILITY,
        stats: { strength: 15, agility: 10, intelligence: 20 },
      },
      {
        name: goblinClass.GUNNER,
        src: '/src/assets/images/armor.png',
        id: 7,
        mainParam: MainParams.AGILITY,
        stats: { strength: 15, agility: 20, intelligence: 10 },
      },
    ],
  }),
  getters: {
    allGoblins: (state) => state.goblins,
  },
  actions: {
    getGoblins() {
      // here will receive data from server
    },
  },
})
