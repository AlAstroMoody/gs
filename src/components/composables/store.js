import { reactive } from 'vue'

import { getBosses } from '@/api/boss'
import { getGoblins } from '@/api/goblin'
import { getItems } from '@/api/items'
import { useGoblinState } from '@/components/composables/useGoblinState'

const apiDictionary = {
  bosses: getBosses,
  goblins: getGoblins,
  items: getItems,
}

export const store = reactive({
  entities: { items: [], bosses: [], goblins: [] },
  currentItem(entity, id) {
    return this.entities[entity].find((item) => item.id === Number(id))
  },
  async setItems(entity) {
    this.entities[entity] = await apiDictionary[entity]()
    if (entity === 'goblins') {
      const { user, setGoblin } = useGoblinState()
      user.goblin?.id ? null : setGoblin(this.entities.goblins[0])
    }
  },
})
