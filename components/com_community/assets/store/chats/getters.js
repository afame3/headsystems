module.exports = {

    /**
     * Get currently opened conversations.
     * @param {Object} state
     * @param {Object} getters
     */
    opened: function( state, getters ) {
        return _.filter( state.info, function( item ) {
            return item.open;
        });
    },

};
