let time = 0;
let radius = 100;
let wave = [];
let slider;
let selector;
let drawing = [];

function setup() {
  createCanvas(1500,500);
  slider = createSlider(1, 20, 1);
  slider.changed(waveChanged);
  selector = createSelect();
  selector.option('Square');
  selector.option('Sawtooth');
  selector.option('Triangle');
  selector.changed(waveChanged);
  colorMode(HSB);
}

function waveChanged() {
  time = 0;
  wave = [];
  drawing = [];
}

function draw() {
  background(0);
  translate(radius*4, height/2);
  
  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    prevx = x;
    prevy = y;

    let n = 0;
    let r = 0;

    switch (selector.value()) {
      case 'Square':
        n = i * 2 + 1;
        r = radius * (4 / (n * PI))
        break;
      case 'Sawtooth':
        n = i+1;
        r = radius * (2 / (n * pow(-1,n) * PI))
        break;
      case 'Triangle':
        n = i * 2 + 1;
        r = radius * ((8 * pow(-1,(n-1)/2)) / (pow(PI,2) * pow(n,2)));
        break;
      default:
        break;
    }

    x += r * cos(n*time);
    y += r * sin(n*time);

    stroke(i*(360/slider.value()),100,100);
    line(prevx,prevy,x,y);

    noFill();
    ellipse(prevx, prevy, 2 * r);
  }

  wave.unshift(y);
  if (wave.length > 1000) {
    wave.pop()
  }

  stroke(255);
  noFill()
  beginShape()
  for (let i = 0; i < wave.length; i++) {
    vertex(i+radius+100,wave[i]);
  }
  endShape()

  drawing.push([x,y]);

  stroke(255);
  noFill()
  beginShape()
  drawing.forEach(el => {
    vertex(el[0],el[1]);
  });
  endShape()
  
  stroke(255);
  line(x,y,radius+100,wave[0]);

  time -= 0.02;
}