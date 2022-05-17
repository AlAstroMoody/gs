import instance from "@/api/instance"


export const getGoblins = async () => {
  const response = await instance.get(`goblins/?populate=*`).catch(error => console.log(error))

  return response.data.data.map(goblin => {
    const { description, mainParam, name, stats } = goblin.attributes

    return {
      id: goblin.id,
      description,
      mainParam,
      name,
      stats,
      src: import.meta.env.VITE_BASE_URL + goblin.attributes.src.data.attributes.url
    }
  })
}