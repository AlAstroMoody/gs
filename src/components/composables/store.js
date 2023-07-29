import { getDatabase, ref, onValue } from 'firebase/database'
import { reactive } from 'vue'

import { firebaseApp } from './firebaseConfig'

import { useGoblinState } from '@/components/composables/useGoblinState'

const db = getDatabase(firebaseApp)

export const store = reactive({
  entities: { items: [], bosses: [], goblins: [], quests: [] },

  currentItem(entity, id) {
    return this.entities[entity].find((item) => item.id === Number(id))
  },

  async setItems(entity) {
    if (!this.entities[entity].length) {
      const entitiesRef = ref(db, entity)
      onValue(entitiesRef, async (snapshot) => {
        this.entities[entity] = await snapshot.val()
        if (entity === 'goblins') {
          const { user, setGoblin } = useGoblinState()
          user.goblin?.id ? null : setGoblin(this.entities.goblins[0])
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
})
