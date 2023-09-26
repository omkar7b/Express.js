function ongetacall(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    if (!name || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }

    // Storing Data
    let user = {
        name: name,
        email: email,
        phone: phone,
    };

    axios.post('http://localhost:3000/user/add-user', user)
        .then(response => {
            showUserOnScreen(response.data.newUserDetails);
            console.log(response.data.newUserDetails);
        })
        .catch(err => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
            console.log(err);
        });
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/user/get-user')
    .then(response => {
        console.log(response);

        for (let i = 0; i < response.data.allUsers.length; i++) {
            const user = response.data.allUsers[i];
            showUserOnScreen(user); 
        }
    })
    .catch(err => {
        console.log(err);
    });
});


// Show User On Screen Function
function showUserOnScreen(user) {
    let parentEle = document.getElementById('userList');
    let childEle = document.createElement('li');
    childEle.id = `user-${user.id}`; // Set a unique ID for each user element
    childEle.innerText = `${user.name} - ${user.email} - ${user.phone}`;

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    deleteBtn.style.background = 'orange';

    deleteBtn.onclick = () => {
        let userId = user.id;
        axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
            .then(() => {
                removeUserFromScreen(userId);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    childEle.appendChild(deleteBtn);
    parentEle.appendChild(childEle);
}



function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('userList');
    const childNodeToBeDeleted = document.getElementById(`user-${userId}`);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}



  
       
