import axios, { AxiosResponse } from 'axios'
import { resolve } from 'path/posix'
import Cookie from '../utils/cookies'

const cookie = new Cookie()
const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create()

// prettier-ignore
api.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

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
}
