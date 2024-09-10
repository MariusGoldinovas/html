const result = document.querySelector('.result');

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
        
        result.innerHTML = `<div class="row">${data.join('')}</div>`;
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

