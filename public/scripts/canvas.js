var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var c = {  //create an object to draw
  x:0,  //x value
  y:0,  //y value
  r:5 //radius
}

var redraw = function(){
  ctx.canvas.width  = video.offsetWidth;
  ctx.canvas.height = video.offsetHeight;

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

function initialize()
{
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");

  p1 = { x:   0, y:   0, z:  0, r: 42 };
  p2 = { x: 0, y: 10, z:  0, r: 36 };
  p3 = { x: 5, y: 10, z: 0, r: 32 };

  p4 = trilaterate(p1, p2, p3);
    console.log(JSON.stringify(p4));
  if (p4 !== null)
  {
    ctx.fillStyle = "#111";
  }
  else
  {
    ctx.fillStyle = "#800";
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f00";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillRect(20 + p1.x - 2, 20 + p1.y - 2, 5, 5);
  ctx.beginPath();
  ctx.arc(20 + p1.x, 20 + p1.y, p1.r, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#0f0";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillRect(20 + p2.x - 2, 20 + p2.y - 2, 5, 5);
  ctx.beginPath();
  ctx.arc(20 + p2.x, 20 + p2.y, p2.r, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#00f";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillRect(20 + p3.x - 2, 20 + p3.y - 2, 5, 5);
  ctx.beginPath();
  ctx.arc(20 + p3.x, 20 + p3.y, p3.r, 0, 2 * Math.PI);
  ctx.stroke();

  if (p4 !== null)
  {
    if (p4 instanceof Array)
    {
      ctx.fillStyle = "#0ff";
      ctx.fillRect(20 + p4[0].x - 2, 20 + p4[0].y - 2, 5, 5);

      ctx.fillStyle = "#ff0";
      ctx.fillRect(20 + p4[1].x - 2, 20 + p4[1].y - 2, 5, 5);
    }
    else
    {
      ctx.fillStyle = "#fff";
      ctx.fillRect(20 + p4.x - 2, 20 + p4.y - 2, 5, 5);
    }
  }
}

redraw();

setInterval(move, 1000);
