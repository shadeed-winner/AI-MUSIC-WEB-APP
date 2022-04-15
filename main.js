PS5 = "";
PS4 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status1 = "";
status2 = "";

function preload() {
    PS5 = loadSound("PS5.mp3");
    PS4 = loadSound("PS4.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(375, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[1].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    status1 = PS5.isPlaying();

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        PS4.stop();
        if(status1 == false) {
            PS5.play();
        } else {
            document.getElementById("song").innerHTML = "Song Name: PS5 MAIN MENU THEME";
        }
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        PS5.stop();
        if(status2 == false) {
            PS4.play();
        } else {
            document.getElementById("song").innerHTML = "Song Name: PS4 MAIN MENU THEME";
        }
    }
}