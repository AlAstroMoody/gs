import { defineStore } from 'pinia'

import type { GoblinsInterface, ItemsInterface } from '@/common/interfaces'
import { useGoblinsStore } from '@/stores/goblins'


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    inventory: <ItemsInterface[]>[
    ],
    goblin: <GoblinsInterface>useGoblinsStore().allGoblins[0],
    level: 1,
  }),
  getters: {
    userInventory: (state) => state.inventory,
    userGoblin: (state) => state.goblin,
    userLevel: (state) => state.level,
    userItemsStats:  (state) =>  state.inventory.reduce((sum, item) =>
      sum = {
        strength: sum.strength += item?.stats?.strength ? item?.stats?.strength : 0,
        agility: sum.agility += item?.stats?.agility ? item?.stats?.agility : 0,
        intelligence: sum.intelligence += item?.stats?.intelligence ? item?.stats?.intelligence : 0,
      }, { strength: 0, agility: 0, intelligence: 0 } )
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
