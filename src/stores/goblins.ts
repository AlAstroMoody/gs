import { defineStore } from 'pinia'
import type { GoblinsInterface } from '@/stores/interfaces'
import { goblinClass, MainParams } from './enums'


export const useGoblinsStore = defineStore({
  id: 'goblins',
  state: () => ({
    goblins: <GoblinsInterface>[
      // temporary data, delete later
      { name: goblinClass.STALKER, src: './src/assets/images/armor.png', id: 0, mainParam: MainParams.STRENGTH },
      { name: goblinClass.PYROMANIAC, src: './src/assets/images/armor.png', id: 1, mainParam: MainParams.STRENGTH },
      { name: goblinClass.ROCKET, src: './src/assets/images/armor.png', id: 2, mainParam: MainParams.STRENGTH },
      { name: goblinClass.ENGINEER, src: './src/assets/images/armor.png', id: 3, mainParam: MainParams.INTELLIGENCE },
      { name: goblinClass.MEDIC, src: './src/assets/images/armor.png', id: 4, mainParam: MainParams.INTELLIGENCE },
      { name: goblinClass.EXPLODER, src: './src/assets/images/armor.png', id: 5, mainParam: MainParams.INTELLIGENCE },
      { name: goblinClass.SNIPER, src: './src/assets/images/armor.png', id: 6, mainParam: MainParams.AGILITY },
      { name: goblinClass.GUNNER, src: './src/assets/images/armor.png', id: 7, mainParam: MainParams.AGILITY },
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
