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

function Person() {
    this.id = 0;
    this.firstName = "";
    this.lastName= "";
}

function Student(){
    Person.call();
    this.grade = 0; //not letter grade; sondern 9-12
}

function Teacher(){
    Person.call();
    this.subject = "";
}

function Section() {
    this.name = "";
    this.maxSize = 0;
    this.students = [];
    this.currentSize = this.students.length;
    this.teacher = "";
    this.addStudent = function(Student) {
        this.students += Student;
    };
    this.addTeacher= function(Teacher) {
        this.teacher = Teacher;
    };
    this.removeStudent = function(id) {
        for(var i = 0; i < this.students.length; i++) {
            if(this.students[i].id === id) {
                this.students = this.students.slice(0,i) + this.students.slice(i+1,this.students.length);
            }
        }
    };
    this.sectionSeatsRemaining = function() {
        return this.maxSize - this.currentSize;
    };
    this.listInfo = function() {
        var ret = "Name: " + this.name + " Max Size: " + this.maxSize + " Current Size: " + this.currentSize;
        ret += "Seats Remaining: " + this.sectionSeatsRemaining() +" Students: " + this.students + " Teacher: " + this.teacher;
        return ret;
    }
}

var j = new Student();//need to do what I did w/ sect, format-wise!!!
j.id = 9005;
j.firstName = "Jane";
j.lastName = "Doe";
j.grade = 9;
var g = new Student();
g.id = 8006;
g.firstName = "Geordi";
g.lastName = "Doe";
g.grade = 11;
var t = new Teacher(1002, "Harry", "Potter", "DADA");

var sect = new Section();
sect.name = "testsect";
sect.maxSize = 40;
sect.currentSize = 2;
sect.students = [j,g];//students show up as 'student' w/grade 0
sect.teacher = t;

var SECTIONS = [sect];//lists all sections

function html() {
    //use length of sections to determine how many columns/rows needed?
    var len = SECTIONS.length;
    var returnVal = "<table id = 'displaying'>";
    for(var i = 0; i < len; i ++) {
        var stu = [];
        for (var x = 0; x < SECTIONS[i].students.length; x ++) {
            //shows up as [object Object]
            // because students are undefined
            stu += "<option value = '" + SECTIONS[i].students[x] + "'>" + SECTIONS[i].students[x] + "</option>";
        }
        returnVal += "<tr><th id = " + SECTIONS[i].name + ">";
        returnVal += "<td id = 'teacher'>" + SECTIONS[i].teacher +"</td>";
        returnVal += "<td id = 'students'><select id = 'studentsList" + SECTIONS[i] + "'>" + stu + "</td>";
        returnVal += "<td id = 'searched'></td>";
        returnVal += "</tr>";
    }
    returnVal += "</table>";
    document.getElementById("displayTable").innerHTML = returnVal;
}

function search() {
    var fn = document.getElementById("searchBarOne").value;//first name
    var ln = document.getElementById("searchBarTwo").value;//last name
    var id = document.getElementById("searchBarThree").value;//id
    var arr = [];
    for(var z =0; z < SECTIONS.length; z ++) {
        for (var i = 0; i < SECTIONS[z].students.length; i++) {
            if(SECTIONS[z].students[i].id === id || SECTIONS[z].students[i].lastName === ln || SECTIONS[z].students[i].firstName === fn) {
                arr+= SECTIONS[z] + SECTIONS[z].students[i];//should return section + student
            }
        }
    }
    //show/hide divs in table? (display = none; display = inline)
    if(arr.length>0) {
        document.getElementById('searched').innerHTML = arr.toString;
    } else {
        /*
        //gets current 'searched' innerhtml
        var current = document.getElementById('searched').value;
        //finds first close bracket
        var stop = current.indexOf('>');
        //should ideally replace first close bracket with class to hide td
        document.getElementById('searched').innerHTML = current.substring(0, stop-1) + "class = 'secret'>" + current.substring(stop, current.length);
        */
        document.getElementById('searched').innerHTML = "No students found";
    }
}

function addStudentToSection(studentId, sectionId) {
    sectionId.addStudent(studentId);
}

function removeStudentFromSection(studentId, sectionId) {
    sectionId.removeStudent(studentId);
}

function addaStudent(id, fname, lname, grade) {
    var stu = new Student(id, fname, lname, grade);
    this.addStudent(stu);
}

function addaTeacher(id, fname, lname, subject) {
    var teacher = new Teacher(id, fname, lname, subject);
    this.addTeacher(teacher);
}

function addSection(sect, name, maxSize, currentSize, students, teacher) {
    sect = new Section(name, maxSize, currentSize, students, teacher);
    SECTIONS += sect;
    return sect;
}
function listSectionInfo(sectionId) {
    sectionId.listInfo();
}