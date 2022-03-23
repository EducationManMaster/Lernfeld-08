var testData = {

  http:"Warnung",
  websocket:"Normal",
  cpu:"12%",
  ram:"22%",
  temp:"79°C",
  disk:"11%",
  network:"eth1",
  ip:"192.168.0.22",
  processes:"12"

}

function updateValues(data) {

  var http = document.getElementById("http");
  http.innerHTML = data.http;
  http.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getTextColor(data.http);
  var websocket = document.getElementById("websocket");
  websocket.innerHTML = data.websocket;
  websocket.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getTextColor(data.websocket);
  var cpu = document.getElementById("cpu");
  cpu.innerHTML = data.cpu;
  cpu.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getStatColor(data.cpu);
  var ram = document.getElementById("ram");
  ram.innerHTML = data.ram;
  ram.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getStatColor(data.ram);
  var temp = document.getElementById("temp");
  temp.innerHTML = data.temp;
  temp.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getStatColor(data.temp);
  var disk = document.getElementById("disk");
  disk.innerHTML = data.disk;
  disk.parentElement.getElementsByClassName("half_status_stat")[0].className = "half_status_stat" + getStatColor(data.disk);
  document.getElementById("network").innerHTML   = data.network;
  document.getElementById("ip").innerHTML        = data.ip;
  document.getElementById("processes").innerHTML = data.processes;
  var width = (document.getElementsByClassName("half_bar")[0].offsetWidth / 100) * parseInt(data.disk);
  document.getElementsByClassName("half_bar_fill")[0].style.width = width + "px";


  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "http://192.168.0.103/bs/lf8/php/updateDB.php?p="+parseFloat(data.cpu)+"&a="+parseFloat(data.ram)+"&t="+parseFloat(data.temp)+"&s="+parseFloat(data.disk)+"&i="+parseFloat(data.processes));
  iframe.setAttribute("class", "tempo");
  document.getElementsByTagName("body")[0].appendChild(iframe);

}

function getTextColor(value) {

  if(value == "Normal" ){ return " half_status_stat_good"; }
  if(value == "Warnung"){ return " half_status_stat_warn"; }
  if(value == "Fehler" ){ return " half_status_stat_crit"; }

}

function getStatColor(value) {

  value = parseInt(value);

  if(value <= 50)              { return " half_status_stat_good"; }
  if(value > 50 && value < 75 ){ return " half_status_stat_warn"; }
  if(value >= 75)              { return " half_status_stat_crit"; }

}








function processHandler(data) {
  //document.getElementById("pid").innerHTML = data.pid;

  data = atob(data);
  data = data.split(/\r?\n/);

  var pid = document.getElementById("pid");
  pid.innerHTML = "";

  for (var i = 7; i < data.length; i++) {

    var process = document.createElement("div");
    process.className = "pid";
    process.innerHTML = data[i];

    pid.appendChild(process);

  }

  return data;

}
