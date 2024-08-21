console.log("Content script is running on:", window.location.href);

function checkAndUpdateBadge() {
    let numberToShow = "1"; // Поставите број који желите да прикажете

    // Пошаљите поруку позадинској страници да се постави број на иконицу
    chrome.runtime.sendMessage({ action: "updateBadge", number: numberToShow });
}

// Позовите функцију при учитавању странице
checkAndUpdateBadge();
