import axios from 'axios'
import Cookie from '../utils/cookies'

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
export default class PunchInService {
    static instance: PunchInService = new PunchInService()

    createPunchIn = async (start: Date, end?: Date) => {
        const params = {
            start: start,
            ...(end && { end: end }),
        }
        return new Promise((resolve) => {
            api.post(`${apiUrl}/punchs-in`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    updatePunchIn = async (id: number, start?: Date, end?: Date) => {
        const params = {
            ...(start && { start: start }),
            ...(end && { end: end }),
        }
        return new Promise((resolve) => {
            api.put(`${apiUrl}/punchs-in/${id}`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    deletePunchIn = async (id: number) => {
        return new Promise((resolve) => {
            api.delete(`${apiUrl}/punchs-in/${id}`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
