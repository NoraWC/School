
function html() {
    var len = SECTIONS.length;
    var returnVal = "";

    for(var i = 0; i < len; i ++) {
        //displays section name, contains buttons to hide/show section
        returnVal += "<tr id = 'sect" + SECTIONS[i].id + "all'><td id = 'name'><div class = 'fancy'>Section:</div><div id = '" + SECTIONS[i].id + "name'></div>";
        returnVal += "<button id = 'dispsect'" + i + "' onclick = 'listSectionInfo(" + SECTIONS[i].name + ")'>Display Info</button>";
        returnVal += "<button id = 'hidesect' class = 'secret' onclick = 'hideSectionInfo("+SECTIONS[i].id+");'>Hide Info</td>";

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
    //buttons to add/remove students also hide then show all section info to 'reset' table

    //fix positioning, size

    //make hidable here ?
    var stuTable = "<table class = 'studentTable' id = '" + sectId + "stu'>";

    var sect = val(sectId, 'section');
    //sets up table w/student data
    stuTable += "<tr id = 'studentInfo'><td>First Name:</td><td>Last Name:</td><td>Grade:</td></tr>";
    for(var i = 0; i < sect.students.length; i ++) {
        stuTable += "<tr id = '" + sectId + "dispStu" + i + "'>";
        stuTable += "<td id = 'stu" + sect.students[i].id + "fn'>" + sect.students[i].firstName + "</td>";
        stuTable += "<td id = 'stu" + sect.students[i].id + "ln'>" + sect.students[i].lastName + "</td>";
        stuTable += "<td id = 'stu" + sect.students[i].id + "gr'>" + sect.students[i].grade + "</td>";
        stuTable += "</tr>";
    }

    //div to add/remove students from THIS section
    var addRem= "<div id = 'add_remove'>";
    //removes student
    addRem += "<button id = 'removeStu"+sectId+"' onclick = 'removeStudentFromSection("+sectId + ", prompt(\"Enter the ID of the student you want to remove.\"));";
    //hides then shows section info: resets students
    addRem += "hideSectionInfo(" + sectId+ "); listSectionInfo(" + sectId+ ");'>Remove student</button>";
    //removes student
    addRem += "<button id = 'addStu"+sectId+"' onclick = 'addStudentToSection(" +sectId+", prompt(\"Enter the ID of the student you want to add.\"));";
    //hides then shows section info: resets students
    addRem += "hideSectionInfo(" + sectId + "); listSectionInfo(" + sectId + ");'>Add student</button></div>";

    document.getElementById(sectId + 'dispstu').innerHTML += stuTable + "</table>";
    document.getElementById(sectId + 'dispstu').innerHTML += addRem ;
}


function setAddSection() {
    var fin = "<select id = 'students'>";
    for (var i = 0; i < FREE_STUDENTS.length; i ++) {
        fin+= "<option id = 'student" + i + "' value = '" + FREE_STUDENTS[i].firstName + " " + FREE_STUDENTS[i].lastName + "'>";
        fin += FREE_STUDENTS[i].firstName + " " + FREE_STUDENTS[i].lastName + "</option>";
    }
    fin+= "</select>";
    document.getElementById('addingSectStu').innerHTML = fin;

    var ret = "<select id = 'teacher'>";
    for (var x = 0; x < FREE_TEACHERS.length; x ++) {
        ret += "<option id = 'teacher" + x + "' value = '" + FREE_TEACHERS[x].firstName + " " + FREE_TEACHERS[x].lastName + "'>";
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
    document.getElementById('hidesect').className = 'secret';
    document.getElementById('dispsect').className = 'show';
    document.getElementById(sectId + "disptea").innerHTML = "";
    document.getElementById(sectId + "dispstu").innerHTML = "";
    document.getElementById(sectId + "dispsize").innerHTML = "";
}

function listSectionInfo(sect) {
    sect = val(sect, 'section');
    document.getElementById(sect.id + "name").innerHTML += "Section " + sect.id + ": " + sect.name;
    document.getElementById('hidesect').className = 'show';
    document.getElementById('dispsect').className = 'secret';
    document.getElementById(sect.id + "disptea").innerHTML += "Mx. " + sect.teacher.lastName;

    dispStudents(sect.id);

    document.getElementById(sect.id + "dispsize").innerHTML += "Current Size: " + sect.currentSize + "<br>Max Size: " + sect.maxSize + "<br>Seats Remaining: " + sect.sectionSeatsRemaining();
    console.log(sect);
    return(sect);
}

function search(fn, ln, id, gr, type) {
    var f = false;
    if(type === 'stu') {
        var arr = [];
        id = parseInt(id);
        gr = parseInt(gr);
        for(var z =0; z < SECTIONS.length; z ++) {
            for (var i = 0; i < SECTIONS[z].students.length; i++) {
                if(SECTIONS[z].students[i].id === id || (SECTIONS[z].students[i].firstName === fn && SECTIONS[z].students[i].lastName === ln) || SECTIONS[z].students[i].grade === gr){
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
        document.getElementById('searchDisplay').innerHTMl ="";
        var t = null;
        id = parseInt(id);
        gr = gr.toString();
        for(var x =0; x < SECTIONS.length; x ++) {
            var teacher = SECTIONS[x].teacher;
            if (teacher.id === id || (teacher.firstName === fn && teacher.lastName === ln) || teacher.subject === gr) {
                document.getElementById('searchDisplay').innerHTML = "Mx. "+teacher.firstName+" "+teacher.lastName+" ID "+teacher.id+" teaches "+teacher.subject+" in section " + SECTIONS[x].id + ".";
                t = SECTIONS[x].teacher;
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTML = "Teacher " + fn + " " + ln + " ID " + id + " of " + gr + " not found. Try checking your spelling. Are you sure this teacher is in a section?"
        }
        return t
    } else {
        document.getElementById('searchDisplay').innerHTMl ="";
        for(var b = 0; b < SECTIONS.length; b++) {
            if(SECTIONS[b].name === fn || SECTIONS[b].id === ln) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[b].listInfo();
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTMl = "Section "+fn+" ID " + ln+" not found. Try checking your spelling.";
        }
    }
}