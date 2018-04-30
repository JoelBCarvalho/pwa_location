var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

var c = {  //create an object to draw
  x:0,  //x value
  y:0,  //y value
  r:5 //radius
}

var redraw = function(){
  //ctx.canvas.width  = video.offsetWidth;
  //ctx.canvas.height = video.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
initialize();

/* tag
  var text = 'Hello World!';
  var x = canvas.width / 2;
  var y = canvas.height / 2;

  ctx.font = '30pt Calibri';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'blue';
  ctx.fillText(text, x, y);

  // get text metrics
  var metrics = ctx.measureText(text);
  var width = metrics.width;
  ctx.font = '20pt Calibri';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText('(' + width + 'px wide)', x, y + 40);
*/
/* cirvle
  ctx.beginPath();  //draw the object c
  ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
  ctx.closePath();
  ctx.fill();*/

  requestAnimationFrame(redraw);
}

function move(){
  var x = Math.random() // this returns a float between 0.0 and 1.0
  c.x = x * canvas.width;
  c.y = x * canvas.height;
}

/*
* Calculates the angle ABC (in radians)
*
* A first point, ex: {x: 0, y: 0}
* C second point
* B center point
*/
function find_angle(A,B,C) {
var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

function initialize()
{

  delta_compass = 20;
  p1 = { x: 0, y: 0, z: 0, r: 50 };
  p2 = { x: -10, y: 20, z: 0, r: 71 };
  p3 = { x: 11, y: 20, z: 0, r: 71 };

  var centerX = ((p1.x + p2.x + p3.x) / 3);
  var centerY = ((p1.y + p2.y + p3.y) / 3);
  var centerZ = ((p1.z + p2.z + p3.z) / 3);

  var center = { x: centerX, y: centerY, z: centerZ };
  console.log(JSON.stringify("car: " + center));

  transport_compass = 20;
  p4 = trilaterate(p1, p2, p3);
  console.log(JSON.stringify("user: " + p4));

  console.log("On target: " + Math.round(find_angle(p1, center, p4) * 180 / Math.PI) + "º");

  if (p4 !== null)
  {
    ctx.fillStyle = "#111";
  }
  else
  {
    ctx.fillStyle = "#1500";
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

          //rose center
          var centerX = 30;
          var centerY = 60;
          var roseDist = 20;
          ctx.fillStyle = "#f00";
          ctx.strokeStyle = ctx.fillStyle;
          ctx.beginPath();
          ctx.moveTo(centerX,centerY);
          ctx.lineTo(centerX-roseDist,centerY);
          ctx.fillText("W",centerX-roseDist,centerY);
          ctx.stroke();
          ctx.moveTo(centerX,centerY);
          ctx.lineTo(centerX+roseDist,centerY);
          ctx.fillText("E",centerX+roseDist,centerY);
          ctx.stroke();
          ctx.moveTo(centerX,centerY);
          ctx.lineTo(centerX,centerY+roseDist);
          ctx.fillText("S",centerX,centerY+roseDist);
          ctx.stroke();
          ctx.moveTo(centerX,centerY);
          ctx.lineTo(centerX,centerY-roseDist);
          ctx.fillText("N",centerX,centerY-roseDist);
          ctx.stroke();

          //rotate points for direction
          ctx.rotate(transport_compass*Math.PI/180);

  ctx.fillStyle = "#f00";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillRect(150 + p1.x - 2, 150 + p1.y - 2, 5, 5);
  ctx.beginPath();
  ctx.arc(150 + p1.x, 150 + p1.y, p1.r, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#0f0";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillRect(150 + p2.x - 2, 150 + p2.y - 2, 5, 5);
  ctx.beginPath();
  ctx.arc(150 + p2.x, 150 + p2.y, p2.r, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#00f";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillRect(150 + p3.x - 2, 150 + p3.y - 2, 5, 5);
  ctx.beginPath();
  ctx.arc(150 + p3.x, 150 + p3.y, p3.r, 0, 2 * Math.PI);
  ctx.stroke();

  if (p4 !== null)
  {
    if (p4 instanceof Array)
    {
      ctx.fillStyle = "#0ff";
      ctx.fillRect(150 + p4[0].x - 2, 150 + p4[0].y - 2, 5, 5);

      ctx.fillStyle = "#ff0";
      ctx.fillRect(150 + p4[1].x - 2, 150 + p4[1].y - 2, 5, 5);
    }
    else
    {
      ctx.fillStyle = "#fff";
      ctx.fillRect(150 + p4.x - 2, 150 + p4.y - 2, 5, 5);
    }
  }
}

window.onload = function () {
	redraw();
}
