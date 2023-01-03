song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scorerightWrist = 0;
scoreleftWrist = 0;
song1status = "";
song2status = "";

function play() {
    song1.setVolume(1);
    song1.rate(1);
    song1.play();
    song2.setVolume(1);
    song2.rate(1);
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound('Ishowspeed-World-Cup.mp3');
}

function modelLoaded() {
    console.log("PoseNet is initialised");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#1B78EE");
    stroke("#1B78EE");

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

        if(scorerightWrist > 0.2) {
            circle(rightWristX, rightWristY, 20);
            song1.stop();
        }

        if(song2status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song = Harry Potter";
        }

    if(scoreleftWrist > 0.2) {
        
        circle(leftWristX, leftWristY, 20);

        InNumberleftWristY = Number(leftWristY);
        song2.stop();
    }

    if(song1status == false) {
        song1.play();
        document.getElementById("song_name").innerHTML ="Song = World Cup";
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }


}