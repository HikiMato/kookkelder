class SortIngredient {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

async function fetchSortIngredients(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.map((item) => new SortIngredient(item.id, item.name));
    } catch (error) {
        console.error(`Error fetching sort ingredients: ${error}`);
        return [];
    }
}

function populateSortIngredientOptions(selectId, sortIngredients) {
    const select = document.getElementById(selectId);
    select.innerHTML = ''; // Clear the existing options

    sortIngredients.forEach((sortIngredient) => {
        const option = document.createElement('option');
        option.value = sortIngredient.id;
        option.textContent = sortIngredient.name;
        select.appendChild(option);
    });
}

// Class to represent a Unit
class Unit {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

async function fetchUnits(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.map((item) => new Unit(item.id, item.name));
    } catch (error) {
        console.error(`Error fetching units: ${error}`);
        return [];
    }
}

function populateUnitOptions(selectId, units) {
    const select = document.getElementById(selectId);
    select.innerHTML = ''; 

    units.forEach((unit) => {
        const option = document.createElement('option');
        option.value = unit.id;
        option.textContent = unit.name;
        select.appendChild(option);
    });
}

// Fetch and populate Units on page load
document.addEventListener('DOMContentLoaded', async function () {
    const units = await fetchUnits('http://127.0.0.1:5000/unit');
    populateUnitOptions('unit_id', units);
    populateUnitOptions('updateUnitId', units);
});
document.addEventListener('DOMContentLoaded', async function () {
    const sortIngredients = await fetchSortIngredients('http://127.0.0.1:5000/sort-ingredient');
    populateSortIngredientOptions('sort_ingredient_id', sortIngredients);
    populateSortIngredientOptions('updateSortIngredientId', sortIngredients);
});
