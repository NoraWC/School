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