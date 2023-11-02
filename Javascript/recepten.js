// Function to fetch recipes data from the API
function fetchRecipes() {
  fetch("http://127.0.0.1:5000/recipe", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const recipeList = document.getElementById("recipe-list");
      recipeList.innerHTML = ""; // Clear the existing list
      data.forEach((recipe) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = ` <strong>${recipe.name}</strong> - Description :<strong>${recipe.description}</strong>, Preparation Time: <strong>${recipe.preparation_time}</strong> minutes, Cooking Time: <strong>${recipe.cooking_time}</strong> minutes`;

        // Add a delete button for each recipe
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteRecipe(recipe.id));
        listItem.appendChild(deleteButton);

        recipeList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      const message = document.getElementById("message");
      message.textContent = "An error occurred while fetching recipes.";
    });
}

// Function to delete a recipe by ID
function deleteRecipe(recipeId) {
  const confirmation = confirm(
    `Are you sure you want to delete the recipe with ID ${recipeId}?`
  );
  if (confirmation) {
    fetch(`http://127.0.0.1:5000/recipe/${recipeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted recipe from the list
          fetchRecipes();
        } else if (response.status === 404) {
          alert("Recipe not found.");
        } else {
          throw Error("Failed to delete recipe.");
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }
}

// Add recipes
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createRecipeForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    message.textContent = "Creating recipe...";

    const recipeData = {
      name: form.name.value,
      description: form.description.value,
      preparation_time: parseFloat(form.preparation_time.value),
      cooking_time: parseFloat(form.cooking_time.value),
    };

    fetch("http://127.0.0.1:5000/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to create recipe.");
        }
      })
      .then((data) => {
        message.textContent = "Recipe created successfully!";
        form.reset(); // Clear the form fields
        fetchRecipes(); // Refresh the recipe list
      })
      .catch((error) => {
        message.textContent = "Error: " + error.message;
      });
  });
  function updateRecipe() {
    const oldName = document.getElementById("oldName").value; // Get the old name
    const newName = document.getElementById("newName").value; // Get the new name

    // Fetch all recipes
    fetch("http://127.0.0.1:5000/recipe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const recipesToUpdate = data.filter(
          (recipe) => recipe.name === oldName
        );

        if (recipesToUpdate.length > 0) {
          const updatePromises = recipesToUpdate.map((recipe) => {
            const updateData = {
              name: newName, // Use the new name
              description: recipe.description,
              preparation_time: recipe.preparation_time,
              cooking_time: recipe.cooking_time,
            };
            return fetch(`http://127.0.0.1:5000/recipe/${recipe.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateData),
            });
          });

          // Wait for all update requests to complete
          return Promise.all(updatePromises);
        } else {
          throw new Error("Recipe not found.");
        }
      })
      .then(() => {
        // All recipes with the old name updated successfully
        document.getElementById("updateRecipeForm").reset(); // Clear the update form
        fetchRecipes(); // Refresh the recipe list
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }

  // Add event listener to the update form
  document
    .getElementById("updateRecipeForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      updateRecipe();
    });

  // Fetch recipes on page load
  fetchRecipes();
});
