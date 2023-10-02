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
