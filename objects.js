var STUDENTS = [];
var FREE_STUDENTS = [];
var TEACHERS = [];
var FREE_TEACHERS = [];
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
    this.id = STUDENTS.length + FREE_STUDENTS.length + 1;
}

function Teacher(){
    Person.call();
    this.subject = "";
    this.id = TEACHERS.length + FREE_TEACHERS + 1;
}


function Section() {
    this.name = "";
    this.maxSize = 0;
    this.students = [];
    this.currentSize = this.students.length;
    this.id = SECTIONS.length + 1;
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

var b = new Student();
b.firstName = "Jo";
b.lastName = "five";
b.grade = 10;
STUDENTS.push(b);
console.log(b);

var h = new Student();
h.firstName = "Ellie";
h.lastName = "two";
h.grade = 11;
STUDENTS.push(h);
console.log(h);

var c = new Student();
c.firstName = "Luco";
c.lastName = "four";
c.grade = 12;
FREE_STUDENTS.push(c);
console.log(c);

var d = new Teacher();
d.firstName = "Doc";
d.lastName = "Tor";
d.subject = "Medicine";
TEACHERS.push(d);
console.log(d);

var green = new Section();
green.name = "green";
green.maxSize = 20;
green.addStudent(h);
green.addStudent(b);
green.addTeacher(d);

SECTIONS.push(green);

console.log(green);