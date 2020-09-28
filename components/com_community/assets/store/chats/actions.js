function formatName( names ) {
    if ( ! _.isArray( names ) ) {
        names = [ names ];
    }

    if ( names.length === 1 ) {
        names = names[0];
    } else if ( names.length > 1 ) {
        names = _.map( names, function( str, span ) {
            // Remove badge on group conversations.
            if ( str.indexOf( '<' ) >= 0 ) {
                span = document.createElement( 'span' );
                span.innerHTML = str;
                str = span.innerText;
            }

            str = str.split( ' ' );
            return str[0];
        });
        names = names.sort();
        names = names.join( ', ' );
        names = names.replace( /,\s([^\s]*)$/, ' and $1' );
    } else {
        names = '';
    }

    return names;
}

module.exports = {

    /**
     * Fetch conversation list.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     */
    fetch: function( context ) {
        var that = this,
            page = this.page || 1,
            empty = true;

        return jQuery.Deferred(function( defer ) {
            joms.ajax({
                func: 'chat,ajaxInitializeChatData',
                data: [ 0, page ],
                callback: function( json ) {
                    _.each( json.buddies, function( item ) {
                        context.commit( 'users/add', { data: item }, { root: true });
                    });

                    _.each( json.list, function( item ) {
                        item.id = String( item.chat_id );
                        item.name = formatName( item.name );
                        delete item.chat_id;

                        context.commit( 'add', item );
                        empty = false;
                    });

                    if ( ! empty ) {
                        that.page = page + 1;
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }
            });
        });
    },

    /**
     * Check updates on conversation state.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @return {jQuery.Deferred}
     */
    check: function( context ) {
        var opened = _.map( context.getters[ 'opened' ], function( item ) {
            return item.id;
        });

        return context.dispatch( 'messages/check', { ids: opened });
    },

    /**
     * Open a conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {number} id
     */
    open: function( context, id ) {
        context.commit( 'open', id );
    },

    /**
     * Close a conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {number} id
     */
    close: function( context, id ) {
        context.commit( 'close', id );
    },

    /**
     * Toggle a conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {number} id
     */
    toggle: function( context, id ) {
        context.commit( 'toggle', id );
    },

    /**
     * Leave a conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {number} id
     */
    leave: function( context, id ) {
        // Optimistic update.
        context.commit( 'delete', id );
        joms.ajax({ func: 'chat,ajaxLeaveChat', data: [ id ] });
    },

    /**
     * Add users to the conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {Object} payload
     * @param {number} payload.id
     * @param {number[]} payload.users
     */
    addUsers: function( context, payload ) {
        var id = payload.id,
            users = payload.users;

        users = _.map( users, String );
        users = JSON.stringify( users );
        joms.ajax({
            func: 'chat,ajaxAddPeople',
            data: [ id, users ],
            callback: function() {
                joms.ajax({
                    func: 'chat,ajaxGetChatList',
                    data: [ JSON.stringify([ id ]) ],
                    callback: function( json ) {
                        // Normalize.
                        _.each( json.list, function( item ) {
                            item.id = String( item.chat_id );
                            item.name = formatName( item.name );
                            delete item.chat_id;

                            // Update current chat list.
                            context.commit( 'update', { id: item.id, chat: item });
                        });
                    }
                });
            }
        });
    },

    /**
     * Mute conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {Object} payload
     * @param {number} payload.id
     */
    mute: function( context, payload ) {
        var id = payload.id;

        context.commit( 'mute', id );
        joms.ajax({ func: 'chat,ajaxMuteChat', data: [ id, 1 ] });
    },

    /**
     * Unmute conversation.
     * @param {Object} context
     * @param {Function} context.commit
     * @param {Object} context.state
     * @param {Object} payload
     * @param {number} payload.id
     */
    unmute: function( context, payload ) {
        var id = payload.id;

        context.commit( 'unmute', id );
        joms.ajax({ func: 'chat,ajaxMuteChat', data: [ id, 0 ] });
    }

};
