let selectedBreed = '';

fetch('https://dog.ceo/api/breeds/list/all')
  .then((response) => response.json())
  .then((data) => {

    const breeds = Object.keys(data.message); 
    const selectElement = document.querySelector('.pets');

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = breed;
      selectElement.appendChild(option);
    });

    selectElement.addEventListener('change', (e) => {
        selectedBreed = e.target.value; 
        
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
            .then((response) => response.json())
            .then(data => {

                document.querySelector('.right').innerHTML = `<img src="${data.message}" alt="">`;
            })
    });
  })
