/* MUST HAVE:
* web interface w/ buttons, text fields, display area for output
* table w/ elements: students, teachers, sections CHECK
* interface to add new students, teachers, sections
* add/remove students in sections CHECK
* search mechanism CHECK
* show/hide div content CHECK
* relative positioning
* global/local vars CHECK
* OBJECTS ChECK
 */


var STUDENTS = [];
var TEACHERS = [];
var SECTIONS = [];//lists all sections


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
    this.id = this.name;
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
STUDENTS.push(j);

var h = new Student();
h.id = 7777;
h.firstName = "hh";
h.lastName = "r";
h.grade = 9;
h.searched = false;

var g = new Student();
g.id = 8006;
g.firstName = "Geordi";
g.lastName = "Doe";
g.grade = 11;
g.searched = false;
STUDENTS.push(g);

var b = new Student();
b.id = 1001;
b.firstName = "hi";
b.lastName = "boo";
b.grade = 12;
b.searched = false;
STUDENTS.push(b);

var t = new Teacher();
t.id = 1002;
t.firstName = "Harry";
t.lastName = "Potter";
t.subject = "DADA";
TEACHERS.push(t);
console.log(h, g, j);
console.log(t);
/*
var sect = new Section();
sect.id = 'sect';
sect.name = "testsect";
sect.maxSize = 40;
sect.teacher = t;
console.log(sect);
sect.addStudent(j);
sect.addStudent(b);


var k = new Teacher();
k.id = 0040;
k.firstName = "ll";
k.lastName = "nnn";
k.subject = "Running";

var u = new Student();
u.id = 9999;
u.firstName = "o";
u.lastName = "i";
u.grade = "0";

var other = new Section();
other.id = 'other';
other.name = "two";
other.maxSize = 40;
SECTIONS.push(other);
other.teacher = k;
other.addStudent(u);
other.addStudent(g);
console.log(other);
*/
function html() {
    //use length of sections to determine how many columns/rows needed
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
        returnVal += "<tr><th id = " + SECTIONS[i].id + "><td id = 'name'>Section: " + SECTIONS[i].name + "</td>";
        returnVal += "<td id = '" + SECTIONS[i].id + "teacher'> Teacher: " + SECTIONS[i].teacher.lastName +"</td>";
        returnVal += "<td id = '" + SECTIONS[i].id + "students'> Students: </td>";
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
    var searched = [];
    for(var z =0; z < SECTIONS.length; z ++) {
        var stu = SECTIONS[z].students;
        for (var i = 0; i < stu.length; i++) {
            if(stu[i].id === id || (stu[i].firstName === fn && stu[i].lastName === ln && stu[i].grade === gr)){
                SECTIONS[z].students[i].searched = true;
                f = true;
                html();
                searched += SECTIONS[z].students[i];
            }
        }
    }

    if(!f) {
        document.getElementById('searched').innerHTML = "No students found";
        listSectionInfo(sect);
    } else {
        document.getElementById('searched').innerHTML = searched;
    }
}

function val(id, type) {
    var arr = [];
    if (type === "section") {
        arr = SECTIONS;
    } else if (type === "student") {
        arr = STUDENTS;
    } else if (type === "teacher") {
        arr = TEACHERS;
    } else {
        return 0;
    }
    for (var geriatric = 0; geriatric < arr.length; geriatric ++) {
        if(arr[geriatric].id == id) {
            id = arr[geriatric];
        }
    }
    return id;
}

function addStudentToSection(section, stu) {
    section = val(section, 'section');
    section.addStudent(stu);
}

function removeStudentFromSection(section) {
    section = val(section, 'section');
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

function addaStudent() {
    var newStu = new Student();
    newStu.firstName = document.getElementById("stuInp1").value;
    newStu.lastName = document.getElementById("stuInp2").value;
    newStu.id = parseInt(document.getElementById("stuInp3").value);
    newStu.grade = parseInt(document.getElementById("stuInp4").value);
    STUDENTS.push(newStu);
    console.log(STUDENTS);
    console.log(newStu);
    return newStu;
}

function addaTeacher(id, fname, lname, subject) {
    var teacher = new Teacher();
    teacher.id = parseInt(document.getElementById('stuInp3').value);
    teacher.firstName = document.getElementById('stuInp1').value;
    teacher.lastName = document.getElementById('stuInp2').value;
    teacher.subject = document.getElementById('stuInp4').value;
    TEACHERS.push(teacher);
    console.log(TEACHERS);
    console.log(teacher);
    return teacher;
}

function addSection(sect, name, maxSize, currentSize, students, teacher) {
    sect = new Section();
    sect.id = sect;
    sect.name = sect;
    sect.maxSize = maxSize;
    sect.currentSize = currentSize;

    students = students.split(", ");
    for(var z = 0; z< students.length; z++) {
        students[z] = val(students[z], 'student');
        sect.students.push(students[z]);
    }
    sect.teacher = val(teacher, 'teacher');
    SECTIONS.push(sect);
    console.log(SECTIONS);
    return sect;

}
function listSectionInfo(sectionId) {
    var sec = sectionId;
    //validation doesn't work, id always = Section (w/o quote)
    sectionId = val(sectionId, 'section');
    var tea = "Teacher:<br>Mx.";
    tea += sectionId.teacher.lastName + ",  " + sectionId.teacher.subject;
    document.getElementById(sec + 'teacher').innerHTML = tea;

    var stu = " Students:";
    for (var boo = 0; boo < sectionId.students.length; boo++) {
        stu += "<br>" + sectionId.students[boo].firstName + " " + sectionId.students[boo].lastName;
        stu += " ID: " + sectionId.students[boo].id;
        stu += " Grade: " + sectionId.students[boo].grade;
        document.getElementById(sec + 'students').innerHTML = stu;
    }

    //return sectionId.listInfo() + tea + stu;
}