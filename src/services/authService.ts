import axios from 'axios'
import Cookie from 'utils/cookies'

const cookie = new Cookie()
const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create()

// prettier-ignore
api.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

api.interceptors.request.use(
    (config) => {
        const token = cookie.getCookie('token')

        if (config !== undefined) {
            if (token !== null) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                }
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default class AuthService {
    static instance: AuthService = new AuthService()

    login = async (user: string, pass: string) => {
        const params = {
            user: user,
            password: pass,
        }

        return new Promise((resolve) => {
            api.post(`${apiUrl}/auth`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
