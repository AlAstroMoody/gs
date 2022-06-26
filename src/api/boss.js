import instance from '@/api/instance'
import { bosses } from '@/temp/bosses'

export const getBosses = async () => {
  // const response = await instance
  //   .get(`bosses/?populate=*`)
  //   .catch((error) => console.log(error))

  const response = bosses

  return response.data.data.map((boss) => {
    const { wave, name } = boss.attributes
    const image = boss.attributes.image.data

    return {
      id: boss.id,
      name,
      wave,
      image: image ? import.meta.env.VITE_BASE_URL + image[0].url : null,
      items: boss.attributes.items.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
      })),
    }
  })
}
