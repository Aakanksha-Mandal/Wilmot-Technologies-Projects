const task = document.getElementById("task")
const toDoBox = document.getElementById("to-do-box")
const date = document.getElementById("date")
const time = document.getElementById("time")
const priority = document.getElementById("priority")
const details = document.getElementById("details")
const add = document.getElementById("add_btn")
const table = document.getElementById("table")

add.addEventListener(
    "click",
    function() {
        addToDo()
        clear()
    }
)

const addToDo = () => {
    const tableBody = table.tBodies[0]
    tableBody.innerHTML += `
            <tr>
                <td>${task.value}</td>
                <td>${date.value}</td> 
                <td>${time.value}</td>
                <td>${priority.value}</td>
                <td>${details.value}</td>
                <td class="remove_btn"><i class="fas fa-times" onclick="removeTodoItem(this.parentNode.parentNode)"></i></td>
            </tr>`
    
           

    tableBody.querySelector("tr").addEventListener(
        "click",
        function() {
            this.classList.toggle("done")
        }
    )
   /* WAY 2 TO DELETE LIST ITEM
    const closeBtn = tableBody.querySelector("tr").querySelector("i")
    
    closeBtn.addEventListener(
        "click",
        function(e) {
            e.target.parentNode.parentNode.remove()
        }
    ) 
   */
    
}

function removeTodoItem(ele){
    ele.remove()
}

function clear() {
    document.getElementById("task").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
    document.getElementById("priority").value = ""
    document.getElementById("details").value = ""
}
