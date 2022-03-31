"use strict" 

// Choose a element based on what is given in parameter
let elementSelector = (select) => {
    return document.querySelector(select); 
}

// Clears content inside search-result
let clearResults = () => {
    elementSelector("#search-result").innerHTML = "";
}

// Sorts courses by title in alphabetical order
function sortCourseTitle () {

    DATABASE.courses.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      else if (a.title < b.title) {
        return -1;
      }
      return 0;
  
    })
  
  }


// Get Course Responsible
function responsibelOfCourse (counter) {
  
    let course = DATABASE.courses[counter]; 
  
    let teachersName = DATABASE.teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName} (${teacher.post})`)
  
    let result = course.courseResponsible
  
    return teachersName[result];
  
}

// Fetch teachers in course
function teachersInCourse (counter) {
    
    for ( let course of DATABASE.courses[counter].teachers) {
    
      for ( let teachers of DATABASE.teachers ) {

        if ( course == teachers.teacherId) {

          elementSelector(`div > div:last-child > .name-teachers`).innerHTML += `
            <div class="teacher-box">
                <p> ${teachers.firstName} ${teachers.lastName}  (${teachers.post}) </p>
            </div>
          `

        }  
      }  
    }
  }
  
// Fetch the students
function studentsInCourse(counter) {
  // Filters through student database with the condition some(looking for at least one course in the student's courselist that matches current course)
  let studentCourse = DATABASE.students
    .filter((student) => student.courses
    .some((course) => course.courseId == DATABASE.courses[counter].courseId))

              for (let student of studentCourse) {
                let courseById = student.courses.filter((course) => course.courseId == DATABASE.courses[counter].courseId)

                // If they've passed
                if(courseById[0].passedCredits == DATABASE.courses[counter].totalCredits)
                  elementSelector('div > div:last-child > .students > .done').innerHTML += `
                  <div class="studentDone">
                    <div class="studentName">${student.firstName} ${student.lastName} (${courseById[0].passedCredits} credits)</div>
                    ${courseById[0].started.semester} ${courseById[0].started.year}
                  </div>
                `
                // If they've not
                else {
                  elementSelector('div > div:last-child > .students > .notDone').innerHTML += `
                  <div class="studentNotDone">
                    <div class="studentName">${student.firstName} ${student.lastName} (${courseById[0].passedCredits} credits)</div>
                    ${courseById[0].started.semester} ${courseById[0].started.year}
                  </div>
                `
                }
              }
}

function getResults () {

    let search = elementSelector("#searchbar").value;

    clearResults();

    if (search.length > 0) {
        
        for ( let i = 0; i < DATABASE.courses.length; i++ ) {

            // Checks whether the letters are included in the course title.
            if ( DATABASE.courses[i].title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {

                sortCourseTitle();

                elementSelector("#search-result").innerHTML += `
                    <div class="search-div">

                        <h3 class="studentTitle"> ${DATABASE.courses[i].title} (${DATABASE.courses[i].totalCredits} credits) </h3>
                        
                        <div class="proffesion">    
                            <div class="responsible">Course Responsible:</div>  
                            <div class="teachers">Teachers:</div>
                        </div>

                        <div class="name-teachers"> 
                            <div class="responsibleTeacher">
                                ${responsibelOfCourse(i)}
                            </div>   
                        </div>
  
                        <p> Students: </p>
                        <div class="students">
                          <div class="done"></div>
                          <div class="notDone"></div>
                        </div>      
                    </div>
                 `
                  studentsInCourse(i)
                  teachersInCourse(i)
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
elementSelector("#searchbar").addEventListener("keyup", getResults);