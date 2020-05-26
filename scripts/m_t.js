/*jshint esversion:6*/
var main_b = document.getElementById("firstSec_i");
var blogs = document.getElementById("m_b_i");
var body = document.body;
var c = 1;
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
setInterval(changeImage, 5000);

function changeImage() {
    c++;
    body.style.background = "linear-gradient( -90deg, rgb(0, 0, 0), rgb(0, 0, 0), rgba(0, 0, 0, 0.616), rgb(0, 0, 0), rgb(0, 0, 0)), url('./img/" + c + ".jpg')";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "contain";
    body.style.backgroundPositionX = "center";
    if (c == 7) {
        c = 0;
    }
}