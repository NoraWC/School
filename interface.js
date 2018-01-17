
function html() {
    var len = SECTIONS.length;
    var returnVal = "";

    for(var i = 0; i < len; i ++) {
        //displays section name, contains buttons to hide/show section
        returnVal += "<tr id = 'sect" + SECTIONS[i].id + "all'><td id = 'name'><div class = 'fancy'>Section " + SECTIONS[i].id +"</div><div id = '" + SECTIONS[i].id + "name'></div>";
        returnVal += "<button id = 'dispsect" + SECTIONS[i].id + "' onclick = 'listSectionInfo(" + SECTIONS[i].id + ")'>Display Info</button>";
        returnVal += "<button id = 'hidesect" + SECTIONS[i].id + "' class = 'secret' onclick = 'hideSectionInfo("+SECTIONS[i].id+");'>Hide Info</td>";

        //teacher
        returnVal += "<td id = '" + SECTIONS[i].id + "tea'><div class = 'fancy'>Teacher:</div><div id = '" + SECTIONS[i].id + "disptea'></div></td>";

        //students
        returnVal += "<td id = '" + SECTIONS[i].id + "stu'><div class = 'fancy'>Students:</div><div class = 'displayStudents' id = '" + SECTIONS[i].id + "dispstu'></div></td>";

        //shows size data
        returnVal += "<td id = '"+ SECTIONS[i].id+"size'><div class = 'fancy'>Size:</div><div id = '" +SECTIONS[i].id +"dispsize'</td>";
        returnVal += "</tr>";
    }
    document.getElementById("displayTable").innerHTML = returnVal;
}

function dispStudents(sectId) {
    //displays students; add/remove students
    var stuTable = "<table class = 'studentTable' id = '" + sectId + "stu'>";

    var sect = val(sectId, 'section');
    //sets up table w/student data
    stuTable += "<tr id = 'studentInfo'><td class = 'fancy'>First Name:</td><td class = 'fancy'>Last Name:</td><td class = 'fancy'>Grade:</td></tr>";
    for(var i = 0; i < sect.students.length; i ++) {
        stuTable += "<tr id = '" + sectId + "dispStu" + i + "'>";
        stuTable += "<td id = 'stu" + sect.students[i].id + "fn'>" + sect.students[i].firstName + "</td>";
        stuTable += "<td id = 'stu" + sect.students[i].id + "ln'>" + sect.students[i].lastName + "</td>";
        stuTable += "<td id = 'stu" + sect.students[i].id + "gr'>" + sect.students[i].grade + "</td>";
        stuTable += "</tr>";
    }

    //div to add/remove students from this section
    var addRem= "<div id = 'add_remove'>";
    //removes student
    addRem += "<button id = 'removeStu"+sectId+"' onclick = 'removeStudentFromSection("+sectId + ", prompt(\"Enter the ID of the student you want to remove.\"));'>Remove student</button>";
    //removes student
    addRem += "<button id = 'addStu"+sectId+"' onclick = 'addStudentToSection(" +sectId+", prompt(\"Enter the ID of the student you want to add.\"));'>Add student</button></div>";

    document.getElementById(sectId + 'dispstu').innerHTML += stuTable + "</table>";
    document.getElementById(sectId + 'dispstu').innerHTML += addRem ;
}


function setAddSection() {

    document.getElementById('sectbars').innerHTML = "<input type = text title = 'addSect1' id = 'addSectName' value = 'Section Name'>";
    document.getElementById('sectbars').innerHTML += "<input type = text title = 'addSect1' id = 'addSectMax' value = 'Max Size'>";

    console.log(FREE_STUDENTS);
    var fin = "<select id = 'students' multiple>";
    for (var i = 0; i < FREE_STUDENTS.length; i ++) {
        fin+= "<option value = '" + FREE_STUDENTS[i].id + "'>";
        fin += FREE_STUDENTS[i].firstName + " " + FREE_STUDENTS[i].lastName + "</option>";
    }
    fin+= "</select>";
    document.getElementById('addingSectStu').innerHTML = fin;

    var ret = "<select id = 'teacher'>";
    for (var x = 0; x < FREE_TEACHERS.length; x ++) {
        ret += "<option value = '" + FREE_TEACHERS[x].id + "'>";
        ret += FREE_TEACHERS[x].firstName + " " + FREE_TEACHERS[x].lastName + "</option>";
    }
    ret += "</select>";
    document.getElementById('addingSectTea').innerHTML = ret;
}

function setSearch() {
    var val1, val2, val3, val4, val5;
    if (document.getElementById('searchstu').className === 'show') {
        val1 = document.getElementById('name1Stu').value;
        val2 = document.getElementById('name2Stu').value;
        val3 = document.getElementById('IdStu').value;
        val4 = document.getElementById('searchGrade').value;
        val5 = 'stu';
    }
    if (document.getElementById('searchtea').className === 'show') {
        val1 = document.getElementById('name1Tea').value;
        val2 = document.getElementById('name2Tea').value;
        val3 = document.getElementById('IdTea').value;
        val4 = document.getElementById('searchSubject').value;
        val5 = 'tea';
    }
    if (document.getElementById('searchsec').className === 'show') {
        val1 = document.getElementById('searchSectionName').value;
        val2 = document.getElementById('searchSectionId').value;
        val3 = "";
        val4 = "";
        val5 = 'sec';
    }
    search(val1, val2, val3, val4, val5);
}


function hideSectionInfo(sectId) {
    sectId = parseInt(sectId);
    document.getElementById(sectId+ "name").innerHTML = "";
    document.getElementById('hidesect' + sectId).className = 'secret';
    document.getElementById('dispsect' + sectId).className = 'show';
    document.getElementById(sectId + "disptea").innerHTML = "";
    document.getElementById(sectId + "dispstu").innerHTML = "";
    document.getElementById(sectId + "dispsize").innerHTML = "";
}

function listSectionInfo(sect) {
    sect = val(sect, 'section');
    document.getElementById(sect.id + "name").innerHTML +=  sect.name;
    document.getElementById('hidesect'+sect.id).className = 'show';
    document.getElementById('dispsect'+sect.id).className = 'secret';

    console.log(sect.teacher);
    document.getElementById(sect.id + "disptea").innerHTML += "Mx. " + sect.teacher.lastName + "<br>Subject: " + sect.teacher.subject;

    dispStudents(sect.id);

    document.getElementById(sect.id + "dispsize").innerHTML += "Current Size: " + sect.currentSize + "<br>Max Size: " + sect.maxSize + "<br>Seats Remaining: " + sect.sectionSeatsRemaining();
    console.log(sect);
    return(sect);
}

function search(fn, ln, id, gr, type) {
    var f = false;
    if(type === 'stu') {
        document.getElementById('searchDisplay').innerHTMl = "";
        var arr = [];
        id = parseInt(id);
        gr = parseInt(gr);
        for(var z =0; z < SECTIONS.length; z ++) {
            for (var i = 0; i < SECTIONS[z].students.length; i++) {
                if(SECTIONS[z].students[i].id === id || (SECTIONS[z].students[i].firstName === fn && SECTIONS[z].students[i].lastName === ln && SECTIONS[z].students[i].grade === gr)){
                    arr.push(SECTIONS[z].students[i].firstName+" "+SECTIONS[z].students[i].lastName+" ID "+SECTIONS[z].students[i].id+" is in grade "+SECTIONS[z].students[i].grade+" and section " + SECTIONS[z].id + ".");
                    f = true;
                }
            }
        }
        document.getElementById("searchDisplay").innerHTML = arr.toString();
        if(!f) {
            document.getElementById("searchDisplay").innerHTML = "Student "+fn+" "+ln+" ID "+id+" in grade "+gr+" not found. Try searching in other grades and checking your spelling. Are you sure this student is in a section?"
        }
    } else if(type === 'tea') {
        document.getElementById('searchDisplay').innerHTMl = "";
        id = parseInt(id);
        gr = gr.toString();
        for(var x =0; x < SECTIONS.length; x ++) {
            var teacher = SECTIONS[x].teacher;
            if (teacher.id === id || (teacher.firstName === fn && teacher.lastName === ln) || teacher.subject === gr) {
                document.getElementById('searchDisplay').innerHTML = "Mx. "+teacher.firstName+" "+teacher.lastName+" ID "+teacher.id+" teaches "+teacher.subject+" in section " + SECTIONS[x].id + ".";
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTML = "Teacher " + fn + " " + ln + " ID " + id + " of " + gr + " not found. Try checking your spelling. Are you sure this teacher is in a section?"
        }
    }
    if(type === "sec") {
        document.getElementById('searchDisplay').innerHTML = "";
        f = false;
        ln = parseInt(ln);
        for(var b = 0; b < SECTIONS.length; b++) {
            if(SECTIONS[b].name === fn || SECTIONS[b].id === ln) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[b].listInfo();
                f = true;
            }
        }

        if (f === false) {
            document.getElementById('searchDisplay').innerHTML += "Section "+fn+" ID " + ln+" not found. Try checking your spelling.";
        }
    }
}