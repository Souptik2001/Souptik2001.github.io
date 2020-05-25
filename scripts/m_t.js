/*jshint esversion:6*/
var main_b = document.getElementById("firstSec_i");
var blogs = document.getElementById("m_b_i");
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