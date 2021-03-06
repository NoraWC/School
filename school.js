
function listall(inp) {
    var arr1, arr2;
    var tab = "";
    if(inp === "sec") {
        tab = "<div id = 'listtitle' class = 'fancy'>Sections:</div><table id = 'allList'>";
        for (var x = 0; x < SECTIONS.length; x ++) {
            tab += '<tr id = "'+ x + '">';
            tab += '<td id = "name">'+"Section name: " + SECTIONS[x].name+'</td>';
            tab += '<td id = "max">'+ "Max size: "+SECTIONS[x].maxSize+'</td>';
            tab += '<td id = "current">' + "Current size: " +SECTIONS[x].currentSize+'</td>';
            tab += '<td id = "left">'+"Seats remaining: " + SECTIONS[x].sectionSeatsRemaining()+'</td>';
            tab += '<td id = "tea">'+'Teacher: ' +SECTIONS[x].teacher.firstName + " " + SECTIONS[x].teacher.lastName +'</td>';
            tab += '</tr>';
        }
        tab += "</table>";
        tab += "<button onclick = 'document.getElementById(\"searchDisplay\").innerHTML = \"\";'>Hide this</button>";
        return tab;
    }
    else if (inp === "stu" || inp === "tea") {
        tab = "<div id = 'listtitle' class = 'fancy'>Students:</div>";
        arr1 = STUDENTS;
        arr2 = FREE_STUDENTS;
        if (inp === "tea") {
            arr1 = TEACHERS;
            arr2 = FREE_TEACHERS;
            tab = "<div class = 'fancy'>Teachers:</div>";
        }
        tab += "<table id = 'allList' class = 'small'>";
        for (var i = 0; (i < arr1.length || i < arr2.length); i++) {
            if(arr1.length > i) {
                tab += '<tr id = "'+ i +'">';
                tab += '<td id ="id">'+arr1[i].id+'</td><td id = "fn">'+arr1[i].firstName+'</td><td id = "ln">'+arr1[i].lastName+'</td>';
                tab += '</tr>';
            }
            if (arr2.length > i) {
                tab += '<tr id = "'+ i +'">';
                tab += '<td id ="id">'+arr2[i].id+'</td><td id = "fn">'+arr2[i].firstName+'</td><td id = "ln">'+arr2[i].lastName+'</td>';
                tab += '</tr>';
            }
        }
        tab += "</table>";
        tab += "<button onclick = 'document.getElementById(\"searchDisplay\").innerHTML = \"\";'>Hide this</button>";
        return tab;
    }
}

function val(id, type) {
    var arr = [];
    var ray;
    if (type === "section") {
        id = parseInt(id);
        arr = SECTIONS;
    } else if (type === "student") {
        id = parseInt(id);
        for(var bin = 0; bin < 2; bin ++) {
            if(bin === 0) {
                ray = STUDENTS;
            } else {
                ray = FREE_STUDENTS;
            }
            for (var num = 0; num < ray.length; num ++) {
                if(ray[num].id === id) {
                    arr = ray;
                }
            }
        }
    } else if (type === "teacher") {
        id = parseInt(id);
        for(var ary = 0; ary < 2; ary ++) {
            if(ary === 0) {
                ray = TEACHERS;
            } else {
                ray = FREE_TEACHERS;
            }
            for (var i = 0; i < ray.length; i ++) {
                if(ray[i].id === id) {
                    arr = ray;
                }
            }
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
            listSectionInfo(section.id);
            break;
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
    listSectionInfo(section.id);
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

    var teacher = parseInt(document.getElementById('teacher').value);

    var studentsList = [];
    for (var i = 0; i < document.getElementById('students').length; i++) {
        if(document.getElementById('students')[i].selected === true) {
            studentsList.push(parseInt(document.getElementById('students')[i].value));
        }
    }

    for (var x = 0; x < studentsList.length; x++) {
        sect.addStudent(val(studentsList[x], 'student'));
    }

    sect.addTeacher(val(teacher, 'teacher'));

    sect.currentSize = sect.students.length;

    SECTIONS.push(sect);
    console.log(SECTIONS);
    console.log(sect);
    setAddSection();
    html();
}