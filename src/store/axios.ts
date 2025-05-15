import router from '@/router'
import axios, { AxiosError } from 'axios'

// const { token, user } = getTokenAndUser()
// let headers = {}
// if (token) {
//   headers = {
//     Authorization: `Bearer ${token}`,
//   }
// }
const openLibraryUrl = 'https://openlibrary.org/'

const api = axios.create({
  baseURL: openLibraryUrl,
  timeout: 1000 * 20, // 20 seconds
})

api.interceptors.response.use((response) => {return response}, (error : AxiosError) => {
    if (error.response?.status === 401 && router.currentRoute.value.path !== "/login") {
        router.replace("/login")
    }
    else {
        console.error(error)
    }
    throw error
})

export default api