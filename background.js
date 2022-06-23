chrome.runtime.onInstalled.addListener(function (e) {
    chrome.storage.local.set({"status": 1}, null);
    chrome.storage.local.set({"keybinds": 1}, null);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "toggle_ext") {
        chrome.tabs.executeScript({
            file: "inject.js"
        });
        return;
    }

    if (request.type === 'enable_keybinds') {
        chrome.tabs.executeScript({
            code: "videoSpeedHubEnableKeybinds = true;"
        });
        return;
    }

    if (request.type === 'disable_keybinds') {
        chrome.tabs.executeScript({
            code: "videoSpeedHubEnableKeybinds = false;"
        });
        return;
    }
});