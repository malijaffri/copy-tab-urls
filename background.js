function createdMenuItem(n) {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	}
}
const menuItem = {
	id: "copy_url",
	title: browser.i18n.getMessage("contextItemTitle"),
	contexts: ["tab"],
};
browser.contextMenus.create(menuItem, createdMenuItem);

function copyUrl(sender, tabs) {
	const urls = tabs.map((tab) => {
		return tab.url;
	});
	if (urls.length > 0) {
		urls_str = urls.join("\n");
		navigator.clipboard.writeText(urls_str);
	}
}

const tabsQuery = { currentWindow: true, highlighted: true };

browser.contextMenus.onClicked.addListener(function (info, sender) {
	const querying = browser.tabs.query(tabsQuery);
	querying.then(copyUrl.bind(null, sender));
});

// supports Tree Style Tab's fake context menu
// https://addons.mozilla.org/firefox/addon/tree-style-tab/
function registerToTST() {
	browser.runtime
		.sendMessage("treestyletab@piro.sakura.ne.jp", {
			type: "fake-contextMenu-create",
			params: menuItem,
		})
		.then(createdMenuItem, createdMenuItem);
}
browser.runtime.onMessageExternal.addListener((message, sender) => {
	switch (sender.id) {
		case "treestyletab@piro.sakura.ne.jp":
			switch (message.type) {
				case "ready":
					registerToTST();
					return;
				case "fake-contextMenu-click":
					browser.tabs
						.query(tabsQuery)
						.then((tabs) => copyUrl(message.tab, tabs));
					return;
			}
	}
});
registerToTST();
