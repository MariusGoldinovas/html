const questions = [
    "What to watch",
    "What is my IP",
    "When is Mother's Day 2024",
    "How many weeks in a year",
    "How many days until Christmas",
    "How to screenshot on Mac",
    "What time is it",
    "How many ounces in a gallon",
    "When is Easter 2024",
    "How many ounces in a cup"
];

function insideSearch(event) {
    const query = event.target.value.toLowerCase();
    const suggestions = document.querySelector('.suggestions');

    suggestions.innerHTML = '';

    if(query){
        const filtered = questions.filter(question => question.toLocaleLowerCase().includes(query)).slice(0, 5);

        if(filtered.length > 0) {
            filtered.forEach(question => {
                const itemSuggestion = document.createElement('div');
                itemSuggestion.textContent = question
                itemSuggestion.classList.add('item-suggestion');
                itemSuggestion.addEventListener('click', function() {
                    document.querySelector('input[type="text"]').value = question;
                    suggestions.innerHTML = ''; 
                    suggestions.style.display = 'none';
                });
                suggestions.appendChild(itemSuggestion);
            });
            suggestions.style.display = 'block'; 
        } else {
            suggestions.style.display = 'none'; 
        }
    } else {
        suggestions.style.display = 'none';
    }
}

function search(query) {
    const searchUrl = `https://www.google.lt/search?q=${encodeURIComponent(document.querySelector('input[type="text"]').value)}`;
    window.open(searchUrl, '_blank').focus();
}

