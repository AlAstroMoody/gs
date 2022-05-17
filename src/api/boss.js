import instance from "@/api/instance"


export const getBosses = async () => {
  const response = await instance.get(`bosses/?populate=*`).catch(error => console.log(error))

  return response.data.data.map(boss => {
    const { wave, name } = boss.attributes
    const image = boss.attributes.image.data

    return {
      id: boss.id,
      name,
      wave,
      image: image ? import.meta.env.VITE_BASE_URL + image[0].url : null,
      items: boss.attributes.items.data.map(item => ({
        id: item.id, name: item.attributes.name
      })),
    }
  })
}