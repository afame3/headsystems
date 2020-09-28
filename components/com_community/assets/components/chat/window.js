// var Vue = require( 'joms' ).Vue,
//     ChatbarWindowSearch = require( './chatbar-window-search' ),
//     ChatbarWindowInput = require( './chatbar-window-input' ),
//     user_id = String( window.joms_my_id || '' ),
//     settings = window.joms_plg_jomsocialchatbar || {},
//     templates = settings.templates || {};

// module.exports = Vue.component( 'chatbar-window', {
// template: templates.chatbar_window,
// components: {
//     ChatbarWindowSearch: ChatbarWindowSearch,
//     ChatbarWindowInput: ChatbarWindowInput
// },
// props: [ 'chat' ],
// data: function() {
//     var participants = JSON.parse( JSON.stringify( this.chat.users ) );
//     return {
//         setting: false,
//         adding: false,
//         loading: false,
//         myId: user_id,
//         participants: participants,
//         scrollTop: 0
//     };
// },
// mounted: function() {
//     var that = this;
//     this.loadOlderMessages().done(function() {
//         setTimeout(function() {
//             var container = that.$el.querySelector( '.joms-js-scrollable' );
//             if ( container ) {
//                 container.scrollTop = container.scrollHeight;
//             }
//         }, 1000 );
//     });
// },
// methods: {
//     add: function() {
//         this.setting = false;
//         this.adding = true;
//     },
//     leave: function() {
//         this.setting = false;
//         if ( confirm( 'Are you sure want to leave this conversation?' ) ) {
//             this.$store.dispatch( 'chats/leave', this.chat.id );
//         }
//     },
//     toggle: function() {
//         this.$store.dispatch( 'chats/toggle', this.chat.id );
//     },
//     close: function() {
//         this.$store.dispatch( 'chats/close', this.chat.id );
//     },
//     loadOlderMessages: function() {
//         var that = this,
//             params = { id: this.chat.id };

//         return jQuery.Deferred(function( defer ) {
//             clearTimeout( that._timer );
//             that.loading = true;
//             that._timer = setTimeout(function() {
//                 that.$store.dispatch( 'chats/messages/fetch', params ).then(function() {
//                     that.loading = false;
//                     defer.resolve();
//                 });
//             }, 1500 );
//         });
//     },
//     handleScroll: function( e ) {
//         var el = e.currentTarget,
//             scrollTop = el.scrollTop,
//             delta = e.deltaY,
//             height;

//         if ( scrollTop === 0 && delta < 0 ) {
//             this.loadOlderMessages();
//             e.preventDefault();
//             e.stopPropagation();
//         } else {
//             height = el.scrollHeight - el.clientHeight;
//             if ( Math.abs( scrollTop - height ) <= 1 && delta > 0 ) {
//                 e.preventDefault();
//                 e.stopPropagation();
//             }
//         }
//     },
//     replaceLink: function( value ) {
//         return value.replace( /((http|https):\/\/.*?[^\s]+)/g,
//             '<a target="_blank" style="text-decoration:underline" href="$1">$1</a>' );
//     },
//     replaceNewline: function( value ){
//         return value.replace( /\\n/g, '<br />' )
//             .replace( /\r?\n/g, '<br />' );
//     },
//     getName: function( id ) {
//         return this.$store.getters[ 'users/name' ]( id );
//     },
//     replaceEmoticon: function( value ) {
//         var emoticons = {
//             happy2    : /(:happy:|:\)\))/g,         // [ ':happy:', ':))' ]
//             smiley2   : /(:smile:|:\)|:-\))/g,      // [ ':smile:', ':)', ':-)' ]
//             tongue2   : /(:tongue:|:p|:P)/g,        // [ ':tongue:', ':p', ':P' ]
//             wink2     : /(:wink:|;\))/g,            // [ ':wink:', ';)' ]
//             cool2     : /(:cool:|B\))/g,            // [ ':cool:', 'B)' ]
//             angry2    : /(:angry:|>:\(|&gt;:\()/g,  // [ ':angry:', '>:(', '&gt;:(' ]
//             sad2      : /(:sad:|:\()/g,             // [ ':sad:', ':(' ]
//             evil2     : /(:evil:|>:D|&gt;:D)/g,     // [ ':evil:', '>:D', '&gt;:D' ]
//             grin2     : /(:grin:|:D)/g,             // [ ':grin:', ':D' ]
//             shocked2  : /(:shocked:|:o|:O)/g,       // [ ':shocked:', ':o', ':O' ]
//             confused2 : /(:confused:|:\?)/g,        // [ ':confused:', ':?' ]
//             neutral2  : /(:neutral:|:\|)/g,         // [ ':neutral:', ':|' ]
//             heart     : /(:love:|<3|&lt;3)/g        // [ ':love:', '<3', '&lt;3' ]
//         };

//         _.each( emoticons, function( regex, key ) {
//             var replace = '<i class="joms-status-emoticon joms-icon-' + key + '"></i>';
//             value = value.replace( regex, replace );
//         });

//         return value;
//     },
//     photoZoom: function( url ) {
//         joms.api.photoZoom( url );
//     },
//     addUsers: function( userIds ) {
//         var params;

//         this.adding = false;
//         if ( userIds && userIds.length ) {
//             params = { id: this.chat.id, users: userIds };
//             this.$store.dispatch( 'chats/addUsers', params );
//         }
//     }
// }
// });
