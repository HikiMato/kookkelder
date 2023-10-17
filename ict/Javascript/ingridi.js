document.addEventListener("DOMContentLoaded", () => {
    const ingredientList = document.getElementById("ingredient-list");

    // Fetch ingredients from your API endpoint
    fetch('http://127.0.0.1:5000/ingredient', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            data.forEach(ingredient => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${ingredient.name}</strong> - ${ingredient.description}, Amount: ${ingredient.amount}, BB Date: ${ingredient.bb_date}, Last Restocked: ${ingredient.last_restocked}`;
                ingredientList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement("li");
            listItem.innerHTML = "No ingredients found.";
            ingredientList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error("Error fetching ingredients:", error);
        const listItem = document.createElement("li");
        listItem.innerHTML = "An error occurred while fetching ingredients.";
        ingredientList.appendChild(listItem);
    });
});
