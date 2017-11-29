/* MUST HAVE:
* web interface w/ buttons, text fields, display area for output
* table w/ elements: students, teachers, sections
* interface to add new students, teachers, sections
* add/remove students in sections
* search mechanism
* show/hide div content
* relative positioning
* global/local vars
* OBJECTS
 */

var SECTIONS = [];//lists all sections

function html() {
    //use length of sections to determine how many columns/rows needed?
    var len = SECTIONS.length;
    var returnVal = "<table id = 'displaying'>";
    for(var i = 0; i < len; i ++) {
        returnVal += "<tr><th id = " + SECTIONS[i].name + "><td></td></tr>"
    }
    returnVal += "</table>";
    document.getElementById("displayTable").innerHTML = returnVal;
}

function search() {
    var fn = document.getElementById("searchBarOne").value;//first name
    var ln = document.getElementById("searchBarTwo").value;//last name
    var id = document.getElementById("searchBarThree").value;//id
    fn = fn.toLowerCase();
    ln = ln.toLowerCase();
    var arr = [];
    for(var z in SECTIONS) {
        var sect = SECTIONS[z];
        for (var i in sect.students) {
            if(sect.students[i].id === id || sect.students[i].lastName === ln || sect.students[i].firstName === fn) {
                arr+=sect.students[i];
            }
        }
    }
    //show/hide divs in table(display = none)
    return arr;
}

var Person = new Object();
Person.constructor = {
    id : 0,
    firstName : "",
    lastName: ""
};
var Student = new Person();
Student.constructor = {
    grade: 0 //not letter grade, sondern 9-12
};

var Teacher = new Person();
Teacher.constructor = {
    subject : ""
};


var Section = new Object();
Section.constructor = {
    name: "",
    maxSize: 0,
    currentSize: 0,
    students: [],
    teacher: Teacher,
    addStudent : function(Student) {
        this.students += Student;
    },
    removeStudent: function(id) {
        for(var i in this.students) {
            if(this.students[i].id === id) {
                this.students = this.students.slice(0,i) + this.students.slice(i+1,this.students.length);
            }
        }
    },
    sectionSeatsRemaining: function() {
        return this.maxSize - this.currentSize;
    }
};

function addRemove() {

}

function newStudent() {

}

function newTeacher() {

}

function newSection() {

}