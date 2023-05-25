const lang = navigator.language
let date = new Date()
let dayNumber = date.getDate()
let monthNameShort = date.toLocaleString(lang, {month: 'short'})
// VALUE OF INITIAL TASK LIST
let taskList = []
let initialTaskList = []



function menuAdd() {
    let addMenu = document.querySelector('.add-task')
    addMenu.addEventListener('click', function() {
        let menuActive = document.querySelector('.card')
        menuActive.classList.toggle('active')
        addMenu.classList.toggle('active')
    })
}


function yesterDay() {
    const lang = navigator.language

    let dateYesterdayTake = new Date(new Date().getTime())
    dateYesterdayTake.setDate(new Date().getDate() -1)
    let yesterday = dateYesterdayTake.getDate()
    let lastDayMonthName = dateYesterdayTake.toLocaleString(lang, {month: 'short'})

    return {
        'yesterdayDate': dateYesterdayTake,
        'yesterday': yesterday,
        'lastDayMonthName': lastDayMonthName
    }
}


// SHOW TASK
function showTasks() {
    let tasks = ''
    taskList.forEach((task, index) => {
        tasks = tasks + `
            <li class="task">
                <div class="check">
                    <input type="checkbox" disabled class="checked" ${task.checked && "checked"}>
                    <span><i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
                <h3 class="todo-name ${task.checked && "task-done"}">${task.task}</h3>
                <h4 class="date" dateInfo="${task.date}">${task.day} ${task.month}</h4>
                <a class="done" onClick="completeTask(${index})"><i class="fa fa-check check-btn" aria-hidden="true"></i></a>
                <a class="remove" onClick="removeTask(${index})"><i class="fa fa-times remove-btn" aria-hidden="true"></i></a>
            </li>
        `
    })
    let list = document.querySelector('#list')
    list.innerHTML = tasks

    localStorage.setItem('tasks', JSON.stringify(taskList))
}


// ADD TASK
const add = document.querySelector('#create')
const newTask = document.querySelector('#new-task')
const newDate = document.querySelector('#new-date')
add.addEventListener('click', function addTask() {

    if (newTask.value == '' || newDate.value == '') {
        alert('Os campos: Título e Data não podem ser vazios.')
    }else{
        const lang = navigator.language
        const date = new Date(
            newDate.value[0] + newDate.value[1] + newDate.value[2] + newDate.value[3],
            (newDate.value[5] + newDate.value[6]) - 1,
            newDate.value[8] + newDate.value[9]
            )
            taskList.push({
                'task': newTask.value,
                'date': date.toLocaleDateString().split('/').reverse().join(''),
                'day': date.getDate(),
                'month': date.toLocaleString(lang, {month: 'short'}),
                'checked': false
            })
        }

        document.querySelector('.add-task').classList.remove('active')
        document.querySelector('.card').classList.remove('active')
        newTask.value = '' 
        newDate.value = ''

        orderTasks()
})


// DELETE TASKS
function removeTask(index) {
    taskList.splice(index, 1)
    orderTasks()
}


// COMPLETE TASKS
function completeTask(index) {
    taskList[index].checked = !taskList[index].checked
    orderTasks()
}


// ADD COLORS AT DATES
function addColors() {
    let allDays = document.querySelectorAll('.date')
    allDays.forEach((day) => {
        let dayInfo = day.getAttribute('dateInfo')
        let today = date.toLocaleDateString().split('/').reverse().join('')
        if (dayInfo < today) {
            day.style.background = '#ff9d98'
        }
        if (dayInfo == today) {
            day.style.background = '#ffe39b'
        }
    })
}


// ORDER TASKS
function orderTasks() {
    if (taskList) {
        taskList.sort(function(a,b) {
            var ca = parseInt(a.date, 10);
            var cb = parseInt(b.date, 10);
            return ca - cb
        })
    }
    showTasks()
    countTasks()
    addColors()
    scroll()
    searchTask()
}


// OVERFLOW TASKS
function scroll() {
    let listBx = document.querySelector('.listBx')
    let over = parseInt(listBx.offsetHeight) - 40
    let full = parseInt(document.querySelector('#list').offsetHeight)
    if (full > over) {
            listBx.style.overflow = 'scroll'
    }else{
            listBx.removeAttribute("style")
    }
}


// SEARCH TASKS
function searchTask() {
    let searchInput = document.querySelector('.search')
    searchInput.addEventListener('input', function() {
        let taskName = document.querySelectorAll('.todo-name')
        taskName.forEach(function(element) {
            let taskNameLower = element.innerHTML.toLowerCase()
            let inputValueLower = searchInput.value.toLowerCase()
            if (taskNameLower.search(inputValueLower) != -1) {
                element.style.background = '#6bc27e81'
            }else{
                element.style.background = '#fff'
            }
            if (inputValueLower == '') {
                element.removeAttribute("style")
            }

            let clearBtn = document.querySelector('.search-ico-x')
            if (searchInput.value != '') {
                clearBtn.style.display = 'block'
                
                clearBtn.addEventListener('click', function() {
                    searchInput.value = ''
                    clearBtn.style.display = 'none'

                    taskName.forEach(function(element) {
                        element.removeAttribute("style")
                    })
                })
            }else{
                clearBtn.style.display = 'none'
            }
        })
    })
}


// COUNT TASKS
function countTasks() {
    let taskNotCkd = document.querySelector('.task-n-ckd')
    let quantTasks = taskList.length
    taskNotCkd.innerHTML = quantTasks
    
    let taskDone = document.querySelectorAll('.task-done')
    let quantTasksCkd = taskDone.length
    let taskCkd = document.querySelector('.task-ckd')
    taskCkd.innerHTML = quantTasksCkd
    
    
    let progressBar = document.querySelector('.progress-bar')
    let progressBx = document.querySelector('.countBx').offsetWidth
    let progress = (quantTasksCkd * (progressBx - 2)) / quantTasks
    if (quantTasks.length != 0) {
            progressBar.style.width = progress + 'px'
    }else {
            progressBar.style.width = '0'
    }
}


// CALENDAR
function calendar() {
    const lang = navigator.language

    let date = new Date()
    
    let dayNumber = date.getDate()
    let dayName = date.toLocaleString(lang, {weekday: 'long'})
    let monthName = date.toLocaleString(lang, {month: 'long'})
    let year = date.getFullYear()
    
    document.getElementById('monthName').innerHTML = monthName
    document.getElementById('dayName').innerHTML = dayName
    document.getElementById('dayNumber').innerHTML = dayNumber
    document.getElementById('year').innerHTML = year
}


// NO ADD YESTERDAY DATES
function noAddYesterdayDates() {
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


// LOCAL STORAGE DOWNLOAD
function localStorageTasks() {
    if (taskList) {
        const tasksLocal = localStorage.getItem('tasks')
        taskList = JSON.parse(tasksLocal)
        orderTasks()
    }
}


function noTaskInitial() {
    if (!localStorage.hasOwnProperty('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(initialTaskList))
    }
}


noTaskInitial()
menuAdd()
localStorageTasks()
noAddYesterdayDates()
orderTasks()
calendar()
