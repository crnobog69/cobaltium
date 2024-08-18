chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "download") {
        downloadWithCobalt(request.url, request.format);
    }
});

function downloadWithCobalt(url, format) {
    fetch("https://api.cobalt.tools/api/json", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: url,
            vQuality: "720",
            aFormat: format,
            isAudioOnly: format === "mp3",
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success" || data.status === "stream") {
                chrome.downloads.download({
                    url: data.url,
                    filename: `cobalt_download.${format}`,
                });
            } else {
                console.error("Cobalt API error:", data.text);
                alert("Error: " + data.text);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
}
