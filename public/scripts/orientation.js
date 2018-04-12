
function deviceOrientationListener(event) {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	  canvas.width  = video.offsetWidth;
	  canvas.height = video.offsetHeight;
	  ctx.canvas.width  = video.offsetWidth;
	  ctx.canvas.height = video.offsetHeight;

	var alpha = event.alpha === null ? 0 : event.alpha;
	var beta = event.beta === null ? 0 : event.beta;
	var gamma = event.gamma === null ? 0 : event.gamma;

	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#FF7777";
	ctx.font = "14px Verdana";
	ctx.fillText("Alpha: " + alpha.toFixed(2), 10, 20);
	/*ctx.beginPath();
	ctx.moveTo(180, 75);
	ctx.lineTo(210, 75);
	ctx.arc(180, 75, 60, 0, alpha * Math.PI / 180);
	ctx.fill();*/

	ctx.fillStyle = "#FF6600";
	ctx.fillText("Beta: " + beta.toFixed(2), 10, 140);
	/*ctx.beginPath();
	ctx.fillRect(180, 150, beta, 90);
*/
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Gamma: " + gamma.toFixed(2), 10, 270);
	/*ctx.beginPath();
	ctx.fillRect(90, 340, 180, gamma);*/
}

if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
	alert("Sorry, your browser doesn't support Device Orientation");
}
/*
// http://daker.me/2013/06/5-html5-javascript-apis-to-keep-an-eye-on.html
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        var a = event.alpha,
            b = event.beta,
            g = event.gamma;
        console.log('Orientation - Alpha: ' + a + ', Beta: '+ b + ', Gamma: ' + g);
    }, false);
} else {
    console.log('This device does not support deviceorientation');
}
*/
