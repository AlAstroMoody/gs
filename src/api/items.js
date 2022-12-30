// import instance from '@/api/instance'
import { items } from '@/temp/items'

export const getItems = async () => {
  // const response = await instance
  //   .get(`items`)
  //   .catch((error) => console.log(error))
  // response.data.forEach((item) => {
  //   item.src = `${import.meta.env.VITE_BASE_URL}${item.src}`
  // })
  // return response.data

  items.forEach((item) => {
    if (item.src) item.src = `/gs${item.src}`
  })

  return items
}
