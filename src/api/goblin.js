// import instance from '@/api/instance'
import { goblins } from '@/temp/goblins'

export const getGoblins = async () => {
  // const response = await instance
  //   .get(`goblins`)
  //   .catch((error) => console.log(error))
  // response.data.forEach((item) => {
  //   item.src = `${import.meta.env.VITE_BASE_URL}${item.src}`
  // })
  // return response.data

  goblins.forEach((goblin) => {
    if (goblin.src) goblin.src = `/gs${goblin.src}`
  })

  return goblins
}
