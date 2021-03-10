//when passed url from content.js add it to storage

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    const { title, url } = message;
    chrome.storage.sync.set({ [title]: url });

    return true;
  });
});
