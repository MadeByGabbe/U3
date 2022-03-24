"use strict";

// Selects Element
function elementSelector(select) {
    return document.querySelector(select);
}

// Clear content inside search-results div
function clearResults() {
    elementSelector('.search-results').innerHTML = "";
}

// Renders result from search box input
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
                        <div class="search-courses"></div>
                    </div>
                
                `
                for (let studentCourse of DATABASE.students[i].courses) {
                    for (let dbCourse of DATABASE.courses) {
                        if (studentCourse.courseId == dbCourse.courseId) {
                            elementSelector('.search-courses').innerHTML += `
                            <div class="course-title">${dbCourse.title}</div>
                            <div class="studentCourse-start">${studentCourse.started.semester} ${studentCourse.started.year}</div>
                            <div class="course-credits">${studentCourse.passedCredits}/${dbCourse.totalCredits}</div>
                            
                            `
            
                        }
                    }
                }
            }
        }
        
    }
    
}


elementSelector('.searchbar').addEventListener('keyup', getResults);