// Set constraints for the video stream
var constraints = { video: { facingMode: { exact: "environment" } }, audio: false };

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    flashTrigger = document.querySelector("#flash--trigger")


let track = null;
let flashEnabled = false;

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    cameraOutput.classList.add("taken");
};

cameraOutput.onclick = function() {
  window.open(cameraOutput.src, '_blank');
};

flashTrigger.onclick = function() {
  if (track !== null) {
    flashEnabled = !flashEnabled;
    track.applyConstraints({
      advanced: [{torch: flashEnabled}]
    });
    flashTrigger.innerHTML = flashEnabled ? 'On' : 'Off';
  }
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);