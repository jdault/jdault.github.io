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
}
