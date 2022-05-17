
import axios from "axios"


const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + `/api`
    // headers: {
    //   Authorization: `${TOKEN}`,
    //   "Content-Type": "multipart/form-data"
    // }
  })
  
  export default instance