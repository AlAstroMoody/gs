// import instance from '@/api/instance'
import { items } from '@/temp/items'

export const getItems = async () => {
  // const response = await instance
  //   .get(`items/?populate=*`)
  //   .catch((error) => console.log(error))

  const response = items

  return response.data.data.map((item) => {
    const { description, level, name, params } = item.attributes
    const src = item.attributes.src.data

    return {
      id: item.id,
      description,
      level: level ? level : 0,
      name,
      params,
      craft: item.attributes.craft,
      children: getRelative(item.attributes.children.data),
      parents: getRelative(item.attributes.parents.data),
      boss: item.attributes.boss.data
        ? { name: item.attributes.boss.data.attributes.name }
        : null,
      goblins: item.attributes.goblins.data,
      parents_count: item.attributes.parents_count || {},
      // src: src
      // ? `${import.meta.env.VITE_BASE_URL}${src[0].attributes.url}`
      // : null,
      src: src ? `/gs${src[0].attributes.url}` : null,
    }
  })
}

const getRelative = (data) => {
  return data.map((item) => ({
    id: item.id,
    name: item.attributes.name,
  }))
}
