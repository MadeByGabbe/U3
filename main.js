"use strict";

// Selects Element
function elementSelector(select) {
    return document.querySelector(select);
}

//Clear content inside search-results div
function clearResults() {
    elementSelector('.search-results').innerHTML = "";
}


function getResults() {
    let search = elementSelector('.searchbar').value;
    
    clearResults();

    if (search.length > 0) {
        for (let i = 0; i < DATABASE.students.length; i++){

            if (DATABASE.students[i].lastName.toLowerCase().includes(search.toLowerCase())) {
                
                elementSelector('.search-results').innerHTML += `
                
                <div class="search-div">
                    <span class="search-item">${DATABASE.students[i].firstName}</span>
                    <span class="search-item">${DATABASE.students[i].lastName}</span>
                </div>
                
                `
                }
        }
    
    }
}

elementSelector('.searchbar').addEventListener('keyup', getResults);