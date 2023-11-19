import { useStorage } from '@vueuse/core'
import { computed, reactive } from 'vue'

const version = useStorage('version')

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
  const setGoblin = (goblin) => {
    user.goblin = goblin
    localStorage.setItem('goblin', goblin.name)
  }
  const setLevel = (level) => {
    user.level = level
    localStorage.setItem('level', user.level)
  }
  const addItem = (item) => user.inventory.push(item)

  // порядковый номер удаленного предмета (1-6)
  const removeItem = (number) => user.inventory.splice(number - 1, 1)

  const strength = computed(() =>
    Math.floor(user.goblin.stats_increase.strength * user.level + user.goblin.stats.strength)
  )
  const agility = computed(() =>
    Math.floor(user.goblin.stats_increase.agility * user.level + user.goblin.stats.agility)
  )
  const intelligence = computed(() =>
    Math.floor(
      user.goblin.stats_increase.intelligence * user.level + user.goblin.stats.intelligence
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
          resist: item?.params?.resist > sum.resist ? item?.params?.resist : sum.resist,
          as: (sum.as += item?.params?.as || 0),
          ms:
            version.value === '1.4f.fix7'
              ? item?.params?.ms > sum.ms
                ? item?.params?.ms
                : sum.ms
              : (sum.ms += item?.params?.ms || 0),
          hp_regeneration: (sum.hp_regeneration +=
            (item?.params?.hp_regeneration || 0) + (item?.params?.hidden_regen || 0)),
          mp_regeneration: (sum.mp_regeneration += item?.params?.mp_regeneration || 0),
          mp_regen: (sum.mp_regen += item?.params?.mp_regen || 0),
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
        mp_regen: 0,
      }
    )
  )

  const isAgilityGoblin = computed(() => user.goblin.mainParam === 'Ловкость')
  const isStrengthGoblin = computed(() => user.goblin.mainParam === 'Сила')
  const isIntelligenceGoblin = computed(() => user.goblin.mainParam === 'Интеллект')

  const attack = computed(() => {
    let itemsStatAttack = user.goblin.stats.strength + itemsStats.value.strength
    if (isAgilityGoblin.value)
      itemsStatAttack = user.goblin.stats.agility + itemsStats.value.agility
    if (isIntelligenceGoblin.value)
      itemsStatAttack = user.goblin.stats.intelligence + itemsStats.value.intelligence

    return itemsStats.value.attack + itemsStatAttack
  })

  const defense = computed(() =>
    itemsStats.value ? Math.floor(1 + itemsStats.value.defence + itemsStats.value.agility / 3) : 0
  )

  const userHasStaff = computed(() => user.inventory.some((item) => item.id === 589))

  const mainParams = computed(() => [
    {
      title: 'сила:',
      value: itemsStats.value.strength + (userHasStaff.value && isStrengthGoblin.value ? 100 : 0),
    },
    {
      title: 'ловкость:',
      value: itemsStats.value.agility + (userHasStaff.value && isAgilityGoblin.value ? 100 : 0),
    },
    {
      title: 'интеллект:',
      value:
        itemsStats.value.intelligence +
        (userHasStaff.value && isIntelligenceGoblin.value ? 100 : 0),
    },
    {
      title: 'урон:',
      value: attack.value + user.attackPoints * 100,
    },
    {
      title: 'защита:',
      value: defense.value + user.defencePoints * 3,
    },
  ])

  const secondParams = computed(() => [
    {
      title: 'удача:',
      value: itemsStats.value.luck || 0,
    },
    {
      title: 'маг. резист:',
      value: `${itemsStats.value.resist || 0}%`,
    },
    {
      title: 'cкорость бега:',
      value: (itemsStats.value.ms || 0) + user.goblin.stats_increase.ms + user.defencePoints,
    },
    {
      title: 'cкорость атаки:',
      value: itemsStats.value.as >= 500 ? 'max' : `${itemsStats.value.as || 0}%`,
    },
    {
      title: 'реген. hp:',
      value: `${
        itemsStats.value.hp_regeneration + Math.floor(itemsStats.value.strength / 100) || 0
      }/сек`,
    },
    {
      title: 'реген. mp:',
      value: `${Math.floor(
        (itemsStats.value.intelligence / 100 + itemsStats.value.mp_regen) *
          (itemsStats.value.mp_regeneration ? itemsStats.value.mp_regeneration / 50 : 1)
      )}`,
    },
  ])

  // общие hp
  const hp = computed(() => {
    let health = itemsStats.value.strength * 20 + itemsStats.value.hp

    if (user.inventory.some((item) => item.id === 590)) {
      health += mainParamHealth(590)
    }
    if (user.inventory.some((item) => item.id === 592)) {
      health += mainParamHealth(592)
    }
    if (user.inventory.some((item) => item.id === 598)) {
      health += mainParamHealth(598)
    }

    return health
  })

  // добавочное хп от отдельных артов
  const mainParamHealth = (id) => {
    let mainParam = itemsStats.value.strength
    if (isAgilityGoblin.value) mainParam = itemsStats.value.agility
    if (isIntelligenceGoblin.value) mainParam = itemsStats.value.intelligence

    return [590, 598].includes(id) ? mainParam * 5 : 592 === id ? mainParam * 4 : 0
  }

  // общие mp
  const mp = computed(() => itemsStats.value.intelligence * 10 + itemsStats.value.mp)

  const changeAttack = (points) => (user.attackPoints = points)
  const changeDefense = (points) => (user.defencePoints = points)

  return {
    user,
    setGoblin,
    setLevel,
    itemsStats,
    addItem,
    removeItem,
    changeAttack,
    changeDefense,
    attack,
    defense,
    mainParams,
    secondParams,
    hp,
    mp,
  }
}
