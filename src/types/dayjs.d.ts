import { Dayjs, PluginFunc } from 'dayjs'

declare module 'dayjs' {
    interface Dayjs {
        isToday(): boolean
    }
}
