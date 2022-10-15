import { ref, readonly, computed, reactive } from 'vue'

const entities = reactive({ items: [], bosses: [], goblins: [] })

export async function useState({ id, getAll, entity } = {}) {
  const setItems = async () => {
    entities[entity] = await getAll()
  }

  // предмет по id
  const currentItem = computed(() =>
    entities[entity].find((item) => item.id === Number(id))
  )

  return {
    entities: entity ? readonly(entities[entity]) : entities,
    setItems,
    currentItem,
  }
}
