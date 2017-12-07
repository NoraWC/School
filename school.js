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


var STUDENTS = [];

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
        ret += " Seats Remaining: " + this.sectionSeatsRemaining();
        return ret;
    }
}

var j = new Student();
j.id = 9005;
j.firstName = "Jane";
j.lastName = "Doe";
j.grade = 9;
j.searched = false;
STUDENTS += j;

var g = new Student();
g.id = 8006;
g.firstName = "Geordi";
g.lastName = "Doe";
g.grade = 11;
g.searched = false;
STUDENTS += g;

var b = new Student();
b.id = 1001;
b.firstName = "hi";
b.lastName = "boo";
b.grade = 12;
b.searched = false;
STUDENTS += b;

var t = new Teacher();
t.id = 1002;
t.firstName = "Harry";
t.lastName = "Potter";
t.subject = "DADA";

var sect = new Section();
sect.id = 'sect';
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
            var anyStu = SECTIONS[i].students[x];
            var classify = '';
            if(!anyStu.searched) {
                classify = 'secret';
            } else {
                classify = 'showStudent';
            }
            stu+="<div class = '"+classify+"' id = 'student"+anyStu.id+"'>"+anyStu.firstName+" "+anyStu.lastName+" "+anyStu.id+"</div>";
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
    var fn = document.getElementById("stuInp1").value;//first name
    var ln = document.getElementById("stuInp2").value;//last name
    var id = parseInt(document.getElementById("stuInp3").value);//id
    var gr = parseInt(document.getElementById("stuInp4").value);
    var f = false;

    for(var z =0; z < SECTIONS.length; z ++) {
        var stu = SECTIONS[z].students;
        for (var i = 0; i < stu.length; i++) {
            if(stu[i].id === id || (stu[i].firstName === fn && stu[i].lastName === ln && stu[i].grade === gr)){
                SECTIONS[z].students[i].searched = true;
                f = true;
                html();
                return SECTIONS[z].students[i];
            }
        }
    }
    if(!f) {
        document.getElementById('searched').innerHTML = "No students found";
        listSectionInfo(sect);
    }
}

function val(id) {
    for (var geriatric = 0; geriatric < SECTIONS.length; geriatric ++) {
        if(SECTIONS[geriatric].id == id) {
            id = SECTIONS[geriatric];
        }
    }
    return id;
}

function addStudentToSection(section) {//only takes the id; doesn't take the section
    section = val(section);
    var newStu = new Student();
    newStu.firstName = document.getElementById("stuInp1").value;
    newStu.lastName = document.getElementById("stuInp2").value;
    newStu.id = parseInt(document.getElementById("stuInp3").value);
    newStu.grade = parseInt(document.getElementById("stuInp4").value);
    section.addStudent(newStu);
}

function removeStudentFromSection(section) {//only takes the id; doesn't take the section
    section = val(section);
    var fn = document.getElementById("stuInp1").value;
    var ln = document.getElementById("stuInp2").value;
    var d = parseInt(document.getElementById("stuInp3").value);
    var g = parseInt(document.getElementById("stuInp4").value);
    for(var num = 0; num < section.students.length; num++) {
        var f = section.students[num].firstName;
        var l = section.students[num].lastName;
        var id = section.students[num].id;
        var gr = section.students[num].grade;
        if (f === fn && l === ln && id === parseInt(d) && gr === parseInt(g)) {
            section.removeStudent(section.students[num]);
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
    sectionId = val(sectionId);
    var tea = " Teacher: Mx. ";
    tea += sectionId.teacher.lastName + ", " + sectionId.teacher.subject;
    var stu = " Students:";
    for (var boo = 0; boo < sectionId.students.length; boo++) {
        stu += " " + sectionId.students[boo].firstName + " " + sectionId.students[boo].lastName;
        stu += " ID: " + sectionId.students[boo].id;
        stu += " Grade: " + sectionId.students[boo].grade;
        if(boo>0 && boo < sectionId.students.length-1) {
            stu += "<br>";
        }
    }
    return sectionId.listInfo() + tea + stu;
}