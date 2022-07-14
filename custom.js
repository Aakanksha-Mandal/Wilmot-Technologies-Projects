
async function getUsers(page_no, per_page){
	let response = await axios('https://reqres.in/api/users?page='+page_no+'&per_page='+per_page)

	response?.data.data.map((user, index)=>{
		console.log(user.first_name)
	})
}

getUsers(1)

/* Usefule Website 
https://w3collective.com/fetch-display-api-data-javascript/
*/
