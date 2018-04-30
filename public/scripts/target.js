var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var text = '';
var offTarget;

//this coords should be validated at first car setup
var p1 = {address: "DD:70:09:6C:EF:01", x: 100, y: 102, z: 0, r: 0 };
var p2 = {address: "FF:01:16:F0:08:9B", x: 99.5, y: 100, z: 0, r: 0 };
var p3 = {address: "D0:8B:B8:74:15:FC", x: 100.5, y: 100, z: 0, r: 0 };
var dist = 999;

function updateBleScan(device) {
  //console.log(JSON.stringify(device));
  var dist = ((Math.abs(parseInt(device.rssi))-59)/6);
  var distMeters = Math.pow(2, dist);

  registerDistance(device, p1, distMeters);
  registerDistance(device, p2, distMeters);
  registerDistance(device, p3, distMeters);
}

function registerDistance(device, p, distMeters){
  if(device.address === p.address){
    p.r = distMeters
    console.log(JSON.stringify(p));
  }

  if(p.r<dist){
    dist = p.r;
  }
}

var redraw = function(){
  ctx.canvas.width  = video.offsetWidth;
  ctx.canvas.height = video.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

  //ctarget
  initialize();

  var x = canvas.width / 2;
  var y = canvas.height / 2;

  ctx.font = '30pt Calibri';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'blue';
  ctx.fillText(text, x, y);

  requestAnimationFrame(redraw);
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
  var BC;
  var AC;

  var trilaterationPoints = C.length;
  if(trilaterationPoints) {
    var C_avg = {
      x: (C[0].x+C[1].x)/2,
      y: (C[0].y+C[1].y)/2,
      z: (C[0].z+C[1].z)/2,
      r: (C[0].r+C[1].r)/2,
    }
    BC = Math.sqrt(Math.pow(B.x-C_avg.x,2)+ Math.pow(B.y-C_avg.y,2));
    AC = Math.sqrt(Math.pow(C_avg.x-A.x,2)+ Math.pow(C_avg.y-A.y,2));
  } else {
    BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
    AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
  }
return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

function initialize()
{

  delta_compass = 20;
//REMOVE
  /*p1 = { x: 0, y: 0, z: 0, r: 50 };
  p2 = { x: -10, y: 20, z: 0, r: 71 };
  p3 = { x: 11, y: 20, z: 0, r: 71 };*/

  if(p1.r==0 || p2.r==0 || p3.r==0) {
    text = "---";
    return;
  }

  var centerX = ((p1.x + p2.x + p3.x) / 3);
  var centerY = ((p1.y + p2.y + p3.y) / 3);
  var centerZ = ((p1.z + p2.z + p3.z) / 3);

  var center = { x: centerX, y: centerY, z: centerZ };
  //console.log("car: " + JSON.stringify(center));

  //transport_compass = 20;
  p4 = trilaterate(p1, p2, p3);
  //console.log("user: " + JSON.stringify(p4));

  offTarget = Math.round(find_angle(p1, center, p4) * 180 / Math.PI);
  if(offTarget < 3 || offTarget > 357){
    text = "spoted";
  } else {
    text = offTarget + "º";
  }
  //console.log("On target: " + offTarget + "º");
//REMOVE
  visual();
}

function visual() {

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
    var roseCenterX = 30;
    var roseCenterY = 60;
    var roseDist = 20;
    ctx.fillStyle = "#f00";
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.moveTo(roseCenterX,roseCenterY);
    ctx.lineTo(roseCenterX-roseDist,roseCenterY);
    ctx.fillText("W",roseCenterX-roseDist,roseCenterY);
    ctx.stroke();
    ctx.moveTo(roseCenterX,roseCenterY);
    ctx.lineTo(roseCenterX+roseDist,roseCenterY);
    ctx.fillText("E",roseCenterX+roseDist,roseCenterY);
    ctx.stroke();
    ctx.moveTo(roseCenterX,roseCenterY);
    ctx.lineTo(roseCenterX,roseCenterY+roseDist);
    ctx.fillText("S",roseCenterX,roseCenterY+roseDist);
    ctx.stroke();
    ctx.moveTo(roseCenterX,roseCenterY);
    ctx.lineTo(roseCenterX,roseCenterY-roseDist);
    ctx.fillText("N",roseCenterX,roseCenterY-roseDist);
    ctx.stroke();

    //rotate points for direction
    transport_compass = 0;
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
        //ctx.fillRect(150 + p4.x - 2, 150 + p4.y - 2, 5, 5);
      }
    }
}

window.onload = function () {
	redraw();
}
