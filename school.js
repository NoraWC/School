/* MUST HAVE:
* web interface w/ buttons, text fields, display area for output
* table w/ elements: students, teachers, sections CHECK
* interface to add new students, teachers, sections
* add/remove students in sections CHECK
* search mechanism CHECK
* show/hide div content CHECK
* relative positioning
* global/local vars CHECK
* OBJECTS CHECK
 */


function val(id, type) {
    var arr = [];
    if (type === "section") {
        //id = id.toString();
        arr = SECTIONS;
    } else if (type === "student") {
        id = parseInt(id);
        if(STUDENTS.length<id) {
            arr = FREE_STUDENTS;
        } else {
            arr = STUDENTS;
        }
    } else if (type === "teacher") {
        id = parseInt(id);
        if(TEACHERS.length<id) {
            arr = FREE_TEACHERS;
        } else {
            arr = TEACHERS;
        }
    } else {
        return 0;
    }
    for (var selected = 0; selected < arr.length; selected ++) {
        var idOfSelected = arr[selected].id;
        if( idOfSelected === id) {
            id = arr[selected];
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
    //update for new search/selection fields
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
    var fn = document.getElementById("addStuName1").value;
    var ln = document.getElementById("addStuName2").value;
    var id = parseInt(document.getElementById("addStuId").value);
    var gr = parseInt(document.getElementById("addStuGrade").value);
    newStu.firstName = fn;
    newStu.lastName = ln;
    newStu.id = id;
    newStu.grade = gr;

    for (var g = 0; g <= 1; g++) {
        if ( g = 0) {
            var arr = STUDENTS;
        } else {
            arr = FREE_STUDENTS;
        }
        for (var f = 0; f < arr.length; f++) {
            if((arr[f].firstName === fn && arr[f].lastName === ln) || arr[f].id === id) {
                document.getElementById("searchDisplay").innerHTML = "This student already exists!";
                return null;
            }
        }
    }

    FREE_STUDENTS.push(newStu);
    console.log(STUDENTS);
    console.log(FREE_STUDENTS);
    console.log(newStu);
    setAddSection();
    return newStu;
}

function addaTeacher() {
    var teacher = new Teacher();
    teacher.firstName = document.getElementById('addTeaName1').value;
    teacher.lastName = document.getElementById('addTeaName2').value;
    teacher.subject = document.getElementById('addTeaSubj').value;
    FREE_TEACHERS.push(teacher);
    console.log(FREE_TEACHERS);
    console.log(TEACHERS);
    console.log(teacher);
    setAddSection();
    return teacher;
}

function addSection() {
    var sect = new Section();
    sect.name = document.getElementById('addSectName').value;
    sect.maxSize = document.getElementById('addSectMax').value;
    sect.currentSize = sect.students.length;
    /*adding students to new sections? manually is clunky
    var students = document.getElementById("addingSectStu").value;
    for(var z = 0; z < sect.currentSize; z++) {
        students[z] = val(students[z], 'student');
        sect.students.push(students[z]);
    }
    sect.teacher = val(teacher, 'teacher');
    */
    SECTIONS.push(sect);
    console.log(SECTIONS);
    html();
    return sect;

}