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
        task: task.value,
        date: date.value,
        time: time.value,
        priority: priority.value,
        details: details.value
    }

    todoList.push(todoItem)
    const tableBody = table.tBodies[0]
    generateTodoItem(tableBody, todoItem)
}

const generateTodoItem = (tableBody, todoItem) => {
    console.log(todoItem)
    tableBody.innerHTML += `
            <tr>
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
        console.log(filters.priority)
        if (item.priority == filters.priority) {
            return item.priority == filters.priority
        }
    })
    const tableBody = table.tBodies[0]
    tableBody.innerHTML = ''
    generateTodoList(filteredResults)
}

function getFormatedDate(date){
    let dateObj = new Date(date + "EST")
    console.log(date.value)
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
}

function clear() {
    document.getElementById("task").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
    document.getElementById("priority").value = ""
    document.getElementById("details").value = ""
}
