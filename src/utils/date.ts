import * as dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(isToday)

export default class DateUtilities {
    static instance: DateUtilities = new DateUtilities()

    format = (date: Date, format: string) => {
        return dayjs(date).format(format)
    }

    diference = (date1: Date, date2: Date) => {
        return dayjs(date2).diff(dayjs(date1), 'milliseconds', true)
    }

    isToday = (date: Date) => {
        return dayjs(date).isToday()
    }

    parseMillisecondsToHHmm = (milliseconds: number) => {
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
        const totalHours = hours < 10 ? '0' + hours : hours
        const totalMins = minutes < 10 ? '0' + minutes : minutes
        return `${totalHours}:${totalMins}`
    }
}
