// 白黒
document.getElementById("grayscale_button").addEventListener('click', async () => {
    const checkbox = document.getElementById("grayscale_button");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (checkbox.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: grayscaleImg,
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: unGrayscaleImg,
        });
    }
});
function grayscaleImg() {
    document.querySelectorAll('*').forEach((element) => {
        element.style.filter = "grayscale(100%)";
    });
}
function unGrayscaleImg() {
    document.querySelectorAll('*').forEach((element) => {
        element.style.filter = "";
    });
}

// 背景
const background_buttons = document.querySelectorAll('input[name="background"]');
background_buttons.forEach(background_button => {
    background_button.addEventListener('change', async () => {
        const checkbox = document.getElementById("grayscale_button");
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setBackgroundColor,
            args: [background_button.value, checkbox.checked]
        });
    });
});
function setBackgroundColor(color, grayscale) {
    document.querySelectorAll('*').forEach((element) => {
        element.style.backgroundColor = color;
        if (grayscale) {
            element.style.filter = "grayscale(100%)";
        }
    });
}

// 前景
const foreground_buttons = document.querySelectorAll('input[name="foreground"]');
foreground_buttons.forEach(foreground_button => {
    foreground_button.addEventListener('change', async () => {
        const checkbox = document.getElementById("grayscale_button");
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setForegroundColor,
            args: [foreground_button.value, checkbox.checked]
        });
    });
});
function setForegroundColor(color, grayscale) {
    if (color == '') {
        const overlay = document.querySelector('.egipicker-overlay');
        if (overlay) {
            overlay.remove();
        }
    } else {
        const old_overlay = document.querySelector('.egipicker-overlay');
        if (old_overlay) {
            old_overlay.remove();
        }
        const overlay = document.createElement('div');
        overlay.classList.add('egipicker-overlay');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = color;
        overlay.style.opacity = '0.5';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '9999';
        if (grayscale) {
            overlay.style.filter = "grayscale(100%)";
        }
        document.body.appendChild(overlay);
    }
}
