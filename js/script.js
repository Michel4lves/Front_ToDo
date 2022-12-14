// Calendar
const lang = navigator.language
        let date = new Date()

        let dayNumber = date.getDate()
        let month = date.getMonth()
        let dayName = date.toLocaleString(lang, {weekday: 'long'})
        let monthName = date.toLocaleString(lang, {month: 'long'})
        let year = date.getFullYear()

        document.getElementById('monthName').innerHTML = monthName
        document.getElementById('dayName').innerHTML = dayName
        document.getElementById('dayNumber').innerHTML = dayNumber
        document.getElementById('year').innerHTML = year

// clock
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

// set atributes line
function setAttributeLine() {
        let line = document.querySelectorAll('.task')
        var countLine = 1
        line.forEach(element => {
                element.setAttribute('id', 'line-' + countLine)
                countLine++
                return countLine
        })
}

// set atributes checked
function setAttributeChecked() {
        let checkedChk = document.querySelectorAll(".checked")
        var countCheck = 1
        checkedChk.forEach(elementCheckChk => {
                elementCheckChk.setAttribute('id', 'do-' + countCheck);
                countCheck++
        });
}

// set atributes date
function setAttributeDate() {
        let dateBtn = document.querySelectorAll(".date")
        var countDate = 1
        dateBtn.forEach(elementDateBtn => {
                elementDateBtn.setAttribute('id', 'date-' + countDate);
                countDate++
        });
}

// set atributes done
function setAttributeDone() {
        let doneBtn = document.querySelectorAll(".check-btn")
        var countDone = 1
        doneBtn.forEach(elementDoneBtn => {
                elementDoneBtn.setAttribute('id', 'do-' + countDone);
                countDone++
        });
}

// set atributes remove
function setAttributeRemove() {
        let removeBtn = document.querySelectorAll(".remove-btn")
        var countRemove = 1
        removeBtn.forEach(elementRemoveBtn => {
                elementRemoveBtn.setAttribute('id', 'line-' + countRemove);
                countRemove++
        });
}

// count tasks checked
function countTasksChecked() {
        let quantTasks = document.querySelectorAll('.task')
        let quantChecked = document.querySelectorAll('.chkd')
        let taskNCkd = document.querySelector('.task-n-ckd')
        let taskCkd = document.querySelector('.task-ckd')
        taskNCkd.innerHTML = quantTasks.length
        taskCkd.innerHTML = quantChecked.length
        let progressBar = document.querySelector('.progress-bar')
        let progress = (quantChecked.length * 258) / quantTasks.length
        progressBar.style.width = progress + 'px'

        if (quantTasks.length != 0) {
                progressBar.style.width = progress + 'px'
        }else {
                progressBar.style.width = '0'
        }
}


// Convert date
function convertDate(incase) {
        var monthextense = ''
        switch(incase) {
                case '00':
                        var monthextense = 'Jan'
                        break
                case '01':
                        var monthextense = 'Fev'
                        break
                case '02':
                        var monthextense = 'Mar'
                        break
                case '03':
                        var monthextense = 'Abr'
                        break
                case '04':
                        var monthextense = 'Mai'
                        break
                case '05':
                        var monthextense = 'Jun'
                        break
                case '06':
                        var monthextense = 'Jul'
                        break
                case '07':
                        var monthextense = 'Ago'
                        break
                case '08':
                        var monthextense = 'Set'
                        break
                case '09':
                        var monthextense = 'Out'
                        break
                case '10':
                        var monthextense = 'Nov'
                        break
                case '11':
                        var monthextense = 'Dez'
                        break
        }
        return monthextense
}


// representation of dates
function dayColors() {
        // current month
        let Month = new Date().getMonth()
        let currentMonth = (Month < 10) ? '0' + Month : Month

        // Last Month
        let lastMonthTake = new Date(new Date().getTime())
        lastMonthTake.setMonth(Month -1)
        let lastMonthN = lastMonthTake.getMonth()
        let lastMonth = (lastMonthN < 10) ? '0' + lastMonthN : lastMonthN
                
        // today
        let dateToday = new Date().getDate()
        let dateDay = (dateToday < 10) ? '0' + dateToday : dateToday
        let today = document.querySelector('#date-2')
        today.innerHTML = `${dateDay} ${convertDate(currentMonth.toString())}`
        today.style.background = '#ffe39b'
        
        // yesterday
        let dateYesterdayTake = new Date(new Date().getTime())
        dateYesterdayTake.setDate(dateToday -1)
        let dateYesterdayN = dateYesterdayTake.getDate()
        let dateYesterday = (dateYesterdayN < 10) ? '0' + dateYesterdayN : dateYesterdayN
        let yesterdayMonth = ( dateToday == 1) ? lastMonth : currentMonth


        let yesterday = document.querySelector('#date-1')
        yesterday.innerHTML = `${dateYesterday} ${convertDate( yesterdayMonth.toString())}`
        yesterday.style.background = '#ff9d98'

        // set dateOrder
        let line = document.querySelectorAll('.task')
        let year = new Date().getFullYear()
        var countDate = -1
        zero = (dateToday < 10) ? '0' : ' '
        line.forEach(element => {
                element.setAttribute('dateOrder', year.toString() + (currentMonth + 1).toString() + zero + (dateToday + countDate).toString())
                countDate++
        })
}


function addColors() {
        let allToday = document.querySelectorAll('.date')
        
        let dateToday = new Date().getDate()
        let currentDay = (dateToday < 10) ? '0' + dateToday : dateToday
        let Month = new Date().getMonth()
        let currentMonth = (Month < 10) ? '0' + Month : Month
        let dayCrrt = `${currentDay} ${convertDate(currentMonth.toString())}`

        for (t of allToday) {
                if (t.innerHTML == dayCrrt) {
                        t.style.background = '#ffe39b'
                }
        }
}


// checked
function checked() {
        document.querySelectorAll(".check-btn").forEach( function(button) {
                button.addEventListener("click", function(event) {
                        let el = event.target || event.srcElement;
                        let id = el.id;
                        // alert(id);
                        el.style.display = 'none'
                        let check = document.querySelectorAll('.checked')
                        check.forEach(elementChk => {
                                if (elementChk.id == id) {
                                        elementChk.setAttribute('checked', 'checked')
                                        elementChk.classList.add('chkd')
                                }
                        });
                        countTasksChecked()
                });
        });
}

// Remove Line
function removeLine() {
        document.querySelectorAll(".remove-btn").forEach( function(button) {
                button.addEventListener("click", function(event) {
                        let el = event.target || event.srcElement;
                        let id = el.id;
                        // alert(id);
                        el.style.display = 'none'
                        let removeLine = document.querySelectorAll('.task')
                        removeLine.forEach(elementLine => {
                                if (elementLine.id == id) {
                                        elementLine.remove()
                                }
                        });
                        countTasksChecked()
                });
        });
}


// Menu Add
function menuAdd() {
        let addMenu = document.querySelector('.add-task')
        addMenu.addEventListener('click', function() {
                let menuActive = document.querySelector('.add-menu')
                menuActive.classList.toggle('active')
                addMenu.classList.toggle('active')
        })
}


// today
function today() {
        let nDate = new Date()
        let nds = nDate.getDate()
        let nd = (nds < 10) ? '0' + nds : nds
        let nms = nDate.getMonth() +1
        let nm = (nms < 10) ? '0' + nms : nms
        let ny = nDate.getFullYear()
        let today = `${ny}-${nm}-${nd}`
        let newDate = document.querySelector('#new-date')
        newDate.setAttribute('min', today)
}


function order() {
        // Seleciona as divs que queremos ordenar
        var divs = document.querySelectorAll('#list .task')
        // Converte a NodeList de divs para array
        var order = [].map.call(divs, function(element) {
                return element
        });
        // Ordena a array pelo atributo 'dateorder'
        order.sort(function(a,b) {
                var ca = parseInt(a.getAttribute('dateorder'), 10);
                var cb = parseInt(b.getAttribute('dateorder'), 10);
                return ca - cb
        })
        // Reinsere os filhos no pai, resultando na ordem desejada
        var container = document.querySelector('#list')
        for(var i=0; i<order.length; i++) {
                container.appendChild(order[i])
        }
}


function scroll() {
        let over = document.querySelector('.listBx')
        let full = document.querySelectorAll('.task').length
        if (full >= 10) {
                alert('Voc?? j?? t??m coisas demais a fazer! Alivie um pouco a pess??o!!!')
                over.style.overflow = 'scroll'
        }else{
                over.removeAttribute("style")
        }
}


// Create button
let create = document.querySelector('#create')
create.addEventListener('click', function() {
        
        
        if (document.querySelector('#new-task').value != "" && document.querySelector('#new-date').value != "") {
                setAttributeLine()
                setAttributeChecked()
                setAttributeDate()
                setAttributeDone()
                setAttributeRemove()

                let line = document.querySelectorAll('.task')
                var countLine = 1
                line.forEach(element => {
                        countLine++
                })
                let checkedChk = document.querySelectorAll(".checked")
                var countCheck = 1
                checkedChk.forEach(elementCheckChk => {
                        countCheck++
                })
                let dateBtn = document.querySelectorAll(".date")
                var countDate = 1
                dateBtn.forEach(elementDateBtn => {
                        countDate++
                })
                let doneBtn = document.querySelectorAll(".check-btn")
                var countDone = 1
                doneBtn.forEach(elementDateBtn => {
                        countDone++
                })
                let removeBtn = document.querySelectorAll(".remove-btn")
                var countRemove = 1
                removeBtn.forEach(elementDateBtn => {
                        countRemove++
                })

                let taskDate = document.querySelector('#new-date').value
                let dateN = taskDate[8]+taskDate[9]
                let monthCvrt = (taskDate[5]+taskDate[6]) -1
                let monthN = ((monthCvrt < 10) ? '0' + monthCvrt : monthCvrt).toString()
                let taskDateConverted = `${dateN} ${convertDate(monthN)}`
                let taskTitle = document.querySelector('#new-task').value
                let yearN = taskDate[0]+taskDate[1]+taskDate[2]+taskDate[3]
                let monthN2 = taskDate[5]+taskDate[6]
                let numberOrderDate = yearN + monthN2 + dateN

                let list = document.querySelector('#list')
                list.insertAdjacentHTML('beforeend', `<li class="task" dateorder="${numberOrderDate}" id="line-${countLine}"><div class="check"><input type="checkbox" disabled class="checked" id="do-${countCheck}"><span><i class="fa fa-check" aria-hidden="true"></i></span></div><h3 class="todo-name">${taskTitle}</h3><h4 class="date">${taskDateConverted}</h4><a class="done"><i class="fa fa-check check-btn" aria-hidden="true" id="do-${countDone}"></i></a><a class="remove"><i class="fa fa-times remove-btn" aria-hidden="true" id="line-${countRemove}"></i></a></li>`)
                
                let menuActive = document.querySelector('.add-menu')
                let addMenu = document.querySelector('.add-task')
                menuActive.classList.remove('active')
                addMenu.classList.remove('active')
                document.querySelector('#new-task').value = ""
                document.querySelector('#new-date').value = ""

                countTasksChecked()
                checked()
                removeLine()
                addColors()
                order()
                scroll()
        }else{
                alert('Os Campos T??tulo e Data n??o podem ser vazios!')
        }
})


function search() {
        let search = document.querySelector('.search')
        search.addEventListener('input', function() {
                let find = document.querySelectorAll('.todo-name')
                find.forEach(function(element) {
                        let el = element.innerHTML.toLowerCase()
                        let val = search.value.toLowerCase()
                        if (el.search(val) != -1) {
                                element.style.background = '#6bc27e81'
                        }else{
                                element.style.background = '#fff'
                        }
                        if (val == '') {
                                element.removeAttribute("style")
                        }
                })
                let clearBtn = document.querySelector('.search-ico-x')
                if (search.value != '') {
                        clearBtn.style.display = 'block'
                        clearBtn.addEventListener('click', function() {
                                search.value = ''
                                clearBtn.style.display = 'none'
                                let find = document.querySelectorAll('.todo-name')
                                find.forEach(function(element) {
                                        element.removeAttribute("style")
                                })
                        })
                }
        })
}


setAttributeLine()
setAttributeChecked()
setAttributeDate()
setAttributeDone()
setAttributeRemove()
countTasksChecked()
menuAdd()
checked()
removeLine()
today()
dayColors()
scroll()
search()