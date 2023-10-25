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
                listItem.innerHTML = `<strong>Recipe Name: ${recipeName}</strong>, Ingredient Name: <strong>${ingredientName}</strong>, Amount: <strong>${recipeIngredient.amount}</strong>`;
                recipeIngredientList.appendChild(listItem);
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
