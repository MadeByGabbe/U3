"use strict" 

// // Choose a element based on what is given in parameter
// let selectElement = (select) => {
//     return document.querySelector(select); 
// }

// // Cleanse the content 
// let clearResults = () => {
//     selectElement("#search-result").innerHTML = "";
// }

// function getTotalCredits (counter) {
//     let credits = []; 

//     for (let studentCourse of DATABASE.students[counter].courses) {
//         credits.push(studentCourse.passedCredits);
//     }

//     let creditSum = 0; 

//     // for (let i = 0; i < credits.length; i++) {
//     //     creditSum += credits[i]
//     // }

//     credits.forEach((credit => {
//       creditSum += credit
//     }) )

//     return creditSum;
// }

// function sortStudents () {
    
//     DATABASE.students.sort(function(a, b) {
    
//     if ( a.firstName > b.firstName ) {
//       return 1;
//     }

//     else if ( a.firstName < b.firstName ) {
//       return -1;
//     }

//     return 0
//   });
  
// }

//////////////

// let courses = DATABASE.courses;

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
  
function responsibelOfCourse (counter) {
    
    let course = DATABASE.courses[counter]; 
  
    let teachersName = DATABASE.teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName} (${teacher.post})`)
  
    let result = course.courseResponsible
  
    return teachersName[result];
  
  }
  
  
function teacherInCourse (counter) {
    
    let course = DATABASE.courses[counter].teachers;
    
    // console.log(course)
    
    for ( let course of DATABASE.courses[counter].teachers) {
      // console.log(course)
    
      for ( let teachers of DATABASE.teachers ) {
    
        if ( course == teachers.teacherId) {
          
          selectElement(`.name-teachers`).innerHTML += `
          <div>
          ${teachers.firstName} ${teachers.lastName}  ( ${teachers.post} )
          </div>
          `
        }   
      }  
    }
  }
  
  function getStudentsFromCourse (counter) {
  
  
  }
  
    
  //Skapar en dark/light mode funktion där "knappen/button" skapas till en eventListener 
function darkMode() {
    // selectElement("body")
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
  
  const btn = document.querySelector('.theme')
  btn.addEventListener('click', darkMode);


// Choose a element based on what is given in parameter
let selectElement = (select) => {
    return document.querySelector(select); 
}

// Cleanse the content 
let clearResults = () => {
    selectElement("#search-result").innerHTML = "";
}

function getTeacersOnSearch () {

    let search = selectElement("#searchbar").value;
    // console.log(search);

    clearResults();

    if (search.length > 0) {
        
        for ( let i = 0; i < DATABASE.courses.length; i++ ) {

            // console.log(DATABASE.courses[i].title)

            if ( DATABASE.courses[i].title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {

                sortCourseTitle();

                selectElement("#search-result").innerHTML += `
                    <div class="search-div">

                        <h3 class="studentTitle"> ${DATABASE.courses[i].title} (credits ${DATABASE.courses[i].totalCredits}) </h3>
                        
                        <div class="proffesion">    
                            <div class="responsible">Course Responsible</div>  
                            <div class="teachers">Teachers</div>
                        </div>

                        <div class="name-teachers"> 
                            <div class="responsibleTeacher">${responsibelOfCourse(i)}</div>
                            <div class="teachersInClass"></div>
                            </div>
                            
                            <p> Students </p>
                            <div class="students">
                            ${getStudentsFromCourse(i)}
                            </div>
                            
                            </div>
                            `
                            // teacherInCourse(i)
                            // getStudentsFromCourse(i)
            }
        }
    } 
}


selectElement("#searchbar").addEventListener("keyup", getTeacersOnSearch);