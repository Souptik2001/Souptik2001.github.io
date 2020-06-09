const bars = document.getElementById('bars');
const n_c = document.getElementById('n_c');
var time_d = document.getElementById('time_d');
var starting;
var stoping;
var sorted = "f";
var sorting = "f";
var sort_m = "";
var arr=[];
gColumns(40);
function c_c(){
    if (sorting=="f"){
        const columns = n_c.value;
        if (columns == ""){gColumns(40); sorted = "f"; n_c.style.border = ""; n_c.placeholder="Number of colums to Sort (Default 40)";}
        else if(columns > 40 || columns < 2){console.log("ok"); n_c.value = ""; n_c.style.border=" 2px solid rgb(255, 0, 0)" ; n_c.placeholder="40 > Value > 0";}
        else{
            n_c.value = "";
            gColumns(columns);
            sorted = "f";
            n_c.style.border = ""; n_c.placeholder="Number of colums to Sort (Default 40)";
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
function s_method(method, method_name){
    sort_m=method;
    document.getElementById('s_tech').innerText = method_name;
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

// QUICK SORT
function swap_q(i, j){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            // Change columns
            var bar1 = document.getElementById('id'+i);
            var bar2 = document.getElementById('id'+j);
            var temp_h = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = temp_h;
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            resolve();
        },0);
    });

}
function comp(i, j, p_v){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            var bar2 = document.getElementById('id'+i);
            if(arr[i]<p_v){
                swap(i, j);
                j++;
            }
            bar2.style.backgroundColor = "rgb(10, 157, 255)";
            resolve(j);
        }, 20);
    });
}
async function findPivot(start, end){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            var pivot_v = arr[end];
            var pivot_i = start;
            var bar1 = document.getElementById('id'+pivot_i);
            bar1.style.backgroundColor="rgb(230, 156, 19)";
            for (var i=start; i<end; i++){
                var bar2 = document.getElementById('id'+i);
                bar2.style.backgroundColor = "rgb(147, 15, 255)";
                pivot_i = await comp(i, pivot_i, pivot_v);
                bar1.style.backgroundColor="rgb(230, 156, 19)";
            }
            resolve(pivot_i);
        },0);
    });

}
async function q_sort(start, end){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            if(start<end){
                var pivot = await findPivot(start, end);
                await swap_q(pivot, end);
                await q_sort(start, pivot-1);
                await q_sort(pivot+1, end);
            }
            resolve();
        },0);
    });

}
// QUICK SORT

async function mySort(){
    if(sorted=="f"){
        if(sort_m=="s_s"){
            starting = new Date().getTime();
            await s_sort();
            stoping = new Date().getTime();
            time_d.innerHTML = "<em>Time taken by Selection Sort to sort an array of size "+ arr.length +" is "+(stoping-starting)/60+" seconds</em>";
        }
        else if (sort_m=="q_s"){
            sorted = "t";
            sorting = "t";
            starting = new Date().getTime();
            await q_sort(0, arr.length-1);
            stoping = new Date().getTime();
            time_d.innerHTML = "<em>Time taken by Quick Sort to sort an array of size "+ arr.length +" is "+(stoping-starting)/60+" seconds</em>";
            sorting = "f";
        }
        else if (sort_m=="m_s"){
            alert("Will be available soon");
        }
        else if (sort_m=="h_s"){
            alert("Will be available soon");
        }
        else{
            // sort_m="s_s";
            // document.getElementById('s_tech').innerText = "Selection Sort";
            // mySort();
            document.getElementById('s_tech').style.color = "red";
            document.getElementById('s_tech').style.fontWeight = "bolder";
            setTimeout(()=>{
                document.getElementById('s_tech').style.color = "black";
                document.getElementById('s_tech').style.fontWeight = "300";
            },500);

        }
    }
}
