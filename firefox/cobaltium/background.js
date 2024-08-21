// Replace chrome API calls with browser API calls
browser.browserAction.onClicked.addListener((tab) => {
    let newUrl = "https://cobalt.tools/?u=" + encodeURIComponent(tab.url);
    browser.tabs.create({ url: newUrl });
});

// Функција која ће променити број на иконици
function updateBadge(number) {
    browser.browserAction.setBadgeText({ text: number.toString() });
    browser.browserAction.setBadgeBackgroundColor({ color: "#ff0000" }); // Боја позадине броја
}

// Функција која ће очистити број на иконици
function clearBadge() {
    browser.browserAction.setBadgeText({ text: "" });
}

// Провери URL и ажурирај број или очисти иконицу
function checkTab(tabId) {
    browser.tabs.get(tabId).then((tab) => {
        const url = new URL(tab.url);
        const patterns = [
            "*://*.bilibili.com/video/*",
            "*://*.instagram.com/p/*",
            "*://*.instagram.com/reels/*",
            "*://*.instagram.com/reel/*",
            "*://*.twitter.com/*/status/*",
            "*://*.twitter.com/*/status/*/video/*",
            "*://*.twitter.com/i/spaces/*",
            "*://*.x.com/*/status/*",
            "*://*.x.com/*/status/*/video/*",
            "*://*.x.com/i/spaces/*",
            "*://*.reddit.com/r/*/comments/*/*",
            "*://*.soundcloud.com/*",
            "*://*.soundcloud.app.goo.gl/*",
            "*://*.tumblr.com/post/*",
            "*://*.tumblr.com/*/*",
            "*://*.tumblr.com/*/*/*",
            "*://*.tumblr.com/blog/view/*/*",
            "*://*.tiktok.com/*",
            "*://*.vimeo.com/*",
            "*://*.youtube.com/watch?*",
            "*://*.youtu.be/*",
            "*://*.youtube.com/shorts/*",
            "*://*.vk.com/video*",
            "*://*.vk.com/*?w=wall*",
            "*://*.vk.com/clip*",
            "*://*.vine.co/*",
            "*://*.streamable.com/*",
            "*://*.pinterest.com/pin/*",
        ];

        const isMatching = patterns.some((pattern) => {
            const regex = new RegExp(pattern.replace(/\*/g, ".*"));
            return regex.test(url.href);
        });

        if (isMatching) {
            updateBadge("1"); // Поставите број који желите да прикажете
        } else {
            clearBadge();
        }
    });
}

// Проверите активни таб
browser.tabs.onActivated.addListener((activeInfo) => {
    checkTab(activeInfo.tabId);
});

// Проверите табове који су обновљени
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        checkTab(tabId);
    }
});