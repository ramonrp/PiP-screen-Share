//define elements

const pipButton = document.querySelector("#pipButton");
const video = document.querySelector("#video");


//Function to capture screen
async function startCapture(displayMediaOptions) {
    let captureStream = null;
    //capture display options
    const gdmOptions = {
        video: {
            cursor: "always"
        },
        audio: false
    }
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        video.srcObject = captureStream;
        video.play()
    } catch (err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

if ('pictureInPictureEnabled' in document) {
    pipButton.classList.remove('hidden')
    pipButton.disabled = false;

    pipButton.addEventListener('click', () => {
        video.requestPictureInPicture();
    });
}



function handlePictureInPicture() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture()
            .catch((error) => console.log(error));
    }
    else {
        video.requestPictureInPicture()
            .catch((error) => console.log(error));
    }
}

pipButton.addEventListener("click", handlePictureInPicture)
video.addEventListener("enterpictureinpicture", () => pipButton.innerText = "Stop")
video.addEventListener("leavepictureinpicture", () => pipButton.innerText = "Start")


//onLoad
startCapture();


