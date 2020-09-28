let Vue = require( 'joms' ).Vue,
	localStore = require( 'joms' ).storage,
    settings = window.joms_plg_jomsocialchatbar || {},
    configs = settings.configs || {},
    templates = settings.templates || {};

module.exports = Vue.component('chatbar-window-seen', {
	template: templates.chatbar_window_seen
});