import moment from 'moment';

export const getCurrentDate = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}

export const formatDate = (date: Date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}