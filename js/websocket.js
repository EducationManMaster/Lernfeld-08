var websocket = new WebSocket("ws://localhost:1337");
clockTime();

websocket.onopen = function(event){

  websocket.send("getUpdate");

};

websocket.onmessage = function(event) {

  var data = JSON.parse(event.data);
  updateValues(data);
  processHandler(data.pid);

}


websocket.addEventListener("error", websocketError);
async function websocketError() {

  var websocket = document.getElementById("websocket");
  websocket.innerHTML = "Fehler";
  websocket.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getTextColor("Fehler");

  await sleep(10000);
  location.reload();

}

function isOpen(ws) { return ws.readyState === ws.OPEN }

function sleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }


var updateTime = Date.now();
var tickTime = Date.now();
var updateIN = 10;

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
