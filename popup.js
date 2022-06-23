$(function(){
    $.switcher();
});

chrome.storage.local.get("status", function(results) {
    if (results.status == 1) {
        enableExtension();
    } else {
        disableExtension();
    }
})

chrome.storage.local.get("keybinds", function(results) {
    if (results.keybinds == 1) {
        enableKeybinds();
    } else {
        disableKeybinds();
    }
})

$("#toggleSwitch").change(function() {
    chrome.storage.local.get("status", function(result) {
        if (result.status == 1) {
            chrome.storage.local.set({"status": 0}, null);
            disableExtension();
        } else {
            chrome.storage.local.set({"status": 1}, null);
            enableExtension();
        }
    });
    toggleExtension();
});

const toggleKeybindsElement = $("#toggleKeybinds");
toggleKeybindsElement.change(function() {
    chrome.storage.local.get("keybinds", function(results) {
        if (results.keybinds == 1) {
            chrome.storage.local.set({"keybinds": 0}, null);
            disableKeybinds();
        } else {
            chrome.storage.local.set({"keybinds": 1}, null);
            enableKeybinds();
        }
    });
});

// functions
function enableExtension() {
    $("#toggleSwitch").prop('checked', true);
    $(".disabled-content").css("display", "none");
    $(".cont").css("display", "block");
    $("#decor").css("display", "block");
}

function disableExtension() {
    $("#toggleSwitch").prop('checked', false);
    $(".disabled-content").css("display", "flex");
    $(".cont").css("display", "none");
    $("#decor").css("display", "none");
}

function toggleExtension() {
    chrome.runtime.sendMessage({type: "toggle_ext"}, function(response) {
        var error = chrome.runtime.lastError;
    });
}

// keybind functions
function enableKeybinds() {
    toggleKeybindsElement.prop('checked', true);
    $(".keybindInfo").css("display", "initial")
    chrome.runtime.sendMessage({type: "enable_keybinds"}, function() {});
}

function disableKeybinds() {
    toggleKeybindsElement.prop('checked', false);
    $(".keybindInfo").css("display", "none")
    chrome.runtime.sendMessage({type: "disable_keybinds"}, function() {});
}