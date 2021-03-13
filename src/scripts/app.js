window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;

var input = document.querySelectorAll('#input');
var p = document.querySelectorAll('#inputP');
var clickstart = document.getElementById('clickstart');
var clickstop = document.getElementById('clickstop');

//Récupère les inputs
var inputs = [];
var count = 0;

input.forEach((input) => {
  inputs[count] = input;
  count++;
});

//Récupère les values
var inputsValue = [];
var count = 0;
input.forEach((input) => {
  inputsValue[count] = input.value;
  count++;
});

//Récupère les P
var ps = [];
count = 0;
p.forEach((p) => {
  ps[count] = p;
  count++;
});

var lumValue = 0;
var satValue = 0;
var colorValue = 0;

function declareValues() {
  lumValue = inputs[2].value;
  satValue = inputs[1].value;
  colorValue = inputs[0].value;
};

//Lorsqu'on déplace le slider, récupère la bonne value, la modifie dans le span comme dans la couleur
var color = document.querySelector('.color');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', function () {
    declareValues();

    p[i].innerHTML = inputs[i].value;
    color.style.backgroundColor = "hsl("+colorValue+", "+satValue+"%, "+lumValue+"%)"
    }, false);
};


var request = new XMLHttpRequest();

//Chargement du son
request.open('GET', './assets/mp3/guitare.mp3', true);
console.log('Request done');
request.responseType = 'arraybuffer';

// Decode asynchronously ???
request.onload = function() {
  context.decodeAudioData(request.response, function(theBuffer) {
    myBuffer = theBuffer;
    console.log(theBuffer);
  });
}
request.send();


function playSound(buffer) {
  declareValues();

  //Crée ma source et un effet "gain"
  var source = context.createBufferSource();
  var g = context.createGain();
  

  //Si la couleur est lumineuse, alors le son s'estompe également
  if(lumValue > 50) {
    lumValue = 100 - lumValue;
    console.log(lumValue);
  }

  //Prends la valeur la plus basse et l'utilise pour le gain
  if(satValue < lumValue){
    console.log(satValue);
    g.gain.value = satValue/100;
  }else if(lumValue < satValue){
    console.log(lumValue);
    g.gain.value = lumValue/100;
  }

  //Prends en compte la luminiosité car le tempo doit correspondre au taux de noirceur de la couleur
  if(inputs[2].value < 50) {
    source.playbackRate.value = 0.5 + lumValue/100;
  }else{
    source.playbackRate.value = 0.5 + satValue/100;
  }

  source.buffer = buffer;
  source.start(0);
  //source.loop = true;

  //Connecte la source
  source.connect(g);
  g.connect(context.destination);

  clickstop.addEventListener('click', e => {
    source.stop(0);
  });
}

function clickHandler(e) {
    playSound(myBuffer);
}

clickstart.addEventListener('click',clickHandler);