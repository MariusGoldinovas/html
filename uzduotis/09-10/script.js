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
                    <div class="category" onclick="category('${drink.strCategory}')"><strong>Category:</strong> ${drink.strCategory}</div>
                    <div class="alco" onclick="alco('${drink.strAlcoholic}')"><strong>Alco/NonAlco:</strong>${drink.strAlcoholic}</div>
                    <div class="glass" onclick="glass('${drink.strGlass}')"><strong>Glass type:</strong> ${drink.strGlass}</div>
                    <div class="ingredients"onclick="glass('${drink.strGlass}')"><strong>Ingredients:</strong>
                    <div class="ingredient" onclick="glass('${drink.strGlass}')"></div>
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


const back = () => {
    result.innerHTML = searchResultsHTML;
}

function alco(alcoholType) {
    let value = alcoholType === 'Alcoholic' ? 'Alcoholic' : 'Non_Alcoholic';
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${value}`)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        searchResultsHTML  = `<div class="row">${data.join('')}</div>`;
        result.innerHTML = searchResultsHTML;
    });
}
function category(categoryType) {
    let value = categoryType === 'Ordinary Drink' ? 'Ordinary_Drink' : 'Cocktail';
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`) 
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        searchResultsHTML  = `<div class="row">${data.join('')}</div>`;
        result.innerHTML = searchResultsHTML;
    });
}
function glass(glassType) {
    let value = glassType === 'Cocktail glass' ? 'Cocktail_glass' : 'Champagne_flute';
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${value}`) 
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        searchResultsHTML  = `<div class="row">${data.join('')}</div>`;
        result.innerHTML = searchResultsHTML;
    });
}
function ingredients(ingredientsType) {
    let value = glassType === 'Gin' ? 'Gin' : 'Vodka';
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`) 
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        const data = resp.drinks.map(data => `
            <div class="col-4 mb-4" onclick="getCocktail(${data.idDrink})">
                <div class="image">
                    <img src="${data.strDrinkThumb}">
                </div>
                <h4 class="mt-2">${data.strDrink}</h4>
            </div>
        `);
        
        searchResultsHTML  = `<div class="row">${data.join('')}</div>`;
        result.innerHTML = searchResultsHTML;
    });
}
