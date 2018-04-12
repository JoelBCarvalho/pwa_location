
"use strict";
var canvas, ctx;
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

function set_size(){
	var window_h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	//var title_size = document.getElementsByTagName("h1")[0].getBoundingClientRect();

	//canvas.width = window_w;
	//canvas.height = window_h;

  canvas.width  = video.offsetWidth;
  canvas.height = video.offsetHeight;
  ctx.canvas.width  = video.offsetWidth;
  ctx.canvas.height = video.offsetHeight;

	reset_arrow();
}

var arrows, grid_space, rows, columns;
var mouse;

var Arrow = function(x,y){
	this.x = x;
	this.y = y;
	this.rotation = 0;
	this.distance = 0;

	this.draw = function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);

		ctx.lineWidth = 1;
		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.strokeStyle = "#000";
		// ctx.strokeStyle = "hsl("+String(this.distance*0.5%360)+",100%,50%)";		// RAINBOW !!

		ctx.beginPath();
		ctx.moveTo(-8, -4);
		ctx.lineTo(0, -4);
		ctx.lineTo(0, -8);
		ctx.lineTo(8, 0);
		ctx.lineTo(0, 8);
		ctx.lineTo(0, 4);
		ctx.lineTo(-8, 4);
		ctx.lineTo(-8, -4);
		ctx.closePath();

		ctx.fill();
		ctx.stroke();
		ctx.restore();
	};

	this.update = function(mouse) {
		this.rotation = Math.atan2(mouse.y - this.y, mouse.x - this.x);
		this.distance = Math.hypot(mouse.y - this.y, mouse.x - this.x);
	};

};

function reset_arrow(){
	//rows = Math.ceil(canvas.width / grid_space);
	//columns = Math.ceil(canvas.height / grid_space);

	arrows = [];
	/*for(var i=0; i<=rows; i++){
		for(var j=0; j<=columns; j++){
			arrows.push(new Arrow(i*grid_space, j*grid_space+8));
		}
	}*/
  var offset = 10;
  arrows.push(new Arrow(offset, offset));
  arrows.push(new Arrow(offset, ctx.canvas.height-offset));
  arrows.push(new Arrow(ctx.canvas.width-offset, offset));
  arrows.push(new Arrow(ctx.canvas.width-offset, ctx.canvas.height-offset));
}

function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

	//grid_space = 100;
	//rows = Math.round(canvas.width / grid_space);
	//columns = Math.round(canvas.height / grid_space);

	mouse = {
		x: canvas.width/2,
		y: canvas.height/2
	};

	arrows = [];

	window.onresize = set_size;
	canvas.onmousemove = function(e){
		var rect = this.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	};

	set_size();
	main();
};

function checkSizes() {
  return canvas.width  == video.offsetWidth && canvas.height == video.offsetHeight && ctx.canvas.width  == video.offsetWidth && ctx.canvas.height == video.offsetHeight;
}

function main(){
  if (!checkSizes()){
    set_size();
  }

  ctx.canvas.width  = video.offsetWidth;
  ctx.canvas.height = video.offsetHeight;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	for(var i=0; i<arrows.length; i++){
		arrows[i].update(mouse);
		arrows[i].draw(ctx);
	}

	requestAnimationFrame(main);
};

window.onload = function () {
	init();
}
