import { useStorage } from '@vueuse/core'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { reactive } from 'vue'

import { config } from './firebaseConfig'

import { baseUrl } from '@/common/constants'
import { useGoblinState } from '@/components/composables/useGoblinState'

const version = useStorage('version')
const firebaseApp = initializeApp(config)
const db = getDatabase(firebaseApp)
const baseIconPath = `https://raw.githubusercontent.com/AlAstroMoody/gs-icons/main/`

export const store = reactive({
  entities: { items: {}, bosses: [], goblins: [], quests: [], craft: [] },
  version: '1.5а',
  maxLevel: version === '1.5а' ? 200 : 150,

  currentItem(entity, id) {
    return this.entities[entity].find((item) => item.id === Number(id))
  },

  async setItems(entity) {
    if (!this.entities[entity].length) {
      const entitiesRef = ref(db, entity)
      onValue(entitiesRef, async (snapshot) => {
        this.entities[entity] = await snapshot.val()
        this.entities[entity].forEach((item) => {
          if (item.src) {
            item.src = `${baseIconPath}${item.src.replace('/uploads/', '')}`
          }
        })

        if (entity === 'goblins') {
          const { user, setGoblin } = useGoblinState()
          const lsGoblin = localStorage.getItem('goblin')
          if (lsGoblin) setGoblin(this.entities.goblins.find((g) => g.name === lsGoblin))
          else user.goblin?.id ? null : setGoblin(this.entities.goblins[0])
        }
      })
    }
  },

  async setQuests() {
    if (!this.entities.quests.length) {
      const entitiesRef = ref(db, 'quests')
      onValue(entitiesRef, async (snapshot) => {
        this.entities.quests = await snapshot.val()
      })
    }
  },

  async getItems() {
    const response = await fetch(baseUrl + 'craft.json')
    store.entities.items = await response.json()
  },
})
