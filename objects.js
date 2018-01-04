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

var b = new Student();
b.firstName = 'jo';
b.lastName = 'five';
b.grade = 10;
b.id = 5;

var h = new Student();
h.firstName = 'Ellie';
h.lastName = 'two';
h.grade = 11;
h.id = 2;

var d = new Teacher();
d.firstName = 'Doc';
d.lastName = 'Tor';
d.subject = 'Medicine';
d.id = 0;

var green = new Section();
green.name = 'green';
green.maxSize = 20;
green.students.push(b, h);
green.addTeacher(d);

STUDENTS.push(b,h);
TEACHERS.push(d);
SECTIONS.push(green);

console.log(green);