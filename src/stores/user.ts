import { defineStore } from 'pinia'

import type { GoblinsInterface, ItemsInterface } from '@/common/interfaces'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    inventory: <ItemsInterface[]>[],
    goblin: <GoblinsInterface>{ stats: {
      strength: 1,
      agility: 1,
      intelligence: 1,
    } },
    level: 1,
  }),
  getters: {
    userInventory: (state) => state.inventory,
    userGoblin: (state) => state.goblin,
    userLevel: (state) => state.level,
    userItemsStats: (state) =>  state.inventory.reduce((sum, item) =>
      sum = {
        strength: sum.strength += item?.params?.strength || 0,
        agility: sum.agility += item?.params?.agility || 0,
        intelligence: sum.intelligence += item?.params?.intelligence || 0,
        mp: sum.mp += item?.params?.mp || 0,
        hp: sum.hp += item?.params?.hp || 0,
        defence: sum.defence += item?.params?.defence || 0,
        attack: sum.attack += item?.params?.attack || 0,
      }, { strength: 0, agility: 0, intelligence: 0, mp: 0, hp: 0, defence: 0, attack: 0 } )
  },
  actions: {
    addItem(item: ItemsInterface) {
      this.inventory.push(item)
    },
    removeItem(i: number) {
      this.inventory.splice(i - 1, 1)
    },
    choiceGoblin(goblin: GoblinsInterface) {
      this.goblin = goblin
    },
    changeLevel(level: number) {
      this.level = level
    }
  }
})
