document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("url");
    const formatSelect = document.getElementById("format");
    const downloadButton = document.getElementById("download");

    // Automatically fill the URL input with the current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        urlInput.value = tabs[0].url;
    });

    downloadButton.addEventListener("click", function () {
        const url = urlInput.value;
        const format = formatSelect.value;
        if (url) {
            chrome.runtime.sendMessage({
                action: "download",
                url: url,
                format: format,
            });
        } else {
            alert("Please enter a valid URL");
        }
    });
});
