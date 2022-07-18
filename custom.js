function fetchData() {
    fetch('https://reqres.in/api/users?page=1&per_page=10')
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.data);
            const html = data.data.map(user => {
                return `
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
                </div>
                `
            })
            .join("");
            document.querySelector('#app').insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);
        });
}

fetchData(); 

/* Usefule Website 
https://w3collective.com/fetch-display-api-data-javascript/

API Link
https://reqres.in/api/users?page=1&per_page=10

https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/#:~:text=Approach%3A%20First%20make%20the%20necessary,by%20await%20fetch()%20method.


async function getUsers(page_no, per_page){
	let response = await axios('https://reqres.in/api/users?page=' + page_no + '&per_page=' + per_page)
    
    var data = await response.json()
    console.log(data)
	response?.data.data.map((user, index)=>{
		console.log(user.first_name)
	})
}

getUsers(1)
*/
