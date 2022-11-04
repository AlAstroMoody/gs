// import instance from '@/api/instance'
import { goblins } from '@/temp/goblins'

export const getGoblins = async () => {
  // const response = await instance
  //   .get(`goblins/?populate=*`)
  //   .catch((error) => console.log(error))

  const response = goblins

  return response.data.data.map((goblin) => {
    const { description, mainParam, name, stats, stats_increase } =
      goblin.attributes

    return {
      id: goblin.id,
      description,
      mainParam,
      name,
      stats,
      stats_increase,
      src: goblin.attributes?.src
        ? `/gs${goblin.attributes.src.data.attributes.url}`
        : null,
      //   src:
      //     import.meta.env.VITE_BASE_URL +
      //     goblin.attributes.src.data.attributes.url,
    }
  })
}
