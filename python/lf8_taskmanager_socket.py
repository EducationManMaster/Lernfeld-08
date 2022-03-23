import asyncio
import websockets
import psutil
import os
import base64

def getStats():

    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    temp = psutil.sensors_temperatures()
    disk = psutil.disk_usage('/').percent
    network = "wlan0" #psutil.net_io_counters(pernic=True)
    ip = psutil.net_if_addrs()
    processes = os.popen("ps -e | wc -l").read().splitlines()[0]
    pid = os.popen("top -n 1 -b").read()
    pid_bytes = pid.encode("utf-8")
    pid = base64.b64encode(pid_bytes).decode("utf-8")


    for name, value in temp.items():
        temp = value[0].current
        temp = round(temp, 1)

    for name, value in ip.items():
        if(name == network):
            ip = value[0].address

    output = ('{"http":"Normal","websocket":"Normal",' +
             '"cpu":"'       + str(cpu)       + '%",'  +
             '"ram":"'       + str(ram)       + '%",'  +
             '"temp":"'      + str(temp)      + '°C",' +
             '"disk":"'      + str(disk)      + '%",'  +
             '"network":"'   + str(network)   + '",'   +
             '"ip":"'        + str(ip)        + '",'   +
             '"processes":"' + str(processes) + '",'   +
             '"pid":"'       + str(pid)       + '"}'   )

    log = ('{"http":"Normal","websocket":"Normal",' +
             '"cpu":"'       + str(cpu)       + '%",'  +
             '"ram":"'       + str(ram)       + '%",'  +
             '"temp":"'      + str(temp)      + '°C",' +
             '"disk":"'      + str(disk)      + '%",'  +
             '"network":"'   + str(network)   + '",'   +
             '"ip":"'        + str(ip)        + '",'   +
             '"processes":"' + str(processes) + '"}\n'   )

    f = open("./Leistungsdaten.log", "a")
    f.write(log)
    f.close()

    return output

async def update(websocket):
    async for message in websocket:
        if message == "getUpdate":
            await websocket.send(getStats())

async def main():
    async with websockets.serve(update, "0.0.0.0", 1337):
        await asyncio.Future()

asyncio.run(main())
