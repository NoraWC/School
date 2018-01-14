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
    this.id = TEACHERS.length + FREE_TEACHERS.length + 1;
}


function Section() {
    this.name = "";
    this.maxSize = 0;
    this.students = [];
    this.currentSize = this.students.length;
    this.id = SECTIONS.length + 1;
    this.addStudent = function(Student) {
        this.currentSize += 1;
        this.students.push(Student);
        STUDENTS.push(Student);
        var x = FREE_STUDENTS.indexOf(Student);
        FREE_STUDENTS.splice(x,1);
    };
    this.addTeacher= function(Teacher) {
        this.teacher = Teacher;
        var z = FREE_TEACHERS.indexOf(Teacher);
        FREE_TEACHERS.splice(z,1);
    };
    this.removeStudent = function(stu) {
        var z = this.students.indexOf(stu);
        this.students.splice(z,1);
        var x = STUDENTS.indexOf(stu);
        STUDENTS.splice(x,1);
        FREE_STUDENTS.push(stu);
        this.currentSize -= 1;
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
FREE_STUDENTS.push(b);

var h = new Student();
h.firstName = "Ellie";
h.lastName = "two";
h.grade = 11;
FREE_STUDENTS.push(h);

var c = new Student();
c.firstName = "Luco";
c.lastName = "four";
c.grade = 12;
FREE_STUDENTS.push(c);

var f = new Student();
f.firstName = "Frannie";
f.lastName = "Fisher";
f.grade = 12;
FREE_STUDENTS.push(f);


var d = new Teacher();
d.firstName = "Doc";
d.lastName = "Tor";
d.subject = "Medicine";
FREE_TEACHERS.push(d);

var i = new Teacher();
i.firstName = "Remus";
i.lastName = "Lupin";
i.subject = "Dog Walking";
FREE_TEACHERS.push(i);

var green = new Section();
green.name = "green";
green.maxSize = 20;
green.addStudent(h);
green.addStudent(b);
green.addTeacher(d);
SECTIONS.push(green);
