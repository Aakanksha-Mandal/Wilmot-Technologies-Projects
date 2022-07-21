let total_pages = 0;
let users = [];
let active_user = {};
async function fetchData(page) {
    const response = await fetch('https://reqres.in/api/users?page=' + page + '&per_page=10')
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error("ERROR")
            }
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error)
        })
    console.log(response)
    return response
}

async function generateUsers(page_no = 1) {
    const users_data = await fetchData(page_no)
    users = users_data.data
    total_pages = users_data.total_pages
    document.getElementById("app").innerHTML = ""
    if(users_data.data) {
        let appHtml = ""
        users_data.data.map((user, index) => {
                const user_string = JSON.stringify(user);
                appHtml += `
                <div class="row">
                    <div class="col">
                        <p><img src="${user.avatar}" alt="${user.first_name}"/></p>
                    </div>
                    <div class="col">
                        <p>First Name: ${user.first_name}</p>
                    </div>
                    <div class="col">
                        <p>Last Name: ${user.last_name}</p>
                    </div>
                    <div class="col">
                        <p>Email: ${user.email}</p>
                    </div>
                    <div class="col">
                        <button onclick="showUserDetails('${user.id}')">Open</button>
                    </div>
                </div>
                `
        })
        document.getElementById("app").innerHTML = appHtml
        generatePagination(total_pages)
    }

}

function generatePagination(total_pages) {
    let pagination_code = ""
    for (let i= 1; i <= total_pages; i++) {
        pagination_code += '<button type="button" onclick="generateUsers(' + i + ')">' + i + '</button>'
    }
    document.getElementById("pagination").innerHTML = pagination_code
}

generateUsers()


function showUserDetails(user_id){
    const user_details = users.filter((user) => {
        return user.id == user_id
    })[0];

    if (user_id != user_details.id) {
        alert("ERROR: invalid user")
        return
    }

    console.log(user_details);
    document.getElementById('overlay').classList = "show"
    document.getElementById('user_avatar').setAttribute('src',user_details.avatar)
    document.getElementById('user_title').innerHTML = user_details.first_name+" "+user_details.last_name
    document.getElementById('user_first_name').innerHTML = user_details.first_name
    document.getElementById('user_last_name').innerHTML = user_details.last_name
    document.getElementById('user_email').innerHTML = user_details.email

    //User Form
    document.getElementById('form_first_name').value = user_details.first_name
    document.getElementById('form_last_name').value = user_details.last_name
    document.getElementById('form_email').value = user_details.email
}

function closeUserDetails() {
    document.getElementById('overlay').classList.remove("show")
    document.getElementById('overlay').classList.add("hide")
}

function toggleUserInfo(ele_show, ele_hide){
    const showEle = document.getElementById(ele_show)
    const hideEle = document.getElementById(ele_hide)
    showEle.classList.remove('hide')
    showEle.classList.add('show')
    hideEle.classList.remove('show')
    hideEle.classList.add('hide')
}