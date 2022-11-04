function now() {
    var currentTime = new Date()

    var month = currentTime.getMonth() + 1 //getMonth returns 0-11
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()

    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }

    return {
        standard: day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds,
        standard_usa: month + "\\" + day + "\\" + year + " " + hours + ":" + minutes + ":" + seconds,
        iso: year + month + day + "_" + hours + minutes + seconds,
        unix: currentTime.getTime(),
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}