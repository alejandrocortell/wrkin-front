import { useEffect, useState } from 'react'
import Cookie from 'utils/cookies'
const cookie = new Cookie()

export const useExistsCookie = (find: string) => {
    const [exists, setExists] = useState(false)

    useEffect(() => {
        cookie.getCookie(find) ? setExists(true) : setExists(false)
    }, [cookie.getCookie(find)])
    return exists
}
