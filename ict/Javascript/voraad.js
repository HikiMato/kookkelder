// Function to fetch user types data from the API
function fetchUserTypes() {
    fetch('http://127.0.0.1:5000/usertype', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const userTypesList = document.getElementById('user-types-list');
        data.forEach(userType => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${userType.id}, Type: ${userType.type}`;
            userTypesList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

//usertype add
window.addEventListener('load', fetchUserTypes);
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createUserTypeForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        message.textContent = 'Creating user type...';

        const userTypeData = {
            type: form.type.value
        };

        fetch('http://127.0.0.1:5000/usertype', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userTypeData)
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to create user type.');
            }
        })
        .then(data => {
            message.textContent = 'User type created successfully!';
            form.reset(); // Clear the form fields
        })
        .catch(error => {
            message.textContent = 'Error: ' + error.message;
        });
    });
});
//usertype add
//usertype delete
const deleteButton = document.getElementById('deleteButton');
const usertypeIdToDelete = 1; // Replace with the actual usertype ID you want to delete

deleteButton.addEventListener('click', () => {
    fetch(`http://127.0.0.1:5000/usertype/${usertypeIdToDelete}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 200) {
            // User type deleted successfully
            console.log('User type deleted successfully');
        } else if (response.status === 404) {
            // User type not found
            console.error('User type not found');
        } else {
            // Error occurred
            console.error('Failed to delete user type');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
//usertype delete