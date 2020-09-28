var Vue = require( 'joms' ).Vue,
    localStore = require( 'joms' ).storage,
    settings = window.joms_plg_jomsocialchatbar || {},
    configs = settings.configs || {},
    templates = settings.templates || {};

module.exports = Vue.component( 'chatbar-sidebar', {
    template: templates.chatbar_sidebar,
    data: function() {
        var data = { expanded: true },
            state;

        if ( +configs.remember_last_state ) {
            state = localStore.get( 'chatbar' ) || {};
            _.extend( data, state.sidebar || {} );
        }

        return data;
    },
    computed: {
        chats: function() {
            return this.$store.state.chats.info;
        }
    },
    methods: {
        open: function( id ) {
            this.$store.dispatch( 'chats/open', id );
        },
        toggle: function() {
            var config = localStore.get( 'chatbar' ) || {},
                configSidebar = config.sidebar || {};

            this.expanded = ! this.expanded;
            _.extend( configSidebar, { expanded: this.expanded });
            _.extend( config, { sidebar: configSidebar });

            localStore.set( 'chatbar', config );
        }
    }
});
