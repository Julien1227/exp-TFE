window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;

var colorSlider = document.querySelector('#colorValue');
var satSlider = document.querySelector('#satValue');
var lumSlider = document.querySelector('#lumValue');


//Récupère la valeur Couleur du slider
var colorValue = document.querySelector('#colorValue').value/10;
console.log(colorValue);

//Récupère la valeur Stauration du slider
var satValue = document.querySelector('#satValue').value/100;
console.log(colorValue);

//Récupère la valeur Luminiosité du slider
var lumValue = document.querySelector('#lumValue').value/100;
console.log(colorValue);


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

  //Redéclare mes variables sat lum et color
  colorValue = document.querySelector('#colorValue').value;
  console.log(colorValue);

  satValue = document.querySelector('#satValue').value;
  console.log(satValue);

  lumValue = document.querySelector('#lumValue').value;
  console.log(lumValue);

  //Crée un buffer sur lequel appliquer des effets (je pense)
  var source = context.createBufferSource(), g = context.createGain();
  source.buffer = buffer;
  source.start(0);
  if(lumValue < satValue) {
    g.gain.value = lumValue/100;
  }else if(lumValue > satValue){
    g.gain.value = satValue/100;
  }

  //Connecte la source
  source.connect(g);
  g.connect(context.destination);
}

function clickHandler(e) {;
    playSound(myBuffer);
}

var colorP = document.querySelector('#colorP');
var satP = document.querySelector('#satP');
var lumP = document.querySelector('#lumP');
colorP.innerHTML = colorValue;
satP.innerHTML = satValue;
lumP.innerHTML = lumValue;

var color = document.querySelector('.color');

colorSlider.addEventListener('input', function () {
    //Redéclare mes variables sat lum et color
    colorValue = document.querySelector('#colorValue').value;
    satValue = document.querySelector('#satValue').value;
    lumValue = document.querySelector('#lumValue').value;

    colorP.innerHTML = colorValue;
    satP.innerHTML = satValue;
    lumP.innerHTML = lumValue;
    color.style.backgroundColor = "hsl("+ colorValue +", "+ satValue +"%, "+ lumValue +"%)";
}, false);

satSlider.addEventListener('input', function () {
    //Redéclare mes variables sat lum et color
    colorValue = document.querySelector('#colorValue').value;
    satValue = document.querySelector('#satValue').value;
    lumValue = document.querySelector('#lumValue').value;

    colorP.innerHTML = colorValue;
    satP.innerHTML = satValue;
    lumP.innerHTML = lumValue;
    color.style.backgroundColor = "hsl("+ colorValue +", "+ satValue +"%, "+ lumValue +"%)";}, false);

lumSlider.addEventListener('input', function () {
    //Redéclare mes variables sat lum et color
    colorValue = document.querySelector('#colorValue').value;
    satValue = document.querySelector('#satValue').value;
    lumValue = document.querySelector('#lumValue').value;

    colorP.innerHTML = colorValue;
    satP.innerHTML = satValue;
    lumP.innerHTML = lumValue;
    color.style.backgroundColor = "hsl("+ colorValue +", "+ satValue +"%, "+ lumValue +"%)";}, false);

clickme = document.getElementById('clickme');
clickme.addEventListener('click',clickHandler);