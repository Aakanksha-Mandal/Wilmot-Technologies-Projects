let counter = 0
let editOn = false
let todoList = []
const task = document.getElementById("task")
const toDoBox = document.getElementById("to-do-box")
const date = document.getElementById("date")
const dateInput = document.getElementById("dateInput")
const dataFilter = document.getElementById("dateFilter")
const time = document.getElementById("time")
const timeInput = document.getElementById("timeInput")
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
        const todoItem = {
            id: counter,
            task: task.value,
            date: date.value,
            time: time.value,
            priority: priority.value,
            details: details.value
        }
        //
        const validation = validate(todoItem)
        
        //
        if(validation){
            addToDo(todoItem)
        }

    }
) 

function validate(todoItem) {
    if (todoItem.task == "") {
        alert("Task cannot be blank")
        return false
    }
    if (todoItem.date == "") {
        alert("Date cannot be blank.")
        return false
    }
    if (todoItem.time == "") {
        alert("Time cannot be blank.")
        return false
    }
    if (priority.value == "" || (priorityRegex.test(priority.value)) == false) {
        alert("Priority has to be high, medium, or low.")
        return false
    }
    return true
}


const addToDo = (todoItem) => { 
    todoList.push(todoItem)
    counter++
    const tableBody = table.tBodies[0]
    save()
    generateTodoItem(tableBody, todoItem)
}

function save(todolist = null) {
    const list = todolist??todoList
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
    const remove_id = ele.getAttribute('data-id')
    let retrieved = localStorage.getItem("todoList")
    todoList = JSON.parse(retrieved)
    if(todoList?.length > 0) {
        const todolist = todoList.filter((todoItem)=>{
            return todoItem.id != remove_id
        })
        save(todolist)
    }
    return false
}

const generateTodoItem = (tableBody, todoItem) => {
    tableBody.innerHTML += `
            <tr data-id="${todoItem.id}">
                <td class="edit_btn"><i class="fas fa-edit" onclick="editTodoItem(this)"></i></td>
                <td onClick="strikeToDoItem(this)">${todoItem.task}</td>
                <td class="dateInput" onClick="strikeToDoItem(this)">${getFormattedDate(todoItem.date)}<div class="datePicker hide"><input type="date" id="datePicker" value=""></div></td> 
                <td class="timeInput" onClick="strikeToDoItem(this)">${todoItem.time}<div class="timePicker hide"><input type="time" id="timePicker"></div></td>
                <td onClick="strikeToDoItem(this)">${todoItem.priority}</td>
                <td onClick="strikeToDoItem(this)">${todoItem.details}</td>
                <td class="save_btn"><div class="save_btn_wrap hide"><i class="fas fa-save" onclick="saveTodoItem(this)" data-id="${todoItem.id}"></i></div></td>
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

    if (filters.dataFrom == undefined && filters.dataTo == undefined && filters.timeFrom == undefined && filters.timeTo == undefined && filters.priority == "") {
        alert("Filter Options are all blank.")
        return
    }

    let filteredResults = todoList.filter((item, index) => {
        if (item.date == filters.dateFrom) {
            return true
        }
        if (item.date >= filters.dateFrom && item.date <= filters.dateTo) {
            return true
        } 
        if (item.date == filters.dateTo) {
            return true
        }
        if (item.time == filters.timeFrom) {
            return true
        } 
        if (item.time >= filters.timeFrom && item.time <= filters.timeTo) {
            return true
        }
        if (item.time == filters.timeTo) {
            return true
        }
        if (item.priority == filters.priority) {
            return true
        }
    })

    const tableBody = table.tBodies[0]
    tableBody.innerHTML = ''
    generateTodoList(filteredResults)
       
}

function getFormattedDate(date){
    let dateObj = new Date(date + "EST")
    let formattedDate = dateObj.toLocaleString("en-GB", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    return formattedDate
}


function strikeToDoItem(ele) {
    if(editOn == "false"){
        ele.parentNode.classList.toggle("strike")
    }
}

function removeTodoItem(ele) {
    ele.remove()
    counter--
    remove(ele)
}

function editTodoItem(ele) {
    const parent_eles = ele.parentNode.parentNode.parentNode.childNodes
    
    const saveBtn = ele.parentNode.parentNode.getElementsByClassName('save_btn_wrap')[0]
    saveBtn.classList.remove('hide')
    saveBtn.classList.add('show')
    
    const datePicker = ele.parentNode.parentNode.getElementsByClassName('datePicker')[0]
    datePicker.classList.remove('hide')
    datePicker.classList.add('show')

    const timePicker = ele.parentNode.parentNode.getElementsByClassName('timePicker')[0]
    timePicker.classList.remove('hide')
    timePicker.classList.add('show')

    const child_eles = ele.parentNode.parentNode.childNodes
    for(let i = 0; i <= child_eles.length; i++) {
        const ele = child_eles[i]
        if(ele?.nodeName  == 'TD' && ele?.className != "edit_btn" && ele?.className != "remove_btn" && ele?.className != "save_btn" && ele?.className != "dateInput" && ele?.className != "timeInput"){
            editOn = true
            ele.setAttribute('contenteditable', true)
        }
    }
}

function saveTodoItem(ele) {
    let child_eles = ele.parentNode.parentNode.parentNode.childNodes

    child_eles = Array.from(child_eles)
    child_eles = child_eles.filter((ele)=>{
        return ele?.nodeName  == 'TD' && ele?.className != "edit_btn" && ele?.className != "remove_btn" && ele?.className != "save_btn"
    })
    
    
    const task = child_eles[0]
    const date = child_eles[1]
    const time = child_eles[2]
    const priority = child_eles[3]
    const details = child_eles[4]

    const todoItem_id = ele.parentNode.parentNode.parentNode.getAttribute('data-id');

    console.log(todoItem_id)

    const todoItem = {
        task: task.innerText,
        date: date.childNodes[1].childNodes[0].value,
        time: time.childNodes[1].childNodes[0].value,
        priority: priority.innerText,
        details: details.innerText
    }

    const todolist = localStorage.getItem('todoList')
    let parsedValues = JSON.parse(todolist)
    console.log(parsedValues)
    let item_index = 0 
    parsedValues.map((item, index)=>{
        if(item.id == todoItem_id){
            item_index = index;
            return; 
        }
    })

    parsedValues[item_index] = todoItem;
    localStorage.setItem('todoList', JSON.stringify(parsedValues))

    //save(todoItem)

    disableEdit(ele)
    
}

function disableEdit(ele){
    const child_eles = ele.parentNode.parentNode.parentNode.childNodes
    
    const saveBtn = ele.parentNode.parentNode.getElementsByClassName('save_btn_wrap')[0]
    saveBtn.classList.remove('show')
    saveBtn.classList.add('hide')

    const datePicker = ele.parentNode.parentNode.parentNode.getElementsByClassName('datePicker')[0]
    console.log(datePicker)
    console.log(ele.parentNode.parentNode.parentNode)
    datePicker.classList.remove('show')
    datePicker.classList.add('hide')

    const timePicker = ele.parentNode.parentNode.parentNode.getElementsByClassName('timePicker')[0]
    timePicker.classList.remove('show')
    timePicker.classList.add('hide')

    for(let i = 0; i <= child_eles.length; i++){
        const ele = child_eles[i]
        if(ele?.nodeName  == 'TD' && ele?.className != "edit_btn" && ele?.className != "remove_btn" && ele?.className != "save_btn") {
            ele.setAttribute('contenteditable', false)
        }
    }
}

function clear() {
    document.getElementById("task").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
    document.getElementById("priority").value = ""
    document.getElementById("details").value = ""
}

load()
