function fetchRecipes() {
  fetch("http://127.0.0.1:5000/recipe/sorted-by-bb-date", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const recipeList = document.getElementById("bbRecipe-list");
      recipeList.innerHTML = ""; // Clear the existing list
      data.forEach((recipe) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${recipe.name}</strong><br> Description: <strong>${recipe.description}</strong>,<br> Preparation Time: <strong>${recipe.preparation_time}</strong> minutes, <br>Cooking Time: <strong>${recipe.cooking_time}</strong> minutes`;
        listItem.classList.add("recipe-item");
        recipeList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      const message = document.getElementById("message");
      message.textContent = "An error occurred while fetching recipes.";
    });
}

fetchRecipes();
