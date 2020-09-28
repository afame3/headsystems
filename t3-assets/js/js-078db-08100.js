

/*===============================
/media/jui/js/jquery-noconflict.js
================================================================================*/;
jQuery.noConflict();


/*===============================
/media/jui/js/jquery-migrate.min.js
================================================================================*/;
/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.4.1";var f={};a.migrateWarnings=[],b.console&&b.console.log&&b.console.log("JQMIGRATE: Migrate is installed"+(a.migrateMute?"":" with logging active")+", version "+a.migrateVersion),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.find,s=a.parseJSON,t=/^\s*</,u=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,v=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,w=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=w.exec(a.trim(b)))&&g[0]&&(t.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&e.context.nodeType&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):(h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.find=function(a){var b=Array.prototype.slice.call(arguments);if("string"==typeof a&&u.test(a))try{document.querySelector(a)}catch(c){a=a.replace(v,function(a,b,c,d){return"["+b+c+'"'+d+'"]'});try{document.querySelector(a),d("Attribute selector with '#' must be quoted: "+b[0]),b[0]=a}catch(e){d("Attribute selector with '#' was not fixed: "+b[0])}}return r.apply(this,b)};var x;for(x in r)Object.prototype.hasOwnProperty.call(r,x)&&(a.find[x]=r[x]);a.parseJSON=function(a){return a?s.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var y=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return y=!0,a=d.apply(this,arguments),y=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};y||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var z=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?z.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var A=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||A.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var B=a.event.add,C=a.event.remove,D=a.event.trigger,E=a.fn.toggle,F=a.fn.live,G=a.fn.die,H=a.fn.load,I="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",J=new RegExp("\\b(?:"+I+")\\b"),K=/(?:^|\s)hover(\.\S+|)\b/,L=function(b){return"string"!=typeof b||a.event.special.hover?b:(K.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(K,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&J.test(b)&&d("AJAX events should be attached to document: "+b),B.call(this,a,L(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){C.call(this,a,L(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return"load"===c&&"string"==typeof a[0]?H.apply(this,a):(d("jQuery.fn."+c+"() is deprecated"),a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return E.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),F?F.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),G?G.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||J.test(a)||d("Global events are undocumented and deprecated"),D.call(this,a,b,c||document,e)},a.each(I.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){this===document&&d("'ready' event is deprecated")}};var M=a.fn.andSelf||a.fn.addBack,N=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),M.apply(this,arguments)},a.fn.find=function(a){var b=N.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var O=a.Deferred,P=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=O(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(P,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);


/*===============================
/media/system/js/punycode.js
================================================================================*/;
/*! https://mths.be/punycode v1.4.1 by @mathias - do not update to v2 */
!function(a){function b(a){throw new RangeError(E[a])}function c(a,b){for(var c=a.length,d=[];c--;)d[c]=b(a[c]);return d}function d(a,b){var d=a.split("@"),e="";d.length>1&&(e=d[0]+"@",a=d[1]),a=a.replace(D,".");var f=a.split("."),g=c(f,b).join(".");return e+g}function e(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function f(a){return c(a,function(a){var b="";return a>65535&&(a-=65536,b+=H(a>>>10&1023|55296),a=56320|1023&a),b+=H(a)}).join("")}function g(a){return 10>a-48?a-22:26>a-65?a-65:26>a-97?a-97:t}function h(a,b){return a+22+75*(26>a)-((0!=b)<<5)}function i(a,b,c){var d=0;for(a=c?G(a/x):a>>1,a+=G(a/b);a>F*v>>1;d+=t)a=G(a/F);return G(d+(F+1)*a/(a+w))}function j(a){var c,d,e,h,j,k,l,m,n,o,p=[],q=a.length,r=0,w=z,x=y;for(d=a.lastIndexOf(A),0>d&&(d=0),e=0;d>e;++e)a.charCodeAt(e)>=128&&b("not-basic"),p.push(a.charCodeAt(e));for(h=d>0?d+1:0;q>h;){for(j=r,k=1,l=t;h>=q&&b("invalid-input"),m=g(a.charCodeAt(h++)),(m>=t||m>G((s-r)/k))&&b("overflow"),r+=m*k,n=x>=l?u:l>=x+v?v:l-x,!(n>m);l+=t)o=t-n,k>G(s/o)&&b("overflow"),k*=o;c=p.length+1,x=i(r-j,c,0==j),G(r/c)>s-w&&b("overflow"),w+=G(r/c),r%=c,p.splice(r++,0,w)}return f(p)}function k(a){var c,d,f,g,j,k,l,m,n,o,p,q,r,w,x,B=[];for(a=e(a),q=a.length,c=z,d=0,j=y,k=0;q>k;++k)p=a[k],128>p&&B.push(H(p));for(f=g=B.length,g&&B.push(A);q>f;){for(l=s,k=0;q>k;++k)p=a[k],p>=c&&l>p&&(l=p);for(r=f+1,l-c>G((s-d)/r)&&b("overflow"),d+=(l-c)*r,c=l,k=0;q>k;++k)if(p=a[k],c>p&&++d>s&&b("overflow"),p==c){for(m=d,n=t;o=j>=n?u:n>=j+v?v:n-j,!(o>m);n+=t)x=m-o,w=t-o,B.push(H(h(o+x%w,0))),m=G(x/w);B.push(H(h(m,0))),j=i(d,r,f==g),d=0,++f}++d,++c}return B.join("")}function l(a){return d(a,function(a){return B.test(a)?j(a.slice(4).toLowerCase()):a})}function m(a){return d(a,function(a){return C.test(a)?"xn--"+k(a):a})}var n="object"==typeof exports&&exports&&!exports.nodeType&&exports,o="object"==typeof module&&module&&!module.nodeType&&module,p="object"==typeof global&&global;(p.global===p||p.window===p||p.self===p)&&(a=p);var q,r,s=2147483647,t=36,u=1,v=26,w=38,x=700,y=72,z=128,A="-",B=/^xn--/,C=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},F=t-u,G=Math.floor,H=String.fromCharCode;if(q={version:"1.4.1",ucs2:{decode:e,encode:f},decode:j,encode:k,toASCII:m,toUnicode:l},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return q});else if(n&&o)if(module.exports==n)o.exports=q;else for(r in q)q.hasOwnProperty(r)&&(n[r]=q[r]);else a.punycode=q}(this);


/*===============================
/media/system/js/validate.js
================================================================================*/;
var JFormValidator=function(){"use strict";var t,e,a,r=function(e,a,r){r=""===r||r,t[e]={enabled:r,exec:a}},n=function(t,e){var a,r,n,i,l=e.data("label");void 0===l&&(a=e.attr("id"),r=e.get(0).form,i=jQuery(r),l=!!a&&((n=i.find("#"+a+"-lbl")).length?n:!!(n=i.find('label[for="'+a+'"]')).length&&n),e.data("label",l)),!1===t?(e.addClass("invalid").attr("aria-invalid","true"),l&&l.addClass("invalid")):(e.removeClass("invalid").attr("aria-invalid","false"),l&&l.removeClass("invalid"))},i=function(e){var a,r=jQuery(e);if(r.attr("disabled"))return n(!0,r),!0;if(r.attr("required")||r.hasClass("required"))if("fieldset"===r.prop("tagName").toLowerCase()&&(r.hasClass("radio")||r.hasClass("checkboxes"))){if(!r.find("input:checked").length)return n(!1,r),!1}else if(!r.val()||r.hasClass("placeholder")||"checkbox"===r.attr("type")&&!r.is(":checked"))return n(!1,r),!1;return a=r.attr("class")&&r.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)?r.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)[1]:"",r.attr("pattern")&&""!=r.attr("pattern")?r.val().length?(l=new RegExp("^"+r.attr("pattern")+"$").test(r.val()),n(l,r),l):r.attr("required")||r.hasClass("required")?(n(!1,r),!1):(n(!0,r),!0):""===a?(n(!0,r),!0):a&&"none"!==a&&t[a]&&r.val()&&!0!==t[a].exec(r.val(),r)?(n(!1,r),!1):(n(!0,r),!0)},l=function(t){var e,r,n,l,s,u,o=!0,d=[];for(s=0,u=(e=jQuery(t).find("input, textarea, select, fieldset")).length;s<u;s++)jQuery(e[s]).hasClass("novalidate")||!1===i(e[s])&&(o=!1,d.push(e[s]));if(jQuery.each(a,function(t,e){!0!==e.exec()&&(o=!1)}),!o&&d.length>0){for(r=Joomla.JText._("JLIB_FORM_FIELD_INVALID"),n={error:[]},s=d.length-1;s>=0;s--)(l=jQuery(d[s]).data("label"))&&n.error.push(r+l.text().replace("*",""));Joomla.renderMessages(n)}return o},s=function(t){for(var a,r=[],n=jQuery(t),s=0,u=(a=n.find("input, textarea, select, fieldset, button")).length;s<u;s++){var o=jQuery(a[s]),d=o.prop("tagName").toLowerCase();"input"!==d&&"button"!==d||"submit"!==o.attr("type")&&"image"!==o.attr("type")?"button"===d||"input"===d&&"button"===o.attr("type")||(o.hasClass("required")&&o.attr("aria-required","true").attr("required","required"),"fieldset"!==d&&(o.on("blur",function(){return i(this)}),o.hasClass("validate-email")&&e&&a[s].setAttribute("type","email")),r.push(o)):o.hasClass("validate")&&o.on("click",function(){return l(t)})}n.data("inputfields",r)};return function(){var n;t={},a=a||{},(n=document.createElement("input")).setAttribute("type","email"),e="text"!==n.type,r("username",function(t,e){return!new RegExp("[<|>|\"|'|%|;|(|)|&]","i").test(t)}),r("password",function(t,e){return/^\S[\S]{2,98}\S$/.test(t)}),r("numeric",function(t,e){return/^(\d|-)?(\d|,)*\.?\d*$/.test(t)}),r("email",function(t,e){return t=punycode.toASCII(t),/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)});for(var i=jQuery("form.form-validate"),l=0,u=i.length;l<u;l++)s(i[l])}(),{isValid:l,validate:i,setHandler:r,attachToForm:s,custom:a}};document.formvalidator=null,jQuery(function(){document.formvalidator=new JFormValidator});


/*===============================
/media/system/js/html5fallback.js
================================================================================*/;
!function(a,b,c){"use strict";"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b});var d=function(a,b){for(var c=["required","pattern","placeholder","autofocus","formnovalidate"],d=["email","url","number","range"],e={attributes:{},types:{}};b=c.pop();)e.attributes[b]=!!(b in a);for(;b=d.pop();)a.setAttribute("type",b),e.types[b]=a.type==b;return e}(b.createElement("input")),e={init:function(b,c){var d=this;d.elem=c,d.$elem=a(c),c.H5Form=d,d.options=a.extend({},a.fn.h5f.options,b),"form"===c.nodeName.toLowerCase()&&d.bindWithForm(d.elem,d.$elem)},bindWithForm:function(a,b){var i,e=this,f=!!b.attr("novalidate"),g=a.elements,h=g.length;for("onSubmit"===e.options.formValidationEvent&&b.on("submit",function(a){i=this.H5Form.donotValidate!==c&&this.H5Form.donotValidate,i||f||e.validateForm(e)?b.find(":input").each(function(){e.placeholder(e,this,"submit")}):(a.preventDefault(),this.donotValidate=!1)}),b.on("focusout focusin",function(a){e.placeholder(e,a.target,a.type)}),b.on("focusout change",e.validateField),b.find("fieldset").on("change",function(){e.validateField(this)}),d.attributes.formnovalidate||b.find(":submit[formnovalidate]").on("click",function(){e.donotValidate=!0});h--;)e.polyfill(g[h]),e.autofocus(e,g[h])},polyfill:function(a){if("form"===a.nodeName.toLowerCase())return!0;var b=a.form.H5Form;b.placeholder(b,a),b.numberType(b,a)},validateForm:function(){var f,g,a=this,b=a.elem,c=b.elements,d=c.length,e=!0;for(b.isValid=!0,f=0;f<d;f++)g=c[f],g.isRequired=!!g.required,g.isDisabled&&(g.isDisabled=!!g.disabled),g.isDisabled||(e=a.validateField(g),b.isValid&&!e&&a.setFocusOn(g),b.isValid=e&&b.isValid);return a.options.doRenderMessage&&a.renderErrorMessages(a,b),b.isValid},validateField:function(b){var j,k,l,e=b.target||b,f=!1,g=!1,h=!1,i=!1;return e.form===c?null:(j=e.form.H5Form,k=a(e),g=!!k.attr("required"),h=!!k.attr("disabled"),e.isDisabled||(f=!d.attributes.required&&g&&j.isValueMissing(j,e),i=!d.attributes.pattern&&j.matchPattern(j,e)),e.validityState={valueMissing:f,patternMismatch:i,valid:e.isDisabled||!(f||i)},d.attributes.required||(e.validityState.valueMissing?k.addClass(j.options.requiredClass):k.removeClass(j.options.requiredClass)),d.attributespattern||(e.validityState.patternMismatch?k.addClass(j.options.patternClass):k.removeClass(j.options.patternClass)),e.validityState.valid?(k.removeClass(j.options.invalidClass),l=j.findLabel(k),l.removeClass(j.options.invalidClass),l.attr("aria-invalid","false")):(k.addClass(j.options.invalidClass),l=j.findLabel(k),l.addClass(j.options.invalidClass),l.attr("aria-invalid","true")),e.validityState.valid)},isValueMissing:function(e,f){var k,l,m,g=a(f),h=f.type!==c?f.type:f.tagName.toLowerCase(),i=/^(checkbox|radio|fieldset)$/i.test(h),j=/^submit$/i.test(h);if(j)return!1;if(i){if("checkbox"===h)return!g.is(":checked");for(k="fieldset"===h?g.find("input"):b.getElementsByName(f.name),l=0,m=k.length;l<m;l++)if(a(k[l]).is(":checked"))return!1;return!0}return!(""!==g.val()&&(d.attributes.placeholder||!g.hasClass(e.options.placeholderClass)))},matchPattern:function(b,e){var j,k,f=a(e),g=f.attr("value"),h=f.attr("pattern"),i=f.attr("type");if(!d.attributes.placeholder&&f.attr("placeholder")&&f.hasClass(b.options.placeholderClass)||(g=f.attr("value")),""===g)return!1;if("email"===i){if(f.attr("multiple")===c)return!b.options.emailPatt.test(g);for(g=g.split(b.options.mutipleDelimiter),j=0,k=g.length;j<k;j++)if(!b.options.emailPatt.test(g[j].replace(/[ ]*/g,"")))return!0}else{if("url"===i)return!b.options.urlPatt.test(g);if("text"===i&&h!==c)return usrPatt=new RegExp("^(?:"+h+")$"),!usrPatt.test(g)}return!1},placeholder:function(b,e,f){var g=a(e),h=g.attr("placeholder"),i=/^(focusin|submit)$/i.test(f),j=/^(input|textarea)$/i.test(e.nodeName),k=/^password$/i.test(e.type),l=d.attributes.placeholder;l||!j||k||h===c||(""!==e.value||i?e.value===h&&i&&(e.value="",g.removeClass(b.options.placeholderClass)):(e.value=h,g.addClass(b.options.placeholderClass)))},numberType:function(b,c){var i,j,k,l,m,n,o,p,e=a(c),f=e.attr("type"),g=/^input$/i.test(c.nodeName),h=/^(number|range)$/i.test(f);if(!(!g||!h||"number"==f&&d.types.number||"range"==f&&d.types.range)){for(i=parseInt(e.attr("min")),j=parseInt(e.attr("max")),k=parseInt(e.attr("step")),l=parseInt(e.attr("value")),m=e.prop("attributes"),n=a("<select>"),i=isNaN(i)?-100:i,p=i;p<=j;p+=k)o=a('<option value="'+p+'">'+p+"</option>"),(l==p||l>p&&l<p+k)&&o.attr("selected",""),n.append(o);a.each(m,function(){n.attr(this.name,this.value)}),e.replaceWith(n)}},autofocus:function(b,c){var e=a(c),f=!!e.attr("autofocus"),g=/^(input|textarea|select|fieldset)$/i.test(c.nodeName),h=/^submit$/i.test(c.type),i=d.attributes.autofocus;!i&&g&&!h&&f&&a(function(){b.setFocusOn(c)})},findLabel:function(b){var d,c=a('label[for="'+b.attr("id")+'"]');return c.length<=0&&(d=b.parent(),"label"==d.get(0).tagName.toLowerCase()&&(c=d)),c},setFocusOn:function(b){"fieldset"===b.tagName.toLowerCase()?a(b).find(":first").focus():a(b).focus()},renderErrorMessages:function(b,c){for(var g,h,d=c.elements,e=d.length,f={errors:[]};e--;)g=a(d[e]),h=b.findLabel(g),g.hasClass(b.options.requiredClass)&&(f.errors[e]=h.text().replace("*","")+b.options.requiredMessage),g.hasClass(b.options.patternClass)&&(f.errors[e]=h.text().replace("*","")+b.options.patternMessage);f.errors.length>0&&Joomla.renderMessages(f)}};a.fn.h5f=function(a){return this.each(function(){Object.create(e).init(a,this)})},a.fn.h5f.options={invalidClass:"invalid",requiredClass:"required",requiredMessage:" is required.",placeholderClass:"placeholder",patternClass:"pattern",patternMessage:" doesn't match pattern.",doRenderMessage:!1,formValidationEvent:"onSubmit",emailPatt:/^[a-zA-Z0-9.!#$%&‚Äô*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,urlPatt:/[a-z][\-\.+a-z]*:\/\//i},a(function(){a("form").h5f({doRenderMessage:!0,requiredClass:"musthavevalue"})})}(jQuery,document);


/*===============================
/plugins/system/t3/base-bs3/bootstrap/js/bootstrap.js
================================================================================*/;
/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function($){'use strict';var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0]<2&&version[1]<9)||(version[0]==1&&version[1]==9&&version[2]<1)||(version[0]>3)){throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.4.1'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
selector=selector==='#'?[]:selector
var $parent=$(document).find(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.4.1'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state+='Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d).prop(d,true)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d).prop(d,false)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked'))changed=false
$parent.find('.active').removeClass('active')
this.$element.addClass('active')}else if($input.prop('type')=='checkbox'){if(($input.prop('checked'))!==this.$element.hasClass('active'))changed=false
this.$element.toggleClass('active')}
$input.prop('checked',this.$element.hasClass('active'))
if(changed)$input.trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))
this.$element.toggleClass('active')}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target).closest('.btn')
Plugin.call($btn,'toggle')
if(!($(e.target).is('input[type="radio"], input[type="checkbox"]'))){e.preventDefault()
if($btn.is('input,button'))$btn.trigger('focus')
else $btn.find('input:visible,button:visible').first().trigger('focus')}}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart'in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.4.1'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true,keyboard:true}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
if(typeof $next==='object'&&$next.length){$next[0].offsetWidth}
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var $this=$(this)
var href=$this.attr('href')
if(href){href=href.replace(/.*(?=#[^\s]+$)/,'')}
var target=$this.attr('data-target')||href
var $target=$(document).find(target)
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.4.1'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(document).find(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.4.1'
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector!=='#'?$(document).find(selector):null
return $parent&&$parent.length?$parent:$this.parent()}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
if(e&&e.type=='click'&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',relatedTarget))})}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger($.Event('shown.bs.dropdown',relatedTarget))}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('.dropdown-menu'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
this.fixedContent='.navbar-fixed-top, .navbar-fixed-bottom'
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.4.1'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(document!==e.target&&this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div')).addClass('modal-backdrop '+animate).appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
var scrollbarWidth=this.scrollbarWidth
if(this.bodyIsOverflowing){this.$body.css('padding-right',bodyPad+scrollbarWidth)
$(this.fixedContent).each(function(index,element){var actualPadding=element.style.paddingRight
var calculatedPadding=$(element).css('padding-right')
$(element).data('padding-right',actualPadding).css('padding-right',parseFloat(calculatedPadding)+scrollbarWidth+'px')})}}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)
$(this.fixedContent).each(function(index,element){var padding=$(element).data('padding-right')
$(element).removeData('padding-right')
element.style.paddingRight=padding?padding:''})}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var target=$this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,''))
var $target=$(document).find(target)
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var DISALLOWED_ATTRIBUTES=['sanitize','whiteList','sanitizeFn']
var uriAttrs=['background','cite','href','itemtype','longdesc','poster','src','xlink:href']
var ARIA_ATTRIBUTE_PATTERN=/^aria-[\w-]*$/i
var DefaultWhitelist={'*':['class','dir','id','lang','role',ARIA_ATTRIBUTE_PATTERN],a:['target','href','title','rel'],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:['src','alt','title','width','height'],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]}
var SAFE_URL_PATTERN=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi
var DATA_URL_PATTERN=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i
function allowedAttribute(attr,allowedAttributeList){var attrName=attr.nodeName.toLowerCase()
if($.inArray(attrName,allowedAttributeList)!==-1){if($.inArray(attrName,uriAttrs)!==-1){return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN)||attr.nodeValue.match(DATA_URL_PATTERN))}
return true}
var regExp=$(allowedAttributeList).filter(function(index,value){return value instanceof RegExp})
for(var i=0,l=regExp.length;i<l;i++){if(attrName.match(regExp[i])){return true}}
return false}
function sanitizeHtml(unsafeHtml,whiteList,sanitizeFn){if(unsafeHtml.length===0){return unsafeHtml}
if(sanitizeFn&&typeof sanitizeFn==='function'){return sanitizeFn(unsafeHtml)}
if(!document.implementation||!document.implementation.createHTMLDocument){return unsafeHtml}
var createdDocument=document.implementation.createHTMLDocument('sanitization')
createdDocument.body.innerHTML=unsafeHtml
var whitelistKeys=$.map(whiteList,function(el,i){return i})
var elements=$(createdDocument.body).find('*')
for(var i=0,len=elements.length;i<len;i++){var el=elements[i]
var elName=el.nodeName.toLowerCase()
if($.inArray(elName,whitelistKeys)===-1){el.parentNode.removeChild(el)
continue}
var attributeList=$.map(el.attributes,function(el){return el})
var whitelistedAttributes=[].concat(whiteList['*']||[],whiteList[elName]||[])
for(var j=0,len2=attributeList.length;j<len2;j++){if(!allowedAttribute(attributeList[j],whitelistedAttributes)){el.removeAttribute(attributeList[j].nodeName)}}}
return createdDocument.body.innerHTML}
var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.inState=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.4.1'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0},sanitize:true,sanitizeFn:null,whiteList:DefaultWhitelist}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(document).find($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):(this.options.viewport.selector||this.options.viewport))
this.inState={click:false,hover:false,focus:false}
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){var dataAttributes=this.$element.data()
for(var dataAttr in dataAttributes){if(dataAttributes.hasOwnProperty(dataAttr)&&$.inArray(dataAttr,DISALLOWED_ATTRIBUTES)!==-1){delete dataAttributes[dataAttr]}}
options=$.extend({},this.getDefaults(),dataAttributes,options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
if(options.sanitize){options.template=sanitizeHtml(options.template,options.whiteList,options.sanitizeFn)}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusin'?'focus':'hover']=true}
if(self.tip().hasClass('in')||self.hoverState=='in'){self.hoverState='in'
return}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState){if(this.inState[key])return true}
return false}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusout'?'focus':'hover']=false}
if(self.isInStateTrue())return
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo($(document).find(this.options.container)):$tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.'+this.type)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var viewportDim=this.getPosition(this.$viewport)
placement=placement=='bottom'&&pos.bottom+actualHeight>viewportDim.bottom?'top':placement=='top'&&pos.top-actualHeight<viewportDim.top?'bottom':placement=='right'&&pos.right+actualWidth>viewportDim.width?'left':placement=='left'&&pos.left-actualWidth<viewportDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top+=marginTop
offset.left+=marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
if(this.options.html){if(this.options.sanitize){title=sanitizeHtml(title,this.options.whiteList,this.options.sanitizeFn)}
$tip.find('.tooltip-inner').html(title)}else{$tip.find('.tooltip-inner').text(title)}
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
if(that.$element){that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)}
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof $e.attr('data-original-title')!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var isSvg=window.SVGElement&&el instanceof window.SVGElement
var elOffset=isBody?{top:0,left:0}:(isSvg?null:$element.offset())
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.right){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){if(!this.$tip){this.$tip=$(this.options.template)
if(this.$tip.length!=1){throw new Error(this.type+' `template` option must consist of exactly 1 top-level element!')}}
return this.$tip}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
if(e){self.inState.click=!self.inState.click
if(self.isInStateTrue())self.enter(self)
else self.leave(self)}else{self.tip().hasClass('in')?self.leave(self):self.enter(self)}}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)
if(that.$tip){that.$tip.detach()}
that.$tip=null
that.$arrow=null
that.$viewport=null
that.$element=null})}
Tooltip.prototype.sanitizeHtml=function(unsafeHtml){return sanitizeHtml(unsafeHtml,this.options.whiteList,this.options.sanitizeFn)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.4.1'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
if(this.options.html){var typeContent=typeof content
if(this.options.sanitize){title=this.sanitizeHtml(title)
if(typeContent==='string'){content=this.sanitizeHtml(content)}}
$tip.find('.popover-title').html(title)
$tip.find('.popover-content').children().detach().end()[typeContent==='string'?'html':'append'](content)}else{$tip.find('.popover-title').text(title)
$tip.find('.popover-content').children().detach().end().text(content)}
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.4.1'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.4.1'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(document).find(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass('fade')||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
var target=this.options.target===Affix.DEFAULTS.target?$(this.options.target):$(document).find(this.options.target)
this.$target=target.on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=null
this.unpin=null
this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.4.1'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':false
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?false:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?false:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&scrollTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return false}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=Math.max($(document).height(),$(document.body).height())
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);


/*===============================
/media/system/js/polyfill.classlist.js
================================================================================*/;
(function(){"defineProperty"in Object&&function(){try{var t={};return Object.defineProperty(t,"test",{value:42}),!0}catch(e){return!1}}()||!function(t){var e=Object.prototype.hasOwnProperty("__defineGetter__"),n="Getters & setters cannot be defined on this javascript engine",o="A property cannot both have accessors and be writable or have a value";Object.defineProperty=function(r,i,c){if(t&&(r===window||r===document||r===Element.prototype||r instanceof Element))return t(r,i,c);if(null===r||!(r instanceof Object||"object"==typeof r))throw new TypeError("Object must be an object (Object.defineProperty polyfill)");if(!(c instanceof Object))throw new TypeError("Descriptor must be an object (Object.defineProperty polyfill)");var a=String(i),u="value"in c||"writable"in c,p="get"in c&&typeof c.get,l="set"in c&&typeof c.set;if(p){if("function"!==p)throw new TypeError("Getter expected a function (Object.defineProperty polyfill)");if(!e)throw new TypeError(n);if(u)throw new TypeError(o);r.__defineGetter__(a,c.get)}else r[a]=c.value;if(l){if("function"!==l)throw new TypeError("Setter expected a function (Object.defineProperty polyfill)");if(!e)throw new TypeError(n);if(u)throw new TypeError(o);r.__defineSetter__(a,c.set)}return"value"in c&&(r[a]=c.value),r}}(Object.defineProperty);var t=function(){function t(t){if(/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/.test(t))return String(t);throw new Error("InvalidCharacterError: DOM Exception 5")}function e(t){for(var e,n=-1,o={};e=t[++n];)o[e]=!0;return o}function n(t,e){var n,o=[];for(n in e)e[n]&&o.push(n);[].splice.apply(t,[0,t.length].concat(o))}var o=function(){};return o.prototype={constructor:o,item:function(t){return this[parseFloat(t)]||null},length:Array.prototype.length,toString:function(){return[].join.call(this," ")},add:function(){for(var o,r=e(this),i=0;i in arguments;++i)o=t(arguments[i]),r[o]=!0;n(this,r)},contains:function(t){return t in e(this)},remove:function(){for(var o,r=e(this),i=0;i in arguments;++i)o=t(arguments[i]),r[o]=!1;n(this,r)},toggle:function(o){var r=e(this),i=1 in arguments?!arguments[1]:t(o)in r;return r[o]=!i,n(this,r),!i}},o}();"Document"in this||(this.HTMLDocument?this.Document=this.HTMLDocument:(this.Document=this.HTMLDocument=document.constructor=new Function("return function Document() {}")(),this.Document.prototype=document)),"Element"in this&&"HTMLElement"in this||!function(){function t(){return l--||clearTimeout(e),document.body&&!document.body.prototype&&/(complete|interactive)/.test(document.readyState)?(a(document,!0),e&&document.body.prototype&&clearTimeout(e),!!document.body.prototype):!1}if(window.Element&&!window.HTMLElement)return void(window.HTMLElement=window.Element);window.Element=window.HTMLElement=new Function("return function Element() {}")();var e,n=document.appendChild(document.createElement("body")),o=n.appendChild(document.createElement("iframe")),r=o.contentWindow.document,i=Element.prototype=r.appendChild(r.createElement("*")),c={},a=function(t,e){var n,o,r,i=t.childNodes||[],u=-1;if(1===t.nodeType&&t.constructor!==Element){t.constructor=Element;for(n in c)o=c[n],t[n]=o}for(;r=e&&i[++u];)a(r,e);return t},u=document.getElementsByTagName("*"),p=document.createElement,l=100;i.attachEvent("onpropertychange",function(t){for(var e,n=t.propertyName,o=!c.hasOwnProperty(n),r=i[n],a=c[n],p=-1;e=u[++p];)1===e.nodeType&&(o||e[n]===a)&&(e[n]=r);c[n]=r}),i.constructor=Element,i.hasAttribute||(i.hasAttribute=function(t){return null!==this.getAttribute(t)}),t(!0)||(document.onreadystatechange=t,e=setInterval(t,25)),document.createElement=function(t){var e=p(String(t).toLowerCase());return a(e)},document.removeChild(n)}(),"document"in this&&"classList"in document.documentElement||Object.defineProperty(Element.prototype,"classList",{configurable:!0,get:function(){function e(){var t="object"==typeof r.className?r.className.baseVal:r.className;[].splice.apply(o,[0,o.length].concat((t||"").replace(/^\s+|\s+$/g,"").split(/\s+/)))}function n(){r.attachEvent&&r.detachEvent("onpropertychange",e),"object"==typeof r.className?r.className.baseVal=i.toString.call(o):r.className=i.toString.call(o),r.attachEvent&&r.attachEvent("onpropertychange",e)}var o,r=this,i=t.prototype,c=function(){};return c.prototype=new t,c.prototype.item=function(){return e(),i.item.apply(o,arguments)},c.prototype.toString=function(){return e(),i.toString.apply(o,arguments)},c.prototype.add=function(){return e(),i.add.apply(o,arguments),n()},c.prototype.contains=function(){return e(),i.contains.apply(o,arguments)},c.prototype.remove=function(){return e(),i.remove.apply(o,arguments),n()},c.prototype.toggle=function(t){return e(),t=i.toggle.apply(o,arguments),n(),t},o=new c,r.attachEvent&&r.attachEvent("onpropertychange",e),o}})}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof global&&global||{});


/*===============================
/media/system/js/polyfill.map.js
================================================================================*/;
(function(a){"map"in Array.prototype||(Array.prototype.map=function(c){if(this===a||null===this)throw new TypeError(this+" is not an object");if(!(c instanceof Function))throw new TypeError(c+" is not a function");for(var d=Object(this),e=arguments[1],f=d instanceof String?d.split(""):d,g=Math.max(Math.min(f.length,9007199254740991),0)||0,h=-1,i=[];++h<g;)h in f&&(i[h]=c.call(e,f[h],h,d));return i})}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof global&&global||{});


/*===============================
/media/system/js/fields/calendar-locales/en.js
================================================================================*/;
window.JoomlaCalLocale={today:"Today",weekend:[0,6],wk:"wk",time:"Time:",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],AM:"AM",PM:"PM",am:"am",pm:"pm",dateType:"gregorian",minYear:1900,maxYear:2100,exit:"Close",clear:"Clear"};


/*===============================
/media/system/js/fields/calendar-locales/date/gregorian/date-helper.min.js
================================================================================*/;
!function(t){"use strict";t.SECOND=1e3,t.MINUTE=60*t.SECOND,t.HOUR=60*t.MINUTE,t.DAY=24*t.HOUR,t.WEEK=7*t.DAY,t.prototype.setLocalDateOnly=function(e,a){if("gregorian"!=e)return"";var r=new t(a);this.setDate(1),this.setFullYear(r.getFullYear()),this.setMonth(r.getMonth()),this.setDate(r.getDate())},t.prototype.setLocalDate=function(t,e){return"gregorian"!=t?"":this.setDate(e)},t.prototype.setLocalMonth=function(t,e,a){return"gregorian"!=t?"":(void 0==a&&this.getDate(),this.setMonth(e))},t.prototype.setOtherFullYear=function(e,a){if("gregorian"!=e)return"";var r=new t(this);return r.setFullYear(a),r.getMonth()!=this.getMonth()&&this.setDate(28),this.setUTCFullYear(a)},t.prototype.setLocalFullYear=function(e,a){if("gregorian"!=e)return"";var r=new t(this);return r.setFullYear(a),r.getMonth()!=this.getMonth()&&this.setDate(28),this.setFullYear(a)},t.prototype.getLocalWeekDays=function(t,e){return 6},t.prototype.getOtherFullYear=function(t){return"gregorian"!=t?"":this.getFullYear()},t.prototype.getLocalFullYear=function(t){return"gregorian"!=t?"":this.getFullYear()},t.prototype.getLocalMonth=function(t){return"gregorian"!=t?"":this.getMonth()},t.prototype.getLocalDate=function(t){return"gregorian"!=t?"":this.getDate()},t.prototype.getLocalDay=function(t){return"gregorian"!=t?"":this.getDay()},t.prototype.getLocalMonthDays=function(t,e){if("gregorian"!=t)return"";var a=this.getFullYear();return void 0===e&&(e=this.getMonth()),0!=a%4||0==a%100&&0!=a%400||1!=e?[31,28,31,30,31,30,31,31,30,31,30,31][e]:29},t.prototype.getLocalWeekNumber=function(e){if("gregorian"!=e)return"";var a=new t(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0),r=a.getDay();a.setDate(a.getDate()-(r+6)%7+3);var o=a.valueOf();return a.setMonth(0),a.setDate(4),Math.round((o-a.valueOf())/6048e5)+1},t.prototype.getLocalDayOfYear=function(e){if("gregorian"!=e)return"";var a=new t(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0)-new t(this.getFullYear(),0,0,0,0,0);return Math.floor(a/t.DAY)},t.prototype.equalsTo=function(t){return this.getFullYear()==t.getFullYear()&&this.getMonth()==t.getMonth()&&this.getDate()==t.getDate()&&this.getHours()==t.getHours()&&this.getMinutes()==t.getMinutes()},t.localCalToGregorian=function(t,e,a){return""},t.gregorianToLocalCal=function(t,e,a){return""},t.parseFieldDate=function(e,a,r){"gregorian"!=r&&(e=t.toEnglish(e));var o=new t,n=0,s=-1,i=0,l=e.split(/\W+/),g=a.match(/%./g),u=0,h=0,c=0,p=0,f=0;for(u=0;u<l.length;++u)if(l[u])switch(g[u]){case"%d":case"%e":i=parseInt(l[u],10);break;case"%m":s=parseInt(l[u],10)-1;break;case"%Y":case"%y":(n=parseInt(l[u],10))<100&&(n+=n>29?1900:2e3);break;case"%b":case"%B":for(h=0;h<12;++h)if(JoomlaCalLocale.months[h].substr(0,l[u].length).toLowerCase()==l[u].toLowerCase()){s=h;break}break;case"%H":case"%I":case"%k":case"%l":c=parseInt(l[u],10);break;case"%P":case"%p":/pm/i.test(l[u])&&c<12?c+=12:/am/i.test(l[u])&&c>=12&&(c-=12);break;case"%M":p=parseInt(l[u],10);break;case"%S":f=parseInt(l[u],10)}if(isNaN(n)&&(n=o.getFullYear()),isNaN(s)&&(s=o.getMonth()),isNaN(i)&&(i=o.getDate()),isNaN(c)&&(c=o.getHours()),isNaN(p)&&(p=o.getMinutes()),isNaN(f)&&(f=o.getSeconds()),0!=n&&-1!=s&&0!=i)return new t(n,s,i,c,p,f);for(n=0,s=-1,i=0,u=0;u<l.length;++u)if(-1!=l[u].search(/[a-zA-Z]+/)){var D=-1;for(h=0;h<12;++h)if(JoomlaCalLocale.months[h].substr(0,l[u].length).toLowerCase()==l[u].toLowerCase()){D=h;break}-1!=D&&(-1!=s&&(i=s+1),s=D)}else parseInt(l[u],10)<=12&&-1==s?s=l[u]-1:parseInt(l[u],10)>31&&0==n?(n=parseInt(l[u],10))<100&&(n+=n>29?1900:2e3):0==i&&(i=l[u]);return 0==n&&(n=o.getFullYear()),-1!=s&&0!=i?new t(n,s,i,c,p,f):o},t.prototype.print=function(e,a,r){if("string"!=typeof a&&(e=""),a||(a="gregorian"),"string"!=typeof e&&(e=""),!e)return"";if("NaN"==this.getLocalDate(a)||!this.getLocalDate(a))return"";var o=this.getLocalMonth(a),n=this.getLocalDate(a),s=this.getLocalFullYear(a),i=this.getLocalWeekNumber(a),l=this.getDay(),g={},u=this.getHours(),h=u>=12,c=h?u-12:u,p=this.getLocalDayOfYear(a);0==c&&(c=12);var f=this.getMinutes(),D=this.getSeconds();g["%a"]=JoomlaCalLocale.shortDays[l],g["%A"]=JoomlaCalLocale.days[l],g["%b"]=JoomlaCalLocale.shortMonths[o],g["%B"]=JoomlaCalLocale.months[o],g["%C"]=1+Math.floor(s/100),g["%d"]=n<10?"0"+n:n,g["%e"]=n,g["%H"]=u<10?"0"+u:u,g["%I"]=c<10?"0"+c:c,g["%j"]=p<100?p<10?"00"+p:"0"+p:p,g["%k"]=u,g["%l"]=c,g["%m"]=o<9?"0"+(1+o):1+o,g["%M"]=f<10?"0"+f:f,g["%n"]="\n",g["%p"]=h?JoomlaCalLocale.PM:JoomlaCalLocale.AM,g["%P"]=h?JoomlaCalLocale.pm:JoomlaCalLocale.am,g["%s"]=Math.floor(this.getTime()/1e3),g["%S"]=D<10?"0"+D:D,g["%t"]="\t",g["%U"]=g["%W"]=g["%V"]=i<10?"0"+i:i,g["%u"]=l+1,g["%w"]=l,g["%y"]=(""+s).substr(2,2),g["%Y"]=s,g["%%"]="%";var L=/%./g,M=e.replace(L,function(t){return g[t]||t});return"[object Array]"===Object.prototype.toString.call(JoomlaCalLocale.localLangNumbers)&&"gregorian"!=a&&r&&(M=t.convertNumbers(M)),M}}(Date);



/*===============================
/media/system/js/fields/calendar.min.js
================================================================================*/;
!function(e,a){"use strict";Date.convertNumbers=function(e){e=e.toString();if("[object Array]"===Object.prototype.toString.call(JoomlaCalLocale.localLangNumbers))for(var a=0;a<JoomlaCalLocale.localLangNumbers.length;a++)e=e.replace(new RegExp(a,"g"),JoomlaCalLocale.localLangNumbers[a]);return e},Date.toEnglish=function(e){e=this.toString();for(var a=[0,1,2,3,4,5,6,7,8,9],t=0;t<10;t++)e=e.replace(new RegExp(a[t],"g"),t);return e};var t=function(e){if(!e)throw new Error("Calendar setup failed:\n  No valid element found, Please check your code");if("function"!=typeof Date.parseFieldDate)throw new Error("Calendar setup failed:\n  No valid date helper, Please check your code");if(e._joomlaCalendar)throw new Error("JoomlaCalendar instance already exists for the element");if(e._joomlaCalendar=this,this.writable=!0,this.hidden=!0,this.params={},this.element=e,this.inputField=e.getElementsByTagName("input")[0],this.button=e.getElementsByTagName("button")[0],!this.inputField)throw new Error("Calendar setup failed:\n  No valid input found, Please check your code");this.params={debug:!1,clicked:!1,element:{style:{display:"none"}},writable:!0};var t=this,s=this.button,r={inputField:this.inputField,dateType:JoomlaCalLocale.dateType?JoomlaCalLocale.dateType:"gregorian",direction:void 0!==a.dir?a.dir:a.getElementsByTagName("html")[0].getAttribute("dir"),firstDayOfWeek:s.getAttribute("data-firstday")?parseInt(s.getAttribute("data-firstday")):0,dateFormat:"%Y-%m-%d %H:%M:%S",weekend:JoomlaCalLocale.weekend?JoomlaCalLocale.weekend:[0,6],minYear:JoomlaCalLocale.minYear?JoomlaCalLocale.minYear:1900,maxYear:JoomlaCalLocale.maxYear?JoomlaCalLocale.maxYear:2100,minYearTmp:s.getAttribute("data-min-year"),maxYearTmp:s.getAttribute("data-max-year"),weekendTmp:s.getAttribute("data-weekend"),time24:!0,showsOthers:1===parseInt(s.getAttribute("data-show-others")),showsTime:!0,weekNumbers:1===parseInt(s.getAttribute("data-week-numbers")),showsTodayBtn:!0,compressedHeader:1===parseInt(s.getAttribute("data-only-months-nav"))};for(var o in s.getAttribute("data-dayformat")&&(r.dateFormat=s.getAttribute("data-dayformat")?s.getAttribute("data-dayformat"):"%Y-%m-%d %H:%M:%S"),s.getAttribute("data-time-24")&&(r.time24=24===parseInt(s.getAttribute("data-time-24"))),s.getAttribute("data-show-time")&&(r.showsTime=1===parseInt(s.getAttribute("data-show-time"))),s.getAttribute("data-today-btn")&&(r.showsTodayBtn=1===parseInt(s.getAttribute("data-today-btn"))),r)this.params[o]=r[o];i(t.params.minYearTmp)&&(t.params.minYear=l(parseInt(t.params.minYearTmp),t.params.dateType)),i(t.params.maxYearTmp)&&(t.params.maxYear=l(parseInt(t.params.maxYearTmp),t.params.dateType)),"undefined"!==t.params.weekendTmp&&(t.params.weekend=t.params.weekendTmp.split(",").map(function(e){return parseInt(e,10)})),this._dayMouseDown=function(e){return t._handleDayMouseDown(e)},this._calKeyEvent=function(e){return t._handleCalKeyEvent(e)},this._documentClick=function(e){return t._handleDocumentClick(e)},this.checkInputs(),this.inputField.getAttribute("readonly")||(this._create(),this._bindEvents())};t.prototype.checkInputs=function(){var e=Date.parseFieldDate(this.inputField.getAttribute("data-alt-value"),this.params.dateFormat,"gregorian");""!==this.inputField.value?(this.date=e,this.inputField.value=e.print(this.params.dateFormat,this.params.dateType,!0)):this.date=new Date},t.prototype.recreate=function(){var e=this.element,a=e.querySelector(".js-calendar");a&&(e._joomlaCalendar=null,a.parentNode.removeChild(a),new t(e))},t.prototype.updateTime=function(e,a,t){var s=this.date,r=this.date.getLocalDate(this.params.dateType),i=this.date.getLocalMonth(this.params.dateType),l=this.date.getLocalFullYear(this.params.dateType),o=this.inputField.parentNode.parentNode.querySelectorAll(".time-ampm")[0];this.params.time24||(/pm/i.test(o.value)&&e<12?e=parseInt(e)+12:/am/i.test(o.value)&&12==e&&(e=0)),s.setHours(e),s.setMinutes(parseInt(a,10)),s.setSeconds(s.getSeconds()),s.setLocalFullYear(this.params.dateType,l),s.setLocalMonth(this.params.dateType,i),s.setLocalDate(this.params.dateType,r),this.dateClicked=!1,this.callHandler()},t.prototype.setDate=function(e){e.equalsTo(this.date)||(this.date=e,this.processCalendar(this.params.firstDayOfWeek,e))},t.prototype.moveCursorBy=function(e){var a=new Date(this.date);a.setDate(a.getDate()-e),this.setDate(a)},t.prototype.resetSelected=function(e){for(var a=e.options,t=a.length;t--;){var s=a[t];s.selected&&(s.selected=!1)}},t.prototype.callHandler=function(){this.inputField.setAttribute("data-alt-value",this.date.print(this.params.dateFormat,"gregorian",!1)),this.inputField.getAttribute("data-alt-value")&&"0000-00-00 00:00:00"!==this.inputField.getAttribute("data-alt-value")&&(this.inputField.value=this.date.print(this.params.dateFormat,this.params.dateType,!0),"gregorian"!==this.params.dateType&&this.inputField.setAttribute("data-local-value",this.date.print(this.params.dateFormat,this.params.dateType,!0))),this.inputField.value=this.date.print(this.params.dateFormat,this.params.dateType,!0),"function"==typeof this.inputField.onchange&&this.inputField.onchange(),this.dateClicked&&"function"==typeof this.params.onUpdate&&this.params.onUpdate(this),this.dateClicked?this.close():this.processCalendar()},t.prototype.close=function(){this.hide()},t.prototype.show=function(){if(-1!==navigator.appName.indexOf("Internet Explorer")&&(-1===navigator.appVersion.indexOf("MSIE 9")&&-1===navigator.appVersion.indexOf("MSIE 1")&&e.jQuery&&jQuery().chosen))for(var t=this.element.getElementsByTagName("select"),s=0;s<t.length;s++)jQuery(t[s]).chosen("destroy");this.checkInputs(),this.inputField.focus(),this.dropdownElement.style.display="block",this.hidden=!1,a.addEventListener("keydown",this._calKeyEvent,!0),a.addEventListener("keypress",this._calKeyEvent,!0),a.addEventListener("mousedown",this._documentClick,!0);var r=this.element.querySelector(".js-calendar");e.innerHeight<r.getBoundingClientRect().bottom+20&&(r.style.marginTop=-(r.getBoundingClientRect().height+this.inputField.getBoundingClientRect().height)+"px"),this.processCalendar()},t.prototype.hide=function(){a.removeEventListener("keydown",this._calKeyEvent,!0),a.removeEventListener("keypress",this._calKeyEvent,!0),a.removeEventListener("mousedown",this._documentClick,!0),this.dropdownElement.style.display="none",this.hidden=!0},t.prototype._handleDocumentClick=function(e){var t=e.target;if(null!==t&&!t.classList.contains("time"))for(;null!==t&&t!==this.element;t=t.parentNode);if(null===t)return a.activeElement.blur(),this.hide(),s(e)},t.prototype._handleDayMouseDown=function(e){var a=e.currentTarget,t=e.target||e.srcElement;if(!t||!t.hasAttribute("data-action")){if("TD"!==a.nodeName){var r=a.getParent("TD");"TD"===r.nodeName?a=r:(a=a.getParent("TD")).classList.contains("js-calendar")&&(a=a.getElementsByTagName("table")[0])}else if(!t.classList.contains("js-btn")&&!a.classList.contains("day")&&!a.classList.contains("title"))return;if(!a||a.disabled)return!1;if(void 0===a.navtype||300!==a.navtype){50===a.navtype&&(a._current=a.innerHTML),t!==a&&t.parentNode!==a||this.cellClick(a,e);var i=null;void 0!==a.month&&(i=a),void 0!==a.parentNode.month&&(i=a.parentNode);var l=null;if(i)l=new Date(this.date),i.month!==l.getLocalMonth(this.params.dateType)&&(l.setLocalMonth(this.params.dateType,i.month),this.setDate(l),this.dateClicked=!1,this.callHandler());else{var o=null;void 0!==a.year&&(o=t),void 0!==a.parentNode.year&&(o=t.parentNode),o&&(l=new Date(this.date),o.year!==l.getLocalFullYear(this.params.dateType)&&(l.setFullYear(this.params.dateType,o.year),this.setDate(l),this.dateClicked=!1,this.callHandler()))}}return s(e)}},t.prototype.cellClick=function(e,a){var t=!1,s=!1,r=null;if(void 0===e.navtype){this.currentDateEl&&(e.classList.add("selected"),this.currentDateEl=e.caldate,(t=this.currentDateEl===e.caldate)||(this.currentDateEl=e.caldate)),this.date.setLocalDateOnly("gregorian",e.caldate);var i=!(this.dateClicked=!e.otherMonth);this.currentDateEl&&(s=!e.disabled),i&&this.processCalendar()}else{r=new Date(this.date),this.dateClicked=!1;var l=r.getOtherFullYear(this.params.dateType),o=r.getLocalMonth(this.params.dateType);switch(e.navtype){case 400:break;case-2:this.params.compressedHeader||l>this.params.minYear&&r.setOtherFullYear(this.params.dateType,l-1);break;case-1:var n=r.getLocalDate(this.params.dateType);if(o>0)n>(d=r.getLocalMonthDays(this.params.dateType,o-1))&&r.setLocalDate(this.params.dateType,d),r.setLocalMonth(this.params.dateType,o-1);else if(l-- >this.params.minYear){r.setOtherFullYear(this.params.dateType,l),n>(d=r.getLocalMonthDays(this.params.dateType,11))&&r.setLocalDate(this.params.dateType,d),r.setLocalMonth(this.params.dateType,11)}break;case 1:n=r.getLocalDate(this.params.dateType);if(o<11)n>(d=r.getLocalMonthDays(this.params.dateType,o+1))&&r.setLocalDate(this.params.dateType,d),r.setLocalMonth(this.params.dateType,o+1);else if(l<this.params.maxYear){var d;r.setOtherFullYear(this.params.dateType,l+1),n>(d=r.getLocalMonthDays(this.params.dateType,0))&&r.setLocalDate(this.params.dateType,d),r.setLocalMonth(this.params.dateType,0)}break;case 2:this.params.compressedHeader||l<this.params.maxYear&&r.setOtherFullYear(this.params.dateType,l+1)}r.equalsTo(this.date)?0===e.navtype&&(s=t=!0):(this.setDate(r),s=!0)}s&&(this.params.showsTime&&(this.dateClicked=!1),a&&this.callHandler()),e.classList.remove("hilite"),t&&!this.params.showsTime&&(this.dateClicked=!1,a&&this.close())},t.prototype._handleCalKeyEvent=function(e){var a=e.keyCode;if(e.target!==this.inputField||13!==a&&9!==a||this.close(),"rtl"===this.params.direction&&(37===a?a=39:39===a&&(a=37)),32===a&&e.shiftKey&&(e.preventDefault(),this.cellClick(this._nav_now,e),this.close()),27===a&&this.close(),38===a&&this.moveCursorBy(7),40===a&&this.moveCursorBy(-7),37===a&&this.moveCursorBy(1),39===a&&this.moveCursorBy(-1),e.target===this.inputField&&!(a>48||a<57||186===a||189===a||190===a||32===a))return s(e)},t.prototype._create=function(){var e=this,a=this.element,t=r("table"),s=r("div");this.table=t,t.className="table",t.cellSpacing=0,t.cellPadding=0,t.style.marginBottom=0,this.dropdownElement=s,a.appendChild(s),this.params.direction&&(s.style.direction=this.params.direction),s.className="js-calendar",s.style.position="absolute",s.style.boxShadow="0px 0px 70px 0px rgba(0,0,0,0.67)",s.style.minWidth=this.inputField.width,s.style.padding="0",s.style.display="none",s.style.left="auto",s.style.top="auto",s.style.zIndex=1060,s.style.borderRadius="20px",this.wrapper=r("div"),this.wrapper.className="calendar-container",s.appendChild(this.wrapper),this.wrapper.appendChild(t);var i=r("thead",t);i.className="calendar-header";var l=null,o=null,n=this,d=function(a,t,s,i,d,m,p){for(var c in d=d||{},l=r(i=i||"td",o),t&&(m=m?'class="'+m+'"':"",l.colSpan=t),d)l.style[c]=d[c];for(var c in p)l.setAttribute(c,p[c]);return 0!==s&&Math.abs(s)<=2&&(l.className+=" nav"),t&&l.addEventListener("mousedown",e._dayMouseDown,!0),l.calendar=n,l.navtype=s,0!==s&&Math.abs(s)<=2?l.innerHTML="<a "+m+" style='display:inline;padding:2px 6px;cursor:pointer;text-decoration:none;' unselectable='on'>"+a+"</a>":(l.innerHTML=t?"<div unselectable='on'"+m+">"+a+"</div>":a,!t&&m&&(l.className=m)),l};!1===this.params.compressedHeader&&((o=r("tr",i)).className="calendar-head-row",this._nav_py=d("&lsaquo;",1,-2,"",{"text-align":"center","font-size":"18px","line-height":"18px"},"js-btn btn-prev-year"),this.title=d('<div style="text-align:center;font-size:18px"><span></span></div>',this.params.weekNumbers?6:5,300),this.title.className="title",this._nav_ny=d(" &rsaquo;",1,2,"",{"text-align":"center","font-size":"18px","line-height":"18px"},"js-btn btn-next-year")),(o=r("tr",i)).className="calendar-head-row",this._nav_pm=d("&lsaquo;",1,-1,"",{"text-align":"center","font-size":"2em","line-height":"1em"},"js-btn btn-prev-month"),this._nav_month=d('<div style="text-align:center;font-size:1.2em"><span></span></div>',this.params.weekNumbers?6:5,888,"td",{textAlign:"center"}),this._nav_month.className="title",this._nav_nm=d(" &rsaquo;",1,1,"",{"text-align":"center","font-size":"2em","line-height":"1em"},"js-btn btn-next-month"),(o=r("tr",i)).className=e.params.weekNumbers?"daynames wk":"daynames",this.params.weekNumbers&&((l=r("td",o)).className="day-name wn",l.innerHTML=JoomlaCalLocale.wk);for(var m=7;m>0;--m)l=r("td",o),m||(l.calendar=e);this.firstdayname=this.params.weekNumbers?o.firstChild.nextSibling:o.firstChild;var p=this.params.firstDayOfWeek,c=(l=this.firstdayname,JoomlaCalLocale.weekend);for(m=0;m<7;++m){var h=(m+p)%7;l.classList.add("day-name"),this.params.weekNumbers&&l.classList.add("day-name-week"),m&&(l.calendar=e,l.fdow=h),-1!==c.indexOf(c)&&l.classList.add("weekend"),l.innerHTML=JoomlaCalLocale.shortDays[(m+p)%7],l=l.nextSibling}var u=r("tbody",t);for(this.tbody=u,m=6;m>0;--m){o=r("tr",u),this.params.weekNumbers&&(l=r("td",o));for(var y=7;y>0;--y)(l=r("td",o)).calendar=this,l.addEventListener("mousedown",this._dayMouseDown,!0)}if(this.params.showsTime){(o=r("tr",u)).className="time",(l=r("td",o)).className="time time-title",l.colSpan=1,l.style.verticalAlign="middle",l.innerHTML=" ";var v=r("td",o);v.className="time hours-select",v.colSpan=2;var g=r("td",o);g.className="time minutes-select",g.colSpan=2,function(){function a(a,t,s,i,l){var o,n=r("select",l);n.calendar=e,n.className=a,n.setAttribute("data-chosen",!0),n.style.width="100%",n.navtype=50,n._range=[];for(var d=s;d<=i;++d){var m,p="";d===t&&(p=!0),d<10&&i>=10?(o="0"+d,m=Date.convertNumbers("0")+Date.convertNumbers(d)):(o=""+d,m=""+Date.convertNumbers(d)),n.options.add(new Option(m,o,p,p))}return n}var t=e.date.getHours(),s=e.date.getMinutes(),i=!e.params.time24,n=e.date.getHours()>12;i&&n&&(t-=12);var d=a("time time-hours",t,i?1:0,i?12:23,v),m=a("time time-minutes",s,0,59,g);if((l=r("td",o)).className="time ampm-select",l.colSpan=e.params.weekNumbers?1:2,i){n=Date.parseFieldDate(e.inputField.getAttribute("data-alt-value"),e.params.dateFormat,"gregorian").getHours()>=12;var p=r("select",l);p.className="time-ampm",p.style.width="100%",p.options.add(new Option(JoomlaCalLocale.PM,"pm",!!n||"",!!n||"")),p.options.add(new Option(JoomlaCalLocale.AM,"am",!n||"",!n||"")),p.addEventListener("change",function(a){e.updateTime(a.target.parentNode.parentNode.childNodes[1].childNodes[0].value,a.target.parentNode.parentNode.childNodes[2].childNodes[0].value,a.target.parentNode.parentNode.childNodes[3].childNodes[0].value)},!1)}else l.innerHTML="&#160;",l.colSpan=e.params.weekNumbers?3:2;d.addEventListener("change",function(a){e.updateTime(a.target.parentNode.parentNode.childNodes[1].childNodes[0].value,a.target.parentNode.parentNode.childNodes[2].childNodes[0].value,a.target.parentNode.parentNode.childNodes[3].childNodes[0].value)},!1),m.addEventListener("change",function(a){e.updateTime(a.target.parentNode.parentNode.childNodes[1].childNodes[0].value,a.target.parentNode.parentNode.childNodes[2].childNodes[0].value,a.target.parentNode.parentNode.childNodes[3].childNodes[0].value)},!1)}()}((o=r("div",this.wrapper)).className="buttons-wrapper btn-group",this._nav_clear=d(JoomlaCalLocale.clear,"",100,"button","","js-btn btn btn-clear",{type:"button","data-action":"clear"}),o.querySelector('[data-action="clear"]').addEventListener("click",function(a){a.preventDefault();for(var t=e.table.querySelectorAll("td"),s=0;s<t.length;s++)if(t[s].classList.contains("selected")){t[s].classList.remove("selected");break}e.inputField.setAttribute("data-alt-value","0000-00-00 00:00:00"),e.inputField.setAttribute("value",""),e.inputField.value="",e.inputField.onchange&&e.inputField.onchange()}),this.params.showsTodayBtn)&&(this._nav_now=d(JoomlaCalLocale.today,"",0,"button","","js-btn btn btn-today",{type:"button","data-action":"today"}),this.wrapper.querySelector('[data-action="today"]').addEventListener("click",function(a){a.preventDefault(),e.date.setLocalDateOnly("gregorian",new Date),e.dateClicked=!0,e.callHandler(),e.close()}));this._nav_exit=d(JoomlaCalLocale.exit,"",999,"button","","js-btn btn btn-exit",{type:"button","data-action":"exit"}),this.wrapper.querySelector('[data-action="exit"]').addEventListener("click",function(a){a.preventDefault(),e.dateClicked||(e.inputField.value?("gregorian"!==e.params.dateType&&e.inputField.setAttribute("data-local-value",e.inputField.value),void 0===e.dateClicked?e.inputField.setAttribute("data-alt-value",Date.parseFieldDate(e.inputField.value,e.params.dateFormat,e.params.dateType).print(e.params.dateFormat,"gregorian",!1)):e.inputField.setAttribute("data-alt-value",e.date.print(e.params.dateFormat,"gregorian",!1))):e.inputField.setAttribute("data-alt-value","0000-00-00 00:00:00"),e.date=Date.parseFieldDate(e.inputField.getAttribute("data-alt-value"),e.params.dateFormat,e.params.dateType)),e.close()}),this.processCalendar()},t.prototype.processCalendar=function(){this.table.style.visibility="hidden";var e=this.params.firstDayOfWeek,a=this.date,t=new Date,s=t.getLocalFullYear(this.params.dateType),r=t.getLocalMonth(this.params.dateType),i=t.getLocalDate(this.params.dateType),l=a.getOtherFullYear(this.params.dateType),o=a.getHours(),n=a.getMinutes(),d=(a.getSeconds(),!this.params.time24);l<this.params.minYear?(l=this.params.minYear,a.setOtherFullYear(this.params.dateType,l)):l>this.params.maxYear&&(l=this.params.maxYear,a.setOtherFullYear(this.params.dateType,l)),this.params.firstDayOfWeek=e,this.date=new Date(a);var m=a.getLocalMonth(this.params.dateType),p=a.getLocalDate(this.params.dateType);a.setLocalDate(this.params.dateType,1);var c=(a.getLocalDay(this.params.dateType)-this.params.firstDayOfWeek)%7;c<0&&(c+=7),a.setLocalDate(this.params.dateType,-c),a.setLocalDate(this.params.dateType,a.getLocalDate(this.params.dateType)+1);for(var h=this.tbody.firstChild,u=this.ar_days=new Array,y=JoomlaCalLocale.weekend,v=parseInt(a.getLocalWeekDays(this.params.dateType)),g=0;g<v;++g,h=h.nextSibling){var b=h.firstChild;this.params.weekNumbers&&(b.className="day wn",b.innerHTML=a.getLocalWeekNumber(this.params.dateType),b=b.nextSibling),h.className=this.params.weekNumbers?"daysrow wk":"daysrow";for(var f,L=!1,C=u[g]=[],w=v+1,T=0;T<w;++T,b=b.nextSibling,a.setLocalDate(this.params.dateType,f+1)){b.className="day",b.style.textAlign="center",f=a.getLocalDate(this.params.dateType);var N=a.getLocalDay(this.params.dateType);b.pos=g<<4|T,C[T]=b;var D=a.getLocalMonth(this.params.dateType)===m;if(D)b.otherMonth=!1,L=!0,b.style.cursor="pointer";else{if(!this.params.showsOthers){b.className+=" emptycell",b.innerHTML="&#160;",b.disabled=!0;continue}b.className+=" disabled othermonth ",b.otherMonth=!0}b.disabled=!1,b.innerHTML=this.params.debug?f:Date.convertNumbers(f),b.disabled||(b.caldate=new Date(a),D&&f===p&&(b.className+=" selected",this.currentDateEl=b),a.getLocalFullYear(this.params.dateType)===s&&a.getLocalMonth(this.params.dateType)===r&&f===i&&(b.className+=" today"),-1!==y.indexOf(N)&&(b.className+=" weekend"))}L||this.params.showsOthers?h.style.display="":(h.style.display="none",h.className="emptyrow")}if(this.params.showsTime){o>12&&d&&(o-=12),o=o<10?"0"+o:o,n=n<10?"0"+n:n;var F=this.table.querySelector(".time-hours"),k=this.table.querySelector(".time-minutes");if(this.resetSelected(F),this.params.time24?F.value=o:F.value="00"==o?"12":o,this.resetSelected(k),k.value=n,!this.params.time24){var J=new Date(this.inputField.getAttribute("data-alt-value")),A=this.table.querySelector(".time-ampm");J.getHours()>12&&(this.resetSelected(A),A.value="pm")}}if(this.params.compressedHeader){var M=Date.convertNumbers(l.toString());this._nav_month.getElementsByTagName("span")[0].innerHTML=this.params.monthBefore?M+" - "+JoomlaCalLocale.months[m]:JoomlaCalLocale.months[m]+" - "+M}else this._nav_month.getElementsByTagName("span")[0].innerHTML=this.params.debug?m+" "+JoomlaCalLocale.months[m]:JoomlaCalLocale.months[m],this.title.getElementsByTagName("span")[0].innerHTML=this.params.debug?l+" "+Date.convertNumbers(l.toString()):Date.convertNumbers(l.toString());this.table.style.visibility="visible"},t.prototype._bindEvents=function(){var e=this;this.inputField.addEventListener("blur",function(a){var s=t.getCalObject(this)._joomlaCalendar;if("block"!==s.dropdownElement.style.display){if(s){if(s.inputField.value)if(void 0===s.params.dateClicked)if(s.inputField.setAttribute("data-local-value",s.inputField.value),"gregorian"!==s.params.dateType){var r,i=Date.parseFieldDate(s.inputField.value,s.params.dateFormat,s.params.dateType);r=Date.localCalToGregorian(i.getFullYear(),i.getMonth(),i.getDate()),i.setFullYear(r[0]),i.setMonth(r[1]),i.setDate(r[2]),s.inputField.setAttribute("data-alt-value",i.print(s.params.dateFormat,"gregorian",!1))}else s.inputField.setAttribute("data-alt-value",Date.parseFieldDate(s.inputField.value,s.params.dateFormat,s.params.dateType).print(s.params.dateFormat,"gregorian",!1));else s.inputField.setAttribute("data-alt-value",s.date.print(s.params.dateFormat,"gregorian",!1));else s.inputField.setAttribute("data-alt-value","0000-00-00 00:00:00");s.date=Date.parseFieldDate(s.inputField.getAttribute("data-alt-value"),s.params.dateFormat,s.params.dateType)}e.close()}else a.preventDefault()},!0),this.button.addEventListener("click",function(){e.show()},!1)};var s=function(a){return a||(a=e.event),a.preventDefault(),a.stopPropagation(),!1},r=function(e,t){var s;return s=a.createElement(e),void 0!==t&&t.appendChild(s),s},i=function(e){return!isNaN(e)&&(0|(a=parseFloat(e)))===a;var a},l=function(e,a){return(new Date).getLocalFullYear(a)+e};Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var a=this.length>>>0,t=Number(arguments[1])||0;for((t=t<0?Math.ceil(t):Math.floor(t))<0&&(t+=a);t<a;t++)if(t in this&&this[t]===e)return t;return-1}),t.getCalObject=function(e){if(!e)return!1;for(;e.parentNode;)if((e=e.parentNode).classList.contains("field-calendar"))return e;return!1},t.prototype.setAltValue=function(){var e=this.inputField;e.getAttribute("disabled")||(e.value=e.getAttribute("data-alt-value")?e.getAttribute("data-alt-value"):"")},t.onSubmit=function(){if(Joomla=e.Joomla||{},!Joomla.calendarProcessed){Joomla.calendarProcessed=!0;for(var t=a.querySelectorAll(".field-calendar"),s=0;s<t.length;s++){var r=t[s]._joomlaCalendar;r&&r.setAltValue()}}},t.init=function(a,s){e.JoomlaCalLocale=e.JoomlaCalLocale?JoomlaCalLocale:{},JoomlaCalLocale.today=JoomlaCalLocale.today?JoomlaCalLocale.today:"today",JoomlaCalLocale.weekend=JoomlaCalLocale.weekend?JoomlaCalLocale.weekend:[0,6],JoomlaCalLocale.localLangNumbers=JoomlaCalLocale.localLangNumbers?JoomlaCalLocale.localLangNumbers:[0,1,2,3,4,5,6,7,8,9],JoomlaCalLocale.wk=JoomlaCalLocale.wk?JoomlaCalLocale.wk:"wk",JoomlaCalLocale.AM=JoomlaCalLocale.AM?JoomlaCalLocale.AM:"AM",JoomlaCalLocale.PM=JoomlaCalLocale.PM?JoomlaCalLocale.PM:"PM",JoomlaCalLocale.am=JoomlaCalLocale.am?JoomlaCalLocale.am:"am",JoomlaCalLocale.pm=JoomlaCalLocale.pm?JoomlaCalLocale.pm:"pm",JoomlaCalLocale.dateType=JoomlaCalLocale.dateType?JoomlaCalLocale.dateType:"gregorian",JoomlaCalLocale.time=JoomlaCalLocale.time?JoomlaCalLocale.time:"time",JoomlaCalLocale.days=JoomlaCalLocale.days?JoomlaCalLocale.days:'["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]',JoomlaCalLocale.shortDays=JoomlaCalLocale.shortDays?JoomlaCalLocale.shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],JoomlaCalLocale.months=JoomlaCalLocale.months?JoomlaCalLocale.months:["January","February","March","April","May","June","July","August","September","October","November","December"],JoomlaCalLocale.shortMonths=JoomlaCalLocale.shortMonths?JoomlaCalLocale.shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],JoomlaCalLocale.minYear=JoomlaCalLocale.minYear?JoomlaCalLocale.minYear:1900,JoomlaCalLocale.maxYear=JoomlaCalLocale.maxYear?JoomlaCalLocale.maxYear:2100,JoomlaCalLocale.exit=JoomlaCalLocale.exit?JoomlaCalLocale.exit:"Cancel",JoomlaCalLocale.clear=JoomlaCalLocale.clear?JoomlaCalLocale.clear:"Clear";var r=a._joomlaCalendar;r?r.recreate():new t(a),a&&a.getElementsByTagName("input")[0]&&a.getElementsByTagName("input")[0].form&&!a.getElementsByTagName("input")[0].disabled&&a.getElementsByTagName("input")[0].form.addEventListener("submit",t.onSubmit)},e.JoomlaCalendar=t,a.addEventListener("DOMContentLoaded",function(){var s,r;for(s=a.querySelectorAll(".field-calendar"),r=0;r<s.length;r++)t.init(s[r]);e.jQuery&&jQuery(a).on("subform-row-add",function(e,a){for(s=a.querySelectorAll(".field-calendar"),r=0;r<s.length;r++)t.init(s[r])}),e.Calendar={},Calendar.setup=function(e){if(e.inputField&&a.getElementById(e.inputField)){var s=a.getElementById(e.inputField),r=s.parentNode.querySelectorAll("button")[0];for(var i in e)if(e.hasOwnProperty(i))switch(i){case"ifFormat":r&&r.setAttribute("data-dayformat",e.ifFormat);break;case"firstDay":r&&r.setAttribute("data-firstday",parseInt(e.firstDay));break;case"weekNumbers":r&&r.setAttribute("data-week-numbers","true"===e.weekNumbers||!0===e.weekNumbers?"1":"0");break;case"showOthers":r&&r.setAttribute("data-show-others","true"===e.showOthers||!0===e.showOthers?"1":"0");break;case"showsTime":r&&r.setAttribute("data-show-time","true"===e.showsTime||!0===e.showsTime?"1":"0");break;case"timeFormat":r&&r.setAttribute("data-time-24",parseInt(e.timeFormat))}t.init(s.parentNode.parentNode)}return null}})}(window,document);


/*===============================
/plugins/system/t3/base-bs3/js/jquery.tap.min.js
================================================================================*/;
!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);


/*===============================
/plugins/system/t3/base-bs3/js/off-canvas.js
================================================================================*/;
jQuery(document).ready(function($){function getAndroidVersion(ua){var ua=ua||navigator.userAgent;var match=ua.match(/Android\s([0-9\.]*)/);return match?match[1]:false;};if(parseInt(getAndroidVersion())==4){$('#t3-mainnav').addClass('t3-mainnav-android');}
var JA_isLoading=false;if(/MSIE\s([\d.]+)/.test(navigator.userAgent)?new Number(RegExp.$1)<10:false){$('html').addClass('old-ie');}else if(/constructor/i.test(window.HTMLElement)){$('html').addClass('safari');}
var $wrapper=$('body'),$inner=$('.t3-wrapper'),$toggles=$('.off-canvas-toggle'),$offcanvas=$('.t3-off-canvas'),$close=$('.t3-off-canvas .close'),$btn=null,$nav=null,direction='left',$fixed=null;if(!$wrapper.length)return;$toggles.each(function(){var $this=$(this),$nav=$($this.data('nav')),effect=$this.data('effect'),direction=($('html').attr('dir')=='rtl'&&$this.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$this.data('pos')=='right')?'right':'left';$nav.addClass(effect).addClass('off-canvas-'+direction);var inside_effect=['off-canvas-effect-3','off-canvas-effect-16','off-canvas-effect-7','off-canvas-effect-8','off-canvas-effect-14'];if($.inArray(effect,inside_effect)==-1){$inner.before($nav);}else{$inner.prepend($nav);}});$toggles.on('tap',function(e){stopBubble(e);if($wrapper.hasClass('off-canvas-open')){oc_hide(e);return false;}
$btn=$(this);$nav=$($btn.data('nav'));if(!$fixed)$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});else $fixed=$fixed.filter(function(){return $(this).css("position")==='fixed';}).add($inner.find('.affix'));$nav.addClass('off-canvas-current');direction=($('html').attr('dir')=='rtl'&&$btn.data('pos')!='right')||($('html').attr('dir')!='rtl'&&$btn.data('pos')=='right')?'right':'left';$offcanvas.height($(window).height());var events=$(window).data('events');if(events&&events.scroll&&events.scroll.length){var handlers=[];for(var i=0;i<events.scroll.length;i++){handlers[i]=events.scroll[i].handler;}
$(window).data('scroll-events',handlers);$(window).off('scroll');}
var scrollTop=($('html').scrollTop())?$('html').scrollTop():$('body').scrollTop();$('html').addClass('noscroll').css('top',-scrollTop).data('top',scrollTop);$('.t3-off-canvas').css('top',scrollTop);$fixed.each(function(){var $this=$(this),$parent=$this.parent(),mtop=0;while(!$parent.is($inner)&&$parent.css("position")==='static')$parent=$parent.parent();mtop=-$parent.offset().top;$this.css({'position':'absolute','margin-top':mtop});});$wrapper.scrollTop(scrollTop);$wrapper[0].className=$.trim($wrapper[0].className.replace(/\s*off\-canvas\-effect\-\d+\s*/g,' '))+' '+$btn.data('effect')+' '+'off-canvas-'+direction;setTimeout(oc_show,50);return false;});var oc_show=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$wrapper.addClass('off-canvas-open');$inner.on('click',oc_hide);$close.on('click',oc_hide);$offcanvas.on('click',handleClick);if($.browser.msie&&$.browser.version<10){var p1={},p2={};p1['padding-'+direction]=$('.t3-off-canvas').width();p2[direction]=0;$inner.animate(p1);$nav.animate(p2);}
setTimeout(function(){JA_isLoading=false;},200);};var oc_hide=function(){if(JA_isLoading==true){return;}
JA_isLoading=true;$inner.off('click',oc_hide);$close.off('click',oc_hide);$offcanvas.off('click',handleClick);setTimeout(function(){$wrapper.removeClass('off-canvas-open');},100);setTimeout(function(){$wrapper.removeClass($btn.data('effect')).removeClass('off-canvas-'+direction);$wrapper.scrollTop(0);$('html').removeClass('noscroll').css('top','');$('html,body').scrollTop($('html').data('top'));$nav.removeClass('off-canvas-current');$fixed.css({'position':'','margin-top':''});if($(window).data('scroll-events')){var handlers=$(window).data('scroll-events');for(var i=0;i<handlers.length;i++){$(window).on('scroll',handlers[i]);}
$(window).data('scroll-events',null);}
JA_isLoading=false;},700);if($('html').hasClass('old-ie')){var p1={},p2={};p1['padding-'+direction]=0;p2[direction]=-$('.t3-off-canvas').width();$inner.animate(p1);$nav.animate(p2);}};var handleClick=function(e){if($(e.target).closest('a').length){if(!e.target.href)return;var arr1=e.target.href.split('#'),arr2=location.href.split('#');if(arr1[0]==arr2[0]&&arr1.length>1&&arr1[1].length){oc_hide();setTimeout(function(){var anchor=$("a[name='"+arr1[1]+"']");if(!anchor.length)anchor=$('#'+arr1[1]);if(anchor.length)
$('html,body').animate({scrollTop:anchor.offset().top},'slow');},1000);}
if(e.target.href.search('#')!==-1)return;}
stopBubble(e);return true;}
var stopBubble=function(e){e.stopPropagation();}
$(window).load(function(){setTimeout(function(){$fixed=$inner.find('*').filter(function(){return $(this).css("position")==='fixed';});},100);});})


/*===============================
/plugins/system/t3/base-bs3/js/script.js
================================================================================*/;
!function($){if($.browser==undefined||$.browser.msie==undefined){$.browser={msie:false,version:0};if(match=navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)||navigator.userAgent.match(/Trident.*rv:([0-9]{1,}[\.0-9]{0,})/)){$.browser.msie=true;$.browser.version=match[1];}}
if($.browser.msie){$('html').addClass('ie'+Math.floor($.browser.version));}
$(document).ready(function(){if(!window.getComputedStyle){window.getComputedStyle=function(el,pseudo){this.el=el;this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;if(prop=='float')prop='styleFloat';if(re.test(prop)){prop=prop.replace(re,function(){return arguments[2].toUpperCase();});}
return el.currentStyle[prop]?el.currentStyle[prop]:null;}
return this;}}
var fromClass='body-data-holder',prop='content',$inspector=$('<div>').css('display','none').addClass(fromClass).appendTo($('body'));try{var computedStyle=window.getComputedStyle($inspector[0],':before');if(computedStyle){var attrs=computedStyle.getPropertyValue(prop);if(attrs){var matches=attrs.match(/([\da-z\-]+)/gi),data={};if(matches&&matches.length){for(var i=0;i<matches.length;i++){data[matches[i++]]=i<matches.length?matches[i]:null;}}
$('body').data(data);}}}finally{$inspector.remove();}});(function(){$.support.t3transform=(function(){var style=document.createElement('div').style,vendors=['t','webkitT','MozT','msT','OT'],transform,i=0,l=vendors.length;for(;i<l;i++){transform=vendors[i]+'ransform';if(transform in style){return transform;}}
return false;})();})();(function(){$('html').addClass('ontouchstart'in window?'touch':'no-touch');})();$(document).ready(function(){(function(){if(window.MooTools&&window.MooTools.More&&Element&&Element.implement){var mthide=Element.prototype.hide,mtshow=Element.prototype.show,mtslide=Element.prototype.slide;Element.implement({show:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtshow)&&mtshow.apply(this,args);},hide:function(){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mthide)&&mthide.apply(this,arguments);},slide:function(args){if(arguments.callee&&arguments.callee.caller&&arguments.callee.caller.toString().indexOf('isPropagationStopped')!==-1){return this;}
return $.isFunction(mtslide)&&mtslide.apply(this,args);}})}})();$.fn.tooltip.Constructor&&$.fn.tooltip.Constructor.DEFAULTS&&($.fn.tooltip.Constructor.DEFAULTS.html=true);$.fn.popover.Constructor&&$.fn.popover.Constructor.DEFAULTS&&($.fn.popover.Constructor.DEFAULTS.html=true);$.fn.tooltip.defaults&&($.fn.tooltip.defaults.html=true);$.fn.popover.defaults&&($.fn.popover.defaults.html=true);(function(){if(window.jomsQuery&&jomsQuery.fn.collapse){$('[data-toggle="collapse"]').on('click',function(e){$($(this).attr('data-target')).eq(0).collapse('toggle');e.stopPropagation();return false;});jomsQuery('html, body').off('touchstart.dropdown.data-api');}})();(function(){if($.fn.chosen&&$(document.documentElement).attr('dir')=='rtl'){$('select').addClass('chzn-rtl');}})();});$(window).load(function(){if(!$(document.documentElement).hasClass('off-canvas-ready')&&($('.navbar-collapse-fixed-top').length||$('.navbar-collapse-fixed-bottom').length)){var btn=$('.btn-navbar[data-toggle="collapse"]');if(!btn.length){return;}
if(btn.data('target')){var nav=$(btn.data('target'));if(!nav.length){return;}
var fixedtop=nav.closest('.navbar-collapse-fixed-top').length;btn.on('click',function(){var wheight=(window.innerHeight||$(window).height());if(!$.support.transition){nav.parent().css('height',!btn.hasClass('collapsed')&&btn.data('t3-clicked')?'':wheight);btn.data('t3-clicked',1);}
nav.addClass('animate').css('max-height',wheight-
(fixedtop?(parseFloat(nav.css('top'))||0):(parseFloat(nav.css('bottom'))||0)));});nav.on('shown hidden',function(){nav.removeClass('animate');});}}});}(jQuery);


/*===============================
/plugins/system/t3/base-bs3/js/menu.js
================================================================================*/;
;(function($){var T3Menu=function(elm,options){this.$menu=$(elm);if(!this.$menu.length){return;}
this.options=$.extend({},$.fn.t3menu.defaults,options);this.child_open=[];this.loaded=false;this.start();};T3Menu.prototype={constructor:T3Menu,start:function(){if(this.loaded){return;}
this.loaded=true;var self=this,options=this.options,$menu=this.$menu;this.$items=$menu.find('li');this.$items.each(function(idx,li){var $item=$(this),$child=$item.children('.dropdown-menu'),$link=$item.children('a'),item={$item:$item,child:$child.length,link:$link.length,clickable:!($link.length&&$child.length),mega:$item.hasClass('mega'),status:'close',timer:null,atimer:null};$item.data('t3menu.item',item);if($child.length&&!options.hover){$item.on('click',function(e){e.stopPropagation();if($item.hasClass('group')){return;}
if(item.status=='close'){e.preventDefault();self.show(item);}});}else{$item.on('click',function(e){if($(e.target).data('toggle'))return;e.stopPropagation()});}
$item.find('a > .caret').on('click tap',function(e){item.clickable=false;});if(options.hover){$item.on('mouseover',function(e){if($item.hasClass('group'))
return;var $target=$(e.target);if($target.data('show-processed'))
return;$target.data('show-processed',true);setTimeout(function(){$target.data('show-processed',false);},10);self.show(item);}).on('mouseleave',function(e){if($item.hasClass('group'))
return;var $target=$(e.target);if($target.data('hide-processed'))
return;$target.data('hide-processed',true);setTimeout(function(){$target.data('hide-processed',false);},10);self.hide(item,$target);});if($link.length&&$child.length){$link.on('click',function(e){if(item.clickable){e.stopPropagation();}
return item.clickable;});}}});$(document.body).on('tap hideall.t3menu',function(e){clearTimeout(self.timer);self.timer=setTimeout($.proxy(self.hide_alls,self),e.type=='tap'?500:self.options.hidedelay);});$menu.find('.mega-dropdown-menu').on('hideall.t3menu',function(e){e.stopPropagation();e.preventDefault();return false;});$menu.find('input, select, textarea, label').on('click tap',function(e){e.stopPropagation();});var $megatab=$menu.find('.mega-tab');if($megatab.length){$megatab.each(function(){var $tabul=$(this).find('>div>ul'),$tabItems=$tabul.children('.dropdown-submenu'),$tabs=$tabul.find('>li>.dropdown-menu'),tabheight=0,$parentItem=$(this).closest('li');$tabItems.data('mega-tab-item',1);var megatabs=$parentItem.data('mega-tabs')?$parentItem.data('mega-tabs'):[];megatabs.push($tabul);$parentItem.data('mega-tabs',megatabs);$tabItems.first().data('mega-tab-active',true).addClass('open');var $p=$tabul.parents('.dropdown-menu');$p.each(function(){var $this=$(this);$this.data('prev-style',$this.attr('style')).css({visibility:"visible",display:"block"});})
$tabs.each(function(){var $this=$(this),thisstyle=$this.attr('style');$this.css({visibility:"hidden",display:"block"});tabheight=Math.max(tabheight,$this.children().innerHeight());if(thisstyle){$this.attr('style',thisstyle);}else{$this.removeAttr('style');}});$tabul.css('min-height',tabheight);$p.each(function(){var $this=$(this);if($this.data('prev-style'))
$this.attr('style',$this.data('prev-style'));else
$this.removeAttr('style');$this.removeData('prev-style');})})}
$menu.find('.modal').appendTo('body');},show:function(item){if(item.$item.data('mega-tab-item')){item.$item.parent().children().removeClass('open').data('mega-tab-active',false);item.$item.addClass('open').data('mega-tab-active',true);}
if($.inArray(item,this.child_open)<this.child_open.length-1){this.hide_others(item);}
$(document.body).trigger('hideall.t3menu',[this]);clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.ftimer);clearTimeout(item.ctimer);if(item.status!='open'||!item.$item.hasClass('open')||!this.child_open.length){if(item.mega){clearTimeout(item.astimer);clearTimeout(item.atimer);this.position(item.$item);item.astimer=setTimeout(function(){item.$item.addClass('animating')},10);item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration+50);item.timer=setTimeout(function(){item.$item.addClass('open');},100);}else{item.$item.addClass('open');}
item.status='open';if(item.child&&$.inArray(item,this.child_open)==-1){this.child_open.push(item);}}
item.ctimer=setTimeout($.proxy(this.clickable,this,item),300);},hide:function(item,$target){clearTimeout(this.timer);clearTimeout(item.timer);clearTimeout(item.astimer);clearTimeout(item.atimer);clearTimeout(item.ftimer);if($target&&$target.is('input',item.$item)){return;}
if(item.mega){item.$item.addClass('animating');item.atimer=setTimeout(function(){item.$item.removeClass('animating')},this.options.duration);item.timer=setTimeout(function(){if(!item.$item.data('mega-tab-active'))
item.$item.removeClass('open')},100);}else{item.timer=setTimeout(function(){if(!item.$item.data('mega-tab-active'))
item.$item.removeClass('open');},100);}
item.status='close';for(var i=this.child_open.length;i--;){if(this.child_open[i]===item){this.child_open.splice(i,1);}}
item.ftimer=setTimeout($.proxy(this.hidden,this,item),this.options.duration);this.timer=setTimeout($.proxy(this.hide_alls,this),this.options.hidedelay);},hidden:function(item){if(item.status=='close'){item.clickable=false;}},hide_others:function(item){var self=this;$.each(this.child_open.slice(),function(idx,open){if(!item||(open!=item&&!open.$item.has(item.$item).length)){self.hide(open);}});},hide_alls:function(e,inst){if(!e||e.type=='tap'||(e.type=='hideall'&&this!=inst)){var self=this;$.each(this.child_open.slice(),function(idx,item){item&&self.hide(item);});}},clickable:function(item){item.clickable=true;},position:function($item){var sub=$item.children('.mega-dropdown-menu'),is_show=sub.is(':visible');if(!is_show){sub.show();}
var offset=$item.offset(),width=$item.outerWidth(),screen_width=$(window).width()
-this.options.sb_width,sub_width=sub.outerWidth(),level=$item.data('level');if(!is_show){sub.css('display','');}
sub.css({left:'',right:''});if(level==1){var align=$item.data('alignsub'),align_offset=0,align_delta=0,align_trans=0;if(align=='justify'){return;}
if(!align){align='left';}
if(align=='center'){align_offset=offset.left+(width/2);if(!$.support.t3transform){align_trans=-sub_width/2;sub.css(this.options.rtl?'right':'left',align_trans+width/2);}}else{align_offset=offset.left
+((align=='left'&&this.options.rtl||align=='right'&&!this.options.rtl)?width:0);}
if(this.options.rtl){if(align=='right'){if(align_offset+sub_width>screen_width){align_delta=screen_width-align_offset
-sub_width;sub.css('left',align_delta);if(screen_width<sub_width){sub.css('left',align_delta+sub_width
-screen_width);}}}else{if(align_offset<(align=='center'?sub_width/2:sub_width)){align_delta=align_offset
-(align=='center'?sub_width/2:sub_width);sub.css('right',align_delta+align_trans);}
if(align_offset
+(align=='center'?sub_width/2:0)
-align_delta>screen_width){sub.css('right',align_offset
+(align=='center'?(sub_width+width)/2:0)+align_trans
-screen_width);}}}else{if(align=='right'){if(align_offset<sub_width){align_delta=align_offset-sub_width;sub.css('right',align_delta);if(sub_width>screen_width){sub.css('right',sub_width-screen_width
+align_delta);}}}else{if(align_offset
+(align=='center'?sub_width/2:sub_width)>screen_width){align_delta=screen_width
-align_offset
-(align=='center'?sub_width/2:sub_width);sub.css('left',align_delta+align_trans);}
if(align_offset
-(align=='center'?sub_width/2:0)
+align_delta<0){sub.css('left',(align=='center'?(sub_width+width)/2:0)
+align_trans
-align_offset);}}}}else{if(this.options.rtl){if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width
-sub_width);}}}else{if(offset.left-sub_width<0){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left
-sub_width);}}}}else{if($item.closest('.mega-dropdown-menu').parent().hasClass('mega-align-right')){if(offset.left-sub_width<0){$item.removeClass('mega-align-right');if(offset.left+width+sub_width>screen_width){sub.css('left',screen_width-offset.left
-sub_width);}}}else{if(offset.left+width+sub_width>screen_width){$item.removeClass('mega-align-left').addClass('mega-align-right');if(offset.left-sub_width<0){sub.css('right',offset.left+width
-sub_width);}}}}}}};$.fn.t3menu=function(option){return this.each(function(){var $this=$(this),data=$this.data('megamenu'),options=typeof option=='object'&&option;if($this.parents('#off-canvas-nav').length)
return;if($this.parents('#t3-off-canvas').length)
return;if(!data){$this.data('megamenu',(data=new T3Menu(this,options)));}else{if(typeof option=='string'&&data[option]){data[option]()}}})};$.fn.t3menu.defaults={duration:400,timeout:100,hidedelay:200,hover:true,sb_width:20};$(document).ready(function(){var mm_duration=$('.t3-megamenu').data('duration')||0;if(mm_duration){$('<style type="text/css">'
+'.t3-megamenu.animate .animating > .mega-dropdown-menu,'
+'.t3-megamenu.animate.slide .animating > .mega-dropdown-menu > div {'
+'transition-duration: '
+mm_duration+'ms !important;'
+'-webkit-transition-duration: '
+mm_duration+'ms !important;'
+'}'+'</style>').appendTo('head');}
var mm_timeout=mm_duration?100+mm_duration:500,mm_rtl=$(document.documentElement).attr('dir')=='rtl',mm_trigger=$(document.documentElement).hasClass('mm-hover'),sb_width=(function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),child=parent.children(),width=child.innerWidth()
-child.height(100).innerWidth();parent.remove();return width;})();if(!$.support.transition){$('.t3-megamenu').removeClass('animate');mm_timeout=100;}
$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});$(window).load(function(){$('ul.nav').has('.dropdown-menu').t3menu({duration:mm_duration,timeout:mm_timeout,rtl:mm_rtl,sb_width:sb_width,hover:mm_trigger});});});})(jQuery);


/*===============================
/templates/purity_iii/js/script.js
================================================================================*/;
(function($){function CountUp(element,options){this.$element=$(element);this.$counter=this.$element.find('.count-up');this.$progress=this.$element.find('.pro-bar');this.options=options;this.value=options.from;this.$element.on('mouseenter',$.proxy(this.run,this));}
CountUp.prototype={run:function(){if(this.$element.hasClass('start')){return;}
this.$element.addClass('start');this.$counter.stop(true).css('display','block').fadeTo(250,1).siblings('.face').css('display','none');$(this).stop(true).animate({value:this.options.to},{step:function(now){this.$counter.html(Math.round(now)+'%');},duration:this.options.duration,complete:function(){setTimeout($.proxy(function(){this.$counter.delay(250).parent().children().css({display:'',opacity:''});this.$progress.css('display','');},this),250);this.$element.off('mouseenter');}});this.$progress.css({width:'0%',display:'block'}).animate({width:this.options.to+'%'},this.options.duration);}}
CountUp.defaults={from:0,to:100,duration:2000}
$.fn.countup=function(option){return this.each(function(){var
$this=$(this),data=$this.data('countup'),options=$.extend({},CountUp.defaults,$this.data(),typeof option=='object'&&option),action=typeof option=='string'?option:false;if(!data){$this.data('countup',(data=new CountUp(this,options)))}
if(action&&data[action]){data[action]()}})}})(jQuery);(function($){$(document).ready(function(){$('.t3-navbar .t3-megamenu ul li > a').click(function(e){if($(this).hasClass('dropdown-toggle')){window.location.href=$(this).attr('href');}});(function(){$('[data-js="count-up"]').countup();})();});})(jQuery);


/*===============================
/plugins/system/t3/base-bs3/js/nav-collapse.js
================================================================================*/;
jQuery(document).ready(function($){$('.t3-navbar').each(function(){var $navwrapper=$(this),$menu=null,$placeholder=null;if($navwrapper.find('.t3-megamenu').length){$menu=$navwrapper.find('ul.level0').clone(),$placeholder=$navwrapper.prev('.navbar-collapse');if(!$placeholder.length){$placeholder=$navwrapper.closest('.container, .t3-mainnav').find('.navbar-collapse:empty');}
var lis=$menu.find('li[data-id]'),liactive=lis.filter('.current');lis.removeClass('mega dropdown mega-align-left mega-align-right mega-align-center mega-align-adjust');lis.each(function(){var $li=$(this),$child=$li.find('>:first-child');if($child[0].nodeName=='DIV'){$child.find('>:first-child').prependTo($li);$child.remove();}
if($li.data('hidewcol')){$child.find('.caret').remove();$child.nextAll().remove();return;}
var subul=$li.find('ul.level'+$li.data('level'));if(subul.length){$ul=$('<ul class="level'+$li.data('level')+' dropdown-menu">');subul.each(function(){if($(this).parents('.mega-col-nav').data('hidewcol'))return;$(this).find('>li').appendTo($ul);});if($ul.children().length){$ul.appendTo($li);}}
$li.find('>div').remove();if(!$li.children('ul').length){$child.find('.caret').remove();}
var divider=$li.hasClass('divider');for(var x in $li.data()){$li.removeAttr('data-'+x)}
$child.removeAttr('class');for(var x in $child.data()){$child.removeAttr('data-'+x)}
if(divider){$li.addClass('divider');}});liactive.addClass('current active');}else{$menu=$navwrapper.find('ul.nav').clone();$placeholder=$('.t3-navbar-collapse:empty, .navbar-collapse:empty').eq(0);}
$menu.find('a[data-toggle="dropdown"]').removeAttr('data-toggle').removeAttr('data-target');$menu.find('> li > ul.dropdown-menu').prev('a').attr('data-toggle','dropdown').attr('data-target','#').parent('li').addClass(function(){return'dropdown'+($(this).data('level')>1?' dropdown-submenu':'');});$menu.appendTo($placeholder);});});


/*===============================
/plugins/system/jabuilder/assets/js/jabuilder.js
================================================================================*/;
(function($){var createCookie=function(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
var readCookie=function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
var eraseCookie=function(name){createCookie(name,"",-1);}
$(document).ready(function(){if(window.JUB_EDIT_BUTTON){$(JUB_EDIT_BUTTON).appendTo('body').on('click',function(){createCookie('JUBEDIT_VISITED',1,30);var url=location.href.split('#')[0];url+=url.match(/\?/)?'&jub=edit':'?jub=edit';location.href=url;return false;});}
$(window).on('load',function(){setTimeout(function(){if($('.jub-edit-btn').length||window.JUB_EDIT_BUTTON){if(!readCookie('JUBEDIT_VISITED')){$('body').addClass('jub-onboarding');}
$('.jub-edit-btn').on('click',function(){createCookie('JUBEDIT_VISITED',1,30);})}},1000);})})})(jQuery)