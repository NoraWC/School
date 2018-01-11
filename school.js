/* MUST HAVE:
* web interface w/ buttons, text fields, display area for output CHECK
* table w/ elements: students, teachers, sections CHECK
* interface to add new students, teachers, sections CHECK
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
    for(var num = 0; num < section.students.length; num++) {
        if (section.students[num].id !== stu.id) {
            section.addStudent(stu);
            setAddSection();
            hideSectionInfo(section.id);
            listSectionInfo(section);
        } else {
            document.getElementById("addingSect").innerHTML += "This student is already in this section!";
        }
    }
}

function removeStudentFromSection(section, id) {
    id = parseInt(id);
    section = val(section, 'section');
    var stu = val(id, 'student');
    for(var num = 0; num < section.students.length; num++) {
        if (section.students[num].id === stu.id) {
            section.removeStudent(section.students[num]);
        }
    }
    setAddSection();
    hideSectionInfo(section.id);
    listSectionInfo(section);
}

function addaStudent() {
    var newStu = new Student();
    var fn = document.getElementById("addStuName1").value;
    var ln = document.getElementById("addStuName2").value;
    var gr = parseInt(document.getElementById("addStuGrade").value);

    newStu.firstName = fn;
    newStu.lastName = ln;
    newStu.grade = gr;

    for (var g = 0; g <= 1; g++) {
        if ( g === 0) {
            var arr = STUDENTS;
        } else {
            arr = FREE_STUDENTS;
        }
        for (var f = 0; f < arr.length; f++) {
            if(arr[f].firstName === fn && arr[f].lastName === ln && arr[f].grade === gr) {
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
    var fn = document.getElementById('addTeaName1').value;
    var ln = document.getElementById('addTeaName2').value;
    var su = document.getElementById('addTeaSubj').value;

    teacher.firstName = fn;
    teacher.lastName = ln;
    teacher.subject = su;

    for (var g = 0; g <= 1; g++) {
        if ( g === 0) {
            var arr = TEACHERS;
        } else {
            arr = FREE_TEACHERS;
        }
        for (var f = 0; f < arr.length; f++) {
            if(arr[f].firstName === fn && arr[f].lastName === ln && arr[f].subject === su) {
                document.getElementById("searchDisplay").innerHTML = "This teacher already exists!";
                return null;
            }
        }
    }

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
    sect.maxSize = parseInt(document.getElementById('addSectMax').value);

    //find value of selected!!!!!
    var teacher = parseInt(document.getElementById('teacher').value);

    //find value of selected!!!!!
    var students = parseInt(document.getElementById("students").value);
    sect.addStudent(val(students, 'student'));

    sect.addTeacher(val(teacher, 'teacher'));

    sect.currentSize = sect.students.length;

    SECTIONS.push(sect);
    console.log(SECTIONS);
    console.log(sect);
    html();
    return sect;

}