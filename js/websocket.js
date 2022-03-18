var websocket = new WebSocket("ws://localhost:1337")

websocket.onopen = function(event){

  websocket.send("getUpdate");
  clockTime();

};

websocket.onmessage = function(event) {

  var data = JSON.parse(event.data);
  updateValues(data);
  processHandler(data.pid);

}


websocket.addEventListener("error", websocketError);
function websocketError() {

  var websocket = document.getElementById("websocket");
  websocket.innerHTML = "Fehler";
  websocket.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getTextColor("Fehler");

}

function isOpen(ws) { return ws.readyState === ws.OPEN }


var updateTime = Date.now();
var tickTime = Date.now();
var updateIN = 11;

function clockTime() {

  if(Date.now() - updateTime >= 10000){

    if(!isOpen(websocket)){ websocketError(); }
    websocket.send("getUpdate");
    updateIN = 11;
    updateTime = Date.now();

  }

  if(Date.now() - tickTime >= 1000){

    updateIN--;
    var updateMSG = "Nächstes Update in "+updateIN+" Sekunden...";
    document.getElementById("main_header_time").innerHTML = updateMSG;

    tickTime = Date.now();

  }

  requestAnimationFrame(clockTime);

}
