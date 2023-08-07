import { computed, reactive } from 'vue'

const user = reactive({
  inventory: [],
  level: 1,
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
  attackPoints: 0,
  defencePoints: 0,
})

export function useGoblinState() {
  const setGoblin = (goblin) => (user.goblin = goblin)
  const setLevel = (level) => (user.level = level)
  const addItem = (item) => user.inventory.push(item)
  const userTest = computed(() => user.level)

  // порядковый номер удаленного предмета (1-6)
  const removeItem = (number) => user.inventory.splice(number - 1, 1)

  const strength = computed(() =>
    Math.floor(
      user.goblin.stats_increase.strength * user.level +
        user.goblin.stats.strength
    )
  )
  const agility = computed(() =>
    Math.floor(
      user.goblin.stats_increase.agility * user.level +
        user.goblin.stats.agility
    )
  )
  const intelligence = computed(() =>
    Math.floor(
      user.goblin.stats_increase.intelligence * user.level +
        user.goblin.stats.intelligence
    )
  )

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
          resist:
            item?.params?.resist > sum.resist
              ? item?.params?.resist
              : sum.resist,
          as: (sum.as += item?.params?.as || 0),
          ms: item?.params?.ms > sum.ms ? item?.params?.ms : sum.ms,
          hp_regeneration: (sum.hp_regeneration +=
            (item?.params?.hp_regeneration || 0) +
            (item?.params?.hidden_regen || 0)),
          mp_regeneration: (sum.mp_regeneration +=
            item?.params?.mp_regeneration || 0),
          description: (sum.description += sum.description
            ? `<br/> ${item?.description || ''} `
            : item?.description || ''),
        }),
      {
        strength: strength.value,
        agility: agility.value,
        intelligence: intelligence.value,
        mp: 0,
        hp: 0,
        defence: 0,
        attack: 0,
        luck: 0,
        resist: 0,
        as: 0,
        ms: 0,
        description: '',
        hp_regeneration: 0,
        mp_regeneration: 0,
      }
    )
  )

  const changeAttack = (points) => (user.attackPoints = points)
  const changeDefense = (points) => (user.defencePoints = points)

  return {
    user,
    userTest,
    setGoblin,
    setLevel,
    itemsStats,
    addItem,
    removeItem,
    changeAttack,
    changeDefense,
  }
}
