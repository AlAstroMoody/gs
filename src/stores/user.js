import { defineStore } from 'pinia'
import { itemParams } from '../common/enums'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    inventory: [],
    goblin: {
      stats: {
        strength: 1,
        agility: 1,
        intelligence: 1,
      },
    },
    level: 1,
  }),
  getters: {
    userInventory: (state) => state.inventory,
    userGoblin: (state) => state.goblin,
    userLevel: (state) => state.level,
    userItemsStats: (state) =>
      state.inventory.reduce(
        (sum, item) =>
          (sum = {
            strength: (sum.strength += item?.params?.strength || 0),
            agility: (sum.agility += item?.params?.agility || 0),
            intelligence: (sum.intelligence += item?.params?.intelligence || 0),
            mp: (sum.mp += item?.params?.mp || 0),
            hp: (sum.hp += item?.params?.hp || 0),
            defence: (sum.defence += item?.params?.defence || 0),
            attack: (sum.attack += item?.params?.attack || 0),
            luck: (sum.luck += item?.params?.luck || 0),
            resist: (sum.resist += item?.params?.resist || 0),
            as: (sum.as += item?.params?.as || 0),
            ms: (sum.resist += item?.params?.ms || 0),
            description: (sum.description += sum.description
              ? `<br/> ${item?.description || ''} `
              : item?.description || ''),
          }),
        {
          strength: 0,
          agility: 0,
          intelligence: 0,
          mp: 0,
          hp: 0,
          defence: 0,
          attack: 0,
          luck: 0,
          resist: 0,
          as: 0,
          ms: 0,
          description: '',
        }
      ),
  },
  actions: {
    addItem(item) {
      this.inventory.push(item)
    },
    removeItem(i) {
      this.inventory.splice(i - 1, 1)
    },
    choiceGoblin(goblin) {
      this.goblin = goblin
    },
    changeLevel(level) {
      this.level = level
    },
  },
})
