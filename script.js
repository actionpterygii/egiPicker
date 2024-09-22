document.getElementById("grayscale_button").addEventListener('click', async () => {
    const checkbox = document.getElementById("grayscale_button");
    console.log(checkbox.checked);
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (checkbox.checked) {
        console.log(1);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: grayscaleImg,
        });
    } else {
        console.log(2);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: unGrayscaleImg,
        });
    }
});

function grayscaleImg() {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.filter = "grayscale(100%)";
    }
    const videos = document.getElementsByTagName("video");
    for (let i = 0; i < videos.length; i++) {
        images[i].style.filter = "grayscale(100%)";
    }
}
function unGrayscaleImg() {
    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.filter = "";
    }
}
