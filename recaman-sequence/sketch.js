var nums = [];
var cnt = 1;

function setup() {
  createCanvas(1712, 980);
  background(255);
  nums.push(0);
  frameRate(5);
}

function draw() {
  translate(0,height/2);
  seqNums();
  show();
}

function mousePressed() {
  noLoop();
}

function seqNums() {
    var n = nums.length;
    var a = nums[n-1];

    if (a-n > 0 && !nums.includes(a-n)) nums.push(a-n);
    else nums.push(a+n);
}

function show() {
  const ran = [PI,0];
  noFill();
  stroke(0);
  for (var i = 1; i < nums.length; ++i) {
    var d = i*15;
    var x = (nums[i]+nums[i-1])*15/2;
    arc(x,0,d,d,ran[i%2],ran[(i-1)%2]);
  }
}
