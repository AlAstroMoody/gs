// import instance from '@/api/instance'
import { goblins } from '@/temp/goblins'

export const getGoblins = async () => {
  // const response = await instance
  //   .get(`goblins`)
  //   .catch((error) => console.log(error))
  // return response.data
  goblins.forEach((goblin) => {
    if (goblin.src) goblin.src = `/gs${goblin.src}`
  })

  return goblins
}
