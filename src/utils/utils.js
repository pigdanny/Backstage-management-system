export const gettime = (utctime) => {
    let date = (typeof utctime == "string" ? new Date(utctime) : utctime)
    let month = date.getMonth() + 1;
    let dates = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month
    }
    if (dates < 10) {
        dates = "0" + dates
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    return date.getFullYear() + '-' + month + '-' + dates + ' ' + hours + ":" + minutes + ":" + seconds
}