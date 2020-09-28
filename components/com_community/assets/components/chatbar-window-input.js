var Vue = require( 'joms' ).Vue,
    user_id = String( window.joms_my_id || '' ),
    settings = window.joms_plg_jomsocialchatbar || {},
    templates = settings.templates || {};

module.exports = Vue.component( 'chatbar-window-input', {
    template: templates.chatbar_window_input,
    props: [ 'chat' ],
    methods: {
        submit: function( event ) {
            var input = event.target,
                timestamp = ( new Date ).getTime(),
                message;

            message = {
                chat_id: this.chat.id,
                user_id: user_id,
                action: 'sent',
                content: input.value,
                attachment: JSON.stringify({}),
                params: JSON.stringify({ attachment: {} }),
                created_at: Math.floor( timestamp / 1000 )
            };

            input.value = '';
            this.$store.dispatch( 'chats/messages/submit', {
                id: this.chat.id,
                message: message
            });
        },
        attachFile: function() {
            alert( 'attaching file...' );
        },
        attachImage: function() {
            alert( 'attaching image...' );
        }
    }
});
