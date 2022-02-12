import axios, { AxiosResponse } from 'axios'
import { resolve } from 'path/posix'
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
export default class Api {
    static instance: Api = new Api()

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

    getUserInfo = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/me`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

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

    getUserPunchIns = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/punchins`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    createPunchIn = async (organization: number, start: Date, end?: Date) => {
        const params = {
            organization: organization,
            start: start,
            ...(end && { end: end }),
        }
        return new Promise((resolve) => {
            api.post(`${apiUrl}/punchs-in`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    updatePunchIn = async (
        organization: number,
        id: number,
        start?: Date,
        end?: Date
    ) => {
        const params = {
            organization: organization,
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

    getDaysOff = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/daysoff`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    createDayOff = async (
        organization: number,
        start: Date,
        end: Date,
        dayOffType: number,
        message: string
    ) => {
        const params = {
            organization: organization,
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
            api.get(`${apiUrl}/days-off`)
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
}
