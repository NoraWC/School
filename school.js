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

function Student() {
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

function showTeacher(bool) {
    var classy = 'secret';
    var returnVal = '';
    var vals = ["'first name", "'last name", "'id", "'subject"];
    if(bool) {
        classy = 'show';
    }
    for(var y = 1; y < 5; y++) {
        returnVal += "<input title = 'teacherInp'" + y + "' class = '"+ classy + "'";
        returnVal += "' id = 'teacherInp'" + y + "' type = 'text' value = " + vals[y-1] + "'>";
    }
    return returnVal;
}

function showStudent(bool) {
    var classy = 'secret';
    var returnVal = '';
    var vals = ["'first name", "'last name", "'id", "'grade"];
    if(bool) {
        classy = 'show';
    }
    for(var y = 1; y < 5; y++) {
        returnVal += "<input title = 'studentInp'" + y + "' class = '"+ classy + "'";
        returnVal += "' id = 'StudentInp'" + y + "' type = 'text' value = " + vals[y-1] + "'>";
    }
    return returnVal;
}


function html() {
    //use length of sections to determine how many columns/rows needed
    var len = SECTIONS.length;
    var returnVal = "<table>";
    var divs = "";


    var bleh = ["'name/id", "'max size", "'current size", "'students", "'teacher"];
    divs += "<td><div id = 'sectionInputs'>";
    divs += "<button id = 'showsection' onclick = 'listSectionInfo();'></button>";
    for (var f = 1; f < 6; f ++) {
        //fix class
        //make a function like Student/Teacher???
        divs += "<input title = 'sectionInp" + f + "' class = 'show' id = 'sectionInp" + f + "' type = 'text' value = " + bleh[f-1] + "'>";
    }

    divs += "<td><div id = 'teacherInputs'>";
    divs += "<button id = 'showTeacher' onclick = 'showTeacher(true);'></button>";
    divs += "</div></td>";
    divs += "<td><div id = 'studentInputs'>";
    divs += "<button id = 'showStudent' onclick = 'showStudent(true);'></button>";
    divs += "</div></td>";

     returnVal += "<tr>" + divs + "</div></td></tr>";

    for(var i = 0; i < len; i ++) {
        var stu = [];
        for (var x = 0; x < SECTIONS[i].students.length; x ++) {
            var anyStu = SECTIONS[i].students[x];
            var classify = '';
            if(!anyStu.searched) {
                classify = 'secret';
            } else {
                classify = 'show';
            }
            stu+="<div class = '"+classify+"' id = 'student"+anyStu.id+"'>Name: "+anyStu.firstName+" "+anyStu.lastName+" ID: "+anyStu.id+" Grade: " + anyStu.grade + "</div>";
        }
        returnVal += "<tr><td id = 'name'><div class = 'fancy'>Section:</div>" + SECTIONS[i].name + "</td>";
        returnVal += "<td id = '" + SECTIONS[i].id + "teacher'><div class = 'fancy'>Teacher:</div>Mx. " + SECTIONS[i].teacher.lastName +"</td>";
        returnVal += "<td class = 'students' id = '" + SECTIONS[i].id + "students'><div class = 'fancy'>Students:</div>" + stu + "</td>";
        returnVal += "</tr>";
    }
    returnVal += "</table>";
    document.getElementById("displayTable").innerHTML = returnVal;
}

function search(fn, ln, id, gr) {
    var f = false;
    id = parseInt(id);
    gr = parseInt(gr);
    for(var z =0; z < SECTIONS.length; z ++) {
        var stu = SECTIONS[z].students;
        for (var i = 0; i < stu.length; i++) {
            if(stu[i].id === id || (stu[i].firstName === fn && stu[i].lastName === ln && stu[i].grade === gr)){
                SECTIONS[z].students[i].searched = true;
                f = true;
                html();
            }
        }
    }
    if(f) {
        html();
    } else {
        document.getElementById("error").innerHTML = "Student "+fn+" "+ln+" ID "+id+" in grade "+gr+" not found. Try searching in other grades and check your spelling."
    }
}

function val(id, type) {

    var arr = [];
    if (type === "section") {
        id = id.toString();
        arr = SECTIONS;
    } else if (type === "student") {
        id = parseInt(id);
        arr = STUDENTS;
    } else if (type === "teacher") {
        id = parseInt(id);
        arr = TEACHERS;
    } else {
        return 0;
    }
    for (var geriatric = 0; geriatric < arr.length; geriatric ++) {
        var foxes = arr[geriatric].id;
        if( foxes === id) {
            id = arr[geriatric];
        }
    }
    return id;
}

function addStudentToSection(section, stu) {
    stu = val(stu, "student");
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
    newStu.firstName = document.getElementById("addStuName1").value;
    newStu.lastName = document.getElementById("addStuName2").value;
    newStu.id = parseInt(document.getElementById("addStuId").value);
    newStu.grade = parseInt(document.getElementById("addStuGrade").value);
    STUDENTS.push(newStu);
    console.log(STUDENTS);
    console.log(newStu);
    return newStu;
}

function addaTeacher() {
    var teacher = new Teacher();
    teacher.firstName = document.getElementById('addTeaName1').value;
    teacher.lastName = document.getElementById('addTeaName2').value;
    teacher.subject = document.getElementById('addTeaSubj').value;
    TEACHERS.push(teacher);
    console.log(TEACHERS);
    console.log(teacher);
    return teacher;
}

function addSection() {
    var sect = new Section();
    sect.name = document.getElementById('addSectName');
    sect.maxSize = document.getElementById('addSectMax');
    sect.currentSize =
    students = students.split(", ");
    for(var z = 0; z< students.length; z++) {
        students[z] = val(students[z], 'student');
        sect.students.push(students[z]);
    }
    sect.teacher = val(teacher, 'teacher');
    SECTIONS.push(sect);
    console.log(SECTIONS);
    html();
    return sect;

}
function listSectionInfo() {
    for (var g = 0; g < STUDENTS.length; g++) {
        search(STUDENTS[g].firstName, STUDENTS[g].lastName, STUDENTS[g].id, STUDENTS[g].grade);
    }
    for(var z = 0; z < SECTIONS.length; z++) {
        var sectionId = SECTIONS[z];
        var sec = SECTIONS[z].name;
        document.getElementById(sec + 'teacher').innerHTML += ", " + sectionId.teacher.subject;
    }

}