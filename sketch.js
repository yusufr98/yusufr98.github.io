// Use the file input to select an image to
// load and display.
let input;
let img;
let dlbutton;
let checkBoxes = document.querySelectorAll(".color");
let reverseCheck = document.getElementById("reverse");
let outlineColor = document.getElementsByName("pixel");
let radios = document.getElementsByName("pixelOutline");
let selectedColors = [];
var pixelation_level = 2;
let outlineWeight = 0;
let outlineStroke = 0;
const palette = {
  purple_: [142, 68, 173],//purple
  green_: [39, 174, 96],//green
  gray_: [127, 140, 141],//gray
  red_: [231, 76, 60],//red
  yellow_: [241, 196, 15],//yellow
  mint_: [46, 204, 113],//mint
  lightblue_: [52, 152, 219],//light blue
  brown_: [155, 89, 182],//brown
  orange_: [243, 156, 18],//orange
  crimson_: [192, 57, 43],//crimson
  teal_: [26, 188, 156],//teal
  teal2_:[22, 160, 133]//teal 2
};

function setup() {
  var canvas = createCanvas(400, 400);
      canvas.parent('canvas');
  // Create a file input and place it beneath
  // the canvas.
  input = createFileInput(handleImage);
  input.position(windowWidth - 200, 20);
  pixelDensity(1);
  dlbutton = createButton('Download');
  dlbutton.position(input.x, input.y + 50);
  
  updateColors();
  background(200 , 0)
}

function draw() {
  dlbutton.mousePressed(download);
  
  outlineColor.forEach(elm => elm.addEventListener("change", setColor));
  reverseCheck.addEventListener("change", paletteReverse);
  checkBoxes.forEach(elm => elm.addEventListener("change", updateColors));
  radios.forEach(elm => elm.addEventListener("change", setOutline));

  // Draw the image if loaded.
  if (img) {
    img.resize(floor((windowWidth*2)/5), 0);
    resizeCanvas(floor(img.width), floor(img.height));
    img.loadPixels();
    noStroke();
    for (let x = 0; x < img.width; x += pixelation_level) {
      for (let y = 0; y < img.height; y += pixelation_level) {
        
        let i = (x + y * width) * 4;
  
        let r = img.pixels[i + 0];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];
        let a = img.pixels[i + 3];

        let brightness = (r + g + b) / 3;

        let colorIndex = floor(map(brightness, 0, 255, 0, selectedColors.length));
        colorIndex = constrain(colorIndex, 0, selectedColors.length - 1);
        let [neonR, neonG, neonB] = selectedColors[colorIndex];

        fill(neonR, neonG, neonB, 200);
        
        stroke(outlineStroke);
        strokeWeight(outlineWeight);
       
        square(x+outlineWeight, y+outlineWeight, pixelation_level-outlineWeight);
        
      }
    }
  }
}

function download(){
  saveCanvas();
}

function handleImage(file) {
  if (file.type === 'image') {
    img = loadImage(file.data);
  } else {
    img = null;
  }
}

function paletteReverse(){
  selectedColors.reverse();
}

function setOutline(){
  if(document.getElementById("small").checked==true){
    outlineWeight = .2;
  }
  else if(document.getElementById("medium").checked==true){
    outlineWeight = .5;
  }
  else if(document.getElementById("large").checked==true){
    outlineWeight = .8;
  }
  if(document.getElementById("none").checked==true){
    outlineWeight = 0;
  }
  
}

function setColor() {
  if(document.getElementById("light").checked == true){
    outlineStroke = 200;
  }
  else if(document.getElementById("dark").checked == true){
    outlineStroke = 0;
  }
}

function updateColors() {
  selectedColors = Array.from(checkBoxes)
    .filter(elm => elm.checked)
    .map(elm => palette[elm.getAttribute('data-id')]);
}

function windowResized(){
  resizeCanvas(img.width,img.height);
}

function changeV(){
  pixelation_level = parseInt(document.getElementById("levelInput").value, 10);
}
