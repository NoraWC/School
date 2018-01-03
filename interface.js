
function html() {
    //use length of sections to determine how many columns/rows needed
    var len = SECTIONS.length;
    var returnVal = "<table>";
    var divs = "";


    var bleh = ["'name/id", "'max size", "'current size", "'students", "'teacher"];
    divs += "<td><div id = 'sectionInputs'>";
    divs += "<button id = 'showsection' onclick = 'listSectionInfo();'></button>";
    for (var f = 1; f < 6; f ++) {
        //fix class
        divs += "<input title = 'sectionInp" + f + "' class = 'show' id = 'sectionInp" + f + "' type = 'text' value = " + bleh[f-1] + "'>";
    }

    divs += "<td><div id = 'teacherInputs'>";
    divs += "<button id = 'showTeacher' onclick = 'showTeacher(true);'></button>";
    divs += "</div></td>";
    divs += "<td><div id = 'studentInputs'>";
    divs += "<button id = 'showStudent' onclick = 'showStudent(true);'></button>";
    divs += "</div></td>";

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
        id = parseInt(id);
        gr = parseInt(gr);
        for(var z =0; z < SECTIONS.length; z ++) {
            var stu = SECTIONS[z].students;
            for (var i = 0; i < stu.length; i++) {
                if(stu[i].id === id || (stu[i].firstName === fn && stu[i].lastName === ln && stu[i].grade === gr)){
                    SECTIONS[z].students[i].searched = true;
                    f = true;
                    html();
                    document.getElementById('searchDisplay').innerHTMl += SECTIONS[z].students[i];
                }
            }
        }
        if(!f) {
            document.getElementById("searchDisplay").innerHTML = "Student "+fn+" "+ln+" ID "+id+" in grade "+gr+" not found. Try searching in other grades and check your spelling."
        }
    } else if(type === 'tea') {

        id = parseInt(id);
        gr = gr.toString();
        for(var x =0; x < SECTIONS.length; x ++) {
            var teacher = SECTIONS[x].teacher;
            if (teacher.id = id || (teacher.firstName === fn && teacher.lastName === ln) || teacher.subject === gr) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[x].teacher;
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTML = "Teacher " + fn + " " + ln + " ID " + id + " of " + gr + " not found. Try checking your spelling."
        }
    } else {
        for(var b = 0; b < SECTIONS.length; b++) {
            if(SECTIONS[b].name === document.getElementById('searchSection').value || SECTIONS[b].id === document.getElementById('searchSection').value) {
                document.getElementById('searchDisplay').innerHTML += SECTIONS[b];
                f = true;
            }
        }
        if (!f) {
            document.getElementById('searchDisplay').innerHTMl = "Section " + document.getElementById('searchSection').value + " not found. Try checking your spelling.";
        }
    }
}