chrome.action.onClicked.addListener((tab) => {
    let newUrl = 'https://cobalt.tools/?u=' + encodeURIComponent(tab.url);
    chrome.tabs.create({ url: newUrl });
});
