//When told to get URL, get it and send it off to background.js

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    thisTitle = message.thisTitle;
    thisUrl = message.thisUrl;

    const port = chrome.runtime.connect({ name: "toBackground" });

    port.postMessage({ title: thisTitle, url: thisUrl });
    return true;
  });
});
