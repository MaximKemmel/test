import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale(ru)
dayjs.extend(LocalizedFormat)

export const formatDate = (date: string, format: string = 'D MMMM YYYY') => {
    return dayjs(date).format(format)
}