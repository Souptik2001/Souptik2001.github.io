var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var radius = 30;
var x = radius+1;
var y = 300;
var dx = 20;
var dy = 10;
function animate(){
    requestAnimationFrame(animate);
    // console.log("Hello");
    c.clearRect(0, 0,window.innerWidth, window.innerHeight);
    c.beginPath();
    c.arc(x, y, radius, 0, 2*Math.PI, false);
    c.strokeStyle = 'blue';
    c.stroke();
    if(x+radius>=innerWidth || x-radius<=0){
        dx=-dx;
    }
    if(y+radius>=innerWidth || y-radius<=0){
        dy=-dy;
    }
    x=x+dx;
    y=y+dy;
}
animate();