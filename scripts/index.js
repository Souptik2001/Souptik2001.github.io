/*jshint esversion:6*/
var w = document.getElementById('test');
var i = document.getElementById('pic');

w.addEventListener('click', () => {
    console.log("hello");
    i.style.backgroundImage = "url(./img/notes.JPG)";
});