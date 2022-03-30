"use strict";

// Selects Element
function elementSelector(select) {
    return document.querySelector(select);
}

// Clear content inside search-results div
function clearResults() {
    elementSelector('.search-results').innerHTML = "";
}

function getTotalCredits(counter) {
    let credits = [];

    for (let studentCourse of DATABASE.students[counter].courses) {
        credits.push(studentCourse.passedCredits);
    }

    let creditTotal = 0;

    credits.forEach((credit => {
        creditTotal += credit
    }))

    return creditTotal
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
                    <h3 class="studentTitle">
                        ${DATABASE.students[i].firstName}
                        ${DATABASE.students[i].lastName}
                        ( Total Credits: ${getTotalCredits(i)} )
                    </h3>
                    <p> Courses: </p>
                    <div class="search-courses"></div>
                    </div>
                
                `
                for (let studentCourse of DATABASE.students[i].courses) {
                    for (let dbCourse of DATABASE.courses) {
                        if (studentCourse.courseId == dbCourse.courseId) {
                            
                            if (studentCourse.passedCredits == dbCourse.totalCredits) {
                                elementSelector('div > div:last-child > .search-courses').innerHTML += `
                                <div class="done">
                                <div class="course-title">${dbCourse.title}</div>
                                ${studentCourse.started.semester} ${studentCourse.started.year}
                                (${studentCourse.passedCredits} of ${dbCourse.totalCredits} credits)
                                </div>
                            `
                            }

                            else {
                                elementSelector('div > div:last-child > .search-courses').innerHTML += `
                            <div class="notDone">
                            <div class="course-title">${dbCourse.title}</div>
                            ${studentCourse.started.semester} ${studentCourse.started.year}
                            (${studentCourse.passedCredits} of ${dbCourse.totalCredits} credits)
                            </div>
                            `
                            }
                            
            
                        }
                    }
                }
            }
        
        }
    
    }
}



elementSelector('.searchbar').addEventListener('keyup', getResults);