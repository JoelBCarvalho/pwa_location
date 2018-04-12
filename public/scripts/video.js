var video = document.getElementById('player');

var handleSuccess = function(stream) {
  video.srcObject = stream;
};

navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(handleSuccess)

navigator.permissions.query({name:'camera'}).then(function(result) {
  if (result.state == 'granted') {

  } else if (result.state == 'prompt') {

  } else if (result.state == 'denied') {

  }
  result.onchange = function() {

  };
});
video.addEventListener('play', function() {
  var $this = this; //cache
  (function loop() {
    if (!$this.paused && !$this.ended) {
      ctx.drawImage($this, 0, 0);
      setTimeout(loop, 1000 / 30); // drawing at 30fps
    }
  })();
}, 0);
