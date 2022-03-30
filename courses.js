"use strict" 

// Choose a element based on what is given in parameter
let selectElement = (select) => {
    return document.querySelector(select); 
}

// Cleanse the content 
let clearResults = () => {
    selectElement("#search-result").innerHTML = "";
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


function teacherInCourse (counter) {
  
    let course = DATABASE.courses[counter].teachers;
    
    console.log(course)
    
    for ( let course of DATABASE.courses[counter].teachers) {
      
        console.log(course)
    
      for ( let teachers of DATABASE.teachers ) {
    
        console.log(teachers)

        if ( course == teachers.teacherId) {

          selectElement(`div > div:last-child > .name-teachers`).innerHTML += `
            <div>
                ${teachers.firstName} ${teachers.lastName}  (${teachers.post})
            </div>
          `

        }  
      }  
    }
  }
  

  function getStudentsFromCourse (counter) {
  
    
  
  
  }


function getTeachersOnSearch () {

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
                            <div class="responsibleTeacher">
                                ${responsibelOfCourse(i)}
                            </div>
                            
                        </div>
                            
                        <p> Students </p>
                        <div class="students">
                            
                        </div>
                            
                    </div>
                 `
                    teacherInCourse(i)
                    // getStudentsFromCourse(i)
            }
        }
    } 
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

selectElement(".theme").addEventListener("click", darkMode)

selectElement("#searchbar").addEventListener("keyup", getTeachersOnSearch);