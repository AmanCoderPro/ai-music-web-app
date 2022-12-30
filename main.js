song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rigihtWristY = 0;
scoreleftWrist = 0;
songstatus = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound('Ishowspeed-World-Cup.mp3');
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialised");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#1B78EE");
    stroke("#1B78EE");

    songstatus = song1.isPlaying();

    if(scoreleftWrist > 0.2) {
        
        circle(leftWristX, leftWristY, 20);

        InNumberleftWristY = Number(leftWristY);
        song2.stop();
        song1.isPlaying(true);
    }

    if(songstatus == false) {
        song1.isPlaying(true);
        document.getElementById("song").innerHTML ="Song = " + "Harry Potter";
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }


}