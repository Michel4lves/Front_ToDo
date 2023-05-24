

function hour() {
    setInterval(() => {
        var h = new Date().getHours()
        var h24 = new Date().getHours()
        if (h > 12) {
                var h = new Date().getHours() - 12
        }
        let m = new Date().getMinutes()
        let s = new Date().getSeconds()

        // add zero before single digit number
        h = (h < 10) ? '0' + h : h
        m = (m < 10) ? '0' + m : m
        s = (s < 10) ? '0' + s : s

        let hours = document.getElementById("hours")
        let minutes = document.getElementById("minutes")
        let seconds = document.getElementById("seconds")
        let ampm = document.getElementById("ampm")

        let am = h24 >= 12 ? 'PM' : 'AM'

        hours.innerHTML = h
        minutes.innerHTML = m
        seconds.innerHTML = s
        ampm.innerHTML = am
    })
}
hour()
