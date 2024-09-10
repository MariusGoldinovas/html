const result = document.querySelector('.result');
let searchResultsHTML = '';

const searchCocktails = (e) => {
    e.preventDefault();

    const value = e.target.querySelector('input').value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + value)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div onclick="getCocktail()" class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        searchResultsHTML  = `<div class="row">${data.join('')}</div>`;
        result.innerHTML = searchResultsHTML;
    });
}

const getCocktail = (id) => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
    .then(resp => resp.json())
    .then(resp => {
        const drink = resp.drinks[0];
        result.innerHTML = 
        `<div class="drink-card">
            <div class="sides">
                <div class="left">
                    <div class="name">${drink.strDrink}</div>
                    <div class="instruction"><strong>Instructions:</strong> ${drink.strInstructions}</div>
                    <div class="category"><strong>Category:</strong> ${drink.strCategory}</div>
                    <div class="alco"><strong>Alco/NonAlco:</strong> ${drink.strAlcoholic}</div>
                    <div class="glass"><strong>Glass type:</strong> ${drink.strGlass}</div>
                    <div class="ingredients"><strong>Ingredients:</strong>
                        <div class="ingredient"></div>
                    </div>
                </div>
                <div class="right">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                </div>
            </div>
            <button onclick="back()" type="button" class="btn btn-light secret">Back</button>
        </div>`;

        document.querySelector('.drink-card').style.display = "block"

        let ingredientsHTML = '';
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient) {
                ingredientsHTML += `<div>${measure ? measure : ''} ${ingredient}</div>`;
            }
        }

        document.querySelector('.ingredient').innerHTML = ingredientsHTML;
    });
}

// // Sukuriame tuščią kintamąjį, kuris saugos sugeneruotą HTML kodą
// let ingredientsHTML = '';

// // Ciklas sukasi nuo 1 iki 15, nes API grąžina iki 15 ingredientų ir jų matavimų
// for (let i = 1; i <= 15; i++) {
//     // Gauname ingredientą iš objekto 'drink', kurio indeksas priklauso nuo ciklo skaičiaus (i)
//     const ingredient = drink[`strIngredient${i}`];

//     // Gauname atitinkamą ingrediento matą (pvz., 50 ml)
//     const measure = drink[`strMeasure${i}`];

//     // Jei ingredientas egzistuoja (nėra null arba undefined), tęsiame
//     if (ingredient) {
//         // Pridedame HTML eilutę į ingredientsHTML, kur rodoma ingrediento ir mato vertė
//         // Jei nėra mato, naudojame tuščią vietą
//         ingredientsHTML += `<div>${measure ? measure : ''} ${ingredient}</div>`;
//     }
// }

// // Kai ciklas baigiasi, surandame HTML elementą su klase .ingredients ir įdedame sugeneruotą ingredientų sąrašą
// document.querySelector('.ingredients').innerHTML = ingredientsHTML;

const back = () => {
    result.innerHTML = searchResultsHTML;
}

const alcoholicCheckbox = document.getElementById('alcoholicCheckbox');
const nonAlcoholicCheckbox = document.getElementById('nonAlcoholicCheckbox');


alcoholicCheckbox.addEventListener('change', filterCocktails);
nonAlcoholicCheckbox.addEventListener('change', filterCocktails);

function filterCocktails() {
    const isAlcoholicChecked = alcoholicCheckbox.checked;
    const isNonAlcoholicChecked = nonAlcoholicCheckbox.checked;

    // If both are unchecked, clear the result
    if (!isAlcoholicChecked && !isNonAlcoholicChecked) {
        result.innerHTML = '<p>No filter selected.</p>';
        return;
    }
    let apiUrl = '';

    if (isAlcoholicChecked) {
        apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
    } else if (isNonAlcoholicChecked) {
        apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
    }
    // Fetch the filtered cocktails
    fetch(apiUrl)
    .then(resp => resp.json())
    .then(resp => {
        // Map the drinks to HTML
        const data = resp.drinks.map(drink => `
            <div class="col-4 mb-4" onclick="getCocktail(${drink.idDrink})">
                <div class="image">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                </div>
                <h4 class="mt-2">${drink.strDrink}</h4>
            </div>
        `);

        // Update the result container with filtered cocktails
        result.innerHTML = `<div class="row">${data.join('')}</div>`;
    });
}