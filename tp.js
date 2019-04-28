//Make the TP draggable:
var tpPanel = document.getElementById("tpPanel")
var tpLabel = document.getElementById("tpLabel");

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

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
  document.getElementById("j1Text").value = skeleton.bones[1].rotation.y * 180/3.14 + "°";
  document.getElementById("j2Text").value = skeleton.bones[2].rotation.x * 180/3.14 + "°";
  document.getElementById("j3Text").value = skeleton.bones[3].rotation.x * 180/3.14 + "°";
  document.getElementById("j4Text").value = skeleton.bones[4].rotation.y * 180/3.14 + "°";
  document.getElementById("j5Text").value = skeleton.bones[5].rotation.x * 180/3.14 + "°";
  document.getElementById("j6Text").value = skeleton.bones[6].rotation.y * 180/3.14 + "°";
}

function jogClick(n){
  var readStep = document.getElementById("jogStepSize").value
  var step = readStep * 3.14/180;
  switch(n){
    case -1:
      var prev = skeleton.bones[1].rotation.y;
      skeleton.bones[1].rotation.y = prev-step;
      break;
    case 1:
      var prev = skeleton.bones[1].rotation.y;
      skeleton.bones[1].rotation.y = prev+step;
      break;
    case -2:
      var prev = skeleton.bones[2].rotation.x;
      skeleton.bones[2].rotation.x = prev-step;
      break;
    case 2:
      var prev = skeleton.bones[2].rotation.x;
      skeleton.bones[2].rotation.x = prev+step;
      break;
    case -3:
      var prev = skeleton.bones[3].rotation.x;
      skeleton.bones[3].rotation.x = prev-step;
      break;
    case 3:
      var prev = skeleton.bones[3].rotation.x;
      skeleton.bones[3].rotation.x = prev+step;
      break;
    case -4:
      var prev = skeleton.bones[4].rotation.y;
      skeleton.bones[4].rotation.y = prev-step;
      break;
    case 4:
      var prev = skeleton.bones[4].rotation.y;
      skeleton.bones[4].rotation.y = prev+step;
      break;
    case -5:
      var prev = skeleton.bones[5].rotation.x;
      skeleton.bones[5].rotation.x = prev-step;
      break;
    case 5:
      var prev = skeleton.bones[5].rotation.x;
      skeleton.bones[5].rotation.x = prev+step;
      break;
    case -6:
    var prev = skeleton.bones[6].rotation.y;
      skeleton.bones[6].rotation.y = prev-step;
      break;
    case 6:
      var prev = skeleton.bones[6].rotation.y;
      skeleton.bones[6].rotation.y = prev+step;
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
    //li.appendChild(document.createTextNode(recString));
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

  skeleton.bones[1].rotation.y = parseFloat(angles[0].value)*3.14/180;
  skeleton.bones[2].rotation.x = parseFloat(angles[1].value)*3.14/180;
  skeleton.bones[3].rotation.x = parseFloat(angles[2].value)*3.14/180;
  skeleton.bones[4].rotation.y = parseFloat(angles[3].value)*3.14/180;
  skeleton.bones[5].rotation.x = parseFloat(angles[4].value)*3.14/180;
  skeleton.bones[6].rotation.y = parseFloat(angles[5].value)*3.14/180;

  tpUpdate();
}

function deletePoint(){
  var list = document.getElementById("stepList");
  list.removeChild(this.parentNode);
}

function runProgram(){
  var children = document.getElementById("stepList").childNodes;
  //check there is atleast one step
  if (children.length == 1){
     alert("Cannot Run: There are No Program Steps!\n Press \"Record Position\" to add steps");
     return
   }



}
