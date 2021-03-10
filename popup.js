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
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({ thisTitle: tabs[0].title, thisUrl: tabs[0].url });
  });
}

function getWeb() {
  chrome.storage.sync.get(null, function (items) {
    linkCont.innerHTML = "";

    for (key in items) {
      const newEle = document.createElement("a");
      newEle.textContent = key;
      newEle.href = items[key];
      newEle.target = "_blank";
      linkCont.appendChild(newEle);
      const sepEle = document.createElement('p');
      sepEle.textContent = "----------";
      linkCont.appendChild(sepEle);
    }
  });
}

function clearEntries() {
  chrome.storage.sync.clear(() => getWeb());
}
