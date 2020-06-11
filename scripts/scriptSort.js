const bars = document.getElementById('bars');
const n_c = document.getElementById('n_c');
var time_d = document.getElementById('time_d');
var stopBogo = "f";
var starting;
var stoping;
var sorted = "f";
var sorting = "f";
var sort_m = "";
var arr=[];
gColumns(50);
// function removestopBtn(){
//     var rmBtn = document.getElementById('rmBtn');
//     rmBtn.remove();
//     stopBogo = "t";
// }
function reverseArr(){
    if (sorting=="f"){
        bars.innerHTML="";
        var columns = n_c.value;
        n_c.value = "";
        arr=[];
        if (columns == ""){
            columns=50;
            for(var i = columns; i>=1; i--){
                arr.push(i);
                bars.innerHTML += "<div class=\"bar\" id=\"id"+(columns-i)+"\"></div>";
                var p = document.getElementById('id'+(columns-i));
                p.style.height = i+"vh";
            }
            sorted = "f";
        }
        else if(columns > 80 || columns < 2){console.log("ok"); n_c.value = ""; n_c.style.border=" 2px solid rgb(255, 0, 0)" ; n_c.placeholder="80 > Value > 0";}
        else{
            for(var i = columns; i>=1; i--){
                arr.push(i);
                bars.innerHTML += "<div class=\"bar\" id=\"id"+(columns-i)+"\"></div>";
                var p = document.getElementById('id'+(columns-i));
                p.style.height = i+"vh";
            }
            sorted = "f";
        }
    }

}
function c_c(){
    console.log(sorting);
    if (sorting=="f"){
        console.log(n_c.value);
        const columns = n_c.value;
        if (columns == ""){gColumns(50); sorted = "f"; n_c.style.border = ""; n_c.placeholder="Number of colums to Sort (Default 40)";}
        else if(columns > 80 || columns < 2){console.log("ok"); n_c.value = ""; n_c.style.border=" 2px solid rgb(255, 0, 0)" ; n_c.placeholder="80 > Value > 0";}
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
function comp_q(i, j, p_v){
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
                pivot_i = await comp_q(i, pivot_i, pivot_v);
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
// MERGE SORT
function comp_m(i, j, temp){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(temp);
            if(arr[i]<arr[j]){
                temp.push(arr[i]);
                i++;
                resolve(i);
            }
            else{
                temp.push(arr[j]);
                j++;
                resolve(j);
            }
        },20);
    });
}
function insertRest(iorj, temp){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            document.getElementById('id'+iorj).style.backgroundColor = "rgb(147, 15, 255)";
            temp.push(arr[iorj]);
            iorj++;
            resolve(iorj);
        },20);
    });
}
function swap_m(z, k, temp){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            arr[z] = temp[k];
            document.getElementById('id'+z).style.height = temp[k]+"vh";
            document.getElementById('id'+z).style.backgroundColor = "rgb(230, 156, 19)";
            z++;
            resolve(z);
        },20);
    });
}
function merge(start, mid, end){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            var temp = [];
            var i = start;
            var j = mid+1;
            while(i<=mid && j<=end){
                var prev_i = i;
                var prev_j = j;
                document.getElementById('id'+i).style.backgroundColor = "rgb(147, 15, 255)";
                document.getElementById('id'+j).style.backgroundColor = "rgb(147, 15, 255)";
                var m = await comp_m(i, j, temp);
                if(prev_i==m-1){
                    i = m;
                    document.getElementById('id'+(i-1)).style.backgroundColor = "rgb(10, 157, 255)";
                    document.getElementById('id'+j).style.backgroundColor = "rgb(10, 157, 255)";
                }else if(prev_j==m-1){
                    j = m;
                    document.getElementById('id'+(i)).style.backgroundColor = "rgb(10, 157, 255)";
                    document.getElementById('id'+(j-1)).style.backgroundColor = "rgb(10, 157, 255)";
                }
            }
            while(i<=mid){
                i = await insertRest(i, temp);
                document.getElementById('id'+(i-1)).style.backgroundColor = "rgb(10, 157, 255)";
            }
            while(j<=end){
                j = await insertRest(j, temp);
                document.getElementById('id'+(j-1)).style.backgroundColor = "rgb(10, 157, 255)";
            }
            var z = start;
            for(var k=0; k<temp.length; k++){
                z = await swap_m(z, k, temp);
            }
            resolve();
        },0);
    });
}
async function mergeSort(start, end){
    if (start<end){
        var mid = Math.floor((start+end)/2);
        // Change color of mid
        document.getElementById('id'+mid).style.backgroundColor = "rgb(9, 255, 0)";
        await mergeSort(start, mid);
        await mergeSort(mid+1, end);
        await merge(start, mid, end);
    }
}
// MERGE SORT
// HEAP SORT
var heap_global_insertion;
async function comp_h_i(temp){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            if(temp[Math.floor((heap_global_insertion+1)/2)-1]<temp[heap_global_insertion]){
                var temp_v = temp[Math.floor((heap_global_insertion+1)/2)-1];
                document.getElementById('id'+(Math.floor((heap_global_insertion+1)/2)-1)).style.height = temp[heap_global_insertion]+"vh";
                temp[Math.floor((heap_global_insertion+1)/2)-1] = temp[heap_global_insertion];
                temp[heap_global_insertion] = temp_v;
                document.getElementById('id'+heap_global_insertion).style.height = temp_v+"vh";
                heap_global_insertion = Math.floor((heap_global_insertion+1)/2)-1;
            }
            resolve(temp);
        },20);
    })
} 
async function ins_i(temp, i){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            temp.push(arr[i]);
            heap_global_insertion=i;
            while(heap_global_insertion>0){
                var prev = heap_global_insertion;
                document.getElementById('id'+(Math.floor((heap_global_insertion+1)/2)-1)).style.backgroundColor = "rgb(174, 0, 255)";
                document.getElementById('id'+(Math.floor((heap_global_insertion+1)/2))).style.backgroundColor = "rgb(174, 0, 255)";
                temp = await comp_h_i(temp);
                if(Math.floor((heap_global_insertion+1)/2)-1>=0){
                    document.getElementById('id'+(Math.floor((heap_global_insertion+1)/2)-1)).style.backgroundColor = "rgb(10, 157, 255)";
                }
                document.getElementById('id'+(Math.floor((heap_global_insertion+1)/2))).style.backgroundColor = "rgb(10, 157, 255)";
                if (prev == heap_global_insertion){
                    break;
                }
            }
            resolve(temp);
        },20);
    })    
}
async function heapify(){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            var temp = [];
            for(var i=0; i<arr.length; i++){
                document.getElementById('id'+i).style.backgroundColor = "rgb(255, 0, 0)";
                temp = await ins_i(temp, i);
                document.getElementById('id'+i).style.backgroundColor = "rgb(10, 157, 255)";
            }
            resolve(temp);
        },0);
    });
}
async function comp_h_d_1(i, j){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            if(arr[i]>arr[j]){
                resolve(i);
            }else{
                resolve(j);
            }
        },20);
    });
}
async function comp_h_d_2(z, c_h){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            if(arr[c_h]>arr[z]){
                var temp_v = arr[c_h];
                document.getElementById('id'+c_h).style.height = arr[z]+"vh";
                document.getElementById('id'+z).style.height = temp_v+"vh";
                arr[c_h] = arr[z];
                arr[z] = temp_v;
                z = c_h;
            }
            resolve(z);
        },20);
    });
}
async function ins_d(j){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            var g = arr[0];
            document.getElementById('id'+0).style.height = arr[j]+"vh";
            document.getElementById('id'+j).style.height = g+"vh";
            arr[0] = arr[j];
            arr[j]  = g;
            var z=0;
            var c_h = (((z+1)*2)-1);
            while(((z+1)*2)-1<j){
                if(((z+1)*2)<j){
                    document.getElementById('id'+(((z+1)*2)-1)).style.backgroundColor = "rgb(147, 15, 255)";
                    document.getElementById('id'+((z+1)*2)).style.backgroundColor = "rgb(147, 15, 255)";
                    var c_h = await comp_h_d_1((((z+1)*2)-1), ((z+1)*2));
                    document.getElementById('id'+(((z+1)*2)-1)).style.backgroundColor = "rgb(10, 157, 255)";
                    document.getElementById('id'+((z+1)*2)).style.backgroundColor = "rgb(10, 157, 255)";
                }
                var prev = z;
                document.getElementById('id'+c_h).style.backgroundColor = "rgb(0, 255, 21)";
                z = await comp_h_d_2(z, c_h);
                document.getElementById('id'+c_h).style.backgroundColor = "rgb(10, 157, 255)";
                if(prev==z){
                    break;
                }
            }
            resolve();
        },20);
    });
}
async function h_sort(){
    return new Promise((resolve, reject)=>{
        setTimeout(async function(){
            j=arr.length-1;
            for(var i=0; i<arr.length; i++){
                document.getElementById('id'+j).style.backgroundColor = "rgb(230, 156, 19)"; 
                await ins_d(j);
                document.getElementById('id'+j).style.backgroundColor = "rgb(10, 157, 255)";
                j--;
            }
            resolve();
        },0);
    });
}
async function heapSort(){
    arr = await heapify();
    await h_sort();
}
// HEAP SORT
// BOGO SORT
function shuffle(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            for (var i=0; i<arr.length; i++){
                var x = (Math.floor(Math.random()*(arr.length-2))+1)
                var temp = arr[i];
                arr[i] = arr[x];
                document.getElementById('id'+i).style.height = arr[x]+"vh";
                document.getElementById('id'+x).style.height = temp+"vh";
                arr[x] = temp;
            }
            resolve();
        },20);
    });

}
function notArranged(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            for(var i=0; i<arr.length; i++){
                if(arr[i]>arr[i+1]){
                    resolve(false);
                }
            }
            resolve(true);
        },0);
    })
}
async function bogoSort(starting){
    while(await notArranged() == false && stopBogo=="f"){
        await shuffle();
        var p = new Date().getTime();
        time_d.innerHTML = "<em>(Worst case time taken is infinite) Time elapsed in Bogo Sorting an array of size "+ arr.length +" is "+(p-starting)/1000+" seconds. Click on the top left <strong style=\"color:red\">Sorting Visualization</strong> to stop.</em>";
    }
}
// BOGO SORT
async function mySort(){
    if(sorted=="t" && sorting=="f"){
        // document.getElementById('suffleBtn').style.border = "solid 2px red";
        document.getElementById('suffleBtn').style.backgroundColor = "red";
        document.getElementById('suffleBtn').style.color = "white";
        setTimeout(()=>{document.getElementById('suffleBtn').style.backgroundColor = "white"; document.getElementById('suffleBtn').style.color = "rgb(32, 160, 0)";},500);
    }
    if(sorted=="f"){
        if(sort_m=="s_s"){
            starting = new Date().getTime();
            await s_sort();
            stoping = new Date().getTime();
            time_d.innerHTML = "<em>Time taken by Selection Sort to sort an array of size "+ arr.length +" is "+(stoping-starting)/1000+" seconds</em>";
        }
        else if (sort_m=="q_s"){
            sorted = "t";
            sorting = "t";
            starting = new Date().getTime();
            await q_sort(0, arr.length-1);
            stoping = new Date().getTime();
            time_d.innerHTML = "<em>Time taken by Quick Sort to sort an array of size "+ arr.length +" is "+(stoping-starting)/1000+" seconds</em>";
            sorting = "f";
        }
        else if (sort_m=="m_s"){
            sorted = "t";
            sorting = "t";
            starting = new Date().getTime();
            await mergeSort(0, arr.length-1);
            stoping = new Date().getTime();
            time_d.innerHTML = "<em>Time taken by Quick Sort to sort an array of size "+ arr.length +" is "+(stoping-starting)/1000+" seconds</em>";
            sorting = "f";
        }
        else if (sort_m=="h_s"){
            sorted = "t";
            sorting = "t";
            starting = new Date().getTime();
            await heapSort(0, arr.length-1);
            stoping = new Date().getTime();
            time_d.innerHTML = "<em>Time taken by Quick Sort to sort an array of size "+ arr.length +" is "+(stoping-starting)/1000+" seconds</em>";
            sorting = "f";
        }
        else if (sort_m=="b_s"){
            // document.getElementById('navbarSupportedContent').innerHTML += '<button class="btn btn-outline-success my-2 my-sm-0" onclick="removestopBtn()" id="rmBtn">Stop</button>';
            sorted = "t";
            sorting = "t";
            starting = new Date().getTime();
            await bogoSort(starting);
            stoping = new Date().getTime();
            sorting = "f";
            stopBogo = "f";
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

