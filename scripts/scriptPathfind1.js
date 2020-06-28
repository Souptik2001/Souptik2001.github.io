var field = document.getElementById('field');
var finding = "f";
var start = [0, 0];
var end = [1, 10];
var arr = [];
var walls = {};
var mouseDown = 0;
var s_method = "";
var changeStart = "f";
var changeStop = "f";
var prevWindowSize_w = window.innerWidth;
var prevWindowSize_h = window.innerHeight;
var p_b = "garbage";

function clearBoard() {
    finding = "f";
    walls = {};
}
setInterval(changeGrid, 20);
setInterval(() => {
    document.body.onmousedown = function() {
        ++mouseDown;
    };
    document.body.onmouseup = function() {
        if (changeStart == "t") {
            changeStart = "f";
        }
        if (changeStop == "t") {
            changeStop = "f";
        }
        --mouseDown;
    };
}, 10);

function s_method_s(s, name) {
    s_method = s;
    document.getElementById('s_tech').innerText = name;
}

function changeGrid() {
    if (finding == "f") {
        createGrid();
    }
}

function changeWall(r, c) {
    if (finding == "f" & mouseDown == 1 & p_b != (r + "-" + c)) {
        if (r == start[0] & c == start[1]) {
            changeStart = "t";
        }
        if (r == end[0] & c == end[1]) {
            changeStop = "t";
        }
        if (changeStart == "t") {
            if (r != end[0] | c != end[1]) {
                if (!((r + '-' + c) in walls)) {
                    start[0] = r;
                    start[1] = c;
                }
            }
        } else if (changeStop == "t") {
            if (r != start[0] | c != start[1]) {
                if (!((r + '-' + c) in walls)) {
                    end[0] = r;
                    end[1] = c;
                }
            }
        } else if (arr[r][c] == 0) {
            walls[r + '-' + c] = {
                'r': r,
                'c': c
            };
            arr[r][c] = -1;
            document.getElementById(r + '-' + c).style.backgroundColor = "black";
            p_b = (r + "-" + c);
        } else {
            var delItem = r + '-' + c;
            delete walls[delItem];
            arr[r][c] = -1;
            document.getElementById(r + '-' + c).style.backgroundColor = "white";
            p_b = (r + "-" + c);
        }
    }
}

function createGrid() {
    arr = [];
    if (prevWindowSize_w != window.innerWidth || prevWindowSize_h != window.innerHeight) {
        walls = {};
    }
    field.innerHTML = "";
    var row;
    var rows = "";
    //Loop to create rows
    for (var i = 0; i < (80 / 4); i++) {
        row = "";
        var temp = [];
        // Loop to create columns
        for (var j = 0; j < (((window.innerWidth) - ((window.innerWidth) * (5 / 100))) / ((window.innerHeight) * (4 / 100))); j++) {
            temp.push(0);
            row += "<div class=\"block\" id=\"" + i + "-" + j + "\"onmouseover=\"changeWall(" + i + ", " + j + ")\"></div>";
        }
        arr.push(temp);
        rows += "<div class=\"row\" id=\"id_r" + i + "\">" + row + "</div>";
    }
    field.innerHTML = rows;
    for (const wall in walls) {
        arr[walls[wall].r][walls[wall].c] = -1;
        document.getElementById(walls[wall].r + '-' + walls[wall].c).style.backgroundColor = "black";
        // console.log(walls[wall].r);
    }
    if (start[0] > arr.length - 1 | start[1] > arr[0].length) {
        start[0] = 0;
        start[1] = 0;
    }
    if (end[0] > arr.length - 1 | end[1] > arr[0].length) {
        end[0] = 1;
        end[1] = 0;
    }
    document.getElementById(start[0] + '-' + start[1]).innerText = "S";
    document.getElementById(start[0] + '-' + start[1]).style.backgroundColor = "red";
    document.getElementById(start[0] + '-' + start[1]).style.color = "white";
    document.getElementById(end[0] + '-' + end[1]).innerText = "E";
    document.getElementById(end[0] + '-' + end[1]).style.backgroundColor = "green";
    document.getElementById(end[0] + '-' + end[1]).style.color = "white";
    prevWindowSize_w = window.innerWidth;
    prevWindowSize_h = window.innerHeight;
    // console.log(arr);
}

createGrid();
// ((window.innerWidth)-((window.innerWidth)*(5/100)))
// (((window.innerWidth)-((window.innerWidth)*(5/100)))/((window.innerHeight)*(4/100)))


// VISUALIZING PART
// A* ALGORITHM
var a_table = {};
var a_visited = {};
var not_fount_a = "f";

function selectBest(a_toStop) {
    return new Promise((resolve, reject) => {
        setTimeout((a_toStop) => {
            var min = 9999999999999999999;
            var min_i;
            // for (var i = 0; i < a_table.length; i++) {
            //     if ((a_table[i][1] + a_table[i][2]) < min) {
            //         min = (a_table[i][1] + a_table[i][2]);
            //         min_i = a_table[i][0];
            //     }
            // }
            for (const a_entries in a_table) {
                var a_p = (a_table[a_entries]['ind'][0] + '-' + a_table[a_entries]['ind'][1]);
                if (!(a_p in a_visited)) {
                    if ((a_table[a_entries].g + a_table[a_entries].h) < min) {
                        // console.log("Hello");
                        min = (a_table[a_entries].g + a_table[a_entries].h);
                        min_i = a_table[a_entries].ind;
                        // console.log(min_i);
                    }
                }
            }
            // console.log(min_i);
            a_visited[(min_i[0] + '-' + min_i[1])] = 1;
            if (min_i[0] == end[0] & min_i[1] == end[1]) {
                a_toStop = "t";
            } else if (min_i == undefined) {
                a_toStop = "t";
                not_fount_a = "t";
            } else {
                a_toStop = "f";
            }
            // COLOR THE min
            if (min_i[0] != start[0] | min_i[1] != start[1]) {
                if (min_i[0] != end[0] | min_i[1] != end[1]) {
                    document.getElementById(min_i[0] + '-' + min_i[1]).style.backgroundColor = "aqua";
                    document.getElementById(min_i[0] + '-' + min_i[1]).style.height = "4vh";
                    document.getElementById(min_i[0] + '-' + min_i[1]).style.width = "4vh";
                }
            }
            // Entry all its childs
            if (!((((min_i[0] + 1)) + '-' + min_i[1]) in a_visited)) {
                if ((min_i[0] + 1) < arr.length) {
                    if ((arr[(min_i[0] + 1)][min_i[1]] != -1)) {
                        a_table[((min_i[0] + 1) + '-' + min_i[1])].g = Math.sqrt((((min_i[0] + 1) - start[0]) ** 2) + ((min_i[1] - start[1]) ** 2)); // Distance from the start
                        a_table[((min_i[0] + 1) + '-' + min_i[1])].h = Math.sqrt((((min_i[0] + 1) - end[0]) ** 2) + ((min_i[1] - end[1]) ** 2)); // Distance from the end
                        a_table[((min_i[0] + 1) + '-' + min_i[1])].p = [min_i[0], min_i[1]];
                    }
                }
            }
            if (!((((min_i[0] - 1)) + '-' + min_i[1]) in a_visited)) {
                if ((min_i[0] - 1) >= 0) {
                    if ((arr[(min_i[0] - 1)][min_i[1]] != -1)) {
                        a_table[((min_i[0] - 1) + '-' + min_i[1])].g = Math.sqrt((((min_i[0] - 1) - start[0]) ** 2) + ((min_i[1] - start[1]) ** 2)); // Distance from the start
                        a_table[((min_i[0] - 1) + '-' + min_i[1])].h = Math.sqrt((((min_i[0] - 1) - end[0]) ** 2) + ((min_i[1] - end[1]) ** 2)); // Distance from the end
                        a_table[((min_i[0] - 1) + '-' + min_i[1])].p = [min_i[0], min_i[1]];
                    }
                }
            }
            if (!((((min_i[0])) + '-' + (min_i[1] + 1)) in a_visited)) {
                if ((min_i[1] + 1) < arr[0].length - 1) {
                    if ((arr[(min_i[0])][min_i[1] + 1] != -1)) {
                        a_table[((min_i[0]) + '-' + (min_i[1] + 1))].g = Math.sqrt(((min_i[0] - start[0]) ** 2) + (((min_i[1] + 1) - start[1]) ** 2)); // Distance from the start
                        a_table[((min_i[0]) + '-' + (min_i[1] + 1))].h = Math.sqrt(((min_i[0] - end[0]) ** 2) + (((min_i[1] + 1) - end[1]) ** 2)); // Distance from the end
                        a_table[((min_i[0]) + '-' + (min_i[1] + 1))].p = [min_i[0], min_i[1]];
                    }
                }
            }
            if (!((((min_i[0])) + '-' + (min_i[1] - 1)) in a_visited)) {
                if ((min_i[1] - 1) >= 0) {
                    if ((arr[(min_i[0])][min_i[1] - 1] != -1)) {
                        a_table[((min_i[0]) + '-' + (min_i[1] - 1))].g = Math.sqrt(((min_i[0] - start[0]) ** 2) + (((min_i[1] - 1) - start[1]) ** 2)); // Distance from the start
                        a_table[((min_i[0]) + '-' + (min_i[1] - 1))].h = Math.sqrt(((min_i[0] - end[0]) ** 2) + (((min_i[1] - 1) - end[1]) ** 2)); // Distance from the end
                        a_table[((min_i[0]) + '-' + (min_i[1] - 1))].p = [min_i[0], min_i[1]];
                    }
                }
            }
            resolve(a_toStop);
        }, 50);
    });
}
async function drawPath_a(pa) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (pa[0] != start[0] | pa[1] != start[1]) {
                document.getElementById(pa[0] + '-' + pa[1]).style.backgroundColor = "rgb(119, 0, 255)";
                document.getElementById(pa[0] + '-' + pa[1]).style.border = "solid 0.5px rgb(169, 0, 255)";
            }
            resolve(a_table[pa[0] + '-' + pa[1]].p);
        }, 20);
    });
}
async function v_aStar() {
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            a_table = {};
            a_visited = {};
            var a_toStop = "f";
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    if (i == start[0] & j == start[1]) {
                        a_table[i + '-' + j] = {
                            'ind': [i, j],
                            'g': 0,
                            'h': 9999999,
                            'p': [-1, -1]
                        };
                    } else {
                        a_table[i + '-' + j] = {
                            'ind': [i, j],
                            'g': 9999999,
                            'h': 9999999,
                            'p': [-1, -1]
                        };
                    }

                }
            }
            while (a_toStop == "f") {
                a_toStop = await selectBest(a_toStop);
            }
            var itsParent = a_table[end[0] + '-' + end[1]].p;
            while (true) {
                if (itsParent[0] == start[0] & itsParent[1] == start[1]) { break; }
                itsParent = await drawPath_a(itsParent);
            }
            resolve();
        }, 0);
    });
}
// A* ALGORITHM
async function visualize() {
    if (finding == "f") {
        if (s_method == "aStar") {
            finding = "t";
            await v_aStar();
            // finding = "f";
        }
        if (s_method == "dijk") {
            finding = "t";
            alert("Coming soon");
            finding = "f";
        }
        if (s_method == "bfs") {
            finding = "t";
            alert("Coming soon");
            finding = "f";
        }
        if (s_method == "dfs") {
            finding = "t";
            alert("Coming soon");
            finding = "f";
        }
    }
}