// import instance from '@/api/instance'
import { items } from '@/temp/items'

export const getItems = async () => {
  // const response = await instance
  //   .get(`items`)
  //   .catch((error) => console.log(error))
  // return response.data

  return items
}
