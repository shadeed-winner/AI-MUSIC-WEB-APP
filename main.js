PS5 = "";
PS4 = "";

function preload() {
    PS5 = loadSound("PS5.mp3");
    PS4 = loadSound("PS4.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    Image(video, 0, 0, 600, 500);
}