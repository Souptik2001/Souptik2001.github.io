/*jshint esversion:6*/
var main_b = document.getElementById("firstSec_i");
var blogs = document.getElementById("blogs_i");
var intro = document.getElementById("i_text");
var cursor = document.getElementById("cursor");
setInterval(checkSize, 300);


function checkSize() {
    if (window.innerWidth < 510) {
        main_b.style.marginLeft = "0vw";
        main_b.style.marginRight = "0vw";
        blogs.style.paddingLeft = "15px";
        blogs.style.paddingRight = "15px";
    } else {
        main_b.style.marginLeft = "10vw";
        main_b.style.marginRight = "10vw";
        blogs.style.paddingLeft = "50px";
        blogs.style.paddingRight = "50px";
    }
}
// function showCursor(){
//     cursor.innerText="|";
//     setTimeout(hideCursor, 500);
// }
// function hideCursor(){
//     cursor.innerText="";
//     setTimeout(showCursor, 500);
// }
// hideCursor();

const text1 = ['H', 'e', 'l', 'l', 'o', '.', '.', '👱🏼'];
var i = 14*(text1.length); // 14*number of letters
var stat = "d";
var wait = "t";
var j = 0;
function writeLetter(){
    if(i>0 & stat=="d" ){
        stat = "d";
        intro.innerHTML= intro.innerHTML.slice(0, -14);
        i=i-14;
        j=0;
    }
    else{
        stat = "i";
        intro.innerHTML= intro.innerHTML+"<span>"+text1[(i-(14*(j)))+j]+"</span>";
        i=i+14;
        j= j + 1;
    }
    if(i==0){wait = "t";}
    if (i==14*(text1.length)){wait="t"; stat="d";}
    if(wait == "t"){
        wait = "f";
        setTimeout(writeLetter, 1000);
    }
    else{
        setTimeout(writeLetter, 200);
    }
}
writeLetter();


