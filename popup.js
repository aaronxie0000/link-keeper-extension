//On Click, tell Content.js to get the tab URL
//On Refresh button click, refetch from storage

document.querySelector(".add").addEventListener("click", addWeb);
document.querySelector(".fetch").addEventListener("click", getWeb);
document.querySelector(".clear").addEventListener("click", clearEntries);
const linkCont = document.querySelector(".links");

window.onload = function () {
  getWeb();
};

function addWeb() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const port = chrome.tabs.connect({
      tabId: tabs[0].id,
      connectInfo: { name: "toContent" },
    });

    port.postMessage({ thisTitle: tabs[0].title, thisUrl: tabs[0].url });
    getWeb()

  });
}

function getWeb() {
  chrome.storage.sync.get(null, function (items) {
    linkCont.innerHTML = "";

    for (key in items) {
      const newEle = document.createElement("a");
      newEle.textContent = key;
      newEle.href = items[key];
      linkCont.appendChild(newEle);
    }
  });
}

function clearEntries() {
  chrome.storage.sync.clear(() => getWeb());
}
