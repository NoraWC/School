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
    this.searched = false;
}

function Teacher(){
    Person.call();
    this.subject = "";
}


function Section() {
    this.name = "";
    this.maxSize = 0;
    this.students = [];//doesn't like to stay an array
    this.currentSize = this.students.length;
    //this.teacher = Teacher;
    this.addStudent = function(Student) {
        this.students +=  Student;
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
        ret += " Seats Remaining: " + this.sectionSeatsRemaining() +" Students: " + this.students + " Teacher: " + this.teacher;
        return ret;
    }
}

var j = new Student();
j.id = 9005;
j.firstName = "Jane";
j.lastName = "Doe";
j.grade = 9;
j.searched = false;
console.log(j);

var g = new Student();
g.id = 8006;
g.firstName = "Geordi";
g.lastName = "Doe";
g.grade = 11;
g.searched = false;
console.log(g);

var t = new Teacher();
t.id = 1002;
t.firstName = "Harry";
t.lastName = "Potter";
t.subject = "DADA";
console.log(t);

var sect = new Section();
sect.name = "testsect";
sect.maxSize = 40;
sect.currentSize = 2;
sect.students = [j,g];
sect.teacher = t;
console.log(sect);

var SECTIONS = [sect];//lists all sections

function html() {
    //use length of sections to determine how many columns/rows needed?
    var len = SECTIONS.length;
    var returnVal = "<table id = 'displaying'>";
    for(var i = 0; i < len; i ++) {
        var stu = [];

        for (var x = 0; x < SECTIONS[i].students.length; x ++) {
            var anyStudent = SECTIONS[i].students[x];
            var classify = '';
            if(!anyStudent.searched) {
                classify = 'secret';
            } else {
                classify = 'stu';
            }

            stu += "<div class = '" + classify + "' id = 'student" + anyStudent.id + "'>" + anyStudent.firstName + " " + anyStudent.lastName + "</div>";
        }
        returnVal += "<tr><th id = " + SECTIONS[i].name + "><td id = 'name'>Section: " + SECTIONS[i].name + "</td>";
        returnVal += "<td id = 'teacher'> Teacher: " + SECTIONS[i].teacher.lastName +"</td>";
        returnVal += "<td id = 'students'> Students: </td>";
        returnVal += "<td id = 'searched'>" + stu + "</td>";
        returnVal += "</tr>";
    }
    returnVal += "</table>";
    document.getElementById("displayTable").innerHTML = returnVal;
}

function search() {
    var fn = document.getElementById("searchBarOne").value;//first name
    var ln = document.getElementById("searchBarTwo").value;//last name
    var id = parseInt(document.getElementById("searchBarThree").value);//id
    var f = false;

    for(var z =0; z < SECTIONS.length; z ++) {
        var stu = SECTIONS[z].students.split(',');//doesn't work w/o adding students; nothing else works after adding students
        for (var i = 0; i < stu.length; i++) {
            var k = SECTIONS[z];
            var b = k.students;
            if(stu[i] === id ){ //&& stu.firstName === fn && stu.lastName === ln) {
                SECTIONS[z].students[i].searched = true;
                f = true;
                html();
            }
        }
    }
    if(!f) {
        document.getElementById('searched').innerHTML = "No students found";
    }
}

function addStudentToSection(studentId, sectionId) {
    //???? :(
    sect.addStudent(studentId);
    sect.listInfo();
    console.log(sect.students);
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