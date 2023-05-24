const lang = navigator.language
let date = new Date()
let dayNumber = date.getDate()
let monthNameShort = date.toLocaleString(lang, {month: 'short'})


function menuAdd() {
    let addMenu = document.querySelector('.add-task')
    addMenu.addEventListener('click', function() {
        let menuActive = document.querySelector('.card')
        menuActive.classList.toggle('active')
        addMenu.classList.toggle('active')
    })
}
menuAdd()


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


// VALUE OF INITIAL TASK LIST
let taskList = [
    {
        'task': 'Estudar React Js',
        'date': `${yesterDay().yesterdayDate.toLocaleDateString().split('/').reverse().join('')}`,
        'day': `${yesterDay().yesterday}`,
        'month': `${yesterDay().lastDayMonthName}`,
        'checked': false
    },
    {
        'task': 'Sessão de cinema',
        'date': `${date.toLocaleDateString().split('/').reverse().join('')}`, 
        'day': `${dayNumber}`,
        'month': `${monthNameShort}`,
        'checked': false
    },
]


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
}
showTasks()


// ADD TASK
const add = document.querySelector('#create')
const newTask = document.querySelector('#new-task')
const newDate = document.querySelector('#new-date')
add.addEventListener('click', function addTask() {
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
    // showTasks()
    // addColors()
    orderTasks()
    document.querySelector('.add-task').classList.remove('active')
    document.querySelector('.card').classList.remove('active')
    newTask.value = '' 
    newDate.value = ''
})


// DELETE TASKS
function removeTask(index) {
    taskList.splice(index, 1)
    // showTasks()
    // addColors()
    orderTasks()
}


// COMPLETE TASKS
function completeTask(index) {
    taskList[index].checked = !taskList[index].checked
    // showTasks()
    // addColors()
    orderTasks()
}


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
addColors()


// ORDER TASKS
function orderTasks() {
    taskList.sort(function(a,b) {
        var ca = parseInt(a.date, 10);
        var cb = parseInt(b.date, 10);
        return ca - cb
    })
    showTasks()
    addColors()
    scroll()
    searchTask()
    countTasks()
}
orderTasks()


// OVERFLOW TASKS
function scroll() {
    let over = document.querySelector('.listBx')
    let full = taskList.length
    if (full >= 10) {
            alert('Você já têm coisas demais a fazer! Alivie um pouco a pessão!!!')
            over.style.overflow = 'scroll'
    }else{
            over.removeAttribute("style")
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


function countTasks() {
    let taskNotCkd = document.querySelector('.task-n-ckd')
    let quantTasks = taskList.length
    taskNotCkd.innerHTML = quantTasks
    
    let taskDone = document.querySelectorAll('.task-done')
    let quantTasksCkd = taskDone.length
    let taskCkd = document.querySelector('.task-ckd')
    taskCkd.innerHTML = quantTasksCkd
    
    
    let progressBar = document.querySelector('.progress-bar')
    let progress = (quantTasksCkd * 278) / quantTasks
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
calendar()
