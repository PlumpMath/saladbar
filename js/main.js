(function() {
  var audio = document.getElementById("audio"),
      channelFeed = "http://api.somafm.com/channels.json",
      nowPlaying = document.getElementById("now_playing"),
      title = document.getElementById("title"),
      interval = null,
      updating = false;
  
  startUpdate();
  
  document.getElementById("close_btn").addEventListener("click", function() {
    console.log("click");
    window.close();
  });
  
  document.addEventListener("keyup", function() {
    if(event.keyCode === 32) {
      togglePlay();
    }
  });
  
  nowPlaying.addEventListener("click", function() {
    togglePlay();
  });
  
  function togglePlay() {
    if(updating) {
      audio.pause();
      stopUpdate();
    }
    else {
      audio.play();
      startUpdate();
    }
  }
  
  function startUpdate() {
    updating = true;
    getNowPlaying();
    clearInterval(interval);
    interval = setInterval(getNowPlaying, 30 * 1000);
  }
  
  function stopUpdate() {
    updating = false;
    clearInterval(interval);
    title.textContent = "Paused";
  }
  
  function getNowPlaying() {
    $.getJSON(channelFeed, function(data) {
      if(!updating) return;
      
      for(var i = 0; i < data.channels.length; i++) {
        var channel = data.channels[i];
        if(channel.id == "groovesalad") {
          title.textContent = lastPlaying = channel.lastPlaying;
          return;
        }
      }
    });
  }
}());