let cenX = 0;
let cenY = 0;
let scale = 1;

function setup() {
    createCanvas(710, 400);
    pixelDensity(1);
    frameRate(30);

    drawMandelbrot();
}

function drawMandelbrot() {
    loadPixels();
    
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            let x0 = (i - width/2) * (4/width) * (width/(height*scale)) + cenX;
            let y0 = (j - height/2) * (4/height) * (1/scale) + cenY;
            x = x0;
            y = y0;
            iteration = 0;
            max_iteration = 100;
            while (x*x + y*y <= 16 && iteration < max_iteration) {
                xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iteration++;
            }

            const pix = (i+j*width)*4;
            const norm = map(iteration, 0, max_iteration, 0, 1);
            let bright = map(sqrt(norm), 0, 1, 0, 255);
            if (iteration == max_iteration) {
                bright = 0;
            }
            // Gosh, we could make fancy colors here if we wanted
            pixels[pix + 0] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }

    updatePixels();
}

function draw() {
    redraw = false;
    if (keyIsDown(LEFT_ARROW)) {
        cenX -= 0.5 * 1 / scale;
        redraw = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        cenX += 0.5 * 1 / scale;
        redraw = true;
    }
    if (keyIsDown(UP_ARROW)) {
        cenY -= 0.5 * 1 / scale;
        redraw = true;
    }
    if (keyIsDown(DOWN_ARROW)) {
        cenY += 0.5 * 1 / scale;
        redraw = true;
    }
    if (keyIsDown(219)) {
        scale -= scale * 0.5;
        redraw = true;
    }
    if (keyIsDown(221)) {
        scale += scale * 0.5;
        redraw = true;
    }

    if (redraw) {
        drawMandelbrot();
    }
}