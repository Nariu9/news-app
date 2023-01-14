import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs';

dayjs.extend(advancedFormat)

export const formatDate = (date: string) => {
    return dayjs(date).format('MMMM Do, YYYY')
}