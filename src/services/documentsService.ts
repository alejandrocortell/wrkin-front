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
export default class DocumentsService {
    static instance: DocumentsService = new DocumentsService()

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

    getDocumentsTypes = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/documents-types`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }

    getAllDocuments = async () => {
        return new Promise((resolve) => {
            api.get(`${apiUrl}/documents`)
                .then((res) => resolve(res))
                .catch((err) => resolve(err))
        })
    }
}
