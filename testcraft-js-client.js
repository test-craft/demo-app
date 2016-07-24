'use strict';

(function(document){
    //
    function log(str){
        console.log(str);
    }

    // Consts
    var EVENT_TIME_DIFFERENCE = 150;
    var MAX_NAME_LENGTH = 25;
    var INTERVAL_TIME = 5000;

    var isRecording = true;
    var components = [];

    var sessionId = '';

    // ========== Deceleration Of Maps ==========//

    var MAPPING_TAGNAME_COMPONENT = {
        rect :  'rect',
        path : 'path',
        img : 'image',
        ellipse : 'ellipse',
        div : 'div'
    };

    var MAP_ELEMENT_NAME_FUNCTIONS_PRIORITY = [
        function (element){
            element._type = findElementType(element);

            return null;
        },

        function(element){
            var innerText = element.innerText;
            if (innerText){
                return (innerText + ' ' + element._type).substr(0, MAX_NAME_LENGTH);
            }
            return null;
        },

        function(element){

            var title = element.getAttribute('title');
            if (title){
                return title + ' ' + element._type;
            }

            return null;
        },

        function(element){
            var name = element.getAttribute('name');
            var value = element.getAttribute('value');
            if (name || value){
                return (name ? (name + ' ') : '') + (value ? (value + ' ') : '') + element._type;
            }
            return null;
        },

        function(element){
            var placeholder = element.getAttribute('placeholder');
            if (placeholder){
                return placeholder + ' ' + element._type;
            }
            return null;
        }
    ];

    var MAP_EVENTS_FUNCTION = {
        contextmenu : function(evt,callback){
            eventsHandler.handleEvent('contextmenu', evt, callback);
        },

        drag : function(evt, callback){
            eventsHandler.handleEvent('drag', evt, callback);
        },

        keypress : function(evt, callback){
            eventsHandler.handleEvent('keypress', evt, callback);
        },

        click : function(evt, callback){
            eventsHandler.handleEvent('click', evt, callback);
        },

        mousedown : function(evt, callback){
            eventsHandler.handleEvent('mousedown', evt, callback);
        },

        mouseup : function(evt, callback){
            eventsHandler.handleEvent('mouseup', evt, callback);
        },

        mouseover : function(evt, callback){
            eventsHandler.handleEvent('mouseover', evt, callback);
        },

        mouseout : function(evt, callback){
            eventsHandler.handleEvent('mouseout', evt, callback);
        }
    };

    var MAP_INPUT_TYPE = {
        button : 'button',
        submit : 'button',
        radio : 'radio',
        checkbox : 'checkbox',
        password : 'textbox',
        email : 'textbox',
        text : 'textbox',
        url : 'textbox',
        tel : 'textbox',
        search : 'textbox',
        number : 'textbox'
    };

    var MAP_EVENT_DATA = {
        contextmenu : function(evt){
            return null;
        },

        drag : function(evt){
            return null
        },

        keypress : function(evt){
            return String.fromCharCode(evt.which);
        },

        click : function(evt){
            return null;
        },

        mouseup : function(evt){
            return {x : evt.x, y : evt.y};
        },

        mousedown : function(evt){
            return {x : evt.x, y : evt.y};
        },

        mouseover : function(evt){
            return {x : evt.x, y : evt.y};
        },

        mouseout : function(evt){
            return {x : evt.x, y : evt.y};
        }
    };


    // ========== End Of Declerations ========== //

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function findElementType(element){
        var tagName = element.tagName.toLowerCase();
        var type = element.getAttribute('type');
        type = type ? type.toLowerCase() : null;
        if (tagName === 'input' || MAP_INPUT_TYPE[tagName]){
            var type = MAP_INPUT_TYPE[tagName] || MAP_INPUT_TYPE[type];
            if (!type){
                return 'textbox';
            }
            return type;
        }

        if (MAPPING_TAGNAME_COMPONENT[tagName]){
            return MAPPING_TAGNAME_COMPONENT[tagName];
        }

        return 'label';
    }

    /**
     * Object to Handle the events
     * @type {{_logEvents: Array, handleEvent: Function}}
     */
    var eventsHandler = {
        _logEvents : [],
        _similarEvents : [],
        _events : [],
        /**
         * Handle Event
         * @param {String} name - event type / name
         * @param {Event} evt - the event
         */
        handleEvent : function(name, evt, callback){
            var lastEvent = eventsHandler._logEvents[eventsHandler._logEvents.length - 1];
            //evt.stopPropagation();
            eventsHandler._logEvents.push(evt);

            var element = evt.target;
            // var element = checkForRelevantParent(evt.target);

            // utils.prepareElement(evt.target);

            var data = null;
            var lastData = null;
            if (MAP_EVENT_DATA[name]){
                data = MAP_EVENT_DATA[name](evt);
            }
            if (lastEvent && MAP_EVENT_DATA[lastEvent.name]){
                lastData = MAP_EVENT_DATA[lastEvent.name](lastEvent.evt);
            }

            // Check if this an bubbling event
            if (lastEvent && lastEvent.type === evt.type &&
                data === lastData &&
                Math.abs(lastEvent.timeStamp - evt.timeStamp) < EVENT_TIME_DIFFERENCE) {
                log(Math.abs(lastEvent.timeStamp - evt.timeStamp));
                eventsHandler._similarEvents.push({
                    name : name,
                    evt : evt,
                    element : element
                });

                log('Same Event');

                return callback(null);
            } else {
                // log ('Lastevent');
                // log(lastEvent);
                // log('Event');
                // log(evt);
            }

            utils.setEvent(name, element, MAP_EVENT_DATA[name](evt));

            return callback(null);
        }
    };

    /**
     * Utils Object
     */
    var utils = {
        /**
         * Get Relative URL of page
         * @returns {string}
         */
        getRelativeUrl : function(){
            return window.location.pathname + window.location.hash;
        },

        prepareElement : function(element){
            // Get the element binding first
            //element._binding = findElementBinding(element).binding;
            var binding = findAllBinding(element);

            for (var i = 0;i<binding.length;i++){
                if (binding[i] === null){
                    binding.splice(i, 1);
                    i--;
                }
            }

            element._binding = {
                full : binding[0],
                partial : binding[binding.length - 1],
                all : binding
            };
        },

        setEvent : function(name, element, data){
            isStable = true;

            // Create new component
            var componentInstance = ComponentInstance.getDefined(element);
            if (!componentInstance) {
                componentInstance = new ComponentInstance(element);
            }

            eventsHandler._events.push({
                name : name,
                component : componentInstance.getObject(),
                data : data,
                timestamp : new Date().getTime(),
                sessionId : sessionId
            });
        },

        sendEvents : function(){
            if (eventsHandler._events.length === 0) return;

            log('=== Sending [' + eventsHandler._events.length + ']');

            log(eventsHandler._events);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    // log('Event Sent');
                }
            };
            xhttp.open("POST", "http://localhost:3000/api/user-event", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(utils.clearEvents(eventsHandler._events)));

            eventsHandler._events = [];

        },

        clearEvents : function(events){
            var result = [];
            for (var i = 0; i < events.length - 1 ; i++){
                if (events[i].name === 'mouseover' && events[i+1].name === 'mouseout' &&
                    events[i].component.localId === events[i+1].component.localId){
                    i++;
                } else {
                    result.push(events[i]);
                }
            }

            return result;
        }
    };

    /**
     * Component Instance Implementation
     * @param {DOM Element} element
     * @constructor
     */
    function ComponentInstance(element){
        var guid = '' + (new Date().getTime());

        // Dispatch an event to the Content Script
        var box = element.getBoundingClientRect();

        if (element.nextElementSibling && (box.width === 0 || box.height === 0)){
            box = element.nextElementSibling.getBoundingClientRect();
        }

        this.object = {
            name : '',
            binding : [],
            pageUrl : utils.getRelativeUrl(),
            localId : guid,
            innerText : element.innerText,
            box : box
        };

        this.findElementBinding(element);

        this.findComponentType(element);

        this.object.name = this.createElementName(element);

        element.setAttribute('tc-guid', guid);
        components[guid] = this;
    }

    /**
     * This method will check if a near parent is an input and the event is actually on him
     * eample:
     * <button>
     *     <span>Test</span>
     * </button>
     * @param element
     */
    function checkForRelevantParent(element){
        var parent = element.parentElement;
        var tagName, type;
        var index = 0;
        while(parent && parent !== document.body && index < 10){
            tagName = parent.tagName.toLowerCase();
            type = parent.getAttribute('type');
            type = type ? type.toLowerCase() : null;
            log('parent tag [' + tagName + '] with type [' + type + ']');

            if ((type && MAP_INPUT_TYPE[type]) || MAP_INPUT_TYPE[tagName]){
                log('Found relevant parent [' + (type ? type : tagName) + '] - Changing to it');
                return parent;
            }

            parent = parent.parentElement;
            index++;
        }

        return element;
    }

    ComponentInstance.getDefined = function(element){
        var tcGuid = element.getAttribute('tc-guid');
        if (!tcGuid) return null;

        var component = components[tcGuid];
        if (!component) return null;

        return component;
    };

    ComponentInstance.prototype.findElementBinding = function(element){
        // utils.prepareElement(element);

        var binding = findAllBinding(element);

        for (var i = 0; i < binding.length; i++){
            this.addBinding('css', binding[i]);
        }
    };


    /**
     * Find Binding By Id and css path
     * @param el
     * @param isFullPath
     * @returns {Array}
     */
    function findAllBinding(el){

        var bindings = [];

        var selectors = getSelectors();

        for(var i in selectors){
            if (typeof selectors[i].getSelector !== 'function') continue;

            var bind = selectors[i].getSelector(el);

            if (bindings.indexOf(bind) === -1){
                bindings.push(bind);
            }
        }

        return bindings;
    }

    /**
     * Find component type
     * @param {DOM Element} element
     */
    ComponentInstance.prototype.findComponentType = function(element){
        this.object.component = findElementType(element);
    };

    /**
     * Getter component type
     */
    ComponentInstance.prototype.getComponentType = function(){
        return this.object.component;
    };

    /**
     * Add Binding to the Component
     * @param {String} type
     * @param {String} value
     */
    ComponentInstance.prototype.addBinding = function(type, value){
        if (!type || !value) return;

        this.object.binding.push({
            bType : type,
            value : value
        });
    };

    /**
     * Create a name for this instance
     * @private
     */
    ComponentInstance.prototype.createElementName = function(element){
        var name;
        for (var i = 0; i < MAP_ELEMENT_NAME_FUNCTIONS_PRIORITY.length; i++){
            name = MAP_ELEMENT_NAME_FUNCTIONS_PRIORITY[i](element);

            if (name) {
                return name;
            }
        }

        // default
        return this.object.binding[0].value;
    };

    /**
     * Get the object of this Component
     * @returns {*}
     */
    ComponentInstance.prototype.getObject = function(){
        return this.object;
    };

    function registerEvents(){
        document.addEventListener("mousedown", eventHandler('mousedown'), true);
        document.addEventListener("mouseup", eventHandler('mouseup'), true);
        document.addEventListener("mouseover", eventHandler('mouseover'), true);
        document.addEventListener("mouseout", eventHandler('mouseout'), true);
        document.addEventListener("keypress", eventHandler('keypress'), true);
    }

    function eventHandler(type) {
        return function(event) {
            if (type === 'keypress' && event.ctrlKey && event.which === 9 && isRecording){
                return ;
            }
            // if (isInspecting && !isTestcraftElement(event.target)) return;

            // Get the
            var mappingEventFunction = MAP_EVENTS_FUNCTION[type];

            if (!isRecording) {
                return;
            }

            // Run the mapping function only when recording and exists
            if (!mappingEventFunction) {
                return;
            }

            mappingEventFunction(event, function (err) {
                // Call original handler

            });
        }
    }

    var isStable = false;
    function registerDomObserver(){
        window.addEventListener('DOMContentLoaded', function() {
            var observerObject = document.body;

            // create an observer instance
            var observer = new MutationObserver(function (mutations) {
                if (!isStable) return;

                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes.length > 0) {
                        for (var i = 0 ; i < mutation.addedNodes.length ; i++) {
                            if (!mutation.addedNodes[i].tagName) continue;

                            utils.setEvent('DOMNodeInserted', mutation.addedNodes[i], {});
                        }
                    }
                });
            });

            // configuration of the observer:
            var config = {attributes: true, childList: true, characterData: true, subtree: true};

            // pass in the target node, as well as the observer options
            observer.observe(observerObject, config);
        });
    }

    function getSelectors(){
        var allSelectors =
            [
                new CssSelectorGenerator({selectors : ['id', 'class', 'tag', 'nthchild']}),
                new CssSelectorGenerator({selectors : ['id', 'tag', 'class', 'nthchild']}),
                new CssSelectorGenerator({selectors : ['id', 'tag', 'nthchild']}),
                new CssSelectorGenerator({selectors : ['id']}),
                new CssSelectorGenerator({selectors : ['class']}),
                new CssSelectorGenerator({selectors : ['tag']}),
                new CssSelectorGenerator({selectors : ['class', 'id', 'tag', 'nthchild']}),
                new CssSelectorGenerator({selectors : ['class', 'tag', 'id', 'nthchild']}),
                new CssSelectorGenerator({selectors : ['tag', 'id', 'class', 'nthchild']}),
                new CssSelectorGenerator({selectors : ['tag', 'class', 'id', 'nthchild']})
            ];

        return allSelectors;
    }

    // CSS Selectors

    var CssSelectorGenerator, root,
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    CssSelectorGenerator = (function() {
        CssSelectorGenerator.prototype.default_options = {
            selectors: ['id', 'class', 'tag', 'nthchild'],
            owner : null
        };

        function CssSelectorGenerator(options) {
            if (options == null) {
                options = {};
            }
            this.options = {};
            this.setOptions(this.default_options);
            this.setOptions(options);
        }

        CssSelectorGenerator.prototype.setOptions = function(options) {
            var key, results, val;
            if (options == null) {
                options = {};
            }
            results = [];
            for (key in options) {
                val = options[key];
                if (this.default_options.hasOwnProperty(key)) {
                    results.push(this.options[key] = val);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        CssSelectorGenerator.prototype.isElement = function(element) {
            return !!((element != null ? element.nodeType : void 0) === 1);
        };

        CssSelectorGenerator.prototype.getParents = function(element) {
            var current_element, result;
            result = [];
            if (this.isElement(element)) {
                current_element = element;
                while (this.isElement(current_element)) {
                    result.push(current_element);
                    current_element = current_element.parentNode;
                }
            }
            return result;
        };

        CssSelectorGenerator.prototype.getTagSelector = function(element) {
            return element.tagName.toLowerCase();
        };

        CssSelectorGenerator.prototype.sanitizeItem = function(item) {
            var characters;
            characters = (item.split('')).map(function(character) {
                if (character === ':') {
                    return "\\" + (':'.charCodeAt(0).toString(16).toUpperCase()) + " ";
                } else if (/[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(character)) {
                    return "\\" + character;
                } else {
                    return escape(character).replace(/\%/g, '\\');
                }
            });
            return characters.join('');
        };

        CssSelectorGenerator.prototype.getIdSelector = function(element) {
            var id, sanitized_id;
            id = element.getAttribute('id');
            if ((id != null) && (id !== '') && !(/\s/.exec(id)) && !(/^\d/.exec(id))) {
                sanitized_id = "#" + (this.sanitizeItem(id));
                if (document.querySelectorAll(sanitized_id).length === 1) {
                    return sanitized_id;
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.getClassSelectors = function(element) {

            var notValidCssSelectors = [
                new RegExp('active'),
                new RegExp('edit'),
                new RegExp('ng-.*'), // All angular classes,
                new RegExp('md-.*') // All material design classes
            ];

            var class_string, item, result;
            result = [];
            if (element.tagName === 'HTML') {
                return result;
            }

            var sanitized;
            class_string = element.getAttribute('class');
            if (class_string != null) {
                class_string = class_string.replace(/\s+/g, ' ');
                class_string = class_string.replace(/^\s|\s$/g, '');
                if (class_string !== '') {
                    result = (function() {
                        var k, len, ref, results;
                        ref = class_string.split(/\s+/);
                        results = [];
                        for (k = 0, len = ref.length; k < len; k++) {
                            item = ref[k];

                            sanitized = this.sanitizeItem(item);

                            var isValid = true;
                            for (var i = 0 ; i < notValidCssSelectors.length ; i++){
                                if (notValidCssSelectors[i].test(sanitized)){
                                    isValid = false;
                                    break;
                                }
                            }

                            if (isValid) {
                                results.push("." + sanitized);
                            }
                        }
                        return results;
                    }).call(this);
                }
            }
            return result;
        };

        CssSelectorGenerator.prototype.getAttributeSelectors = function(element) {
            var attribute, blacklist, k, len, ref, ref1, result;
            result = [];
            blacklist = ['id', 'class'];
            ref = element.attributes;
            for (k = 0, len = ref.length; k < len; k++) {
                attribute = ref[k];
                if (ref1 = attribute.nodeName, indexOf.call(blacklist, ref1) < 0) {
                    if (attribute.nodeValue && attribute.nodeValue !== '') {
                        result.push("[" + attribute.nodeName + "=\"" + attribute.nodeValue + "\"]");
                    }
                }
            }
            return result;
        };

        CssSelectorGenerator.prototype.getNthChildSelector = function(element) {
            var counter, k, len, parent_element, sibling, siblings;
            parent_element = element.parentNode;
            if (parent_element != null) {
                counter = 0;
                siblings = parent_element.childNodes;
                for (k = 0, len = siblings.length; k < len; k++) {
                    sibling = siblings[k];
                    if (this.isElement(sibling)) {
                        counter++;
                        if (sibling === element) {
                            return ":nth-child(" + counter + ")";
                        }
                    }
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.testSelector = function(element, selector) {
            var is_unique, result;
            is_unique = false;
            if ((selector != null) && selector !== '') {
                if (this.options.owner) {
                    result = this.options.owner.querySelectorAll(selector);
                } else {
                    result = element.ownerDocument.querySelectorAll(selector);
                }
                if (result.length === 1 && result[0] === element) {
                    is_unique = true;
                }
            }
            return is_unique;
        };

        CssSelectorGenerator.prototype.getAllSelectors = function(element) {
            var result;
            result = {
                t: null,
                i: null,
                c: null,
                a: null,
                n: null
            };
            if (indexOf.call(this.options.selectors, 'tag') >= 0) {
                result.t = this.getTagSelector(element);
            }
            if (indexOf.call(this.options.selectors, 'id') >= 0) {
                result.i = this.getIdSelector(element);
            }
            if (indexOf.call(this.options.selectors, 'class') >= 0) {
                result.c = this.getClassSelectors(element);
            }
            if (indexOf.call(this.options.selectors, 'attribute') >= 0) {
                result.a = this.getAttributeSelectors(element);
            }
            if (indexOf.call(this.options.selectors, 'nthchild') >= 0) {
                result.n = this.getNthChildSelector(element);
            }
            return result;
        };

        CssSelectorGenerator.prototype.testUniqueness = function(element, selector) {
            var found_elements, parent;
            parent = element.parentNode;
            found_elements = parent.querySelectorAll(selector);
            return found_elements.length === 1 && found_elements[0] === element;
        };

        CssSelectorGenerator.prototype.testCombinations = function(element, items, tag) {
            var item, k, l, len, len1, ref, ref1;
            ref = this.getCombinations(items);
            for (k = 0, len = ref.length; k < len; k++) {
                item = ref[k];
                if (this.testUniqueness(element, item)) {
                    return item;
                }
            }
            if (tag != null) {
                ref1 = items.map(function(item) {
                    return tag + item;
                });
                for (l = 0, len1 = ref1.length; l < len1; l++) {
                    item = ref1[l];
                    if (this.testUniqueness(element, item)) {
                        return item;
                    }
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.getUniqueSelector = function(element) {
            var found_selector, k, len, ref, selector_type, selectors;
            selectors = this.getAllSelectors(element);
            ref = this.options.selectors;
            for (k = 0, len = ref.length; k < len; k++) {
                selector_type = ref[k];
                switch (selector_type) {
                    case 'id':
                        if (selectors.i != null) {
                            return selectors.i;
                        }
                        break;
                    case 'tag':
                        if (selectors.t != null) {
                            if (this.testUniqueness(element, selectors.t)) {
                                return selectors.t;
                            }
                        }
                        break;
                    case 'class':
                        if ((selectors.c != null) && selectors.c.length !== 0) {
                            found_selector = this.testCombinations(element, selectors.c, selectors.t);
                            if (found_selector) {
                                return found_selector;
                            }
                        }
                        break;
                    case 'attribute':
                        if ((selectors.a != null) && selectors.a.length !== 0) {
                            found_selector = this.testCombinations(element, selectors.a, selectors.t);
                            if (found_selector) {
                                return found_selector;
                            }
                        }
                        break;
                    case 'nthchild':
                        if (selectors.n != null) {
                            return selectors.n;
                        }
                }
            }
            return '*';
        };

        CssSelectorGenerator.prototype.getSelector = function(element) {
            var all_selectors, item, k, l, len, len1, parents, result, selector, selectors;
            all_selectors = [];
            parents = this.getParents(element);
            for (k = 0, len = parents.length; k < len; k++) {
                item = parents[k];
                selector = this.getUniqueSelector(item);
                if (selector != null) {
                    all_selectors.push(selector);
                }
            }
            selectors = [];
            for (l = 0, len1 = all_selectors.length; l < len1; l++) {
                item = all_selectors[l];
                selectors.unshift(item);
                result = selectors.join('>');
                if (this.testSelector(element, result)) {
                    return result;
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.getCombinations = function(items) {
            var i, j, k, l, ref, ref1, result;
            if (items == null) {
                items = [];
            }
            result = [[]];
            for (i = k = 0, ref = items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                for (j = l = 0, ref1 = result.length - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
                    result.push(result[j].concat(items[i]));
                }
            }
            result.shift();
            result = result.sort(function(a, b) {
                return a.length - b.length;
            });
            result = result.map(function(item) {
                return item.join('');
            });
            return result;
        };

        return CssSelectorGenerator;

    })();

    function init(){
        registerDomObserver();

        registerEvents();

        setInterval(utils.sendEvents, INTERVAL_TIME);

        sessionId = guid();
    }
    init();

})(document);
