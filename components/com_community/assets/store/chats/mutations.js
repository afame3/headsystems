var Vue = require( 'joms' ).Vue,
    localStorage = require( 'joms' ).storage,
    CHATSTATE_MAXIMIZED = 1,
    CHATSTATE_MINIMIZED = 2,
    CHATSTATE_CLOSED = 0;

module.exports = {

    /**
     * Add a new chat.
     * @param {State} state
     * @param {Object} chat
     */
    add: function( state, chat ) {
        var chatbarState = localStorage.get( 'chatbar' ) || {},
            chatState = chatbarState && chatbarState.windows || {};

        // Get state from the local storage.
        _.extend( chat, chatState[ chat.id ] || {} );

        Vue.set( state.info, chat.id, chat );
    },

    /**
     * Update an existing chat.
     * @param {State} state
     * @param {Object} payload
     */
    update: function( state, payload ) {
        var id = payload.id,
            chat = payload.chat,
            prevChat = state.info[ id ];

        chat = _.extend({}, prevChat || {}, chat );
        Vue.set( state.info, id, chat );
    },

    /**
     * Remove an existing chat.
     * @param {State} state
     * @param {number} id
     */
    delete: function( state, id ) {
        if ( state.info[ id ] ) {
            Vue.delete( state.info, id );
        }
    },

    /**
     * Open a chat.
     * @param {State} state
     * @param {number} id
     */
    open: function( state, id ) {
        var info = state.info[ id ],
            chatbarState,
            chatState;

        if ( info ) {
            Vue.set( info, 'open', CHATSTATE_MAXIMIZED );

            // Update state in the local storage.
            chatbarState = localStorage.get( 'chatbar' ) || {};
            chatState = chatbarState.windows || (chatbarState.windows = {});
            chatState[ id ] = chatState[ id ] || (chatState[ id ] = {});
            chatState[ id ].open = CHATSTATE_MAXIMIZED;
            localStorage.set( 'chatbar', chatbarState );
        }
    },

    /**
     * Close a chat.
     * @param {State} state
     * @param {number} id
     */
    close: function( state, id ) {
        var info = state.info[ id ],
            chatbarState,
            chatState;

        if ( info ) {
            Vue.set( info, 'open', CHATSTATE_CLOSED );

            // Update state in the local storage.
            chatbarState = localStorage.get( 'chatbar' ) || {};
            chatState = chatbarState.windows || (chatbarState.windows = {});
            chatState[ id ] = chatState[ id ] || (chatState[ id ] = {});
            chatState[ id ].open = CHATSTATE_CLOSED;
            localStorage.set( 'chatbar', chatbarState );
        }
    },

    /**
     * Toggle a chat.
     * @param {State} state
     * @param {number} id
     */
    toggle: function( state, id ) {
        var info = state.info[ id ],
            chatbarState,
            chatState,
            openedState;

        if ( info ) {
            openedState = info.open === CHATSTATE_MINIMIZED
                ? CHATSTATE_MAXIMIZED : CHATSTATE_MINIMIZED;

            Vue.set( info, 'open', openedState );

            // Update state in the local storage.
            chatbarState = localStorage.get( 'chatbar' ) || {};
            chatState = chatbarState.windows || (chatbarState.windows = {});
            chatState[ id ] = chatState[ id ] || (chatState[ id ] = {});
            chatState[ id ].open = openedState;
            localStorage.set( 'chatbar', chatbarState );
        }
    },

    /**
     * Mute a chat.
     * @param {State} state
     * @param {number} id
     */
    mute: function( state, id ) {
        var info = state.info[ id ];
        if ( info ) {
            Vue.set( info, 'mute', 1 );
        }
    },

    /**
     * Unmute a chat.
     * @param {State} state
     * @param {number} id
     */
    unmute: function( state, id ) {
        var info = state.info[ id ];
        if ( info ) {
            Vue.set( info, 'mute', 0 );
        }
    }

};
