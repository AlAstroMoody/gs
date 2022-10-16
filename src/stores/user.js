import { defineStore } from 'pinia'

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
      stats_increase: {
        strength: 1,
        agility: 1,
        intelligence: 1,
      },
    },
    level: 1,
    attackPoints: 0,
    defencePoints: 0,
  }),
  getters: {
    userInventory: (state) => state.inventory,
    userGoblin: (state) => state.goblin,
    userLevel: (state) => state.level,
    userAttackPoints: (state) => state.attackPoints,
    userDefencePoints: (state) => state.defencePoints,
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
            resist:
              item?.params?.resist > sum.resist
                ? item?.params?.resist
                : sum.resist,
            as: (sum.as += item?.params?.as || 0),
            ms: item?.params?.ms > sum.ms ? item?.params?.ms : sum.ms,
            hp_regeneration: (sum.hp_regeneration +=
              item?.params?.hp_regeneration || 0),
            mp_regeneration: (sum.mp_regeneration +=
              item?.params?.mp_regeneration || 0),
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
          mp_regeneration: 0,
          hp_regeneration: 0,
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
    changeAttack(points) {
      this.attackPoints = points
    },
    changeDefence(points) {
      this.defencePoints = points
    },
  },
})
