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
    this.students = [];
    this.currentSize = this.students.length;
    this.addStudent = function(Student) {
        this.currentSize +=1;
        this.students.push(Student);
    };
    this.addTeacher= function(Teacher) {
        this.teacher = Teacher;
    };
    this.removeStudent = function(stu) {
        var z = this.students.indexOf(stu);
        this.students.splice(z,1);
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

var g = new Student();
g.id = 8006;
g.firstName = "Geordi";
g.lastName = "Doe";
g.grade = 11;
g.searched = false;

var b = new Student();
b.id = 1001;
b.firstName = "hi";
b.lastName = "boo";
b.grade = 12;
b.searched = false;

var t = new Teacher();
t.id = 1002;
t.firstName = "Harry";
t.lastName = "Potter";
t.subject = "DADA";

var sect = new Section();

sect.name = "testsect";
sect.maxSize = 40;
sect.teacher = t;
console.log(sect);
sect.addStudent(j);
sect.addStudent(g);
sect.addStudent(b);

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
        var stu = SECTIONS[z].students;
        for (var i = 0; i < stu.length; i++) {
            if(stu[i].id === id || (stu.firstName === fn && stu.lastName === ln)){
                SECTIONS[z].students[i].searched = true;
                f = true;
                html();
            }
        }
    }
    if(!f) {
        document.getElementById('searched').innerHTML = "No students found";
        listSectionInfo(sect);
    }
}

function addStudentToSection() {
    var section = document.getElementById("sectInp");
    var newStu = new Student();
    newStu.firstName = document.getElementById("stuInp1").value;
    newStu.lastName = document.getElementById("stuInp2").value;
    newStu.id = parseInt(document.getElementById("stuInp3").value);
    newStu.grade = document.getElementById("stuInp4").value;
    section.addStudent(newStu);
}

function removeStudentFromSection(section) {
    //var section = document.getElementById("sectInp").value;
    var fn = document.getElementById("stuInp1").value;
    var ln = document.getElementById("stuInp2").value;
    var d = document.getElementById("stuInp3").value;
    var g = document.getElementById("stuInp4").value;

    for(var i =0; i < section.students.length; i++) {
        var f = section.students[i].firstName;
        if (f == fn && section.students[i].lastName == ln &&
            section.students[i].id == parseInt(d) && section.students[i].grade == parseInt(g)) {
            section.removeStudent(section.students[i]);
        }
    }
}

function addaStudent(id, fname, lname, grade) {
    var stu = new Student();
    stu.id = id;
    stu.firstName = fname;
    stu.lastName = lname;
    stu.grade = grade;
    return stu;
}

function addaTeacher(id, fname, lname, subject) {
    var teacher = new Teacher();
    teacher.id = id;
    teacher.firstName = fname;
    teacher.lastName = lname;
    teacher.subject = subject;
    return teacher;
}

function addSection(sect, name, maxSize, currentSize, students, teacher) {
    sect = new Section();
    sect.name = name;
    sect.maxSize = maxSize;
    sect.currentSize = currentSize;
    sect.students = students;
    sect.teacher = teacher;
    SECTIONS.push(sect);
    return sect;
}
function listSectionInfo(sectionId) {
    sectionId.listInfo();
}