//Make the TP draggable:
var tpPanel = document.getElementById("tpPanel")
var tpLabel = document.getElementById("tpLabel");
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

class boneInfo{
  constructor(num,axis){
    this.num = num;
    this.axis = axis;
  }
}
var bone0 = new boneInfo(1,"y");
var bone1 = new boneInfo(3,"x");
var bone2 = new boneInfo(4,"y");
var bone3 = new boneInfo(5,"y");
var bone4 = new boneInfo(6,"x");
var bone5 = new boneInfo(7,"y");

tpLabel.onmousedown = dragMouseDown;

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;

  //shutoff orbit controls, defined in main html
  controls.enabled = false;
}

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    tpPanel.style.top = (tpPanel.offsetTop - pos2) + "px";
    tpPanel.style.left = (tpPanel.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    //shutoff orbit controls, defined in main html
    controls.enabled = true;
  }

function tpUpdate(){
  document.getElementById("j1Text").value = skeleton.bones[bone0.num].rotation[bone0.axis] * 180/3.14 + "°";
  document.getElementById("j2Text").value = skeleton.bones[bone1.num].rotation[bone1.axis] * 180/3.14 + "°";
  document.getElementById("j3Text").value = skeleton.bones[bone2.num].rotation[bone2.axis] * 180/3.14 + "°";
  document.getElementById("j4Text").value = skeleton.bones[bone3.num].rotation[bone3.axis] * 180/3.14 + "°";
  document.getElementById("j5Text").value = skeleton.bones[bone4.num].rotation[bone4.axis] * 180/3.14 + "°";
  document.getElementById("j6Text").value = skeleton.bones[bone5.num].rotation[bone5.axis] * 180/3.14 + "°";
}

function jogClick(n){
  var readStep = document.getElementById("jogStepSize").value
  var step = readStep * 3.14/180;
  switch(n){
    case -1:
      var prev = skeleton.bones[bone0.num].rotation[bone0.axis];
      skeleton.bones[bone0.num].rotation[bone0.axis] = prev-step;
      break;
    case 1:
      var prev = skeleton.bones[bone0.num].rotation[bone0.axis];
      skeleton.bones[bone0.num].rotation[bone0.axis] = prev+step;
      break;
    case -2:
      var prev = skeleton.bones[bone1.num].rotation[bone1.axis];
      skeleton.bones[bone1.num].rotation[bone1.axis]= prev-step;
      break;
    case 2:
      var prev = skeleton.bones[bone1.num].rotation[bone1.axis];
      skeleton.bones[bone1.num].rotation[bone1.axis] = prev+step;
      break;
    case -3:
      var prev = skeleton.bones[bone2.num].rotation[bone2.axis];
      skeleton.bones[bone2.num].rotation[bone2.axis] = prev-step;
      break;
    case 3:
      var prev = skeleton.bones[bone2.num].rotation[bone2.axis];
      skeleton.bones[bone2.num].rotation[bone2.axis] = prev+step;
      break;
    case -4:
      var prev = skeleton.bones[bone3.num].rotation[bone3.axis];
      skeleton.bones[bone3.num].rotation[bone3.axis] = prev-step;
      break;
    case 4:
      var prev = skeleton.bones[bone3.num].rotation[bone3.axis];
      skeleton.bones[bone3.num].rotation[bone3.axis] = prev+step;
      break;
    case -5:
      var prev = skeleton.bones[bone4.num].rotation[bone4.axis];
      skeleton.bones[bone4.num].rotation[bone4.axis] = prev-step;
      break;
    case 5:
      var prev = skeleton.bones[bone4.num].rotation[bone4.axis];
      skeleton.bones[bone4.num].rotation[bone4.axis] = prev+step;
      break;
    case -6:
    var prev = skeleton.bones[bone5.num].rotation[bone5.axis];
      skeleton.bones[bone5.num].rotation[bone5.axis] = prev-step;
      break;
    case 6:
      var prev = skeleton.bones[bone5.num].rotation[bone5.axis];
      skeleton.bones[bone5.num].rotation[bone5.axis] = prev+step;
      break;
    default:
  }
  tpUpdate();
}

function recordPoint(){
    //create text boxes for recorded values
    var j1Text = document.createElement("input");
    j1Text.type = "text"
    j1Text.classList.add("stepJText");

    var j2Text = j1Text.cloneNode(true);
    var j3Text = j1Text.cloneNode(true);
    var j4Text = j1Text.cloneNode(true);
    var j5Text = j1Text.cloneNode(true);
    var j6Text = j1Text.cloneNode(true);

    //take 6 digits and remove degree symbols
    j1Text.value = document.getElementById('j1Text').value.substring(0,6).replace(/°/g,"");
    j2Text.value = document.getElementById('j2Text').value.substring(0,6).replace(/°/g,"");
    j3Text.value = document.getElementById('j3Text').value.substring(0,6).replace(/°/g,"");
    j5Text.value = document.getElementById('j5Text').value.substring(0,6).replace(/°/g,"");
    j4Text.value = document.getElementById('j4Text').value.substring(0,6).replace(/°/g,"");
    j6Text.value = document.getElementById('j6Text').value.substring(0,6).replace(/°/g,"");

    //setup test move button
    var moveButton = document.createElement("BUTTON");
    moveButton.innerHTML = "Test";
    moveButton.addEventListener("click",testPoint);
    moveButton.classList.add("stepButton");
    //setup delete button
    var deleteButton = document.createElement("BUTTON");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click",deletePoint);
    deleteButton.classList.add("stepButton");

    var ol = document.getElementById("stepList");
    var li = document.createElement("li");

    //add step info to program box
    li.appendChild(j1Text);
    li.appendChild(j2Text);
    li.appendChild(j3Text);
    li.appendChild(j4Text);
    li.appendChild(j5Text);
    li.appendChild(j6Text);
    li.appendChild(moveButton);
    li.appendChild(deleteButton);
    ol.appendChild(li);
}

function testPoint(){
  var angles = this.parentNode.childNodes;

  skeleton.bones[bone0.num].rotation[bone0.axis] = parseFloat(angles[0].value)*3.14/180;
  skeleton.bones[bone1.num].rotation[bone1.axis] = parseFloat(angles[1].value)*3.14/180;
  skeleton.bones[bone2.num].rotation[bone2.axis] = parseFloat(angles[2].value)*3.14/180;
  skeleton.bones[bone3.num].rotation[bone3.axis] = parseFloat(angles[3].value)*3.14/180;
  skeleton.bones[bone4.num].rotation[bone4.axis] = parseFloat(angles[4].value)*3.14/180;
  skeleton.bones[bone5.num].rotation[bone5.axis] = parseFloat(angles[5].value)*3.14/180;

  tpUpdate();
}

function deletePoint(){
  var list = document.getElementById("stepList");
  list.removeChild(this.parentNode);
}

var programRunning
var tempGlob;

function runProgram(){
  var children = document.getElementById("stepList").childNodes;
  //check there is atleast one step
  if (children.length == 1){
     alert("Cannot Run: There are No Program Steps!\n Press \"Record Position\" to add steps");
     return
   }

   runAnimate(children); //run first so no initial delay
   programRunning = setInterval(runAnimate,100,children);  //run on loop
}

function runAnimate(program){
  //make static var curStep to keep track of which program step we are on
  if (typeof runAnimate.curStep == 'undefined'){
    runAnimate.curStep = 1;
  }
  //end interval when final step has been run
  if (runAnimate.curStep == program.length){
    clearInterval(programRunning);
    runAnimate.curStep = 1;
    delete runAnimate.jointStepSize;  //reset for next time
    return;
  }
  //load final joint values
  var angles = program[runAnimate.curStep].childNodes;

  //get current and final joint values
  curVal = [skeleton.bones[bone0.num].rotation[bone0.axis],skeleton.bones[bone1.num].rotation[bone1.axis],skeleton.bones[bone2.num].rotation[bone2.axis],skeleton.bones[bone3.num].rotation[bone3.axis],skeleton.bones[bone4.num].rotation[bone4.axis],skeleton.bones[bone5.num].rotation[bone5.axis]];
  var finalVal = [parseFloat(angles[0].value)*3.14/180,parseFloat(angles[1].value)*3.14/180,parseFloat(angles[2].value)*3.14/180,parseFloat(angles[3].value)*3.14/180,parseFloat(angles[4].value)*3.14/180,parseFloat(angles[5].value)*3.14/180];

  //get step size for each joint to allow for smooth motion
  stepSize = .03;
  if (typeof runAnimate.jointStepSize == 'undefined'){
      runAnimate.jointStepSize = [0,0,0,0,0,0];
      console.log("working");
      //find the joint that is moving the maximum distance
      maxDist = 0;
      for (var i = 0; i < 6; i++){
        tdist = Math.abs(finalVal[i]-curVal[i]);
        if (tdist > maxDist) maxDist = tdist;
      }

      //set each joint to be the stepsize*ratio to the largest step size
      for (var i = 0; i < 6; i++){
        runAnimate.jointStepSize[i] = (Math.abs(finalVal[i]-curVal[i])/maxDist) * stepSize
      }
  }

  //update J1-J6 to new values
  for ( var i = 0; i < 6; i++){
    boneMover(curVal[i],finalVal[i],runAnimate.jointStepSize[i]);
    curVal[i] = tempGlob;
  }

  //set bones to new values
  setAllJointRads(curVal);

  //check if final position has been reached
  var checkVals = true;
  for (var i = 0;i<6;i++){
    if (curVal[i] != finalVal[i]) checkVals = false;
  }

  if (checkVals) runAnimate.curStep++;  //increment program step if values are reached
  /*
  skeleton.bones[1].rotation.y = parseFloat(angles[0].value)*3.14/180;
  skeleton.bones[2].rotation.x = parseFloat(angles[1].value)*3.14/180;
  skeleton.bones[3].rotation.x = parseFloat(angles[2].value)*3.14/180;
  skeleton.bones[4].rotation.y = parseFloat(angles[3].value)*3.14/180;
  skeleton.bones[5].rotation.x = parseFloat(angles[4].value)*3.14/180;
  skeleton.bones[6].rotation.y = parseFloat(angles[5].value)*3.14/180;

  runAnimate.curStep++; //increment program step
  */
}

function boneMover(curVal,finalVal,step){
  if (curVal < finalVal){
    curVal += step;
    if (curVal > finalVal) curVal = finalVal; //check overshoot
  }
  else if (curVal > finalVal){
    curVal += -stepSize;
    if (curVal < finalVal) curVal = finalVal; //check overshoot
  }

  tempGlob = curVal;
}

function setAllJointAngles(angles){
  skeleton.bones[bone0.num].rotation[bone0.axis] = angles[0]*3.14/180;
  skeleton.bones[bone1.num].rotation[bone1.axis] = angles[1]*3.14/180;
  skeleton.bones[bone2.num].rotation[bone2.axis] = angles[2]*3.14/180;
  skeleton.bones[bone3.num].rotation[bone3.axis] = angles[3]*3.14/180;
  skeleton.bones[bone4.num].rotation[bone4.axis] = angles[4]*3.14/180;
  skeleton.bones[bone5.num].rotation[bone5.axis] = angles[5]*3.14/180;
}

function setAllJointRads(rads){
  skeleton.bones[bone0.num].rotation[bone0.axis] = rads[0];
  skeleton.bones[bone1.num].rotation[bone1.axis] = rads[1];
  skeleton.bones[bone2.num].rotation[bone2.axis] = rads[2];
  skeleton.bones[bone3.num].rotation[bone3.axis] = rads[3];
  skeleton.bones[bone4.num].rotation[bone4.axis] = rads[4];
  skeleton.bones[bone5.num].rotation[bone5.axis] = rads[5];
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
