const url = 'https://swapi.dev/api/people/';


fetch(url)
.then((response) => response.json())
.then(data => {
    results = data.results
    let namesAll = results.map(person => person.name)
    
    // document.querySelector('#box').innerHTML = namesAll.join(` <br>`);

    const box2 = document.querySelector('#box2'); 

    namesAll.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        box2.appendChild(li); 
    });

})

