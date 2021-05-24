var objDate = new Date()
var year = objDate.getFullYear()
var month = objDate.getMonth()
var date = objDate.getDate()
var hour = objDate.getHours()
var minute = objDate.getMinutes()
var second = objDate.getSeconds()
var dayList
var totalDays


if (year % 4 == 0) {
    dayList = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    totalDays = 366
} else {
    dayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    totalDays = 365
}

const digitContainer = document.getElementById('digitContainer')
const digitDays = document.getElementById('digitDays')
const digitHours = document.getElementById('digitHours')
const digitMin = document.getElementById('digitMin')
const digitSec = document.getElementById('digitSec')
const yearContainer = document.getElementById('yearContainer')
const imgContainer = document.getElementById('imgContainer')

yearContainer.innerText = year + 1

var times = remainTime(objDate)
var remainDays = times[0]
var remainHours = times[1]
var remainMinuts = times[2]
var remainSeconds = times[3]

window.setTimeout(function() {
    imgContainer.remove()
    digitContainer.style.visibility = 'visible'
}, 1000)
updateDOM()

function remainTime(data) {
    var passedDays = 0
    dayList.slice(0, month).forEach(item => {
        passedDays += item
    })
    passedDays += (date - 1)
    var remainDays = totalDays - passedDays - 1

    var remainHours = 24 - hour - 1
    var remainMinuts = 60 - minute - 1
    var remainSeconds = 60 - second

    var ret = [remainDays, remainHours, remainMinuts, remainSeconds]

    return ret

}

function checkMinuts() {
    if (remainMinuts == 0) {
        checkHours()
        remainMinuts = 59
    } else {
        remainMinuts -= 1
    }
}

function checkHours() {
    if (remainHours == 0) {
        checkDays()
        remainHours = 23
    } else {
        remainHours -= 1
    }
}

function checkDays() {
    if (remainDays == 0) {
        year += 1
        yearContainer.innerText = year + 1
        if (year % 4 == 0) {
            remainDays = 365
        } else {
            remainDays = 364
        }
    } else {
        remainDays -= 1
    }
}

function checkSeconds() {
    if (remainSeconds == 0) {
        checkMinuts()
        remainSeconds = 59
    } else {
        remainSeconds -= 1
    }
    updateDOM()
}

function updateDOM() {
    digitDays.innerText = remainDays
    digitHours.innerText = remainHours
    digitMin.innerText = remainMinuts
    digitSec.innerText = remainSeconds
    window.setTimeout('checkSeconds()', 1000)
}