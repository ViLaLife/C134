img="";
status ="";
objects=[];
function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup() {
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="detecting objects";
}

function draw() { 
    image(video, 0, 0, 400, 400);

    if(status !="") {
        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video, gotResult);
        for(i=0, i<objects.length; i++){
            document.getElementById("status").innerHTML="objects detected";

            document.getElementById("numofobjects").innerHTML="number of objects are  "+ objects.length;
            fill(r, g, b);
            accu=floor(objects[i].confidence*100);
    text(objects[i].label+" "+accu+"%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke(r, g, b);
    rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);

        }
    }
    

}

function modelLoaded(){
    console.log("Model Loaded");
    status:true;
}

function gotResult(error, results){
if(error){
    console.error(error);
}
else {
    console.log(results);
    objects = results;
}


}