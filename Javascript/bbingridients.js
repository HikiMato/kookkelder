function fetchIngredients() {
  fetch(
    "http://127.0.0.1:5000/ingredient/check-expiration?days_until_expiration=7",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const ingredientList = document.getElementById("expiringIngredientsList");
      ingredientList.innerHTML = ""; // Clear the existing list
      data.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Name:</strong> ${ingredient.name}<br><strong>Description:</strong> ${ingredient.description}<br><strong>Expiration Date:</strong> ${ingredient.bb_date}`;
        listItem.classList.add("ingredient-item"); // Add the "ingredient-item" class
        ingredientList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching ingredients:", error);
      const message = document.getElementById("message");
      message.textContent = "An error occurred while fetching ingredients.";
    });
}

fetchIngredients();

function fetchTopIngredients() {
  fetch("http://127.0.0.1:5000/ingredient/top-ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const topIngredientsList = document.getElementById("topIngredientsList");
      topIngredientsList.innerHTML = ""; // Clear the existing list
      data.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Name:</strong> ${ingredient.name}<br><strong>Description:</strong> ${ingredient.description}<br><strong>Amount:</strong> ${ingredient.amount}`;
        listItem.classList.add("ingredient-item"); // Add the "ingredient-item" class
        topIngredientsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching top ingredients:", error);
      const message = document.getElementById("message");
      message.textContent = "An error occurred while fetching top ingredients.";
    });
}

fetchTopIngredients();
