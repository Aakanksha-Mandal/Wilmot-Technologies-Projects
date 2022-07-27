let counter = 0
let todoList = []
const task = document.getElementById("task")
const toDoBox = document.getElementById("to-do-box")
const date = document.getElementById("date")
const dataFilter = document.getElementById("dateFilter")
const time = document.getElementById("time")
const priority = document.getElementById("priority")
const details = document.getElementById("details")
const addButton = document.getElementById("add_btn")
const table = document.getElementById("table")
const dateFromFilter = document.getElementById("dateFromFilter")
const dateToFilter = document.getElementById("dateToFilter")
const timeFromFilter = document.getElementById("timeFromFilter")
const timeToFilter = document.getElementById("timeToFilter")
const priorityFilter = document.getElementById("priorityFilter")
let priorityRegex = /high|medium|low/i

addButton.addEventListener(
    "click",
    function() {
        validate()
    }
) 

function validate() {
    if (task.value == "") {
        alert("Task cannot be blank")
        return false
    }
    if (date.value == "") {
        alert("Date cannot be blank.")
        return false
    }
    if (time.value == "") {
        alert("Time cannot be blank.")
        return false
    }
    if (priority.value == "" || (priorityRegex.test(priority.value)) == false) {
        alert("Priority has to be high, medium, or low.")
        return false
    }
    addToDo()
    return true
}


const addToDo = () => { 
    const todoItem = {
        id: counter,
        task: task.value,
        date: date.value,
        time: time.value,
        priority: priority.value,
        details: details.value
    }

    todoList.push(todoItem)
    counter++
    const tableBody = table.tBodies[0]
    save()
    generateTodoItem(tableBody, todoItem)
}

function save(todolist = null) {
    const list = todolist??todoList;
    let stringified = JSON.stringify(list)
    localStorage.setItem("todoList", stringified)
}

function load() {
    let retrieved = localStorage.getItem("todoList")
    todoList = JSON.parse(retrieved)
    if (todoList?.length > 0) {
        generateTodoList(todoList)
    }else{
        todoList= []
    }
}

function remove(ele) {
    const remove_id = ele.getAttribute('data-id');
    console.log(remove_id)
    let retrieved = localStorage.getItem("todoList")
    todoList = JSON.parse(retrieved)
    if(todoList?.length > 0) {
        const todolist = todoList.filter((todoItem)=>{
            return todoItem.id != remove_id
        })
        
        console.log(todolist)
        save(todolist)
    }
    return false
}

const generateTodoItem = (tableBody, todoItem) => {
    tableBody.innerHTML += `
            <tr data-id="${todoItem.id}">
                <td onClick="doneToDoItem(this)">${todoItem.task}</td>
                <td onClick="doneToDoItem(this)">${getFormatedDate(todoItem.date)}</td> 
                <td onClick="doneToDoItem(this)">${todoItem.time}</td>
                <td onClick="doneToDoItem(this)">${todoItem.priority}</td>
                <td onClick="doneToDoItem(this)">${todoItem.details}</td>
                <td class="remove_btn"><i class="fas fa-times" onclick="removeTodoItem(this.parentNode.parentNode)"></i></td>
            </tr>`

     /* WAY 2 TO DELETE LIST ITEM
    const closeBtn = tableBody.querySelector("tr").querySelector("i")
    
    closeBtn.addEventListener(
        "click",
        function(e) {
            e.target.parentNode.parentNode.remove()
        }
    )*/

    clear()
}

function generateTodoList(list){
    const tableBody = table.tBodies[0]
    list?.map((todoItem, index)=>{
        generateTodoItem(tableBody, todoItem)
    })

}

function filterResults() {
    const filters = {
        dateFrom: dateFromFilter.value,
        dateTo: dateToFilter.value,
        timeFrom: timeFromFilter.value,
        timeTo: timeToFilter.value,
        priority: priorityFilter.value,
    }

    let filteredResults = todoList.filter((item, index) => {
        if (item.date == filters.dateFrom) {
            return true
        } else if (item.date >= filters.dateFrom && item.date <= filters.dateTo) {
            return true
        } else if (item.date == filters.dateTo) {
            return true
        }
        if (item.time == filters.timeFrom) {
            return item.time == filters.timeFrom
        } else if (item.time >= filters.timeFrom && item.time <= filters.timeTo) {
            return item.time >= filters.timeFrom && item.time <= filters.timeTo
        } else if (item.time == filters.timeTo) {
            return item.time == filters.timeFrom
        }
        if (item.priority == filters.priority) {
            return item.priority == filters.priority
        }
        if (filters.dateFrom != "" || filters.dateTo != "" || filters.timeFrom != "" || filters.timeTo != "" || filters.priority != "") {
            const tableBody = table.tBodies[0]
            tableBody.innerHTML = ''
            generateTodoList(filteredResults)
        }
    })
}

function getFormatedDate(date){
    let dateObj = new Date(date + "EST")
    let formattedDate = dateObj.toLocaleString("en-GB", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    return formattedDate
}


function doneToDoItem(ele) {
    ele.parentNode.classList.toggle("done")
}

function removeTodoItem(ele) {
    ele.remove()
    counter--
    remove(ele)
}

function clear() {
    document.getElementById("task").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
    document.getElementById("priority").value = ""
    document.getElementById("details").value = ""
}

load()let counter = 0
let todoList = []
const task = document.getElementById("task")
const toDoBox = document.getElementById("to-do-box")
const date = document.getElementById("date")
const dataFilter = document.getElementById("dateFilter")
const time = document.getElementById("time")
const priority = document.getElementById("priority")
const details = document.getElementById("details")
const addButton = document.getElementById("add_btn")
const table = document.getElementById("table")
const dateFromFilter = document.getElementById("dateFromFilter")
const dateToFilter = document.getElementById("dateToFilter")
const timeFromFilter = document.getElementById("timeFromFilter")
const timeToFilter = document.getElementById("timeToFilter")
const priorityFilter = document.getElementById("priorityFilter")
let priorityRegex = /high|medium|low/i

addButton.addEventListener(
    "click",
    function() {
        validate()
    }
) 

function validate() {
    if (task.value == "") {
        alert("Task cannot be blank")
        return false
    }
    if (date.value == "") {
        alert("Date cannot be blank.")
        return false
    }
    if (time.value == "") {
        alert("Time cannot be blank.")
        return false
    }
    if (priority.value == "" || (priorityRegex.test(priority.value)) == false) {
        alert("Priority has to be high, medium, or low.")
        return false
    }
    addToDo()
    return true
}


const addToDo = () => { 
    const todoItem = {
        id: counter,
        task: task.value,
        date: date.value,
        time: time.value,
        priority: priority.value,
        details: details.value
    }

    todoList.push(todoItem)
    counter++
    const tableBody = table.tBodies[0]
    save()
    generateTodoItem(tableBody, todoItem)
}

function save(todolist = null) {
    const list = todolist??todoList;
    let stringified = JSON.stringify(list)
    localStorage.setItem("todoList", stringified)
}

function load() {
    let retrieved = localStorage.getItem("todoList")
    todoList = JSON.parse(retrieved)
    if (todoList?.length > 0) {
        generateTodoList(todoList)
    }else{
        todoList= []
    }
}

function remove(ele) {
    const remove_id = ele.getAttribute('data-id');
    console.log(remove_id)
    let retrieved = localStorage.getItem("todoList")
    todoList = JSON.parse(retrieved)
    if(todoList?.length > 0) {
        const todolist = todoList.filter((todoItem)=>{
            return todoItem.id != remove_id
        })
        
        console.log(todolist)
        save(todolist)
    }
    return false
}

const generateTodoItem = (tableBody, todoItem) => {
    tableBody.innerHTML += `
            <tr data-id="${todoItem.id}">
                <td onClick="doneToDoItem(this)">${todoItem.task}</td>
                <td onClick="doneToDoItem(this)">${getFormatedDate(todoItem.date)}</td> 
                <td onClick="doneToDoItem(this)">${todoItem.time}</td>
                <td onClick="doneToDoItem(this)">${todoItem.priority}</td>
                <td onClick="doneToDoItem(this)">${todoItem.details}</td>
                <td class="remove_btn"><i class="fas fa-times" onclick="removeTodoItem(this.parentNode.parentNode)"></i></td>
            </tr>`

     /* WAY 2 TO DELETE LIST ITEM
    const closeBtn = tableBody.querySelector("tr").querySelector("i")
    
    closeBtn.addEventListener(
        "click",
        function(e) {
            e.target.parentNode.parentNode.remove()
        }
    )*/

    clear()
}

function generateTodoList(list){
    const tableBody = table.tBodies[0]
    list?.map((todoItem, index)=>{
        generateTodoItem(tableBody, todoItem)
    })

}

function filterResults() {
    const filters = {
        dateFrom: dateFromFilter.value,
        dateTo: dateToFilter.value,
        timeFrom: timeFromFilter.value,
        timeTo: timeToFilter.value,
        priority: priorityFilter.value,
    }

    let filteredResults = todoList.filter((item, index) => {
        if (item.date == filters.dateFrom) {
            return true
        } else if (item.date >= filters.dateFrom && item.date <= filters.dateTo) {
            return true
        } else if (item.date == filters.dateTo) {
            return true
        }
        if (item.time == filters.timeFrom) {
            return item.time == filters.timeFrom
        } else if (item.time >= filters.timeFrom && item.time <= filters.timeTo) {
            return item.time >= filters.timeFrom && item.time <= filters.timeTo
        } else if (item.time == filters.timeTo) {
            return item.time == filters.timeFrom
        }
        if (item.priority == filters.priority) {
            return item.priority == filters.priority
        }
        if (filters.dateFrom != "" || filters.dateTo != "" || filters.timeFrom != "" || filters.timeTo != "" || filters.priority != "") {
            const tableBody = table.tBodies[0]
            tableBody.innerHTML = ''
            generateTodoList(filteredResults)
        }
    })
}

function getFormatedDate(date){
    let dateObj = new Date(date + "EST")
    let formattedDate = dateObj.toLocaleString("en-GB", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    return formattedDate
}


function doneToDoItem(ele) {
    ele.parentNode.classList.toggle("done")
}

function removeTodoItem(ele) {
    ele.remove()
    counter--
    remove(ele)
}

function clear() {
    document.getElementById("task").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
    document.getElementById("priority").value = ""
    document.getElementById("details").value = ""
}

load()
