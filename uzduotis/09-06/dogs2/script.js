let selectedBreed = "";

fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((data) => {
    const breeds = data.message;
    const inputElement = document.querySelector('input[type="text"]');
    const suggestions = document.querySelector(".suggestions");

    function insideSearch(event) {
      const query = event.target.value.toLowerCase();
      suggestions.innerHTML = "";

      if (query) {
        let filtered = [];
        Object.keys(breeds).forEach((breed) => {
          if (breed.includes(query)) {
            filtered.push(breed);
          }
          if (breeds[breed].length > 0) {
            breeds[breed].forEach((subBreed) => {
              const fullBreed = `${breed}/${subBreed}`;
              if (fullBreed.includes(query)) {
                filtered.push(fullBreed);
              }
            });
          }
        });

        if (filtered.length > 0) {
          filtered.forEach((breed) => {
            const itemSuggestion = document.createElement("div");
            itemSuggestion.textContent = breed;
            itemSuggestion.classList.add("item-suggestion");

            itemSuggestion.addEventListener("click", function () {
              inputElement.value = breed;
              selectedBreed = breed;
              suggestions.innerHTML = "";
              suggestions.style.display = "none";

              fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
                .then((response) => response.json())
                .then((data) => {
                  document.querySelector(
                    ".top"
                  ).innerHTML = `<img src="${data.message}" alt="">`;
                });
            });
            suggestions.appendChild(itemSuggestion);
          });
          suggestions.style.display = "block";
        } else {
          suggestions.style.display = "none";
        }
      }
    }
    inputElement.addEventListener("input", insideSearch);
  });

clear = () => document.querySelector('input[type="text"]').innerHTML = '';
  