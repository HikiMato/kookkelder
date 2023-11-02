const fetchAndShowExpiringIngredients = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/ingredient/check-expiration?days_until_expiration=7",
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      const expiringIngredients = await response.json();
      showPopup(expiringIngredients);
    } else {
      console.error("Failed to fetch expiring ingredients.");
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching expiring ingredients:",
      error
    );
  }
};

// Function to display expiring ingredients in a popup
const showPopup = (expiringIngredients) => {
  const currentDate = new Date();
  const expiringList = [];

  expiringIngredients.forEach((ingredient) => {
    const bbDate = new Date(ingredient.bb_date);
    const daysUntilExpiration = Math.floor(
      (bbDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiration <= 7) {
      expiringList.push(
        `Name: ${ingredient.name}\nDescription: ${ingredient.description}\nExpiration Date: ${ingredient.bb_date}`
      );
    }
  });

  if (expiringList.length > 0) {
    alert("Expiring Ingredients:\n\n" + expiringList.join("\n\n"));
  }
};

// Use DOMContentLoaded to execute the fetch and showPopup functions after the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchAndShowExpiringIngredients();
});
