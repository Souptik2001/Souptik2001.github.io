/*jshint esversion:6*/
var main_b = document.getElementById("firstSec_i");
var mine = document.getElementById("m_b_i");
var desc = document.getElementById("desc_i");
setInterval(checkSize, 300);

function checkSize() {
    if (window.innerWidth < 965) {
        main_b.style.marginLeft = "0vw";
        main_b.style.marginRight = "0vw";
        mine.style.paddingLeft = "15px";
        mine.style.paddingRight = "15px";
        mine.style.display = 'block';
        mine.style.marginBottom = '20px';
        desc.style.paddingRight = '0px';
    } else {
        main_b.style.marginLeft = "10vw";
        main_b.style.marginRight = "10vw";
        mine.style.paddingLeft = "50px";
        mine.style.paddingRight = "50px";
        mine.style.display = 'flex';
        desc.style.paddingRight = '80px';
    }
}