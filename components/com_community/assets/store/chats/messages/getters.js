var moment = require( 'joms' ).moment;

function formatDate( timestamp ) {
    var now = moment(),
        date = moment( timestamp ),
        format = 'D MMM';

    if ( now.year() !== date.year() ) {
        format = 'D/MMM/YY';
    }

    return date.format( format );
}

function formatTime( timestamp ) {
    var time = moment( timestamp ),
        format = joms.getData( 'chat_time_format' ) || 'g:i A';

    // PHP-to-Moment time format conversion.
    format = format
        .replace( /[GH]/g, 'H' )
        .replace( /[gh]/g, 'h' )
        .replace( /i/ig, 'mm' )
        .replace( /s/ig, 'ss' );

    return formatDate( timestamp ) + ' ' + time.format( format );
}

module.exports = {

    /**
     * Get sorted messages of a conversation.
     * @param {Object} state
     * @param {Object} getters
     */
    sortedMessages: function( state, getters ) {
        return function( chatId ) {
            var sorted = [],
                keys;

            if ( state[ chatId ] ) {
                keys = _.chain( state[ chatId ] ).keys()
                    .sortBy(function( messageId ) { return +messageId })
                    .value();

                _.each( keys, function( messageId ) {
                    sorted.push( state[ chatId ][ messageId ] );
                });
            }

            return sorted;
        }
    },

    /**
     * Group messages of a conversation by date and participants.
     * @param {Object} state
     * @param {Object} getters
     */
    groupedMessages: function( state, getters ) {
        return function( chatId ) {
            var grouped = [],
                sorted, dateIndexPrev, userIndexPrev;

            if ( state[ chatId ] ) {
                sorted = getters.sortedMessages( chatId );
                _.each( sorted, function( message ) {
                    var date = new Date( message.created_at * 1000 ),
                        dateIndex = date.toJSON().slice( 0, 10 ).replace( /-/g, '' ),
                        userIndex = String( message.user_id ),
                        dateFormatted = formatDate( date.getTime() ),
                        timeFormatted = formatTime( date.getTime() ),
                        messages;

                    if ( dateIndex !== dateIndexPrev ) {
                        dateIndexPrev = dateIndex;
                        userIndexPrev = undefined;

                        grouped.push({
                            date: dateIndex,
                            dateFormatted: dateFormatted,
                            messages: []
                        });
                    }

                    messages = grouped[ grouped.length - 1 ].messages;
                    if ( message.action !== 'sent' ) {
                        userIndexPrev = undefined;
                        messages.push({
                            info: message.action,
                            messages: []
                        });
                    } else if ( userIndex !== userIndexPrev ) {
                        userIndexPrev = userIndex;
                        messages.push({
                            user: userIndex,
                            messages: []
                        });
                    }

                    messages = messages[ messages.length - 1 ].messages;
                    messages.push( _.extend({}, message, {
                        timeFormatted: timeFormatted
                    }) );
                });
            }

            return grouped;
        }
    },

    /**
     * Group oldest message ID of a conversation.
     * @param {Object} state
     * @param {Object} getters
     */
    oldestMessageID: function( state, getters ) {
        return function( chatId ) {
            var keys, key;

            if ( state[ chatId ] ) {
                keys = _.chain( state[ chatId ] ).keys()
                    .filter(function( messageId ) { return +messageId })
                    .sortBy(function( messageId ) { return +messageId })
                    .value();

                if ( keys.length ) {
                    key = keys[0];
                }
            }

            return key;
        }
    },

    /**
     * Group oldest message ID of a conversation.
     * @param {Object} state
     * @param {Object} getters
     */
    newestMessageID: function( state, getters ) {
        return function( chatId ) {
            var keys, key;

            if ( state[ chatId ] ) {
                keys = _.chain( state[ chatId ] ).keys()
                    .filter(function( messageId ) { return +messageId })
                    .sortBy(function( messageId ) { return +messageId })
                    .value();

                if ( keys.length ) {
                    key = keys[ keys.length - 1 ];
                }
            }

            return key;
        }
    }

};
