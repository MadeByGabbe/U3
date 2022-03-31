"use strict" 

// Choose a element based on what is given in parameter
let elementSelector = (select) => {
    return document.querySelector(select); 
}

// Cleanse the content 
let clearResults = () => {
    elementSelector("#search-result").innerHTML = "";
}

// sort 
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


// Get responsibel for course 
function responsibelOfCourse (counter) {
  
    let course = DATABASE.courses[counter]; 
  
    let teachersName = DATABASE.teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName} (${teacher.post})`)
  
    let result = course.courseResponsible
  
    return teachersName[result];
  
}


function teachersInCourse (counter) {
    
    for ( let course of DATABASE.courses[counter].teachers) {
      
        // console.log(course)
    
      for ( let teachers of DATABASE.teachers ) {
    
        // console.log(teachers)

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
  

function studentsInCourse(counter) {
  let studentCourse = DATABASE.students
    .filter((student) => student.courses
    .some((course) => course.courseId == DATABASE.courses[counter].courseId))
              console.log(studentCourse);
              for (let student of studentCourse) {
                let courseById = student.courses.filter((course) => course.courseId == DATABASE.courses[counter].courseId)
                console.log(courseById);

                if(courseById[0].passedCredits == DATABASE.courses[counter].totalCredits)
                  elementSelector('div > div:last-child > .students > .done').innerHTML += `
                  <div class="studentDone">
                    <div class="studentName">${student.firstName} ${student.lastName} (${courseById[0].passedCredits} credits)</div>
                    ${courseById[0].started.semester} ${courseById[0].started.year}
                  </div>
                `
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
    // console.log(search);

    clearResults();

    if (search.length > 0) {
        
        for ( let i = 0; i < DATABASE.courses.length; i++ ) {

            // console.log(DATABASE.courses[i].title)

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

// Kollar efter sparade darkmode 
let darkMode = localStorage.getItem('darkMode'); 

let darkModeToggle = document.querySelector('#dark-mode-toggle');

// aktivera DarkMode
function enableDarkMode ()  {
  // Lägger till klass 
  document.body.classList.add('darkmode');
  // updaterar darkMode till localStorage
  localStorage.setItem('darkMode', 'enabled');
  elementSelector('#dark-mode-toggle').innerHTML = "Lightmode"
}

//Skapar en dark/light mode funktion där "knappen/button" skapas till en eventListener 
function darkMode() {
    
    var element = document.body;
    const darkMode = localStorage.getItem("darkMode")
    element.classList.toggle("darkMode");
    
    if (JSON.parse(darkMode) == true) {
        element.classList.remove("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(false));
    } 
    else if (JSON.parse(darkMode) == false) {
        element.classList.add("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(true));
    }
    
}

elementSelector(".theme").addEventListener("click", darkMode)

elementSelector("#searchbar").addEventListener("keyup", getResults);