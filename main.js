img="";
status="";
objects=[];

function preload(){
    img.loadImage('dog_cat.jpg');
    Audio.play('emergency-alarm-with-reverb-29431.mp3');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}

function draw(){
    image(video,0,0,380,380);

    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="status : object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are : "+objects.length;

            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width +15, objects[i].height+15);

            if(status="status : object detected"){
                document.getElementById("status").innerHTML="baby detected";
                Audio.pause('emergency-alarm-with-reverb-29431.mp3');
            }else{
                document.getElementById("status").innerHTML="baby not detected";
                Audio.play('emergency-alarm-with-reverb-29431.mp3');
            }
        }
    }

    if(array_length=0){
        document.getElementById("status").innerHTML="baby not detected";
        Audio.play('emergency-alarm-with-reverb-29431.mp3');
    }

    Fill("#FF0000");
    Text(dog,45,75);
    noFill();
    stroke("#FF0000");
    Rect(30,60,450,350);

    fill("#FF0000");
    Text("Cat",320,120);
    noFill();
    stroke("#FF0000");
    rect(300,90,270,320);
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}