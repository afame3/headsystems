var Vue = require( 'joms' ).Vue;

module.exports = {

    /**
     * Add a message into a conversation.
     * @param {State} state
     * @param {Object} payload
     * @param {number} payload.id
     * @param {Object} payload.message
     */
    add: function( state, payload ) {
        var chatId = payload.id,
            message = payload.message,
            messageId = message.id;

        if ( ! state[ chatId ] ) {
            Vue.set( state, chatId, {} );
        }

        Vue.set( state[ chatId ], messageId, message );
    },

    /**
     * Update a message in a conversation.
     * @param {State} state
     * @param {Object} payload
     * @param {number} payload.id
     * @param {number} payload.messageId
     * @param {Object} payload.message
     */
    edit: function( state, payload ) {
        var chatId = payload.id,
            messageId = payload.messageId,
            message = payload.message,
            prevMessage;

        if ( state[ chatId ] ) {
            prevMessage = state[ chatId ][ messageId ];
            if ( prevMessage ) {
                message = _.extend({}, prevMessage, message );
                Vue.set( state[ chatId ], messageId, message );
            }
        }
    },

    /**
     * Delete a message from a conversation.
     * @param {State} state
     * @param {Object} payload
     * @param {number} payload.id
     * @param {number} payload.messageId
     */
    delete: function( state, payload ) {
        var chatId = payload.id,
            messageId = payload.messageId;

        if ( state[ chatId ] ) {
            delete state[ chatId ][ messageId ];
        }
    }

};
