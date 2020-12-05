/*jshint esversion:6*/
var main_b = document.getElementById("firstSec_i");
var body = document.body;
var scrollvid = document.body;
var video = document.getElementById("back_vid");
const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    duration: 3200, //time of video * 1000
    triggerElement:scrollvid,
    triggerHook:1
}).setPin(scrollvid).addTo(controller);

var accelamount = 0.1;
var scrollpos = 0;
var delay =0;

scene.on("update", (e)=>{
    scrollpos = e.scrollPos/1000;
});

setInterval(()=>{
    delay+=(scrollpos-delay)*accelamount;
    // console.log(scrollpos, delay);
    video.currentTime=scrollpos;
}, 120);