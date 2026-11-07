let mic;
let numCamadas = 7;
let espacamento = 2; 


let estadosCamadas = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Configura o mic
  mic = new p5.AudioIn();
  mic.start();


  for (let i = 0; i < numCamadas; i++) {
    estadosCamadas.push({
      corAlternada: random() > 0.5,
      offsetGlitch: 0
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  
  userStartAudio(); 
}

function draw() {
  
  push();
  resetMatrix();
  translate(-width / 2, -height / 2);
  background(5, 2, 10);

  noStroke();
  for (let i = 0; i < 8; i++) {
    let y = random(height);
    let h = random(4, 15);
    if (i % 2 === 0) {
      fill(50, 255, 120, 40);
    } else {
      fill(180, 0, 255, 40);
    }
    rect(0, y, width, h);
  }
  stroke(100, 0, 150, 30);
  for (let y = 0; y < height; y += 6) {
    line(0, y, width, y);
  }
  pop();

  let volume = mic.getLevel();
  
  let somDesejado = map(volume, 0, 0.05, 2, 120);
  espacamento = lerp(espacamento, somDesejado, 0.1); 


  rotateY(frameCount * 0.008);
  rotateX(sin(frameCount * 0.005) * 0.2); 
  let alturaTotal = 220;
  let alturaCamada = alturaTotal / numCamadas;

 
  for (let i = 0; i < numCamadas; i++) {
    push();

    let posY = -alturaTotal / 2 + i * (alturaCamada + espacamento);

    let camada = estadosCamadas[i];
    if (random(1) < 0.15) {
      camada.offsetGlitch = random(-15, 15);
    } else {
      camada.offsetGlitch *= 0.8;
    }

    translate(camada.offsetGlitch, posY, 0);

    let tamanhoBox = map(i, 0, numCamadas, 30, 150);

    if (random(1) < 0.2) {
      fill(40, 255, 100, 100);
      stroke(255);
    } else {
      noFill();
      stroke(0, 255, 200);
    }
    
    strokeWeight(1.5);
    box(tamanhoBox, alturaCamada, tamanhoBox);

    pop();
  }
}
