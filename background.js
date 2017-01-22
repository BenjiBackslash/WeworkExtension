chrome.browserAction.onContentLoaded.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: "content_script.js"});
  });