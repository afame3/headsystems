import _ from 'underscore';
import localStorage from 'store';
import localStorageEventsPlugin from 'store/plugins/events';
import moment from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';

let DATA;

(function( root, factory ) {
    root._ = _;
    root.joms = root.joms || {};
    root.joms = _.extend( root.joms, factory( root ) );
})( window, function( root ) {
    let getOptions = root.Joomla && root.Joomla.getOptions,
        map = Array.prototype.map,
        langDate;

    // Retrieve all data and language translations.
    DATA = getOptions && getOptions( 'com_community' ) || (root.joms_data || {});

    // Deprecated!
    root.joms_lang = DATA.translations || {};

    // Data getter.
    function getData( key ) {
        return DATA[ key ];
    }

    // Translation getter.
    function getTranslation( key ) {
        return DATA.translations[ key ];
    }

    // Configuration for store.js
    localStorage.addPlugin( localStorageEventsPlugin );

    // Configuration for moment.js
    langDate = getTranslation( 'date' ) || {};
    moment.defineLocale( 'jomsocial', {
        parentLocale: 'en',
        months: langDate.months,
        monthsShort: map.call( langDate.months, function( s ) { return s.substr( 0, 3 ) }),
        weekdays: langDate.days,
        weekdaysShort: map.call( langDate.days, function( s ) { return s.substr( 0, 3 ) }),
        weekdaysMin: map.call( langDate.days, function( s ) { return s.substr( 0, 2 ) })
    })

    // Configuration for Vue.js
    Vue.use( Vuex );

    return {
        _,
        getData,
        getTranslation,
        localStorage,      /* deprecated -> */ storage: localStorage,
        moment,
        Vue,
        Vuex
    };
});
