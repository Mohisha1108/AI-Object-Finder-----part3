var status = '';
var objects = [];
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object is detecting";
    input_value = document.getElementById("object").value;
}
function modelLoaded(){
    console.log("model is loaded");
    status = true;
}
function draw(){
    image(video,0,0,400,400);
    objectdetector.detect(video,gotResults);
    r = random (255);
    g = random (255);
    b = random (255);
    if (status!= ''){
        for (i = 0;i<objects.length;i++){
            percentage = floor(objects[i].confidence * 100)
            fill(r,g,b)
            stroke(r,g,b)
            noFill();
            text(objects[i].label+percentage+"%",objects[i].x,objects[i].y)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            document.getElementById("object_status").innerHTML = input_value + " Not Found";
            video.play()
            if (objects[i].label == input_value){
                video.stop()
                objectDetector.detect(gotresults);
                document.getElementById("status").innerHTML = "Status: Objects detected";
                document.getElementById("object_status").innerHTML = input_value + " Found";
                speachSynthesis = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input_value + " Found")
                speechSynthesis.speak(utterThis);
            }
        }
    }
}
function gotresults(error,result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}