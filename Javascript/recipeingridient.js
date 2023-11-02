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


    // Sample array of recipes
    const recipes = [
        { name: "Recipe 1", description: "This is the first recipe" },
        { name: "Recipe 2", description: "This is the second recipe" },
        { name: "Recipe 3", description: "This is the third recipe" }
    ];

    // Function to display recipes in the container
    function displayRecipes() {
        const recipeContainer = document.getElementById("recipeContainer");

        // Clear existing content
        recipeContainer.innerHTML = "";

        // Loop through recipes and create HTML elements
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.className = "box bgcolor";
            recipeDiv.innerHTML = `<h2>${recipe.name}</h2><p>${recipe.description}</p>`;
            recipeContainer.appendChild(recipeDiv);
        });
    }

    // Call the function to display recipes
    displayRecipes();

    
    // Function to fetch recipes from the server
    async function fetchRecipes() {
        try {
            const response = await fetch('your_api_endpoint'); // Replace 'your_api_endpoint' with your actual API endpoint
            const data = await response.json();
            return data.recipes; // Assuming the API response has a 'recipes' property
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    }

    // Sample array of available ingredients
    const availableIngredients = ["ingredient1", "ingredient2"];

    // Function to filter and display recommended recipes
    async function displayRecommendedRecipes() {
        const recipeContainer = document.getElementById("recipeContainer");

        // Clear existing content
        recipeContainer.innerHTML = "";

        // Fetch recipes from the server
        const recipes = await fetchRecipes();

        // Filter recipes based on available ingredients
        const recommendedRecipes = recipes.filter(recipe =>
            recipe.ingredients.every(ingredient => availableIngredients.includes(ingredient))
        );

        // Display recommended recipes
        recommendedRecipes.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.className = "box bgcolor";
            recipeDiv.innerHTML = `<h2>${recipe.name}</h2><p>Ingredients: ${recipe.ingredients.join(", ")}</p>`;
            recipeContainer.appendChild(recipeDiv);
        });
    }

    // Call the function to display recommended recipes
    displayRecommendedRecipes();

