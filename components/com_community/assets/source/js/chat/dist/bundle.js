(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
//! moment.js
//! version : 2.20.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString(keepOffset) {
    if (!this.isValid()) {
        return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
            return this.toDate().toISOString();
        } else {
            return new Date(this._d.valueOf()).toISOString().replace('Z', formatMoment(m, 'Z'));
        }
    }
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.20.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

// currently HTML5 input type only supports 24-hour formats
hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',                             // <input type="date" />
    TIME: 'HH:mm',                                  // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
    WEEK: 'YYYY-[W]WW',                             // <input type="week" />
    MONTH: 'YYYY-MM'                                // <input type="month" />
};

return hooks;

})));

},{}],2:[function(require,module,exports){
(function ($, _, Backbone, factory) {

    joms.onStart(function () {
        var Chat = factory($, _, Backbone);
        joms.chat = new Chat();
    });

})(joms_libs.$, joms_libs._, joms_libs.Backbone, function ($, _, Backbone) {

    var Notification = require( './notification' ),
        HeaderView = require( './header' ),
        SidebarView = require( './sidebar' ),
        MessagesView = require( './messages' ),
        MessageBox = require( './messagebox' );

    /**
     * Conversation main class.
     * @class Chat
     */
    function Chat() {
        this.init();
    }

    Chat.prototype = {

        /**
         * Current user information.
         */
        me: {id: 0, name: '', avatar: ''},

        /**
         * Buddy list.
         */
        buddies: {},

        /**
         * Conversation list.
         * @type {object}
         */
        conversations: {},

        /**
         * Active conversation.
         */
        active: {},

        ping: {},

        ajax_get_chat_by_user: {},

        last_activity: 0,

        show_seen: 0,

        ping_time: 1000,

        /**
         * Chat initialization.
         */
        init: function () {
            var id = +window.joms_my_id,
                enableReadStatue = +joms.getData( 'chat_enablereadstatus' );

            this.render();

            if ( ! id ) {
                joms_observer.do_action( 'chat_user_logout' );
                return false;
            }

            if ( enableReadStatue ) {
                this.show_seen = 1;
            }

            this.me.id = id;
            joms_observer.do_action('chat_user_login');

            joms_observer.add_action('chat_sidebar_select', this.conversationOpen, 10, 1, this);
            joms_observer.add_action('chat_messagebox_send', this.messageSend, 10, 2, this);
            joms_observer.add_action('chat_message_recall', this.messageRecall, 10, 1, this);
            joms_observer.add_action('chat_single_conversation_get_by_user', this.singleConversationGetByUser, 1, 1, this);
            joms_observer.add_action('chat_update_draft_conversation', this.updateDraftConversation, 1, 2, this);
            joms_observer.add_action('chat_create_draft_conversation', this.createDraftConversation, 1, 0, this);
            joms_observer.add_action('chat_remove_draft_conversation', this.removeDraftConversation, 1, 0, this);
            joms_observer.add_action('chat_set_location_hash', this.setLocationHash, 1, 1, this);
            joms_observer.add_action('chat_leave', this.leaveChat, 2, 1, this);
            joms_observer.add_action('chat_add_people', this.addPeople, 1, 1, this);
            joms_observer.add_action('chat_buddy_add', this.buddyAdd, 1, 3, this);
            joms_observer.add_action('chat_get_previous_messages', this.conversationGetPrevMessages, 1, 2, this);
            joms_observer.add_action('chat_mute', this.muteChat, 2, 1, this);
            joms_observer.add_action('chat_add_conversions', this.addConversations, 1, 1, this);

            var noFriend = 1,
                noConversation = 1;

            this.friendListUpdate().done(function( friends ) {
                if ( _.isArray( friends ) && friends.length ) {
                    noFriend = 0;
                }
                this.conversationListUpdate().done(function( data ) {
                    var $startScreen = $('.joms-js-page-chat-loading'),
                        $chatScreen = $('.joms-js-page-chat');

                    if ( data && $.isPlainObject( data.list ) && _.keys( data.list ).length ) {
                        noConversation = 0;
                    }

                    if ( noConversation ) {
                        if ( noFriend ) {
                            $startScreen.find('.joms-js-loading-no-friend').show();
                        } else {
                            $startScreen.find('.joms-js-loading-no-conv').show().on('click', function() {
                                $startScreen.hide();
                                $chatScreen.show();
                            });
                        }

                        $startScreen.find('.joms-js-loading').hide();
                        $startScreen.find('.joms-js-loading-empty').show();
                    } else {
                        $startScreen.hide();
                        $chatScreen.show();
                    }

                    // Update ping time when browser is in the background.
                    $( window ).on( 'blur', $.proxy( function() {
                        var pingTime = +joms.getData( 'chat_pooling_time_inactive' );
                        if ( pingTime >= 1 ) {
                            this.ping_time = pingTime * 1000;
                        }
                    }, this ) ).on( 'focus', $.proxy( function() {
                        var pingTime = +joms.getData( 'chat_pooling_time_active' );
                        if ( pingTime >= 1 ) {
                            this.ping_time = pingTime * 1000;
                        }
                    }, this ) ).triggerHandler( 'focus' );

                    this.conversationPing();
                });
            });
        },

        addConversations: function (list) {
            for( key in list) {
                this.conversations[key] = list[key];
            }
        },

        render: function () {
            // initialize views
            var header = new HeaderView();
            var sidebar = new SidebarView();
            var messages = new MessagesView();
            var messageBox = new MessageBox();
            var notification = new Notification();
        },

        muteChat: function(mute) {
            this.active.mute = +mute ? 0 : 1;
            joms.ajax({
                func: 'chat,ajaxMuteChat',
                data: [this.active.chat_id, this.active.mute]
            });
        },

        addPeople: function( friends ) {
            var ids = [],
                key;

            for ( key in friends ) {
                this.buddyAdd( friends[key].id, friends[key].name, friends[key].avatar );
                ids.push( key );
            }

            joms.ajax({
                func: 'chat,ajaxAddPeople',
                data: [ this.active.chat_id, JSON.stringify( ids ) ],
                callback: $.proxy( function() {
                    var ids = [ this.active.chat_id ];
                    this.updateChatList( JSON.stringify( ids ) );
                }, this )
            });
        },

        leaveChat: function() {
            var chat_id = this.active.chat_id;
            joms.ajax({
                func: 'chat,ajaxLeaveChat',
                data: [chat_id]
            });
            this.active = {};
            delete this.conversations['chat_'+ chat_id];
            joms_observer.do_action('chat_remove_window', chat_id);
            joms_observer.do_action('chat_removemove_notification', chat_id);
            joms_observer.do_action('chat_empty_message_view');

        },

        setLocationHash: function(chat_id) {
            window.location.hash = chat_id;
        },

        getLocationHash: function() {
            var hash = window.location.hash.replace('#','');
            return +hash;
        },

        updateDraftConversation: function (name, partner) {
            if (this.conversations['chat_0'].temp_chat_id) {
                delete this.conversations['chat_0'].temp_chat_id;
            }
            this.conversations['chat_0'].name = name;
            this.conversations['chat_0'].partner = partner;
            this.active = this.conversations['chat_0'];
        },

        createDraftConversation: function () {
            if (!this.conversations.hasOwnProperty('chat_0')) {
                var conversation = {
                    chat_id: '0',
                    name: '',
                    partner: [],
                    type: 'new',
                    thumb: '/components/com_community/assets/mood_21.png'
                };

                this.conversations['chat_0'] = conversation;
                joms_observer.do_action('chat_render_draft_conversation', conversation);
            }
            joms_observer.do_action('chat_hightlight_active_window', 0);
            joms_observer.do_action('chat_conversation_open');
            this.conversationOpen(0);
        },

        removeDraftConversation: function () {
            delete this.conversations['chat_0'];
        },

        singleConversationGetByUser: function (user_id) {
            return $.Deferred($.proxy(function (defer) {
                joms_observer.do_action('chat_messages_loading');
                joms.ajax({
                    func: 'chat,ajaxGetSingleChatByUser',
                    data: [user_id],
                    callback: $.proxy(function (json) {
                        if (json.partner) {
                            if (!this.buddies.hasOwnProperty(json.partner.id)) {
                                this.buddyAdd(json.partner.id, json.partner.name, json.partner.avatar);
                            }
                            if (json.messages && _.isArray(json.messages)) {
                                joms_observer.do_action('chat_messages_loaded', json.messages, this.buddies);
                            } else {
                                joms_observer.do_action('chat_empty_message_view');
                            }
                            this.conversations['chat_0'].name = json.partner.name;
                            this.conversations['chat_0'].partner = [json.partner.id];
                            if (json.chat_id) {
                                this.conversations['chat_0'].temp_chat_id = json.chat_id;
                                this.doSeen(json.chat_id);
                                this.setSeen(json.chat_id);
                            }
                            this.active = this.conversations['chat_0'];
                        }
                        defer.resolveWith(this, [json]);
                    }, this)
                });
            }, this));
        },

        /**
         * Get list of conversation by current user.
         * @return {jQuery.Deferred}
         */
        conversationListUpdate: function() {
            var localState = joms.localStorage.get('chatbar') || {},
                opened = localState.opened || [];
            return $.Deferred( $.proxy( function( defer ) {
                joms.ajax({
                    func: 'chat,ajaxInitializeChatData',
                    data: ['[]', JSON.stringify(opened) ],
                    callback: $.proxy( function( json ) {

                        var hash;

                        this.last_activity = json.last_activity ? json.last_activity : 0;

                        // Update buddy list.
                        _.each( json.buddies, function( buddy ) {
                            this.buddySet( buddy );
                        }, this );

                        // Update conversation listing.
                        if ( json.list) {
                            this.conversations = json.list;
                            joms_observer.do_action( 'chat_conversation_render', this.conversations );
                            hash = this.getLocationHash();
                            if ( hash ) {
                                joms_observer.do_action( 'chat_open_window_by_chat_id', hash );
                            } else {
                                joms_observer.do_action( 'chat_open_first_window' );
                            }
                        }

                        this.updateConversations();

                        defer.resolveWith( this, [ json ] );
                        joms_observer.do_action( 'chat_initialized');
                    }, this )
                });
            }, this ) );
        },

        setActiveChat: function (chat_id) {
            this.active = this.conversations[ 'chat_' + chat_id ];
            this.updateConversations();
        },

        formatData: function (data, buddies) {
            for (var i in data) {
                if (data[i].type === 'single') {
                    var partner = data[i].partner;
                    data[i].thumb = buddies[partner].avatar;
                    data[i].name = buddies[partner].name;
                } else {
                    data[i].thumb = joms.BASE_URL + 'components/com_community/assets/group_thumb.jpg';
                }
            }
            return data;
        },

        /**
         * Open a conversation with specified ID.
         * @param {number} [chat_id]
         * @return {jQuery.Deferred}
         */
        conversationOpen: function (chat_id) {
            var isChatView = joms.getData( 'is_chat_view' );

            // BUG: when send msg from draft conversation
            if ( isChatView ) {
                this.setLocationHash(chat_id);
            }

            if (+chat_id === +this.active.chat_id) {
                return;
            }

            if (this.active.temp_chat_id && this.active.temp_chat_id == chat_id) {
                this.setActiveChat(chat_id);
                return;
            }

            if (+chat_id === 0 && this.conversations['chat_0'].temp_chat_id && this.conversations['chat_0'].temp_chat_id == this.active.chat_id) {
                this.setActiveChat(0);
                return;
            }

            if (!this.conversations[ 'chat_' + chat_id ]) {
                joms_observer.do_action( 'chat_open_first_window' );
                return;
            }

            this.setActiveChat(chat_id);

            if (this.active.temp_chat_id) {
                chat_id = this.active.temp_chat_id;
            }

            joms_observer.do_action( 'chat_conversation_open', this.active.type, this.active.participants );
            joms_observer.do_action( 'chat_empty_message_view' );
            joms_observer.do_action( 'chat_render_option_dropdown', this.active.type, this.active.mute );

            return $.Deferred( $.proxy( function( defer ) {
                if ( chat_id ) {
                    // get previous messages
                    this.conversationGetPrevMessages( chat_id, 0 ).done( $.proxy( function( json ) {
                        defer.resolveWith( this );
                    }, this ) );
                }
            }, this ) );
        },

        /**
         * Get conversation messages before specific message defined it's ID.
         * @param {number} chatId
         * @param {number} [lastMessageId]
         * @returns jQuery.Deferred
         */
        conversationGetPrevMessages: function (chat_id, offset) {
            if (this.getting_previous_messagse) {
                return;
            }
            if (chat_id) {
                joms_observer.do_action('chat_messages_loading');
            } else {
                if (+this.active.chat_id) {
                    chat_id = +this.active.chat_id;
                } else if (this.active.temp_chat_id) {
                    chat_id = +this.active.temp_chat_id;
                } else {
                    joms_observer.do_action('chat_previous_messages_loaded',[]);
                    return;
                }
            }
            this.getting_previous_messagse = 1;
            return $.Deferred($.proxy(function (defer) {
                joms.ajax({
                    func: 'chat,ajaxGetLastChat',
                    data: [chat_id, offset],
                    callback: $.proxy(function (json) {
                        this.getting_previous_messagse = 0;
                        if ( _.isArray(json.messages) && _.isArray(json.seen)) {
                            if (offset) {
                                if ( ! json.messages.length ) {
                                    json.messages.push({
                                       id: 0,
                                       message: null,
                                       attachment: null,
                                       user: null,
                                       timestamp: null,
                                       action: 'end'
                                    });
                                }
                                joms_observer.do_action('chat_previous_messages_loaded', json.messages, this.buddies);
                            } else {
                                joms_observer.do_action('chat_messages_loaded', json.messages, this.buddies);
                                if (this.show_seen) {
                                    joms_observer.do_action('chat_seen_message', json.seen, this.me, this.buddies);
                                }
                                this.doSeen(chat_id);
                                this.setSeen(chat_id);
                            }
                        }
                        defer.resolveWith(this, [json]);
                    }, this)
                });
            }, this));
        },

        /**
         * Ping server for any update on conversations.
         */
        conversationPing: function() {
            var timestamp;

            // Cancel scheduled next ping.
            clearTimeout( this._conversationPingTimer );

            // Remember timestamp.
            this._conversationPingTimestamp = timestamp = ( new Date ).getTime();

            // Perform ping to server.
            this._conversationPing().done( $.proxy( function( json ) {
                var active = [],
                    seen = [],
                    leave = [],
                    inactive = [],
                    newchat = [],
                    ids = [],
                    add = [];

                // Do not proceed if timestamp is different, meaning that ping was called again during request.
                if ( this._conversationPingTimestamp !== timestamp ) {
                    return;
                }

                // Add new buddy list if any.
                if ( json.newcomer && _.isArray( json.newcomer ) && json.newcomer.length ) {
                    _.each( json.newcomer, function( buddy ) {
                        if ( +this.me.id !== +buddy.id ) {
                            this.buddyAdd( buddy.id, buddy.name, buddy.avatar );
                        }
                    }, this );
                }

                // Handle received messages.
                if ( json.activities && _.isArray( json.activities ) && json.activities.length ) {
                    data = json.activities;
                    this.last_activity = data[ data.length - 1 ].id;

                    if (joms.store) {
                        _.each(data, function(item) {
                            joms.store.commit('chats/messages/add', {
                                id : item.chat_id,
                                message: item
                            });
                        });
                    }

                    if (Object.keys(this.active).length) {
                        active = _.filter(data, $.proxy(function (item) {
                            var same_chat_id = +this.active.chat_id === +item.chat_id,
                                temp_chat_active = this.active.temp_chat_id && +this.active.temp_chat_id === +item.chat_id,
                                is_msg = item.action === 'sent' || item.action === 'leave' || item.action === 'add',
                                not_my_msg = +item.user_id !== +this.me.id;
                            return is_msg && not_my_msg && (same_chat_id || temp_chat_active);
                        }, this));
                        if (active.length) {
                            joms_observer.do_action('chat_messages_received', active, this.buddies);
                            if (+this.active.chat_id) {
                                this.doSeen(this.active.chat_id);
                            } else {
                                this.doSeen(this.active.temp_chat_id);
                            }
                            joms_observer.do_action('chat_remove_seen_message');
                            joms_observer.do_action('chat_move_window_to_top', active);
                            joms_observer.do_action('chat_move_notification_to_top', active);
                        }

                        seen = _.filter(data, $.proxy(function (item) {
                            return item.action === 'seen';
                        }, this));

                        if (seen.length) {
                            for (var i = 0; i < seen.length; i++) {
                                if ( +seen[i].user_id === +this.me.id) {
                                    this.setSeen(seen[i].chat_id);
                                }
                            }
                            var seen_active = _.filter(seen, function(item) {
                                return +item.chat_id === +this.active.chat_id ;
                            }, this);
                            if (this.show_seen) {
                                joms_observer.do_action('chat_seen_message', seen_active, this.me, this.buddies);
                            }
                        }
                    }

                    inactive = _.filter(data, $.proxy(function (item) {
                        var is_msg = item.action === 'sent',
                            not_in_active_chat = +this.active.chat_id !== +item.chat_id,
                            not_new_chat = this.conversations.hasOwnProperty('chat_' + item.chat_id),
                            not_my_msg = +item.user_id !== +this.me.id;
                        return is_msg && not_my_msg && not_in_active_chat && not_new_chat;
                    }, this));

                    if ( inactive.length ) {
                        for (var i = 0; i < inactive.length; i++) {
                            this.setUnread(inactive[i].chat_id);
                        }
                        joms_observer.do_action('chat_highlight_unread_windows', inactive);
                        joms_observer.do_action('chat_move_window_to_top', inactive);
                        joms_observer.do_action('chat_move_notification_to_top', inactive);
                    }

                    // Update sidebar if necessary.
                    var needUpdateSidebar = [];
                    _.each( data, function( item ) {
                        var needUpdate = false,
                            chatId = +item.chat_id;

                        // Exclude my own activities.
                        if ( +this.me.id !== +item.user_id ) {

                            // When somebody is leaving or added to the chat.
                            if ( item.action === 'leave' || item.action === 'add' ) {
                                needUpdate = true;

                            // When there is a new conversation.
                            } else if ( ! _.has( this.conversations, 'chat_' + chatId ) ) {
                                needUpdate = true;
                            }
                        }

                        if ( needUpdate && needUpdateSidebar.indexOf( chatId ) < 0 ) {
                            needUpdateSidebar.push( chatId );
                        }
                    }, this );

                    if ( needUpdateSidebar.length ) {
                        needUpdateSidebar = JSON.stringify( needUpdateSidebar );
                        this.updateChatList( needUpdateSidebar );
                    }

                    joms_observer.do_action('chat_set_notification_label', this.countUnread(this.conversations));
                }

                // Schedule next ping.
                this._conversationPingTimer = setTimeout( $.proxy( function() {
                    this.conversationPing();
                }, this ), this.ping_time );

            }, this ) );
        },

        countUnread: function(data) {
            var count = 0;
            for(var key in data) {
                if ( +data[key].seen === 0 && +data[key].mute === 0 ) {
                    count++;
                }
            }
            return count;
        },

        setUnread: function (chat_id) {
            this.conversations['chat_' + chat_id].seen = 0;
            joms_observer.do_action('chat_set_notification_label_unread', chat_id);
        },

        setSeen: function (chat_id) {
            if (this.conversations['chat_' + chat_id]) {
                this.conversations['chat_' + chat_id].seen = 1;
                joms_observer.do_action('chat_set_notification_label', this.countUnread(this.conversations));
                joms_observer.do_action('chat_set_notification_label_seen', chat_id);
                joms_observer.do_action('chat_set_window_seen', chat_id);
            }
        },

        doSeen: function (chat_id) {
            return $.Deferred($.proxy(function (defer) {
                joms.ajax({
                    func: 'chat,ajaxSeen',
                    data: [chat_id]
                });
            }, this));
        },

        _conversationPing: function () {
            return $.Deferred($.proxy(function (defer) {
                this.ping = joms.ajax({
                    func: 'chat,ajaxPingChat',
                    data: [this.last_activity],
                    callback: $.proxy(function (json) {
                        defer.resolveWith(this, [json]);
                    }, this)
                });
            }, this));
        },

        /**
         * Get latest chat listing.
         * @param {number[]} ids
         * @return {_.debounce}
         */
        updateChatList: _.debounce( function( ids ) {
            joms.ajax({
                func: 'chat,ajaxGetChatList',
                data: [ ids ],
                callback: $.proxy( function( json ) {
                    var list, unread;

                    _.each( json.buddies, function( buddy ) {
                        this.buddySet( buddy );
                    }, this );

                    // Format conversation listing.
                    list = this.formatData( json.list, this.buddies );

                    // Update conversation listing.
                    _.each( list, function( item ) {
                        this.conversations[ 'chat_' + item.chat_id ] = item;
                    }, this );

                    // Get total unread.
                    unread = this.countUnread( this.conversations );

                    joms_observer.do_action( 'chat_conversation_render', list );
                    joms_observer.do_action( 'chat_highlight_unread_windows', list );
                    joms_observer.do_action( 'chat_set_notification_label', unread );
                    joms_observer.do_action( 'chat_move_window_to_top', list );
                    joms_observer.do_action( 'chat_move_notification_to_top', list );

                    this.updateConversations();

                }, this )
            });
        }, 1000 ),

        /**
         * Sends message.
         * @param {string} message
         * @returns jQuery.Deferred
         */
        messageSend: function (message, attachment) {
            this.ping.abort();
            var partner = [], name = '', chat_id = 0;
            if (+this.active.chat_id === 0) {
                partner = this.active.partner;
                name = this.active.name;
                joms_observer.do_action('chat_selector_hide');
                joms_observer.do_action('chat_selector_reset');
                if (this.active.temp_chat_id) {
                    joms_observer.do_action('chat_hightlight_active_window', this.active.temp_chat_id);
                    joms_observer.do_action('chat_remove_draft_conversation');

                    this.removeDraftConversation();
                    chat_id = this.active.temp_chat_id;
                    this.setActiveChat(chat_id);
                }
            } else {
                chat_id = +this.active.chat_id;
            }
            joms_observer.do_action('chat_move_window_to_top', [this.active]);
            joms_observer.do_action('chat_move_notification_to_top', [this.active]);
            joms_observer.do_action('chat_remove_seen_message');

            return $.Deferred($.proxy(function (defer) {
                var now = (new Date()).getTime();
                joms_observer.do_action('chat_message_sending', message, attachment, this.me, now);

                // Remove unneeded information.
                attachment = $.extend({}, attachment || {});
                delete attachment.name;
                delete attachment.url

                joms.ajax({
                    func: 'chat,ajaxAddChat',
                    data: [chat_id, message, JSON.stringify(attachment), JSON.stringify(partner), name],
                    callback: $.proxy(function (json) {
                        joms_observer.do_action( 'chat_message_sent', json.reply_id, now, json.attachment || {} );
                        if (chat_id === 0) {
                            this.conversations['chat_' + json.chat.chat_id] = this.formatData([json.chat], this.buddies)[0];
                            this.active = this.conversations['chat_' + json.chat_id];
                            this.setLocationHash(this.active.chat_id);
                            joms_observer.do_action('chat_override_draft_chat_window', this.active);
                            joms_observer.do_action('chat_hightlight_active_window', this.active.chat_id);
                            joms_observer.do_action('chat_render_option_dropdown', this.active.type, this.active.mute);
                            this.removeDraftConversation();
                        }
                        defer.resolveWith(this, [json]);
                    }, this)
                });
            }, this));
        },

        /**
         * Recall sent message.
         * @param {number} msgId
         * @returns jQuery.Deferred
         */
        messageRecall: function( msgId ) {
            return $.Deferred( $.proxy(function( defer ) {
                joms.ajax({
                    func: 'chat,ajaxRecallMessage',
                    data: [ msgId ],
                    callback: $.proxy(function( json ) {
                        defer.resolveWith( this, [ json ]);
                    }, this  )
                });
            }, this  ));
        },

        /**
         * Naively get friend list from `window.joms_friends` value.
         * @returns jQuery.Deferred
         */
        friendListUpdate: function () {
            return $.Deferred($.proxy(function (defer) {
                var timer = setInterval($.proxy(function () {
                    if (!_.isUndefined(window.joms_friends)) {
                        clearInterval(timer);
                        var friends = [];
                        var joms_friends = window.joms_friends;
                        for (var i = 0; i < joms_friends.length; i++) {
                            if (+joms_friends[i].id === +this.me.id) {
                                this.buddySet({ id: this.me.id, name: 'You', avatar: joms_friends[i].avatar })
                                this.me.name = 'You';
                                this.me.avatar = joms_friends[i].avatar;
                            } else {
                                friends.push(joms_friends[i]);
                            }
                        }
                        defer.resolveWith(this, [ friends ]);
                    }
                }, this), 100);
            }, this));
        },

        /**
         * Add buddy list.
         * @param {number} id
         * @param {string} name
         * @param {string} avatar
         */
        buddyAdd: function (id, name, avatar) {
            id = +id;
            if (!this.buddies.hasOwnProperty(id)) {
                this.buddies[ id ] = {
                    id: id,
                    name: name,
                    avatar: avatar
                };
            }
        },

        /**
         * Get buddy information.
         * @param {number} id
         * @return {Object|undefined}
         */
        buddyGet: function( id ) {
            return this.buddies[ id ];
        },

        /**
         * Set buddy information.
         * @param {Object} data
         * @param {number} data.id
         * @param {string} data.name
         * @param {string} data.avatar
         * @param {boolean} data.online
         */
        buddySet: function( data ) {
            var id = data.id,
                data = _.extend( this.buddies[ id ] || {}, data );

            this.buddies[ id ] = data;
        },

        /**
         * Update conversations based on current state.
         * @return {_.debounce}
         */
        updateConversations: function() {
            var active = this.active || {},
                activeId = +active.chat_id;

            _.each( this.conversations, function( item ) {
                var isActive = +item.chat_id === activeId,
                    copy = $.extend( {}, item, { active: isActive } );

                joms_observer.do_action( 'chat_conversation_update', copy );
            }, this );
        }

    };

    return Chat;

});

},{"./header":3,"./messagebox":4,"./messages":5,"./notification":6,"./sidebar":7}],3:[function(require,module,exports){
(function( $, _, Backbone ) {

    var util = require( './util' );

    /**
     * Conversation header view.
     * @class {Backbone.View}
     */
    module.exports = Backbone.View.extend({

        el: '.joms-js--chat-header',

        events: {
            'click .joms-js--chat-new-message': 'createDraftConversation',
            'click .joms-js--chat-header-selector-div [data-user-id]': 'selectorSelect',
            'click .joms-js--chat-leave': 'leaveChat',
            'click .joms-js--chat-mute': 'muteChat',
            'keyup .joms-chat__search_user': 'actionOnSearchInput',
            'keydown .joms-chat__search_user': 'deleteSelected'
        },

        initialize: function () {
            this.$info = this.$('.joms-js--chat-header-info');
            this.$recipients = this.$info.find('.joms-chat__recipents');
            this.$selector = this.$('.joms-js--chat-header-selector');
            this.$selected = this.$selector.find('.joms-chat-selected');
            this.$selectorInput = this.$selector.find('.joms-input');
            this.$selectorDiv = this.$selector.find('.joms-js--chat-header-selector-div');
            this.$optionDropdown = this.$('.joms-js--chat-dropdown');
            this.$searchInput = this.$('.joms-chat__search_user');
            this.searchword = '';

            joms_observer.add_action('chat_selector_hide', this.selectorHide, 1, 0, this);
            joms_observer.add_action('chat_selector_show', this.selectorShow, 1, 0, this);
            joms_observer.add_action('chat_selector_reset', this.selectorReset, 1, 0, this);
            joms_observer.add_action('chat_update_info', this.updateChatInfo, 1, 0, this);
            joms_observer.add_action('chat_render_option_dropdown', this.renderOptionDropdown, 1, 2, this);
        },

        actionOnSearchInput: function(e) {
            if (e.which === 27 /* Esc key */) {
                this.selectorHide();
                joms_observer.do_action('chat_selector_hide');
                joms_observer.do_action('chat_selector_reset');
                joms_observer.do_action('chat_remove_draft_conversation');
                joms_observer.do_action('chat_open_first_window');
                this.searchword = '';
                return;
            }

            var self = this;
            var keyword = self.$searchInput.val().trim();
            var selected = self.$selected.find('.user-selected');
            var exclusion = '';
            if (selected.length) {
                exclusion = _.map(selected, function(item) {
                    return $(item).data('user-id');
                }).join(',');
            }
            self.$selectorDiv.empty();
            self.$selectorDiv.hide();
            
            
            if (keyword != self.searchword) {
                clearTimeout(self.search);
                self.searchword = keyword;
                if (!keyword) {
                    return;
                }
                self.search = setTimeout( function() {
                    self.$selectorDiv.append('<img src="'+joms.BASE_URL+'components/com_community/assets/ajax-loader.gif" alt="loader" />');
                    self.$selectorDiv.show();
                    joms.ajax({
                        func: 'chat,ajaxGetFriendListByName',
                        data: [keyword, exclusion],
                        callback: function (json) {
                            if (Array.isArray(json) && json.length) {
                                self.$selectorDiv.empty();
                                self.selectorRender(json);
                            } else {
                                self.$selectorDiv.text( self.$selectorDiv.data('textNoResult') );
                            }
                        }
                    });
                },500);
            }
        },

        leaveChat: function() {
            joms_observer.do_action('chat_leave');
            this.$optionDropdown.hide();
        },

        muteChat: function( e ) {
            var $dd = this.$optionDropdown,
                $btn = $( e.currentTarget ),
                mute = +$btn.data( 'mute' ),
                text = $btn.data( mute ? 'textMute' : 'textUnmute' );

            $dd.hide();
            $btn.html( text ).data( 'mute', mute ? 0 : 1 );
            joms_observer.do_action( 'chat_mute', mute );
        },

        renderOptionDropdown: function( type, mute ) {
            var $dd = this.$optionDropdown,
                $mute = $dd.find( '.joms-js--chat-mute' ),
                $add = $dd.find( '.joms-js--chat-add-people' ),
                $leave = $dd.find( '.joms-js--chat-leave' );

            $mute.data( 'mute', +mute ).html( $mute.data( +mute ? 'textUnmute' : 'textMute' ) );
            $add.css({ display: type === 'group' ? '' : 'none' });
        },

        deleteSelected: function (e) {
            var keyword = this.$searchInput.val().trim();
            if (e.which === 8 && !keyword) {
                var selected = this.$selected.find('.user-selected').last(),
                    user_id = selected.data('user-id');
                selected.remove();
                this.updateChatInfo();
            }
        },

        createDraftConversation: function () {
            this.selectorShow();
            joms_observer.do_action('chat_create_draft_conversation');
        },

        /**
         * Render friend selector.
         * @param {object} buddies
         */
        selectorRender: function( buddies ) {
            _.each( buddies, function( buddy ) {
                this.$selectorDiv.append([
                    '<div class="joms-chat__item joms-selector-', buddy.id, '" data-user-id="',
                            buddy.id, '" style="padding:5px">',
                        '<div class="joms-avatar ', ( buddy.online ? 'joms-online' : '' ), '">',
                            '<a><img src="', buddy.avatar, '" /></a>',
                        '</div>',
                        '<div class="joms-chat__item-body">',
                            '<a>', buddy.name, '</a>',
                        '</div>',
                    '</div>'
                ].join('') );
            }, this );
        },

        /**
         * Show new chat selector.
         * @params {HTMLEvent} e
         */
        selectorShow: function () {
            this.$info.hide();
            this.$selector.show();
            this.$selectorInput.val('').focus();
        },

        /**
         * Hide new chat selector.
         */
        selectorHide: function () {
            this.$selectorInput.val('');
            this.$selector.hide();
            this.$info.show();
            this.$selectorDiv.hide();
        },

        selectorReset: function () {
            this.$selected.empty();
            this.$selectorDiv.empty();
        },

        /**
         * Hide new chat selector if Esc key is pressed.
         * @params {HTMLEvent} e
         */
        selectorHideOnEscape: function (e) {
            
        },

        /**
         * Hide new chat selector on input blur.
         * @params {HTMLEvent} e
         */
        selectorHideOnBlur: function (e) {
            this.selectorHide();
        },

        /**
         * Create new conversation with friend.
         * @params {HTMLEvent} e
         */
        selectorSelect: function( e ) {
            var $el = $( e.currentTarget ),
                user_id = $el.data( 'user-id' ),
                name = $el.find( '.joms-chat__item-body' ).text(),
                avatar = $el.find( 'img' ).attr( 'src' ),
                html;

            html = '<button class="btn user-selected" data-user-id="' + user_id + '">' + name + '</button>';
            $el.hide();
            this.$selected.append( html );
            this.$searchInput.val( '' ).focus();
            this.$selectorDiv.hide();
            this.updateChatInfo();
            this.searchword = '';
            
            joms_observer.do_action( 'chat_buddy_add', user_id, name, avatar );
        },

        updateChatInfo: function () {
            var user_selected,
                partner = [],
                name = [],
                chatname = '';
            user_selected = this.$selected.find('.user-selected');
            if (user_selected.length < 1) {
                joms_observer.do_action('chat_empty_message_view');
                joms_observer.do_action('chat_disable_message_box');
            } else if (user_selected.length === 1) {
                name.push(user_selected.text());
                joms_observer.do_action('chat_single_conversation_get_by_user', user_selected.data('user-id'));
                joms_observer.do_action('chat_enable_message_box');
            } else if (user_selected.length > 1) {
                _.each(user_selected, function (item) {
                    partner.push($(item).data('user-id'));
                    name.push($(item).text());
                }, this);
                joms_observer.do_action('chat_empty_message_view');
                joms_observer.do_action('chat_enable_message_box');
            }

            if ( name.length ) {
                chatname = util.formatName( name );
            }

            joms_observer.do_action('chat_update_draft_conversation', chatname, partner);
            joms_observer.do_action('rename_chat_title', chatname);

        }

    });

})( joms_libs.$, joms_libs._, joms_libs.Backbone );

},{"./util":8}],4:[function(require,module,exports){
(function( $, _, Backbone ) {

    /**
     * Conversation sidebar view.
     * @class {Backbone.View}
     */
    module.exports = Backbone.View.extend({

        el: '.joms-chat__messagebox',

        events: {
            'click .joms-js--send': 'messageSend',
            'keydown textarea': 'messageSendOnEnter'
        },

        initialize: function () {
            this.$wrapper = this.$( '.joms-js-wrapper' );
            this.$disabler = this.$( '.joms-js-disabler' );
            this.$textarea = this.$( 'textarea' );
            this.$thumbnail = this.$( '.joms-textarea__attachment--thumbnail' );

            joms_observer.add_action( 'chat_conversation_open', this.render, 10, 2, this );
            joms_observer.add_action( 'chat_conversation_update', this.update, 10, 1, this );
            joms_observer.add_action( 'chat_disable_message_box', this.disableMessageBox, 10, 1, this );
            joms_observer.add_action( 'chat_enable_message_box', this.enableMessageBox, 10, 1, this );
        },

        render: function() {
            this.$textarea.val( '' );
        },

        update: function( item ) {
            if ( ! item.active ) {
                return;
            }

            if ( item.type === 'group' && ! ( +item.participants ) ) {
                this.$disabler.show();
                this.$textarea.attr( 'disabled', 'disabled' );
            } else {
                this.$disabler.hide();
                this.$textarea.removeAttr( 'disabled' )
            }
        },

        disableMessageBox: function() {
            this.$disabler.show();
            this.$textarea.attr( 'disabled', 'disabled' );
        },

        enableMessageBox: function() {
            this.$disabler.hide();
            this.$textarea.removeAttr( 'disabled' )
        },

        messageSend: function( e ) {
            var msg = $.trim( this.$textarea.val() ),
                $draft = $( '.joms-js--chat-item-0 ' ),
                $attachment = jQuery( '.joms-textarea__attachment--thumbnail' ),
                $file = $attachment.children( 'b' ),
                $img = $attachment.children( 'img' );

            // Exit on new message if no user is selected.
            if ( $draft.length && ! $( '.user-selected' ).length ) {
                return;
            }

            // Handle file attachment parameter.
            if ( $file.length ) {
                attachment = {
                    type: 'file',
                    id: $file.data( 'id' ),
                    url: $file.data( 'path' ),
                    name: $file.data( 'name' )
                };
                this.$wrapper.find( '.removeAttachment' ).click();
                $file.remove();

            // Handle image attachment parameter.
            } else if ( $img.attr( 'src' ).match( /\.(gif|jpe?g|png)$/i ) ) {
                attachment = {
                    type: 'image',
                    id: $img.data( 'photo_id' ),
                    url: $img.attr( 'src' )
                };
                this.$wrapper.find( '.removeAttachment' ).click();

            // Handle empty attachment.
            } else {
                attachment = '';
            }

            if ( msg || attachment ) {
                joms_observer.do_action( 'chat_messagebox_send', msg, attachment );
                this.$textarea.val( '' );
                e.preventDefault();
            }
        },

        messageSendOnEnter: function( e ) {
            if ( e.which === 13 && e.shiftKey ) {
                this.messageSend( e );
            }
        }
    });

})( joms_libs.$, joms_libs._, joms_libs.Backbone );

},{}],5:[function(require,module,exports){
(function( $, _, Backbone ) {

    var util = require( './util' );

    /**
     * Conversation messages view.
     * @class {Backbone.View}
     */
    module.exports = Backbone.View.extend({

        el: '.joms-chat__messages',

        events: {
            'click .joms-chat__message-actions a': 'recallMessage',
            'mouseenter [data-tooltip]': 'showTooltip',
            'mouseleave [data-tooltip]': 'hideTooltip'
        },

        initialize: function (config) {
            this.$loading = this.$('.joms-js--chat-conversation-loading');
            this.$messages = this.$('.joms-js--chat-conversation-messages');
            this.$noParticipants = this.$('.joms-js--chat-conversation-no-participants');

            joms_observer.add_action('chat_conversation_open', this.render, 10, 2, this);
            joms_observer.add_action('chat_conversation_update', this.update, 10, 1, this);
            joms_observer.add_action('chat_messages_loading', this.messagesLoading, 10, 1, this);
            joms_observer.add_action('chat_messages_loaded', this.messagesLoaded, 10, 3, this);
            joms_observer.add_action('chat_messages_received', this.messagesReceived, 10, 3, this);
            joms_observer.add_action('chat_message_sending', this.messageSending, 10, 5, this);
            joms_observer.add_action('chat_message_sent', this.messageSent, 10, 3, this);
            joms_observer.add_action('chat_empty_message_view', this.emptyView, 1, 0, this);
            joms_observer.add_action('chat_seen_message', this.seenMessage, 1, 3, this);
            joms_observer.add_action('chat_remove_seen_message', this.removeSeenMessage, 1, 2, this);
            joms_observer.add_action('chat_previous_messages_loaded', this.previousMessagesLoaded, 1, 2, this);

            // Handle scrolling through the messages.
            this.$messages.on( 'mousewheel DOMMouseScroll', $.proxy( this.onScroll, this ) );
        },

        render: function () {
            this.$messages.empty().hide();
            this._updateRecallAbility();
        },

        update: function( item ) {
            var participants;

            if ( ! item.active ) {
                return;
            }

            participants = +item.participants;
            if ( item.type !== 'group' ) {
                participants = 1;
            }

            this._toggleEmptyParticipants( participants );
        },

        /**
         * Get older messages for current conversation.
         */
        getOlderMessages: _.debounce(function() {
            var $ct = this.$messages,
                $end = $ct.children( '.joms-js--chat-conversation-end' ),
                $msg, msgId;

            // Do not proceed if all older messages are already loaded.
            if ( $end.length ) {
                return;
            }

            // Get ID of the oldest message.
            $msg = $ct.find( '.joms-js-chat-content[data-id]' ).first();
            msgId = $msg.data( 'id' );

            // Get previous messages if ID found.
            if ( msgId ) {
                this.$loading.show();
                joms_observer.do_action( 'chat_get_previous_messages', null, msgId );
            }
        }, 500, true ),

        seenMessage: function( data, me, buddies ) {
            var seen, names, template, html, $seen;

            if ( ! ( _.isArray( data ) && data.length ) ) {
                return;
            }

            seen = _.chain( data )
                .filter(function( item ) { return ( +me.id !== +item.user_id ) })
                .map(function( item ) { return buddies[ item.user_id ] })
                .value();

            if ( ! seen.length ) {
                return;
            }

            // Merge with previous seen users.
            this._seen = _.chain( ( this._seen || [] ).concat( seen ) )
                .uniq(function( item ) { return +item.id })
                .sortBy(function( item ) { return item.name })
                .value();

            // Removes previous seen html.
            $seen = this.$messages.children( '.joms-js--seen' );
            if ( $seen.length ) {
                $seen.remove();
            }

            // Render new seen html.
            template = util.getTemplateById( 'joms-js-template-chat-seen-by' );
            names = _.map( this._seen, function( item ) { return item.name });
            html = template({ seen: this._seen, names: util.formatName( names ) });
            $seen = $( html ).addClass( 'joms-js--seen' );

            this.$messages.append( $seen );
            this.scrollToBottom();
        },

        removeSeenMessage: function() {
            this._seen = false;
            this.$messages.children( '.joms-js--seen' ).remove();
        },

        emptyView: function () {
            this._seen = false;
            this.$loading.hide();
            this.$messages.empty().show().css('opacity', '');
        },

        messagesLoading: function () {
            this.$messages.css('opacity', 0);
            this.$loading.show();
        },

        messagesLoaded: function (data, buddies) {
            this.$loading.hide();
            this.$messages.css('opacity', '');

            data.reverse();
            _.each(data, function (item) {
                var user = buddies[item.user_id];
                var time = item.created_at * 1000;
                this.messagesRender(item.id, item.content, JSON.parse(item.attachment), user, time, item.action);
            }, this);
            this._updateRecallAbility();
            this.scrollToBottom();
        },

        messagesRender: function(id, message, attachment, user, timestamp, action) {
            var $container = this.$messages,
                date = new Date( timestamp ),
                timeFormatted = util.formatDateTime( timestamp ),
                dGroup, $dGroup, template, html, $last, name, mine;

            // Get date group for messages.
            dGroup = date.toJSON().slice( 0, 10 ).replace( /-/g, '' );
            $dGroup = $container.children( '.joms-js-chat-message-dgroup' )
                .filter( '[data-id="' + dGroup + '"]' );

            if ( ! $dGroup.length ) {
                template = util.getTemplateById( 'joms-tpl-chat-message-dgroup' );
                $dGroup = $( template({ id: dGroup, date: util.formatDate( timestamp ) }) );
                $dGroup.appendTo( $container );
            }

            $container = $dGroup.children( '.joms-js-content' );

            mine = user && ( +user.id === +window.joms_my_id ) || false;
            name = mine ? 'you' : '';

            if ( action === 'sent' ) {

                // Format links.
                message = message.replace( /((http|https):\/\/.*?[^\s]+)/g,
                    '<a target="_blank" style="text-decoration:underline" href="$1">$1</a>' );

                // Replace newlines.
                message = message.replace( /\\n/g, '<br />' );
                message = message.replace( /\r?\n/g, '<br />' );

                var att = '';
                if (attachment.type) {
                    att = this.attachmentView(attachment);
                }

                $last = $container.find('.joms-chat__message-item').last();

                if ( ! $last.length || +$last.data( 'user-id' ) !== +user.id ) {
                    if ( user.name.indexOf( '<' ) >= 0 ) {
                        var span = document.createElement( 'span' );
                        span.innerHTML = user.name;
                        user.name = span.innerText;
                    }

                    template = util.getTemplateById( 'joms-js-template-chat-message' );
                    html = template({
                        timestamp: timestamp,
                        name: name,
                        user_id: user.id,
                        user_name: user.name,
                        user_avatar: user.avatar,
                        online: user.online
                    });

                    $last = $( html );
                    $last.appendTo( $container );
                }

                template = util.getTemplateById( 'joms-js-template-chat-message-content' );
                html = template({
                    message: util.getEmoticon( message ),
                    time: timeFormatted,
                    timestamp: timestamp,
                    id: id,
                    attachment: att,
                    mine: mine
                });
                $last.find( '.joms-js-chat-message-item-body' ).append( html );

            } else if ( action === 'leave' ) {
                template = util.getTemplateById( 'joms-js-template-chat-leave' );
                html = template({
                    id: id,
                    mine: mine,
                    name: user.name,
                    time: timeFormatted
                });
                $container.append( html );
            } else if ( action === 'add' ) {
                template = util.getTemplateById( 'joms-js-template-chat-added' );
                html = template({
                    id: id,
                    mine: mine,
                    name: user.name,
                    time: timeFormatted
                });
                $container.append( html );
            }
        },

        previousMessagesLoaded: function (data, buddies) {
            this.$loading.hide();
            if (!data.length) {
                return;
            }

            _.each(data, function (item) {
                var user = buddies[item.user_id];
                var time = item.created_at * 1000;
                this.preMessagesRender(item.id, item.content, JSON.parse(item.attachment), user, time, item.action);
            }, this);

            this._updateRecallAbility();

            var parent_offset = this.$messages.offset();
            var first_element = data[0];
            var first_item = this.$messages.find('.joms-chat__message-content[data-id="'+first_element.id+'"]');
            var offset = first_item.offset();
            var padding_top = +this.$messages.css('padding-top').replace('px', '');
            this.$messages.scrollTop(offset.top - parent_offset.top - padding_top);
        },

        preMessagesRender: function(id, message, attachment, user, timestamp, action) {
            var $container = this.$messages,
                date, timeFormatted, dGroup, $dGroup, template, html, $first, name, mine;

            // Special case on end message.
            if ( action === 'end' ) {
                template = util.getTemplateById( 'joms-js-template-chat-message-end' );
                html = template();
                $container.prepend( html );
                return;
            }

            // Format date and time.
            date = new Date( timestamp ),
            timeFormatted = util.formatDateTime( timestamp ),

            // Get date group for messages.
            dGroup = date.toJSON().slice( 0, 10 ).replace( /-/g, '' );
            $dGroup = $container.children( '.joms-js-chat-message-dgroup' )
                .filter( '[data-id="' + dGroup + '"]' );

            if ( ! $dGroup.length ) {
                template = util.getTemplateById( 'joms-tpl-chat-message-dgroup' );
                $dGroup = $( template({ id: dGroup, date: util.formatDate( timestamp ) }) );
                $dGroup.prependTo( $container );
            }

            $container = $dGroup.children( '.joms-js-content' );

            mine = user && ( +user.id === +window.joms_my_id ) || false;
            name = mine ? 'you' : '';

            if ( action === 'sent' ) {

                // Format links.
                message = message.replace( /((http|https):\/\/.*?[^\s]+)/g,
                    '<a target="_blank" style="text-decoration:underline" href="$1">$1</a>' );

                // Replace newlines.
                message = message.replace( /\\n/g, '<br />' );
                message = message.replace( /\r?\n/g, '<br />' );

                var att = '';
                if (attachment.type) {
                    att = this.attachmentView(attachment);
                }

                $first = $container.find('.joms-chat__message-item').first();

                if ( ! $first.length || +$first.data( 'user-id' ) !== +user.id ) {
                    if ( user.name.indexOf( '<' ) >= 0 ) {
                        var span = document.createElement( 'span' );
                        span.innerHTML = user.name;
                        user.name = span.innerText;
                    }

                    template = util.getTemplateById( 'joms-js-template-chat-message' );
                    html = template({
                        timestamp: timestamp,
                        name: name,
                        user_id: user.id,
                        user_name: user.name,
                        user_avatar: user.avatar,
                        online: user.online
                    });

                    $first = $( html );
                    $first.prependTo( $container );
                }

                template = util.getTemplateById( 'joms-js-template-chat-message-content' );
                html = template({
                    message: util.getEmoticon( message ),
                    time: timeFormatted,
                    timestamp: timestamp,
                    id: id,
                    date: date,
                    attachment: att,
                    mine: mine
                });
                $first.find( '.joms-js-chat-message-item-body' ).prepend( html );

            } else if ( action === 'leave' ) {
                template = util.getTemplateById( 'joms-js-template-chat-leave' );
                html = template({
                    id: id,
                    mine: mine,
                    name: user.name,
                    time: timeFormatted
                });
                $container.prepend( html );
            } else if ( action === 'add' ) {
                template = util.getTemplateById( 'joms-js-template-chat-added' );
                html = template({
                    id: id,
                    mine: mine,
                    name: user.name,
                    time: timeFormatted
                });
                $container.prepend( html );
            }
        },

        messagesReceived: function (data, buddies) {
            if (data.length > 0) {
                _.each(data, function (item) {
                    var user = buddies[item.user_id];
                    var time = item.created_at * 1000;
                    this.messagesRender(item.id, item.content, JSON.parse(item.attachment), user, time, item.action);
                }, this);
                this.scrollToBottom();
            }
        },

        attachmentView: function( attachment ) {
            var type = attachment.type,
                template;

            if ( ! attachment.url ) {
                return '';
            } else if ( type === 'file' ) {
                template = util.getTemplateById( 'joms-js-template-chat-message-file' );
                return template({ url: attachment.url, name: attachment.name });
            } else if ( type === 'image' ) {
                template = util.getTemplateById( 'joms-js-template-chat-message-image' );
                return template({ url: attachment.url });
            } else if ( type === 'video' ) {
                template = util.getTemplateById( 'joms-js-template-chat-message-video' );
                return template( $.extend( { url: attachment.url }, attachment.video ) );
            } else if ( type === 'url' ) {
                template = util.getTemplateById( 'joms-js-template-chat-message-url' );
                return template({
                    url: attachment.url,
                    title: attachment.title,
                    images: attachment.images,
                    description: attachment.description
                });
            }
        },

        escapeHtml: function (text) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };

            return text.replace(/[&<>"']/g, function (m) {
                return map[m];
            });
        },

        messageAppend: function (message, attachment, me, timestamp) {
            this.messagesRender(null, message, attachment, me, timestamp, 'sent');
        },

        messageSending: function (message, attachment, me, timestamp) {
            message = this.escapeHtml(message);
            this.messageAppend(message, attachment, me, timestamp);
            this.scrollToBottom();

            // Show loading if ajax request is taking too long.
            setTimeout( $.proxy( function() {
                var $msg = this.$messages.find( '.joms-js-chat-content.' + timestamp ),
                    $loading = $msg.siblings( '.joms-js-chat-loading' );

                if ( $loading.length ) {
                    $loading.show();
                }
            }, this ), 1500 );
        },

        messageSent: function ( id, timestamp, attachment ) {
            var $msg = this.$messages.find( '.joms-js-chat-content.' + timestamp ),
                $loading = $msg.siblings( '.joms-js-chat-loading' ),
                $attachment;

            $msg.attr( 'data-id', id );
            $loading.remove();

            // Updates link preview.
            if ( attachment && ( attachment.type === 'url' || attachment.type === 'video' ) ) {
                $attachment = $msg.next( '.joms-js-chat-attachment' );
                if ( $attachment ) {
                    $attachment.remove();
                }
                $attachment = $( this.attachmentView( attachment ) );
                $attachment.insertAfter( $msg );
            }
        },

        recallMessage: function( e ) {
            var $btn = $( e.currentTarget ).closest( '.joms-chat__message-actions' ),
                $msg = $btn.siblings( '.joms-chat__message-content' ),
                $group = $msg.closest( '.joms-chat__message-item' ),
                isMine = +$group.data( 'user-id' ) === +window.joms_my_id,
                id = +$msg.data( 'id' ),
                $prevGroup, $nextGroup;

            e.preventDefault();
            e.stopPropagation();

            if ( isMine ) {
                $msg = $msg.parent();

                if ( $msg.siblings().length ) {
                    $msg.remove();
                } else {
                    $prevGroup = $group.prev();
                    $nextGroup = $group.next();
                    $group.remove();

                    if ( +$prevGroup.data( 'user-id' ) === +$nextGroup.data( 'user-id' ) ) {
                        $prevGroup.find( '.joms-chat__message-body' ).children()
                            .prependTo( $nextGroup.find( '.joms-chat__message-body' ) );
                        $prevGroup.remove();
                    }
                }

                joms_observer.do_action( 'chat_message_recall', id );
            }
        },

        scrollToBottom: function () {
            var div = this.$messages[0];
            div.scrollTop = div.scrollHeight;
        },

        _updateRecallAbility: function() {
            var now = ( new Date() ).getTime(),
                maxElapsed = +joms.getData( 'chat_recall' ),
                $btns;

            if ( ! maxElapsed ) {
                return;
            }

            $btns = this.$messages.find( '.joms-chat__message-actions' );
            if ( $btns.length ) {
                maxElapsed = maxElapsed * 60 * 1000;
                $btns.each(function() {
                    var $btn = $( this ),
                        ts = +$btn.parent().data( 'timestamp' );

                    if ( ts && ( now - ts > maxElapsed ) ) {
                        $btn.remove();

                    }
                });
            }

            // Check every 30s.
            clearInterval( this._checkRecallTimer );
            this._checkRecallTimer = setInterval( $.proxy( this._updateRecallAbility, this ), 30 * 1000 );
        },

        _toggleEmptyParticipants: function( count ) {
            if ( count > 0 ) {
                this.$noParticipants.hide();
            } else {
                this.$noParticipants.show();
            }
        },

        showTooltip: function( e ) {
            var that = this;

            this._tooltipTimer = setTimeout(function() {
                var $el = $( e.currentTarget ),
                    tooltip = $el.data( 'tooltip' ),
                    position = $el.offset();

                if ( ! that.$tooltip ) {
                    that.$tooltip = $( '<div class="joms-tooltip joms-js-chat-tooltip" />' )
                        .appendTo( document.body );
                }

                that.$tooltip.html( tooltip )
                    .css( position )
                    .show();

                // Adjust position.
                that.$tooltip.css({
                    left: position.left - that.$tooltip.outerWidth() - 10,
                    top: position.top + ( $el.outerHeight() / 2 ),
                    transform: 'translateY(-50%)'
                });

            }, 800 );
        },

        hideTooltip: function() {
            clearTimeout( this._tooltipTimer );

            if ( this.$tooltip ) {
                this.$tooltip.hide();
            }
        },

        onScroll: function( e ) {
            var $ct, height, delta, scrollTop, scrollHeight;

            e.stopPropagation();

            $ct = this.$messages;
            delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
            scrollTop = $ct.scrollTop();

            // Reaching the top-most of the div.
            if ( delta > 0 && scrollTop <= 0 ) {

                // Try to load older messages.
                try {
                    this.getOlderMessages();
                } catch(e) {}

                return false;
            }

            height = $ct.outerHeight();
            scrollHeight = $ct[0].scrollHeight;

            // Reaching the bottom-most of the div.
            if ( delta < 0 && scrollTop >= scrollHeight - height ) {
                return false;
            }

            return true;
        }

    });

})( joms_libs.$, joms_libs._, joms_libs.Backbone );

},{"./util":8}],6:[function(require,module,exports){
(function( $, _, Backbone, observer ) {

    var util = require( './util' );

    /**
     * Conversation notification view.
     * @class
     */
    function Notification() {
        $( $.proxy( this.initialize, this ) );
    }

    Notification.prototype = {

        initialize: function() {
            this.$el = $( '.joms-js--notification-chat-list' ).add( '.joms-js--notification-chat-list-mobile' );
            this.$popover = $( '.joms-popover--toolbar-chat' );
            this.$counter = $( '.joms-js--notiflabel-chat' );

            observer.add_action( 'chat_conversation_render', this.render, 10, 1, this );
            observer.add_action( 'chat_set_notification_label', this.updateCounter, 10, 1, this );
            observer.add_action( 'chat_set_notification_label_seen', this.markItemAsRead, 10, 1, this );
            observer.add_action( 'chat_set_notification_label_unread', this.markItemAsUnread, 10, 1, this );
            observer.add_action( 'chat_move_notification_to_top', this.moveItemToTop, 10, 1, this );
            observer.add_action( 'chat_removemove_notification', this.removeItem, 10, 1, this );

            $( document ).on( 'click', '.joms-js-chat-notif', $.proxy( this.onItemClick, this ) );

            this.$popover.on('wheel', function(e) {
                var height = $(this).height();
                var scrollHeight = this.scrollHeight;
                var scrollTop = this.scrollTop;
                var delta = e.originalEvent.deltaY;
                var dir = delta > 0 ? 'down' : 'up'; 
                if((scrollTop === (scrollHeight - height) && dir === 'down')) {
                    e.preventDefault();
                }

                if (scrollTop === 0 && dir === 'up') {
                    e.preventDefault();
                }
            });
        },

        render: function( data ) {
            $('.joms-popover--toolbar-chat .joms-js--loading').hide();

            $('.joms-popover--toolbar-chat .joms-button--full').show();
            
            if (!Object.keys(data).length) {
                $('.joms-popover--toolbar-chat .joms-js--empty').show();
                return;
            }

            var baseURI = joms.getData( 'chat_base_uri' ),
                html = '',
                template;

            if ( ! ( template = this._renderTemplate ) ) {
                template = joms.getData( 'chat_template_notification_item' );
                template = this._renderTemplate = util.template( template );
            }

            data = $.extend( {}, data || {} );

            _.each( data, function( item ) {
                item.name = util.formatName( item.name );

                // Normalize avatar url.
                if ( item.thumb && ! item.thumb.match( /^https?:\/\//i ) ) {
                    item.thumb = baseURI + item.thumb;
                }

                html += template( item );
            }, this );

            $('.joms-popover--toolbar-chat').each( function(i, e) {
                $(e).children( '.joms-js--empty' ).hide();
                var btnfull = $(e).find('.joms-button--full');
                $(html).insertBefore(btnfull);
            });
        },

        updateCounter: function( newValue ) {
            var oldValue = +this.$counter.text();
            if ( +newValue !== oldValue ) {
                this.$counter.text( +newValue || '' );
            }
        },

        markItemAsRead: function( id ) {
            this.$popover.find( '.joms-js-chat-notif-' + id ).removeClass( 'unread' );
        },

        markItemAsUnread: function( id ) {
            this.$popover.find( '.joms-js-chat-notif-' + id ).addClass( 'unread' );
        },

        moveItemToTop: function( list ) {
            _.each( list, function( item ) {
                this.$popover.each(function() {
                    $( this ).prepend( $( this ).find( '.joms-js-chat-notif-' + item.chat_id ) );
                });
            }, this );
        },

        removeItem: function( id ) {
            this.$popover.find( '.joms-js-chat-notif-' + id ).remove();
        },

        onItemClick: function( e ) {
            var $item = $( e.currentTarget ),
                id = $item.data( 'chat-id' ),
                isChatView = joms.getData( 'is_chat_view' ),
                chatURI = joms.getData( 'chat_uri' ),
                $popover;

            e.preventDefault();
            e.stopPropagation();

            if ( isChatView ) {
                $popover = $( '.joms-popover--toolbar-chat' );
                $popover.hide();
                $popover.closest( '.joms-popup__wrapper' ).click();
                observer.do_action( 'chat_open_window_by_chat_id', id );
                observer.do_action( 'chat_sidebar_select', id );
                observer.do_action( 'chat_set_location_hash', id );
                return;
            }

            window.location = chatURI+ '#' + id;
        }

    };

    module.exports = Notification;

})( joms_libs.$, joms_libs._, joms_libs.Backbone, joms_observer );

},{"./util":8}],7:[function(require,module,exports){
(function( $, _, Backbone ) {

    var util = require( './util' );

    /**
     * Conversation sidebar view.
     * @class {Backbone.View}
     */
    module.exports = Backbone.View.extend({

        el: '.joms-chat__conversations-wrapper',

        events: {
            'click .joms-chat__item': 'itemSelect',
            'wheel .joms-js-list': 'scrollSidebar',
            'keyup .joms-chat__search_conversation': 'searchConversation'
        },

        initialize: function () {
            this.$list = this.$('.joms-js-list');
            this.$loading = this.$list.find('.joms-js--chat-sidebar-loading');
            this.$notice = this.$('.joms-js-notice');
            this.$searchInput = this.$('.joms-chat__search_conversation');
            this.no_conversation_left = false;
            this.limit = +joms.getData('message_sidebar_softlimit');

            joms_observer.add_action('chat_user_login', this.userLogin, 10, 1, this);
            joms_observer.add_action('chat_user_logout', this.userLogout, 10, 1, this);
            joms_observer.add_action('chat_conversation_render', this.renderListConversation, 1, 1, this);
            joms_observer.add_action('chat_conversation_open', this.conversationOpen, 10, 1, this);
            joms_observer.add_action('chat_update_preview_message', this.updatePreviewMessage, 10, 5, this);
            joms_observer.add_action('chat_highlight_unread_windows', this.hightlighUnreadWindows, 1, 1, this);
            joms_observer.add_action('chat_hightlight_active_window', this.highlightActiveWindow, 1, 1, this);
            joms_observer.add_action('rename_chat_title', this.renameChatTitle, 1, 1, this);
            joms_observer.add_action('chat_override_draft_chat_window', this.overrideDraftChatWindow, 1, 1, this);
            joms_observer.add_action('chat_remove_draft_conversation', this.removeDraftConversation, 1, 0, this);
            joms_observer.add_action('chat_open_first_window', this.openFirstWindow, 1, 0, this);
            joms_observer.add_action('chat_render_draft_conversation', this.renderDraftConversation, 1, 1, this);
            joms_observer.add_action('chat_open_window_by_chat_id', this.openWindowByChatId, 1, 1, this);
            joms_observer.add_action('chat_set_window_seen', this.setWindowSeen, 1, 1, this);
            joms_observer.add_action('chat_move_window_to_top', this.moveWindowToTop, 1, 1, this);
            joms_observer.add_action('chat_remove_window', this.removeWindow, 1, 1, this);
            joms_observer.add_action('chat_mute', this.muteChat, 1, 1, this);
        },

        /**
         * Update sidebar on login event.
         */
        userLogin: function () {
            this.$loading.hide();
            this.$notice.hide();
            this.$list.show();
        },

        /**
         * Update sidebar on logout event.
         */
        userLogout: function () {
            this.$loading.hide();
            this.$list.hide();
            this.$notice.show();
        },

        searchConversation: function(e) {
            var keyword = this.$searchInput.val().toLowerCase();
            if (!keyword) {
                this.$list.find('.joms-chat__item').show();
                return;
            }

            if (e.which < 112 && e.which > 47 || e.which === 8 || e.which === 16) {
                var items = this.$list.find('.joms-chat__item');
                items.hide();
                _.each(items, function(item) {
                    var name = $(item).find('a').text().toLowerCase();
                    if (name.indexOf(keyword) > -1) {
                        $(item).show();
                    }
                });
            }
        },

        scrollSidebar: function(e) {
            var height = this.$list.height();
            var scrollHeight = this.$list[0].scrollHeight;
            var scrollTop = this.$list[0].scrollTop;
            var delta = e.originalEvent.deltaY;
            var dir = delta > 0 ? 'down' : 'up'; 
            if((scrollTop === (scrollHeight - height) && dir === 'down')) {
                e.preventDefault();
                if (!this.no_conversation_left) {
                    if ( this.$loading.is(':hidden')) {
                        this.$list.append(this.$loading);
                        this.$loading.show();

                        var ids = [];
                        var items = this.$list.find('.joms-chat__item');
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            ids.push(this.$(item).attr('data-chat-id'));
                        }                  
                        this.loadMoreConversation(JSON.stringify(ids));
                    }
                }
            }

            if (scrollTop === 0 && dir === 'up') {
                e.preventDefault();
            }
        },

        loadMoreConversation: function(ids) {
            var self = this;
            joms.ajax({
                func: 'chat,ajaxInitializeChatData',
                data: [ids],
                callback: function(data) {
                    var numList = Object.keys(data.list).length;
                    if (numList) {
                        joms_observer.do_action( 'chat_conversation_render', data.list );
                        joms_observer.do_action('chat_add_conversions', data.list);
                    }

                    if (numList < self.limit) {
                        self.no_conversation_left = true;                        
                    }
                    
                    var numBudy = Object.keys(data.buddies).length;
                    if (numBudy) {
                        for( var key in data.buddies) {
                            var budy = data.buddies[key];
                            joms_observer.do_action('chat_buddy_add', budy.id, budy.name, budy.avatar);
                        }
                    }
                    self.$loading.hide();
                }
            });
        },

        muteChat: function(mute) {
            var mute_icon = [
                '<div class="joms-chat__item-actions">',
                    '<svg viewBox="0 0 16 16" class="joms-icon">',
                      '<use xlink:href="#joms-icon-close"></use>',
                    '</svg>',
                '</div>'
            ].join('');
            var active = this.$list.find('.active');
            if (mute) {
                active.find('.joms-chat__item-actions').remove();
            } else {
                active.append(mute_icon);
            }
        },

        removeWindow: function(chat_id) {
            this.$list.find('.joms-js--chat-item-'+chat_id).remove();
        },

        moveWindowToTop: function(list) {
            for (var i = 0; i < list.length; i++) {
                var item = this.$list.find('.joms-js--chat-item-'+list[i].chat_id);
                this.$list.prepend(item);
            }
        },

        setWindowSeen: function(chat_id) {
            this.$list.find('.joms-js--chat-item-'+chat_id).removeClass('unread');
        },

        renderDraftConversation: function( data ) {
            var template = util.getTemplateById( 'joms-js-template-chat-sidebar-draft' ),
                html = template();

            this.$list.prepend( html );
            this.$list.find('.joms-js--remove-draft').on('click', function() {
                joms_observer.do_action('chat_remove_draft_conversation');
            });
        },

        openFirstWindow: function () {
            var item = this.$list.find('.joms-chat__item').first(),
                chat_id = item.data('chat-id');
            if (chat_id) {
                this.itemSetActive(item);
                joms_observer.do_action('chat_sidebar_select', item.data('chat-id'));
            }
        },

        openWindowByChatId: function(chat_id) {
            var item = this.$list.find('.joms-js--chat-item-'+chat_id);
            this.itemSetActive(item);
            joms_observer.do_action('chat_sidebar_select', chat_id);
        },

        removeDraftConversation: function () {
            this.$list.find('.joms-js--chat-item-0').remove();
        },

        overrideDraftChatWindow: function (data) {
            var item = $(this.$list.find('.active')),
                avatar = item.find('.joms-avatar img');
            item.attr('data-chat-type', data.type);
            item.attr('data-chat-id', data.chat_id);
            item.removeClass('joms-js--chat-item-0').addClass('joms-js--chat-item-' + data.chat_id);
            avatar.attr('src', data.thumb);
        },

        renameChatTitle: function (name) {
            var item = this.$list.find('.active').find('.joms-chat__item-body a');
            item.text(name);
        },

        /**
         * Render all conversation items.
         * @param {object[]} data
         */
        renderListConversation: function( data ) {
            var $startScreen = $('.joms-js-page-chat-loading'),
                $chatScreen = $('.joms-js-page-chat'),
                key;

            if ( $chatScreen.is(':hidden') ) {
                $chatScreen.show();
                $startScreen.hide();
            }

            for (key in data) {
                this.render(data[key]);
            }
        },

        /**
         * Render a conversation item.
         * @param {object} data
         */
        render: function( data ) {
            var template = util.getTemplateById( 'joms-js-template-chat-sidebar-item' ),
                isActive = false,
                isUnread = ! ( +data.seen ),
                html, $item;

            // Check if item is already exist.
            $item = this.$list.children( '.joms-js--chat-item-' + data.chat_id );
            if ( $item.length && $item.hasClass( 'active' ) ) {
                isActive = true;
                isUnread = false;
            }

            // Generate html from template.
            html = template({
                id: data.chat_id,
                type: data.type,
                name: util.formatName( data.name ),
                unread: isUnread,
                active: isActive,
                online: data.online,
                avatar: data.thumb
            });

            if ( $item.length ) {
                $item.replaceWith( html );
            } else {
                this.$list.append( html );
            }
        },

        prependRender: function( data ) {
            var template = joms.getData( 'chat_page_list' ) || '',
                html;

            html = template
                .replace(/##type##/g, data.type)
                .replace(/##chat_id##/g, data.chat_id)
                .replace(/##name##/g, data.name)
                .replace(/##thumb##/g, data.thumb)
                .replace(/##unread##/g, '')
                .replace(/##mute##/g, '');

            this.$list.prepend(html);
        },

        /**
         * Show particular conversation item.
         * @param {HTMLEvent} e
         */
        itemSelect: function (e) {
            e.preventDefault();
            var $item = $(e.currentTarget),
                chatId = $item.data('chat-id');
            this.itemSetActive($item);
            if (this.$searchInput.val()) {
                this.$searchInput.val('');
                this.$list.find('.joms-chat__item').show();
            }
            joms_observer.do_action('chat_sidebar_select', chatId);
            if (chatId > 0) {
                joms_observer.do_action('chat_selector_hide');
            } else {
                joms_observer.do_action('chat_selector_show');
            }
        },

        /**
         * Set active item on conversation open.
         * @param {jQuery} $item
         */
        itemSetActive: function ($item) {
            $item.siblings('.active').removeClass('active');
            $item.removeClass('unread').addClass('active');
        },

        /**
         * Handle open conversation.
         * @param {number} userId
         */
        conversationOpen: function (chatId) {
            var $item = this.$list.find('.joms-js--chat-item-' + chatId);
            if ($item.length) {
                this.itemSetActive($item);
            }
        },

        /**
         * Change display message below avatar.
         * @param {object} message
         * @param {object} active
         */
        updatePreviewMessage: function (message, active) {
            var $item;
            if (active && active.user_id) {
                $item = this.$list.find('.joms-js--chat-item-user-' + active.user_id);
                if ($item.length) {
                    $item.find('.joms-js--chat-item-msg').text(message);
                }
            }
        },

        /**
         * Highlight active sidebar item.
         * @param {Number} chat_id
         */
        highlightActiveWindow: function( chat_id ) {
            var $item = this.$list.find( '.joms-js--chat-item-' + chat_id );
            this.itemSetActive( $item );
        },

        /**
         * Highlight unread sidebar items.
         * @param {Object[]} data
         */
        hightlighUnreadWindows: function( data ) {
            _.each( data, function( item ) {
                var $item = this.$( '.joms-js--chat-item-' + item.chat_id );
                if ( ! $item.hasClass( 'active' ) ) {
                    $item.addClass( 'unread' );
                }
            }, this );
        }

    });

})( joms_libs.$, joms_libs._, joms_libs.Backbone );

},{"./util":8}],8:[function(require,module,exports){
(function( _ ) {

    var lang = window.joms_lang && joms_lang.date || {},
        moment = require( 'moment' ),
        templatesCache = {};

    moment.defineLocale( 'jomsocial', {
        parentLocale: 'en',
        months: lang.months,
        monthsShort: _.map( lang.months, function( s ) { return s.substr( 0, 3 ); }),
        weekdays: lang.days,
        weekdaysShort: _.map( lang.days, function( s ) { return s.substr( 0, 3 ); }),
        weekdaysMin: _.map( lang.days, function( s ) { return s.substr( 0, 2 ); })
    });

    module.exports = {

        /**
         * Underscore template wrapper.
         * @param {String} templateString
         * @return {Function}
         */
        template: function( templateString, settings ) {
            return _.template( templateString, {
                variable: 'data',
                evaluate: /\{\{([\s\S]+?)\}\}/g,
                interpolate: /\{\{=([\s\S]+?)\}\}/g,
                escape: /\{\{-([\s\S]+?)\}\}/g
            } );
        },

        /**
         * Get template already defined in the HTML document.
         * @param {String} id
         * @return {Function}
         */
        getTemplateById: function( id ) {
            var template = templatesCache[ id ];

            if ( ! template ) {
                template = document.getElementById( id ).innerText;
                // HACK: Joomla (or is it the browser?) is automatically added relative path after an `src="` string. Duh!
                template = template.replace( /(src|href)="[^"]+\{\{/g, '$1="{{' );
                template = templatesCache[ id ] = this.template( template );
            }

            return template;
        },

        /**
         * Format timestamp to a human-readable date string.
         * @param {Number} timestamp
         * @return {String}
         */
        formatDate: function( timestamp ) {
            var now = moment(),
                date = moment( timestamp ),
                format = 'D MMM';

            if ( now.year() !== date.year() ) {
                format = 'D/MMM/YY';
            }

            return date.format( format );
        },

        /**
         * Format timestamp to a human-readable time string.
         * @param {Number} timestamp
         * @return {String}
         */
        formatTime: function( timestamp ) {
            var time = moment( timestamp ),
                format = joms.getData( 'chat_time_format' ) || 'g:i A';

            // PHP-to-Moment time format conversion.
            format = format
                .replace( /[GH]/g, 'H' )
                .replace( /[gh]/g, 'h' )
                .replace( /i/ig, 'mm' )
                .replace( /s/ig, 'ss' );

            return time.format( format );
        },

        /**
         * Format timestamp to a human-readable datetime string.
         * @param {Number} timestamp
         * @return {String}
         */
        formatDateTime: function( timestamp ) {
            var dateStr = this.formatDate( timestamp ),
                timeStr = this.formatTime( timestamp );

            return dateStr + ' ' + timeStr;
        },

        /**
         * Format name to proper punctuation.
         * @param {String|String[]} names
         * @return {String}
         */
        formatName: function( names ) {
            var textAnd = joms.getData( 'chat_text_and' );

            if ( ! _.isArray( names ) ) {
                names = [ names ];
            }

            if ( names.length === 1 ) {
                return names[0];
            }

            if ( names.length > 1 ) {
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
                names = names.replace( /,\s([^\s]*)$/, ' ' + textAnd + ' $1' );
                return names;
            }

            return '';
        },

        /**
         * Convert emoticon code into actual emoticon.
         * @param {String} str
         * @return {String}
         */
        getEmoticon: function( str ) {
            var emoticons = {
                happy2    : /(:happy:|:\)\))/g,         // [ ':happy:', ':))' ]
                smiley2   : /(:smile:|:\)|:-\))/g,      // [ ':smile:', ':)', ':-)' ]
                tongue2   : /(:tongue:|:p|:P)/g,        // [ ':tongue:', ':p', ':P' ]
                wink2     : /(:wink:|;\))/g,            // [ ':wink:', ';)' ]
                cool2     : /(:cool:|B\))/g,            // [ ':cool:', 'B)' ]
                angry2    : /(:angry:|>:\(|&gt;:\()/g,  // [ ':angry:', '>:(', '&gt;:(' ]
                sad2      : /(:sad:|:\()/g,             // [ ':sad:', ':(' ]
                evil2     : /(:evil:|>:D|&gt;:D)/g,     // [ ':evil:', '>:D', '&gt;:D' ]
                grin2     : /(:grin:|:D)/g,             // [ ':grin:', ':D' ]
                shocked2  : /(:shocked:|:o|:O)/g,       // [ ':shocked:', ':o', ':O' ]
                confused2 : /(:confused:|:\?)/g,        // [ ':confused:', ':?' ]
                neutral2  : /(:neutral:|:\|)/g,         // [ ':neutral:', ':|' ]
                heart     : /(:love:|<3|&lt;3)/g        // [ ':love:', '<3', '&lt;3' ]
            };

            _.each( emoticons, function( regex, key ) {
                var replace = '<i class="joms-status-emoticon joms-icon-' + key + '"></i>';
                str = str.replace( regex, replace );
            });

            return str;
        }

    };

})( joms_libs._ );

},{"moment":1}]},{},[2]);
