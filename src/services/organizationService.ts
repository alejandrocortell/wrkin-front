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
export default class OrganizationService {
    static instance: OrganizationService = new OrganizationService()

    getOrganization = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/organizations/${id}`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getSettings = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/settings/${id}`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
