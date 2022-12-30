// import instance from '@/api/instance'
import { bosses } from '@/temp/bosses'

export const getBosses = async () => {
  // const response = await instance
  //   .get(`boss`)
  //   .catch((error) => console.log(error))
  // return response.data

  return bosses
}
