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
        var stu = [];
        for (var x = 0; x < SECTIONS[i].students.length; x ++) {
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
    for(var z in SECTIONS) {
        for (var i = 0; i < z.students; i++) {
            if(z.students[i].id === id || z.students[i].lastName === ln || z.students[i].firstName === fn) {
                arr+=z.students[i];
            }
        }
    }
    //show/hide divs in table? (display = none; display = inline)
    if(arr.length>0) {
        document.getElementById('searched').innerHTML = arr.toString;
    } else {
        //gets current 'searched' innerhtml
        var current = document.getElementById('searched').value;
        //finds first close bracket
        var stop = current.indexOf('>');
        //should ideally replace first close bracket with class to hide td
        document.getElementById('searched').innerHTML = current.substring(0, stop-1) + "class = 'secret'>" + current.substring(stop, current.length);
    }
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
    addTeacher: function(Teacher) {
        this.teacher = Teacher;
    },
    removeStudent: function(id) {
        for(var i = 0; i < this.students.length; i++) {
            if(this.students[i].id === id) {
                this.students = this.students.slice(0,i) + this.students.slice(i+1,this.students.length);
            }
        }
    },
    sectionSeatsRemaining: function() {
        return this.maxSize - this.currentSize;
    },
    listInfo : function() {
        var ret = "Name: " + this.name + " Max Size: " + this.maxSize + " Current Size: " + this.currentSize;
        ret += " Students: " + this.students + " Teacher: " + this.teacher;
        return ret;
    }
};

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

function addTeacher(id, fname, lname, subject) {
    var teacher = new Teacher(id, fname, lname, subject);
    this.addTeacher(teacher);
}

function addSection(sect, name, maxSize, currentSize, students, teacher) {
    sect = new Section(name, maxSize, currentSize, students, teacher);
    return sect;
}
function listSectionInfo(sectionId) {
    sectionId.listInfo();
}