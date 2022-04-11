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
export default class DaysOffService {
    static instance: DaysOffService = new DaysOffService()

    getAllDaysOff = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/requests-days-off`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    createDayOff = async (
        start: Date,
        end: Date,
        dayOffType: number,
        message: string
    ) => {
        const params = {
            start: start,
            end: end,
            dayOffType: dayOffType,
            message: message,
        }
        return new Promise((resolve) => {
            api.post(`${apiUrl}/requests-days-off`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getDaysOffTypes = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/days-off-types`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getStatusRequestTypes = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/status-requests`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    updateRequest = async (id: number, status: number) => {
        const params = {
            statusRequestId: status,
        }
        return new Promise((resolve) => {
            api.put(`${apiUrl}/requests-days-off/${id}`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
