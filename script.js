const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const distanceForm = $('.form-distance')
const studentIp = $('.student-input')
const distanceIp = $('.distance-input')
const errorMsg = $('.show-error-msg')
const inputRemain = $('.count-remain-input')
const totalDistanceEl = $('.total-distance')
const resetBtn = $('.reset-btn')
let totalStudent = 0
let distanceArr = []

studentIp.onkeyup = function(e) {
    errorMsg.innerText = ''
    errorMsg.classList.remove('invalid')

    if (e.keyCode === 13) {
        const studentCount = parseInt(e.target.value)
        if (studentCount >= 1 && studentCount <= 50) {
            totalStudent = studentCount
            openDistanceForm()
        } else {
            e.target.value = ''
            errorMsg.innerText = 'Vui lòng nhập giá trị từ 1 đến 50'
            errorMsg.classList.add('invalid')
        }
    }
}

distanceIp.onkeyup = function(e) {
    inputRemain.innerText = ''
    inputRemain.classList.remove('invalid')

    if (e.keyCode === 13) {
        const distance = parseInt(e.target.value)
        if (distance >= 1 && distance <= 1000) {
            distanceArr.push(distance)
            e.target.value = ''
            checkForEnoughIp(distanceArr)
        } else {
            e.target.value = ''
            inputRemain.innerText = 'Vui lòng nhập giá trị từ 1 đến 1000'
            inputRemain.classList.add('invalid')
        }
    }
}

function openDistanceForm() {
    if (totalStudent === 1) {
        inputRemain.innerText = `Hãy nhập vào 1 giá trị`
    } else {
        inputRemain.innerText = `Hãy nhập vào lần lượt ${totalStudent} giá trị`
    }
    studentIp.disabled = true
    distanceForm.classList.remove('invisible')
    distanceIp.focus()
}

function checkForEnoughIp(distanceArray) {
    if (distanceArray.length !== totalStudent) {
        const needTyping = totalStudent - distanceArray.length
        inputRemain.innerText = `Hãy nhập vào thêm ${needTyping} giá trị`
        return
    }

    distanceIp.disabled = true
    const totalDistance = distanceArr.reduce((total, dist) => {
        return total += dist
    },0)
    totalDistanceEl.classList.remove('invisible')
    totalDistanceEl.innerText = `Tổng quảng đường: ${totalDistance}m`
}

resetBtn.onclick = function() {
    // reset variables
    totalStudent = 0
    distanceArr = []

    // restart student input field
    studentIp.disabled = false
    studentIp.value = ''
    studentIp.focus()
    errorMsg.innerText = ''
    errorMsg.classList.remove('invalid')

    // close distance input form and hide result element
    distanceForm.classList.add('invisible')
    distanceIp.disabled = false
    distanceIp.value = ''
    inputRemain.classList.remove('invalid')
    totalDistanceEl.classList.add('invisible')
}