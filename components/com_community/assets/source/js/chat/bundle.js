(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function( $ ) {

    var Chat = require( './chat' ),
        chat = new Chat();

})( jQuery );

},{"./chat":2}],2:[function(require,module,exports){
(function( global, $ ) {

    function Chat() {
        this.__constructor.apply( this, arguments );
    }

    Chat.prototype = {

        /**
         * User ID.
         * @type {Number}
         */
        MY_ID: null,

        /**
         * Class constructor.
         */
        __constructor: function() {
            this.waitForDocumentReady().done(function() {

                // Exit if user is not logged in.
                this.MY_ID = +global.joms_my_id;
                if ( ! this.MY_ID ) {
                    return;
                }

                // Exit if not currently on chat page.
                this.$el = $( '.joms-js-page-chat' );
                this.$startScreen = $( '.joms-js-page-chat-loading' );
                if ( ! this.$el.length || ! this.$startScreen.length ) {
                    return;
                }

                // Get friends and conversation listing before opening the chat window.
                this.getFriendList().done(function( friends ) {
                    this.$startScreen.find( '.joms-js-loading' ).hide();
                    this.$startScreen.find( '.joms-js-loading-empty' ) .show();

                    if ( ! friends.length ) {
                        this.$startScreen.find( '.joms-js-loading-no-friend' ).show();
                    } else {
                        this.$startScreen.hide();
                        this.$el.show();
                    }
                });
            });
        },

        /**
         * Wait for document ready.
         * @return jQuery.Deferred
         */
        waitForDocumentReady: function() {
            return $.Deferred( $.proxy( function( defer ) {
                $( $.proxy( function() {
                    joms.onStart( $.proxy( defer.resolve, this ) );
                }, this ) );
            }, this ) );
        },

        /**
         * Get conversation listing.
         * @return jQuery.Deferred
         */
        getConversationList: function() {
            return $.Deferred( $.proxy(function( defer ) {
                joms.ajax({
                    func: 'chat,ajaxInitializeChatData',
                    callback: $.proxy(function( data ) {
                        defer.resolveWith( this );
                    }, this )
                } );
            }, this) );
        },

        /**
         * Get friend listing.
         * @return jQuery.Deferred
         */
        getFriendList: function() {
            return $.Deferred( $.proxy( function( defer ) {
                var ivCounter = 0,
                    ivTimer;

                ivTimer = setInterval( $.proxy( function() {
                    var jomsFriends = window.joms_friends,
                        friends, friend, i;

                    if ( _.isArray( jomsFriends ) ) {
                        clearInterval( ivTimer );

                        for ( friends = [], i = 0; i < jomsFriends.length; i++ ) {
                            friend = jomsFriends[ i ];

                            // Filter-out owns ID.
                            if ( +friend.id !== this.MY_ID ) {
                                friends.push({
                                    id: +friend.id,
                                    name: friend.name,
                                    avatar: friend.avatar
                                });
                            }
                        }

                        defer.resolveWith( this, [ friends ] );

                    // Set maximum iterations to prevent infinite loop.
                    } else if ( ++ivCounter >= 20 ) {
                        clearInterval( ivTimer );
                    }

                }, this ), 500 );
            }, this ) );
        }

    };

    module.exports = Chat;

})( window, jQuery );

},{}]},{},[1]);
