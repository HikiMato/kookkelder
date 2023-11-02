function fetchRecipeAndIngredientData() {
    const recipeIngredientList = document.getElementById('recipe-ingredient-list');
    const recipeNameMapping = {};
    const ingredientNameMapping = {};

    // Function to fetch data and create mappings
    const fetchDataAndMap = (url, map, key) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Create a mapping from IDs to names
                data.forEach((item) => {
                    map[item.id] = item[key];
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                recipeIngredientList.innerHTML = `An error occurred while fetching ${key}s.`;
            });
    };

    // Fetch recipe data and create mapping
    const fetchRecipes = fetchDataAndMap('http://127.0.0.1:5000/recipe', recipeNameMapping, 'name');

    // Fetch ingredient data and create mapping
    const fetchIngredients = fetchDataAndMap('http://127.0.0.1:5000/ingredient', ingredientNameMapping, 'name');

    // After both mappings are created, fetch recipe ingredient data
    Promise.all([fetchRecipes, fetchIngredients])
        .then(() => {
            recipeIngredientList.innerHTML = ''; // Clear the existing list

            fetch('http://127.0.0.1:5000/recipe-ingredient', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((ingredientResponse) => ingredientResponse.json())
                .then((ingredientData) => {
                    ingredientData.forEach((recipeIngredient) => {
                        const listItem = document.createElement('li');
                        const recipeName = recipeNameMapping[recipeIngredient.recipe_id] || 'Unknown Recipe';
                        const ingredientName = ingredientNameMapping[recipeIngredient.ingredient_id] || 'Unknown Ingredient';
                        listItem.innerHTML = `<strong>Recipe Name: ${recipeName}</strong>, Ingredient Name: <strong>${ingredientName}</strong>, Amount: <strong>${recipeIngredient.amount}</strong>
                        <button class="update-button" data-recipe-ingredient-id="${recipeIngredient.id}">Update</button>
                        <button class="delete-button" data-recipe-ingredient-id="${recipeIngredient.id}">Delete</button>`;
                        recipeIngredientList.appendChild(listItem);
                    });

                    // Add event listeners for update and delete buttons
                    recipeIngredientList.addEventListener('click', (event) => {
                        if (event.target.classList.contains('update-button')) {
                            const recipeIngredientId = event.target.getAttribute('data-recipe-ingredient-id');
                            // Implement update functionality here, e.g., open a modal or form for editing.
                        } else if (event.target.classList.contains('delete-button')) {
                            const recipeIngredientId = event.target.getAttribute('data-recipe-ingredient-id');
                            // Implement delete functionality here, e.g., confirm deletion and send a delete request.
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    recipeIngredientList.innerHTML = 'An error occurred while fetching data.';
                });
        })
        .catch((error) => {
            console.error('Error:', error);
            recipeIngredientList.innerHTML = 'An error occurred while fetching data.';
        });
}

// Call the fetchRecipeAndIngredientData function when the page loads
fetchRecipeAndIngredientData();

// Assume you have a form with input fields for recipeId, ingredientId, unitId, and amount.
const form = document.getElementById('add-recipe-ingredient-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const recipeId = document.getElementById('recipeId').value;
    const ingredientId = document.getElementById('ingredientId').value;
    const unitId = document.getElementById('unitId').value;
    const amount = document.getElementById('amount').value;

    addRecipeIngredient(recipeId, ingredientId, unitId, amount);
});

// Function to add a new recipe ingredient
function addRecipeIngredient(recipeId, ingredientId, unitId, amount) {
    const recipeIngredientList = document.getElementById('recipe-ingredient-list');

    // Send a POST request to the server to add the recipe ingredient
    fetch('http://127.0.0.1:5000/recipe-ingredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipe_id: recipeId,
            ingredient_id: ingredientId,
            unit_id: unitId,
            amount: amount,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Check if the request was successful
            if (data.message === 'Recipe ingredient created successfully') {
                // Clear the existing list and fetch updated data
                recipeIngredientList.innerHTML = '';
                fetchRecipeAndIngredientData();
            } else {
                console.error('Error:', data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}