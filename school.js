var SECTIONS = [];

function html() {

    var returnVal = "<table id = 'displaying'>";

    returnVal += "</table>";
    document.getElementById("displayTable").innerHTML = returnVal;
}

function getInput() {
}

function search() {
    var fn = document.getElementById("seachBarOne").value;
    var ln = document.getElementById("seachBarTwo").value;
    var id = document.getElementById("seachBarThree").value;
    for(var z in SECTIONS) {
        var sect = SECTIONS[z];
        for (var i in sect.students) {
            if(sect.students[i].id !== id || sect.students[i].lastName === ln || sect.students[i].firstName === fn) {

            }
        }
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
    grade: 0
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
    removeStudent: function(id) {
        for(var i in this.students) {
            if(this.students[i].id === id) {
                this.students = this.students.slice(0,i) + this.students.slice(i+1,this.students.length);
            }
        }
    },
    sectionSeatsRemaining: function() {
        return this.maxSize - this.currentSize;
    }
};