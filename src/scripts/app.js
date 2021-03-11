window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;

var input = document.querySelectorAll('#input');
var p = document.querySelectorAll('#inputP');

var inputs = [];
var ps = [];

var count = 0;

//Récupère les inputs
input.forEach((input) => {
  inputs[count] = input;
  count++;
});
count = 0;

//Récupère les P
p.forEach((p) => {
  ps[count] = p;
  count++;
});

console.log(inputs);
console.log(ps);

//Déclare les p et innerHTLM les valeurs des inputs

var color = document.querySelector('.color');

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', function () {
    p[i].innerHTML = inputs[i].value;
    color.style.backgroundColor = "hsl("+inputs[0].value+", "+inputs[1].value+"%, "+inputs[2].value+"%)"
    }, false);
};


var request = new XMLHttpRequest();

//Chargement du son
request.open('GET', './assets/mp3/guitare.mp3', true);
console.log('Request done');
request.responseType = 'arraybuffer';

// Decode asynchronously
request.onload = function() {
  context.decodeAudioData(request.response, function(theBuffer) {
    myBuffer = theBuffer;
    console.log(theBuffer);
  });
}
request.send();

function playSound(buffer) {
  var source = context.createBufferSource(), g = context.createGain();
  source.buffer = buffer;
  source.start(0);

  //Récupère les valeurs des sliders
  var lumValue = inputs[2].value;
  var satValue = inputs[1].value;

  //Si la couleur est lumineuse, alors le son s'estompe également
  if(lumValue > 50) {
    var lumValue = 100 - lumValue;
    console.log(lumValue);
  }else{
    lumValue = lumValue;
  }

  //Prends la valeur la plus basse et l'utilise pour le gain
  if(satValue < lumValue){
    console.log(satValue);
    g.gain.value = satValue/100;
  }else if(lumValue < satValue){
    console.log(lumValue);
    g.gain.value = lumValue/100;
  }

  //Connecte la source
  source.connect(g);
  g.connect(context.destination);
}

function clickHandler(e) {
    playSound(myBuffer);
}

clickme = document.getElementById('clickme');
clickme.addEventListener('click',clickHandler);