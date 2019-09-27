
function update() {
	chrome.storage.local.get(["speed"], result => {
		let speed = Number.parseFloat(result.speed);
		if(isNaN(speed)) {
			speed = 1.8;
			chrome.storage.local.set({speed: speed}, ()=>{});
		}
		chrome.browserAction.setBadgeText({text: "x"+speed});

		chrome.contextMenus.update("showSettingsPane", {
			title: "Set playback speed (current: "+speed+")",
		}, ()=>{});
	})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "getSpeed") {
		chrome.storage.local.get(["speed"], result => {
			sendResponse({speed: Number.parseFloat(result.speed)});
		})
		return true;
	}
    else
		sendResponse({});
	return false;
});

chrome.browserAction.onClicked.addListener(function (tab) {
	try {
		chrome.tabs.executeScript(null, { file: "lib/inject.js" });
	}
	catch (e) {
		console.log("could not inject TurboButton")
	}
	return false;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
	update();
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// 	if(changeInfo.url) {
// 		// TODO: set badge color or something
// 	}
// })

chrome.contextMenus.onClicked.addListener((info, tab) => {
	chrome.windows.create({
		type: 'popup',
		width: 400,
		height: 500,
		url: "chrome/content/settings_inline.html"
	});
})

chrome.contextMenus.create({
	id: "showSettingsPane",
	title: "Set playback speed",
	contexts: ["browser_action"],
	parentId: null
})


update();
