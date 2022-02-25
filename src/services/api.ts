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

    getAllUsers = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users`)
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

    getDaysOff = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/daysoff`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getAllDaysOff = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/requests-days-off`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getDocumentsUser = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/documents`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    uploadDocument = async (
        documentType: number,
        user: number,
        organization: number,
        file: File
    ) => {
        let bodyFormData = new FormData()
        bodyFormData.append('organization', organization.toString())
        bodyFormData.append('user', user.toString())
        bodyFormData.append('documentType', documentType.toString())
        bodyFormData.append('file', file)
        return new Promise((resolve) => {
            api.post(`${apiUrl}/documents`, bodyFormData)
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

    getDocumentsTypes = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/documents-types`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    uploadAvatar = async (id: number, avatar: File) => {
        let bodyFormData = new FormData()
        bodyFormData.append('avatar', avatar)

        return new Promise((resolve) => {
            api.post(`${apiUrl}/users/${id}/upload-avatar`, bodyFormData)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getAvatar = async (avatar: string) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/avatar/${avatar}`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    updateUser = async (
        id: number,
        user: string,
        firstName: string,
        lastName: string,
        birthday: Date,
        address: string,
        zipcode: string,
        city: string
    ) => {
        const params = {
            user: user,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            address: address,
            zipcode: zipcode,
            city: city,
        }
        return new Promise((resolve) => {
            api.put(`${apiUrl}/users/${id}`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    updatePass = async (id: number, password: string) => {
        const params = {
            password: password,
        }
        return new Promise((resolve) => {
            api.put(`${apiUrl}/users/${id}`, params)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
