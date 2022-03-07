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
export default class UserService {
    static instance: UserService = new UserService()

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

    getUserPunchIns = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/punchins`)
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

    getDocumentsUser = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/documents`)
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

    createUser = async (
        user: string,
        password: string,
        firstName: string,
        lastName: string,
        birthday: Date,
        address: string,
        zipcode: string,
        city: string,
        role: number,
        manager: number,
        organization: number,
        hoursToWork: number
    ) => {
        const params = {
            user: user,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            address: address,
            zipcode: zipcode,
            city: city,
            role: role,
            manager: manager,
            organization: organization,
            hoursToWork: hoursToWork,
        }
        return new Promise((resolve) => {
            api.post(`${apiUrl}/users`, params)
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

    deleteUser = async (id: number) => {
        return new Promise((resolve) => {
            api.delete(`${apiUrl}/users/${id}`)
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

    getUserById = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getUserDaysOffById = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/daysoff`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getUserPunchInById = async (id: number) => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/users/${id}/punchins`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
