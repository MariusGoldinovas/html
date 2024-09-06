let selectedBreed = '';


fetch('https://dog.ceo/api/breeds/list/all')
  .then((response) => response.json())
  .then((data) => {

    const breeds = data.message; 
    const selectElement = document.querySelector('.pets');
    let totalBreeds = 0;
    let totalSubBreeds = 0;
    
    Object.keys(breeds).forEach(breed => {
        totalBreeds++;
        if (breeds[breed].length > 0){
            breeds[breed].forEach(subBreed => {
                totalSubBreeds++;
                const option = document.createElement('option');
                option.value = `${breed}/${subBreed}`;
                option.textContent = `${breed} (${subBreed})`;
                selectElement.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            selectElement.appendChild(option);
        }
    });

    document.querySelector('.breedNumber').innerHTML = `We have: ${totalBreeds} breeds and ${totalSubBreeds} sub-breeds.`;


    selectElement.addEventListener('change', (e) => {
        selectedBreed = e.target.value; 
        
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
            .then((response) => response.json())
            .then(data => {

                document.querySelector('.right').innerHTML = `<img src="${data.message}" alt="">`;
            })
    });
  })
