let mic;
let numLayers = 7;
let espacamentoSuave = 2;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  mic = new p5.AudioIn();
  mic.start();
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
  let numFaixas = 12;
  for (let i = 0; i < numFaixas; i++) {
    let yF = random(height);
    let hF = random(2, 25);
    
    if (i % 3 === 0) {
      fill(50, 255, 120, random(30, 90)); 
    } else if (i % 3 === 1) {
      fill(180, 0, 255, random(30, 90));
    } else {
      fill(0, 220, 255, random(30, 90)); 
    }
    
    let wF = random(1) < 0.3 ? width : random(50, width * 0.8);
    let xF = random(width) - (wF === width ? 0 : wF * 0.5);
    
    rect(xF, yF, wF, hF);
  }


  strokeWeight(1);
  for (let y = 0; y < height; y += 4) {
    stroke(100, 0, 150, 40);
    line(0, y, width, y);
  }
  pop();

  let vol = mic.getLevel();
  let somSensivel = vol * 12; 
  let espacamentoAlvo = map(somSensivel, 0, 0.2, 2, 100);
  espacamentoSuave = lerp(espacamentoSuave, espacamentoAlvo, 0.08);

  rotateY(frameCount * 0.012);

  let alturaTotal = 240;
  let alturaCamada = alturaTotal / numLayers;

  for (let i = 0; i < numLayers; i++) {
    push();
  
    let yPos = -alturaTotal / 2 + i * (alturaCamada + espacamentoSuave);
    let glitchX = 0;
    let glitchZ = 0;
    if (random(1) < 0.25) { 
      glitchX = random(-25, 25);
      glitchZ = random(-15, 15);
    }

    translate(glitchX, yPos, glitchZ);

    let larguraBase = map(i + 1, 0, numLayers, 18, 180);

    if (random(1) < 0.2) {
     
      if (random(1) < 0.5) {
        fill(40, 255, 100, 120);
        stroke(255);
      } else {
        fill(200, 0, 255, 120);
        stroke(0, 255, 200);
      }
      strokeWeight(2);
    } else {
      
      noFill();
      if (random(1) < 0.5) {
        stroke(50, 255, 130); 
      } else {
        stroke(220, 50, 255); 
      }
      strokeWeight(random(1, 3.5));
    }

    box(larguraBase, alturaCamada, larguraBase);
    
    pop();
  }
}
