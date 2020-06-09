const bars = document.getElementById('bars');
const n_c = document.getElementById('n_c');
var sorted = "f";
var sorting = "f";
var arr=[];
gColumns(40);
function c_c(){
    if (sorting=="f"){
        const columns = n_c.value;
        if (columns == ""){gColumns(40);sorted = "f";}// Todo - To limit the no. of columns in aa decorated way 
        else{
            n_c.value = "";
            gColumns(columns);
            sorted = "f";
        }
    }
}
function gColumns(n){
    // Max. - 40
    // Max. - 39(index)
    var i;
    bars.innerHTML = "";
    arr=[];
    for (i=0; i<n; i++){
        bars.innerHTML += "<div class=\"bar\" id=\"id"+i+"\"></div>";
        var h = (Math.floor(Math.random()*79)+1);
        var p = document.getElementById('id'+i);
        arr.push(h);
        p.style.height = h+"vh";
    }
}
// SELECTION SORT
var min;
var min_e;
var changed="f";
function swap(i, j){
    // Change columns
    var bar1 = document.getElementById('id'+i);
    var bar2 = document.getElementById('id'+j);
    var temp_h = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp_h;
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function  internal(i, j){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            // Color change
            var bar1 = document.getElementById('id'+i);
            var bar2 = document.getElementById('id'+j);
            var bar_p = document.getElementById('id'+(j-1));
            bar_p.style.backgroundColor = "rgb(10, 157, 255)";
            bar1.style.backgroundColor = "rgb(230, 156, 19)";
            bar2.style.backgroundColor = "rgb(147, 15, 255)";
            if(min>arr[j]){
                min=arr[j];
                min_e=j;
                changed="t";
            }
            resolve();
        }, 10);
    });
}
function  external(i, j){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            changed="f";
            swap(i, j);
            resolve();
        }, 10);
    });
}
async function s_sort(){
    sorting="t";
    sorted="t";
    for(var i=0; i<arr.length; i++){
        min = arr[i];
        for(var j=i+1; j<arr.length; j++){
            await internal(i, j);
        }
        if(changed=="t"){
            document.getElementById('id'+(arr.length-1)).style.backgroundColor = "rgb(10, 157, 255)";   
            await external(i, min_e);
        }
    }
    document.getElementById('id'+(arr.length-1)).style.backgroundColor = "rgb(230, 156, 19)";  
    sorting="f";
}
// SELECTION SORT

function mySort(){// Todo - Logic of choosing the sorting technique
    if(sorted=="f"){
        console.log(sorted);
        s_sort();
    }
}
