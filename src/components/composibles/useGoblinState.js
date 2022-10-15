import { ref, readonly, computed, reactive } from 'vue'

const user = reactive({
  inventory: [],
  level: 1,
  goblin: {
    stats: {
      strength: 1,
      agility: 1,
      intelligence: 1,
    },
  },
})

export function useGoblinState({ goblin, level, item, number } = {}) {
  const setGoblin = (goblin) => (user.goblin = goblin)
  const setLevel = (level) => (user.level = level)
  const addItem = (item) => user.inventory.push(item)

  // порядковый номер удаленного предмета (1-6)
  const removeItem = (number) => user.inventory.splice(number - 1, 1)

  // бонусы инвентаря
  const itemsStats = computed(() =>
    user.inventory.reduce(
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
    )
  )

  return {
    user,
    setGoblin,
    setLevel,
    itemsStats,
    addItem,
    removeItem,
  }
}
