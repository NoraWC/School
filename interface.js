
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
    var divs = "";


    returnVal += "<tr>" + divs + "</div></td></tr>";

    for(var i = 0; i < len; i ++) {
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
        returnVal += "<tr><td id = 'name'><div class = 'fancy'>Section:</div>" + SECTIONS[i].name + "</td>";
        returnVal += "<td id = '" + SECTIONS[i].id + "teacher'><div class = 'fancy'>Teacher:</div>Mx. " + SECTIONS[i].teacher.lastName +"</td>";
        returnVal += "<td class = 'students' id = '" + SECTIONS[i].id + "students'><div class = 'fancy'>Students:</div>" + stu + "</td>";
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
    document.getElementById('searchDisplay').innerHTMl = "";
    var f = false;
    if(type === 'stu') {
        var arr = [];
        id = parseInt(id);
        gr = parseInt(gr);
        for(var z =0; z < SECTIONS.length; z ++) {
            var stu = SECTIONS[z].students;
            for (var i = 0; i < stu.length; i++) {
                if(stu[i].id === id || (stu[i].firstName === fn && stu[i].lastName === ln && stu[i].grade === gr)){
                    SECTIONS[z].students[i].searched = true;
                    f = true;
                    document.getElementById('searchDisplay').innerHTMl += SECTIONS[z].students[i];
                    arr.push(SECTIONS[z].students[i]);
                    console.log(SECTIONS[z].students[i]);
                    html();
                }
            }
        }
        if(!f) {
            document.getElementById("searchDisplay").innerHTML = "Student "+fn+" "+ln+" ID "+id+" in grade "+gr+" not found. Try searching in other grades and check your spelling."
        }
        return arr;
    } else if(type === 'tea') {
        var t = null;
        id = parseInt(id);
        gr = gr.toString();
        for(var x =0; x < SECTIONS.length; x ++) {
            var teacher = SECTIONS[x].teacher;
            if (teacher.id = id || (teacher.firstName === fn && teacher.lastName === ln) || teacher.subject === gr) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[x].teacher;
                t = SECTIONS[x].teacher;
                f = true;
                html();
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTML = "Teacher " + fn + " " + ln + " ID " + id + " of " + gr + " not found. Try checking your spelling."
        }
        return t
    } else {
        for(var b = 0; b < SECTIONS.length; b++) {
            if(SECTIONS[b].name === document.getElementById('searchSection').value || SECTIONS[b].id === document.getElementById('searchSection').value) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[b].listInfo();
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTMl = "Section " + document.getElementById('searchSection').value + " not found. Try checking your spelling.";
        }
    }
}