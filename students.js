"use strict";

// Choose a element based on what is given in parameter
function elementSelector(select) {
    return document.querySelector(select);
}

// Clear content inside search-results div
function clearResults() {
    elementSelector('#search-results').innerHTML = "";
}

// Sorts students in alphabetical order 
function sortStudents () {

    DATABASE.students.sort((a, b) => {
      if (a.lastName > b.lastName) {
        return 1;
      }
      else if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
  
    })
  
  }

// Calculates total credits for a student
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
    let search = elementSelector('#searchbar').value;
    
    clearResults();

    if (search.length > 0) {
        for (let i = 0; i < DATABASE.students.length; i++){

            // Checks whether the letters are included in the student's last name.
            if (DATABASE.students[i].lastName.toLowerCase().includes(search.toLowerCase())) {
                
                sortStudents()
                
                elementSelector('#search-results').innerHTML += `
                
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

                // Search through course database to match courses of current student
                for (let studentCourse of DATABASE.students[i].courses) {
                    for (let dbCourse of DATABASE.courses) {
                        if (studentCourse.courseId == dbCourse.courseId) {
                            
                            // If they've passed
                            if (studentCourse.passedCredits == dbCourse.totalCredits) {
                                elementSelector('div > div:last-child > .search-courses').innerHTML += `
                                <div class="done">
                                <div class="course-title">${dbCourse.title}</div>
                                ${studentCourse.started.semester} ${studentCourse.started.year}
                                (${studentCourse.passedCredits} of ${dbCourse.totalCredits} credits)
                                </div>
                            `
                            }
                            
                            // If they've not
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

// Looking for saved darkmode
let darkMode = localStorage.getItem('darkMode'); 

let darkModeToggle = document.querySelector('#dark-mode-toggle');

// Activates DarkMode
function enableDarkMode ()  {
  document.body.classList.add('darkmode');
  // Updates darkmode to local storage
  localStorage.setItem('darkMode', 'enabled');
  elementSelector('#dark-mode-toggle').innerHTML = "Light mode"
}

// Deactivates Darkmode 
function disableDarkMode () {
  document.body.classList.remove('darkmode');
  // Updates darkmode to local storage  
  localStorage.setItem('darkMode', null);
  elementSelector('#dark-mode-toggle').innerHTML = "Dark mode"
}
 
// If the user have enabled it before
if (darkMode === 'enabled') {
  enableDarkMode();
}

// Toggle mode button
darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); 

  if (darkMode !== 'enabled') {
    enableDarkMode();
  }
  
  else {
    disableDarkMode(); 
  }
});

// Eventlistener for whenever a letter is entered into the searchbox
elementSelector('#searchbar').addEventListener('keyup', getResults);