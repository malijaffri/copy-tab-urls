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

browser.contextMenus.onClicked.addListener(function (info, sender) {
	const querying = browser.tabs.query({ highlighted: true });
	querying.then(copyUrl.bind(null, sender));
});
