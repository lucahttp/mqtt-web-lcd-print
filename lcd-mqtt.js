//const client = new Paho.MQTT.Client("192.168.0.23", Number(9001), "myClientId" + new Date().getTime());
//const client = new Paho.MQTT.Client("186.18.69.174", Number(789), "myClientId" + new Date().getTime());
const client = new Paho.MQTT.Client("mqtt.eclipse.org", Number(80), "myClientId" + new Date().getTime());

const myTopic = "superTopicX9";

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect });

let count = 0;
function onConnect() {
  console.log("onConnect");
  client.subscribe(myTopic);
  /*
  setInterval(() => { publish(myTopic, `The count is now ${count++}`) }, 1000)
  */
  
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  client.connect({ onSuccess: onConnect });
}

const publish = (dest, msg) => {
  console.log('desint :', dest, 'msggg', msg)
  let message = new Paho.MQTT.Message(msg);
  message.destinationName = dest;
  client.send(message);
}

function onMessageArrived(message) {
  //let el = document.createElement('div')
  //el.innerHTML = message.payloadString
  //document.body.appendChild(el)
}

/*
function GO_PUBLISH(){
  gg = document.getElementById("text_input");
  publish(myTopic, `${gg}`);
  console.log(gg);
}
*/

function GO_PUBLISH(){
  console.log(document.getElementById('text_input').value);
  publish(myTopic, `${document.getElementById('text_input').value}`);
}

