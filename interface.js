
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

function html() {
    //use length of sections to determine how many columns/rows needed
    var len = SECTIONS.length;
    var returnVal = "<table>";

    for(var i = 0; i < len; i ++) {
        /*
        var stu = [];
        for (var x = 0; x < SECTIONS[i].students.length; x ++) {
            var anyStu = SECTIONS[i].students[x];
            var classify = '';
            if(!anyStu.searched) {
                classify = 'secret';
            } else {
                classify = 'show';
            }
            stu+="<div class = '"+classify+"' id = 'student"+anyStu.id+"'>Name: "+anyStu.firstName+" "+anyStu.lastName+" ID: "+anyStu.id+" Grade: " + anyStu.grade + "</div>";
        }
        */
        returnVal += "<tr><td id = 'name'><div class = 'fancy'>Section:</div><button id = 'dispsec" + i + "' onclick = ''" + SECTIONS[i].name + "</td>";
        returnVal += "<td id = '" + SECTIONS[i].id + "teacher'><div class = 'fancy'>Teacher:</div>Mx. " + SECTIONS[i].teacher.lastName +"</td>";
        returnVal += "<td class = 'students' id = '" + SECTIONS[i].id + "students'><div class = 'fancy'>Students:</div></td>"; //" + stu + "
        returnVal += "</tr>";
    }
    returnVal += "</table>";
    document.getElementById("displayTable").innerHTML = returnVal;
}


function setAddSection() {
    var fin = "<select id = 'students'>";
    for (var i = 0; i < STUDENTS.length; i ++) {
        fin+= "<option id = 'student" + i + "' value = '" + STUDENTS[i].firstName + " " + STUDENTS[i].lastName + "'>";
        fin += STUDENTS[i].firstName + " " + STUDENTS[i].lastName + "</option>";
    }
    fin+= "</select>";
    document.getElementById('addingSectStu').innerHTML = fin;

    var ret = "<select id = 'teacher'>";
    for (var x = 0; x < TEACHERS.length; x ++) {
        ret += "<option id = 'teacher" + x + "' value = '" + TEACHERS[x].firstName + " " + TEACHERS[x].lastName + "'>";
        ret += TEACHERS[x].firstName + " " + TEACHERS[x].lastName + "</option>";
    }
    ret += "</select>";
    document.getElementById('addingSectTea').innerHTML = ret;
}

function setSearch() {
    var val1 = "";
    var val2 = "";
    var val3 = "";
    var val4 = "";
    var val5 = "";
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
        val1 = document.getElementById('searchSection').value;
        val2 = "";
        val3 = "";
        val4 = "";
        val5 = 'sec';
    }
    search(val1, val2, val3, val4, val5);
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
                    arr.push(fn+" "+ln+" ID "+id+" is in grade "+gr+" and section "+SECTIONS[z]+".");
                    f = true;
                }
            }
        }
        document.getElementById("searchDisplay").innerHTML += arr;
        if(!f) {
            document.getElementById("searchDisplay").innerHTML = "Student "+fn+" "+ln+" ID "+id+" in grade "+gr+" not found. Try searching in other grades and check your spelling."
        }
    } else if(type === 'tea') {
        document.getElementById('searchDisplay').innerHTMl ="";
        var t = null;
        id = parseInt(id);
        gr = gr.toString();
        for(var x =0; x < SECTIONS.length; x ++) {
            var teacher = SECTIONS[x].teacher;
            if (teacher.id === id || (teacher.firstName === fn && teacher.lastName === ln) || teacher.subject === gr) {
                document.getElementById('searchDisplay').innerHTML = "Mx. "+teacher.firstName+" "+teacher.lastName+" ID "+teacher.id+" teaches "+teacher.subject+". in " + SECTIONS[x];
                t = SECTIONS[x].teacher;
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTML = "Teacher " + fn + " " + ln + " ID " + id + " of " + gr + " not found. Try checking your spelling."
        }
        return t
    } else {
        document.getElementById('searchDisplay').innerHTMl ="";
        for(var b = 0; b < SECTIONS.length; b++) {
            if(SECTIONS[b].name === document.getElementById('searchSectionName').value || SECTIONS[b].id === document.getElementById('searchSectionId').value) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[b].listInfo();
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTMl = "Section "+document.getElementById('searchSectionName').value+" ID";
            document.getElementById('searchDisplay').innerHTMl += document.getElementById('searchSectionId').value+" not found. Try checking your spelling.";
        }
    }
}