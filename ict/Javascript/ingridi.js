// Function to fetch ingredients data from the API
function fetchIngredients() {
    fetch('http://127.0.0.1:5000/ingredient', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        const ingredientList = document.getElementById('ingredient-list');
        ingredientList.innerHTML = ''; // Clear the existing list
        data.forEach((ingredient) => {
            const listItem = document.createElement('li');

            // Fetch unit name and sort ingredient name
            fetch(`http://127.0.0.1:5000/unit/${ingredient.unit_id}`)
                .then((response) => response.json())
                .then((unitData) => {
                    fetch(`http://127.0.0.1:5000/sort-ingredient/${ingredient.sort_ingredient_id}`)
                        .then((response) => response.json())
                        .then((sortIngredientData) => {
                            listItem.innerHTML = `${ingredient.id}, <strong>${ingredient.name}</strong> - <strong>${ingredient.description}</strong>, Amount: <strong>${ingredient.amount}</strong>, BB Date: <strong>${ingredient.bb_date}</strong>, Last Restocked: <strong>${ingredient.last_restocked}</strong>, Unit: <strong>${unitData.name}</strong>, Sort : ${sortIngredientData.name}`;

                            // Add a delete button for each ingredient
                            const deleteButton = document.createElement('button');
                            deleteButton.textContent = 'Delete';
                            deleteButton.addEventListener('click', () => deleteIngredient(ingredient.id));
                            listItem.appendChild(deleteButton);

                            ingredientList.appendChild(listItem);
                        })
                        .catch((error) => {
                            console.error('Error fetching sort ingredient:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error fetching unit:', error);
                });
        });
    })
    .catch((error) => {
        console.error('Error fetching ingredients:', error);
        const message = document.getElementById('message');
        message.textContent = 'An error occurred while fetching ingredients.';
    });
}


// Function to delete an ingredient by ID
function deleteIngredient(ingredientId) {
    const confirmation = confirm(`Are you sure you want to delete the ingredient with ID ${ingredientId}?`);
    if (confirmation) {
        fetch(`http://127.0.0.1:5000/ingredient/${ingredientId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                // Remove the deleted ingredient from the list
                fetchIngredients();
            } else if (response.status === 404) {
                alert('Ingredient not found.');
            } else {
                throw new Error('Failed to delete ingredient.');
            }
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
    }
}

// Add ingredients
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createIngredientForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        message.textContent = 'Creating ingredient...';

        const ingredientData = {
            name: form.name.value,
            sort_ingredient_id: parseInt(form.sort_ingredient_id.value),
            description: form.description.value,
            amount: parseFloat(form.amount.value),
            unit_id: parseInt(form.unit_id.value),
            bb_date: form.bb_date.value,
            last_restocked: form.last_restocked.value,
        };

        fetch('http://127.0.0.1:5000/ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredientData),
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to create ingredient.');
            }
        })
        .then((data) => {
            message.textContent = 'Ingredient created successfully!';
            form.reset(); // Clear the form fields
            fetchIngredients(); // Refresh the ingredient list
        })
        .catch((error) => {
            message.textContent = 'Error: ' + error.message;
        });
    });
    function updateIngredient() {
        const updateIngredientId = document.getElementById('updateIngredientId').value;
    
        const updateData = {
            name: document.getElementById('updateName').value,
            sort_ingredient_id: parseInt(document.getElementById('updateSortIngredientId').value),
            description: document.getElementById('updateDescription').value,
            amount: parseFloat(document.getElementById('updateAmount').value),
            unit_id: parseInt(document.getElementById('updateUnitId').value),
            bb_date: document.getElementById('updateBbDate').value,
            last_restocked: document.getElementById('updateLastRestocked').value,
        };
    
        fetch(`http://127.0.0.1:5000/ingredient/${updateIngredientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then((response) => {
            if (response.status === 200) {
                // Ingredient updated successfully
                document.getElementById('updateIngredientForm').reset(); // Clear the update form
                fetchIngredients(); // Refresh the ingredient list
            } else if (response.status === 404) {
                alert('Ingredient not found.');
            } else {
                throw new Error('Failed to update ingredient.');
            }
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
    }
    
    // Add event listener to the update form
    document.getElementById('updateIngredientForm').addEventListener('submit', function (event) {
        event.preventDefault();
        updateIngredient();
    });  
    // Fetch ingredients on page load
    fetchIngredients();
    
});