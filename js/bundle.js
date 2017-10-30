/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(h) {'use strict';

	var _pulquiMin = __webpack_require__(11);

	var _App = __webpack_require__(13);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var miPulquiApp = (0, _pulquiMin.Pulqui)();
	miPulquiApp.start(h(_App2.default, null), document.getElementById('pulqui-app'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	
	const createElement = __webpack_require__(2).createElement
	const addPx = __webpack_require__(10)

	const parseValue = (prop, val) => typeof val === 'number' ? addPx(prop, val) : val
	const kebab = (str) => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())
	const styleToString = (style) => {
	  return Object.keys(style)
	    .filter(key => style[key] !== null)
	    .map(key => `${kebab(key)}:${parseValue(key, style[key])}`)
	    .join(';')
	}

	const transformProps = (props) => {
	  if (props.style && typeof props.style === 'object') {
	    props.style = styleToString(props.style)
	  }

	  for (let key in props) {
	    if (/^on/.test(key)) {
	      const lowerkey = key.toLowerCase()
	      if (lowerkey !== key) {
	        props[lowerkey] = props[key]
	        delete props[key]
	      }
	    }
	  }
	  return props
	}

	const h = (tag, props = {}, ...children) => {
	  if (props && props.children) {
	    children = props.children
	    delete props.children
	  }

	  props = transformProps(props || {})

	  if (typeof tag === 'function') {
	    props = props || {}
	    props.children = children
	    const root = tag(props, ...children)
	    return root
	  }

	  return createElement(tag, props || {}, children)
	}
	module.exports = h


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(3)
	var hyperx = __webpack_require__(5)
	var onload = __webpack_require__(7)

	var SVGNS = 'http://www.w3.org/2000/svg'
	var XLINKNS = 'http://www.w3.org/1999/xlink'

	var BOOL_PROPS = {
	  autofocus: 1,
	  checked: 1,
	  defaultchecked: 1,
	  disabled: 1,
	  formnovalidate: 1,
	  indeterminate: 1,
	  readonly: 1,
	  required: 1,
	  selected: 1,
	  willvalidate: 1
	}
	var COMMENT_TAG = '!--'
	var SVG_TAGS = [
	  'svg',
	  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
	  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
	  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
	  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
	  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
	  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
	  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
	  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
	  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
	  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
	  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
	  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
	  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
	  'tspan', 'use', 'view', 'vkern'
	]

	function belCreateElement (tag, props, children) {
	  var el

	  // If an svg tag, it needs a namespace
	  if (SVG_TAGS.indexOf(tag) !== -1) {
	    props.namespace = SVGNS
	  }

	  // If we are using a namespace
	  var ns = false
	  if (props.namespace) {
	    ns = props.namespace
	    delete props.namespace
	  }

	  // Create the element
	  if (ns) {
	    el = document.createElementNS(ns, tag)
	  } else if (tag === COMMENT_TAG) {
	    return document.createComment(props.comment)
	  } else {
	    el = document.createElement(tag)
	  }

	  // If adding onload events
	  if (props.onload || props.onunload) {
	    var load = props.onload || function () {}
	    var unload = props.onunload || function () {}
	    onload(el, function belOnload () {
	      load(el)
	    }, function belOnunload () {
	      unload(el)
	    },
	    // We have to use non-standard `caller` to find who invokes `belCreateElement`
	    belCreateElement.caller.caller.caller)
	    delete props.onload
	    delete props.onunload
	  }

	  // Create the properties
	  for (var p in props) {
	    if (props.hasOwnProperty(p)) {
	      var key = p.toLowerCase()
	      var val = props[p]
	      // Normalize className
	      if (key === 'classname') {
	        key = 'class'
	        p = 'class'
	      }
	      // The for attribute gets transformed to htmlFor, but we just set as for
	      if (p === 'htmlFor') {
	        p = 'for'
	      }
	      // If a property is boolean, set itself to the key
	      if (BOOL_PROPS[key]) {
	        if (val === 'true') val = key
	        else if (val === 'false') continue
	      }
	      // If a property prefers being set directly vs setAttribute
	      if (key.slice(0, 2) === 'on') {
	        el[p] = val
	      } else {
	        if (ns) {
	          if (p === 'xlink:href') {
	            el.setAttributeNS(XLINKNS, p, val)
	          } else if (/^xmlns($|:)/i.test(p)) {
	            // skip xmlns definitions
	          } else {
	            el.setAttributeNS(null, p, val)
	          }
	        } else {
	          el.setAttribute(p, val)
	        }
	      }
	    }
	  }

	  function appendChild (childs) {
	    if (!Array.isArray(childs)) return
	    for (var i = 0; i < childs.length; i++) {
	      var node = childs[i]
	      if (Array.isArray(node)) {
	        appendChild(node)
	        continue
	      }

	      if (typeof node === 'number' ||
	        typeof node === 'boolean' ||
	        typeof node === 'function' ||
	        node instanceof Date ||
	        node instanceof RegExp) {
	        node = node.toString()
	      }

	      if (typeof node === 'string') {
	        if (el.lastChild && el.lastChild.nodeName === '#text') {
	          el.lastChild.nodeValue += node
	          continue
	        }
	        node = document.createTextNode(node)
	      }

	      if (node && node.nodeType) {
	        el.appendChild(node)
	      }
	    }
	  }
	  appendChild(children)

	  return el
	}

	module.exports = hyperx(belCreateElement, {comments: true})
	module.exports.default = module.exports
	module.exports.createElement = belCreateElement


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(4);

	var doccy;

	if (typeof document !== 'undefined') {
	    doccy = document;
	} else {
	    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }
	}

	module.exports = doccy;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var attrToProp = __webpack_require__(6)

	var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
	var ATTR_KEY = 5, ATTR_KEY_W = 6
	var ATTR_VALUE_W = 7, ATTR_VALUE = 8
	var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
	var ATTR_EQ = 11, ATTR_BREAK = 12
	var COMMENT = 13

	module.exports = function (h, opts) {
	  if (!opts) opts = {}
	  var concat = opts.concat || function (a, b) {
	    return String(a) + String(b)
	  }
	  if (opts.attrToProp !== false) {
	    h = attrToProp(h)
	  }

	  return function (strings) {
	    var state = TEXT, reg = ''
	    var arglen = arguments.length
	    var parts = []

	    for (var i = 0; i < strings.length; i++) {
	      if (i < arglen - 1) {
	        var arg = arguments[i+1]
	        var p = parse(strings[i])
	        var xstate = state
	        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
	        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
	        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
	        if (xstate === ATTR) xstate = ATTR_KEY
	        p.push([ VAR, xstate, arg ])
	        parts.push.apply(parts, p)
	      } else parts.push.apply(parts, parse(strings[i]))
	    }

	    var tree = [null,{},[]]
	    var stack = [[tree,-1]]
	    for (var i = 0; i < parts.length; i++) {
	      var cur = stack[stack.length-1][0]
	      var p = parts[i], s = p[0]
	      if (s === OPEN && /^\//.test(p[1])) {
	        var ix = stack[stack.length-1][1]
	        if (stack.length > 1) {
	          stack.pop()
	          stack[stack.length-1][0][2][ix] = h(
	            cur[0], cur[1], cur[2].length ? cur[2] : undefined
	          )
	        }
	      } else if (s === OPEN) {
	        var c = [p[1],{},[]]
	        cur[2].push(c)
	        stack.push([c,cur[2].length-1])
	      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
	        var key = ''
	        var copyKey
	        for (; i < parts.length; i++) {
	          if (parts[i][0] === ATTR_KEY) {
	            key = concat(key, parts[i][1])
	          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
	            if (typeof parts[i][2] === 'object' && !key) {
	              for (copyKey in parts[i][2]) {
	                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
	                  cur[1][copyKey] = parts[i][2][copyKey]
	                }
	              }
	            } else {
	              key = concat(key, parts[i][2])
	            }
	          } else break
	        }
	        if (parts[i][0] === ATTR_EQ) i++
	        var j = i
	        for (; i < parts.length; i++) {
	          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
	            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
	            else cur[1][key] = concat(cur[1][key], parts[i][1])
	          } else if (parts[i][0] === VAR
	          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
	            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
	            else cur[1][key] = concat(cur[1][key], parts[i][2])
	          } else {
	            if (key.length && !cur[1][key] && i === j
	            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
	              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
	              // empty string is falsy, not well behaved value in browser
	              cur[1][key] = key.toLowerCase()
	            }
	            if (parts[i][0] === CLOSE) {
	              i--
	            }
	            break
	          }
	        }
	      } else if (s === ATTR_KEY) {
	        cur[1][p[1]] = true
	      } else if (s === VAR && p[1] === ATTR_KEY) {
	        cur[1][p[2]] = true
	      } else if (s === CLOSE) {
	        if (selfClosing(cur[0]) && stack.length) {
	          var ix = stack[stack.length-1][1]
	          stack.pop()
	          stack[stack.length-1][0][2][ix] = h(
	            cur[0], cur[1], cur[2].length ? cur[2] : undefined
	          )
	        }
	      } else if (s === VAR && p[1] === TEXT) {
	        if (p[2] === undefined || p[2] === null) p[2] = ''
	        else if (!p[2]) p[2] = concat('', p[2])
	        if (Array.isArray(p[2][0])) {
	          cur[2].push.apply(cur[2], p[2])
	        } else {
	          cur[2].push(p[2])
	        }
	      } else if (s === TEXT) {
	        cur[2].push(p[1])
	      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
	        // no-op
	      } else {
	        throw new Error('unhandled: ' + s)
	      }
	    }

	    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
	      tree[2].shift()
	    }

	    if (tree[2].length > 2
	    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
	      throw new Error(
	        'multiple root elements must be wrapped in an enclosing tag'
	      )
	    }
	    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
	    && Array.isArray(tree[2][0][2])) {
	      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
	    }
	    return tree[2][0]

	    function parse (str) {
	      var res = []
	      if (state === ATTR_VALUE_W) state = ATTR
	      for (var i = 0; i < str.length; i++) {
	        var c = str.charAt(i)
	        if (state === TEXT && c === '<') {
	          if (reg.length) res.push([TEXT, reg])
	          reg = ''
	          state = OPEN
	        } else if (c === '>' && !quot(state) && state !== COMMENT) {
	          if (state === OPEN) {
	            res.push([OPEN,reg])
	          } else if (state === ATTR_KEY) {
	            res.push([ATTR_KEY,reg])
	          } else if (state === ATTR_VALUE && reg.length) {
	            res.push([ATTR_VALUE,reg])
	          }
	          res.push([CLOSE])
	          reg = ''
	          state = TEXT
	        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
	          if (opts.comments) {
	            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
	          }
	          reg = ''
	          state = TEXT
	        } else if (state === OPEN && /^!--$/.test(reg)) {
	          if (opts.comments) {
	            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
	          }
	          reg = c
	          state = COMMENT
	        } else if (state === TEXT || state === COMMENT) {
	          reg += c
	        } else if (state === OPEN && /\s/.test(c)) {
	          res.push([OPEN, reg])
	          reg = ''
	          state = ATTR
	        } else if (state === OPEN) {
	          reg += c
	        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
	          state = ATTR_KEY
	          reg = c
	        } else if (state === ATTR && /\s/.test(c)) {
	          if (reg.length) res.push([ATTR_KEY,reg])
	          res.push([ATTR_BREAK])
	        } else if (state === ATTR_KEY && /\s/.test(c)) {
	          res.push([ATTR_KEY,reg])
	          reg = ''
	          state = ATTR_KEY_W
	        } else if (state === ATTR_KEY && c === '=') {
	          res.push([ATTR_KEY,reg],[ATTR_EQ])
	          reg = ''
	          state = ATTR_VALUE_W
	        } else if (state === ATTR_KEY) {
	          reg += c
	        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
	          res.push([ATTR_EQ])
	          state = ATTR_VALUE_W
	        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
	          res.push([ATTR_BREAK])
	          if (/[\w-]/.test(c)) {
	            reg += c
	            state = ATTR_KEY
	          } else state = ATTR
	        } else if (state === ATTR_VALUE_W && c === '"') {
	          state = ATTR_VALUE_DQ
	        } else if (state === ATTR_VALUE_W && c === "'") {
	          state = ATTR_VALUE_SQ
	        } else if (state === ATTR_VALUE_DQ && c === '"') {
	          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
	          reg = ''
	          state = ATTR
	        } else if (state === ATTR_VALUE_SQ && c === "'") {
	          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
	          reg = ''
	          state = ATTR
	        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
	          state = ATTR_VALUE
	          i--
	        } else if (state === ATTR_VALUE && /\s/.test(c)) {
	          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
	          reg = ''
	          state = ATTR
	        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
	        || state === ATTR_VALUE_DQ) {
	          reg += c
	        }
	      }
	      if (state === TEXT && reg.length) {
	        res.push([TEXT,reg])
	        reg = ''
	      } else if (state === ATTR_VALUE && reg.length) {
	        res.push([ATTR_VALUE,reg])
	        reg = ''
	      } else if (state === ATTR_VALUE_DQ && reg.length) {
	        res.push([ATTR_VALUE,reg])
	        reg = ''
	      } else if (state === ATTR_VALUE_SQ && reg.length) {
	        res.push([ATTR_VALUE,reg])
	        reg = ''
	      } else if (state === ATTR_KEY) {
	        res.push([ATTR_KEY,reg])
	        reg = ''
	      }
	      return res
	    }
	  }

	  function strfn (x) {
	    if (typeof x === 'function') return x
	    else if (typeof x === 'string') return x
	    else if (x && typeof x === 'object') return x
	    else return concat('', x)
	  }
	}

	function quot (state) {
	  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
	}

	var hasOwn = Object.prototype.hasOwnProperty
	function has (obj, key) { return hasOwn.call(obj, key) }

	var closeRE = RegExp('^(' + [
	  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
	  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
	  'source', 'track', 'wbr', '!--',
	  // SVG TAGS
	  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
	  'feBlend', 'feColorMatrix', 'feComposite',
	  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
	  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
	  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
	  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
	  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
	  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
	  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
	  'vkern'
	].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
	function selfClosing (tag) { return closeRE.test(tag) }


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = attributeToProperty

	var transform = {
	  'class': 'className',
	  'for': 'htmlFor',
	  'http-equiv': 'httpEquiv'
	}

	function attributeToProperty (h) {
	  return function (tagName, attrs, children) {
	    for (var attr in attrs) {
	      if (attr in transform) {
	        attrs[transform[attr]] = attrs[attr]
	        delete attrs[attr]
	      }
	    }
	    return h(tagName, attrs, children)
	  }
	}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* global MutationObserver */
	var document = __webpack_require__(3)
	var window = __webpack_require__(8)
	var assert = __webpack_require__(9)
	var watch = Object.create(null)
	var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
	var KEY_ATTR = 'data-' + KEY_ID
	var INDEX = 0

	if (window && window.MutationObserver) {
	  var observer = new MutationObserver(function (mutations) {
	    if (Object.keys(watch).length < 1) return
	    for (var i = 0; i < mutations.length; i++) {
	      if (mutations[i].attributeName === KEY_ATTR) {
	        eachAttr(mutations[i], turnon, turnoff)
	        continue
	      }
	      eachMutation(mutations[i].removedNodes, turnoff)
	      eachMutation(mutations[i].addedNodes, turnon)
	    }
	  })
	  if (document.body) {
	    beginObserve(observer)
	  } else {
	    document.addEventListener('DOMContentLoaded', function (event) {
	      beginObserve(observer)
	    })
	  }
	}

	function beginObserve (observer) {
	  observer.observe(document.body, {
	    childList: true,
	    subtree: true,
	    attributes: true,
	    attributeOldValue: true,
	    attributeFilter: [KEY_ATTR]
	  })
	}

	module.exports = function onload (el, on, off, caller) {
	  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
	  on = on || function () {}
	  off = off || function () {}
	  el.setAttribute(KEY_ATTR, 'o' + INDEX)
	  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
	  INDEX += 1
	  return el
	}

	module.exports.KEY_ATTR = KEY_ATTR
	module.exports.KEY_ID = KEY_ID

	function turnon (index, el) {
	  if (watch[index][0] && watch[index][2] === 0) {
	    watch[index][0](el)
	    watch[index][2] = 1
	  }
	}

	function turnoff (index, el) {
	  if (watch[index][1] && watch[index][2] === 1) {
	    watch[index][1](el)
	    watch[index][2] = 0
	  }
	}

	function eachAttr (mutation, on, off) {
	  var newValue = mutation.target.getAttribute(KEY_ATTR)
	  if (sameOrigin(mutation.oldValue, newValue)) {
	    watch[newValue] = watch[mutation.oldValue]
	    return
	  }
	  if (watch[mutation.oldValue]) {
	    off(mutation.oldValue, mutation.target)
	  }
	  if (watch[newValue]) {
	    on(newValue, mutation.target)
	  }
	}

	function sameOrigin (oldValue, newValue) {
	  if (!oldValue || !newValue) return false
	  return watch[oldValue][3] === watch[newValue][3]
	}

	function eachMutation (nodes, fn) {
	  var keys = Object.keys(watch)
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
	      var onloadid = nodes[i].getAttribute(KEY_ATTR)
	      keys.forEach(function (k) {
	        if (onloadid === k) {
	          fn(k, nodes[i])
	        }
	      })
	    }
	    if (nodes[i].childNodes.length > 0) {
	      eachMutation(nodes[i].childNodes, fn)
	    }
	  }
	}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var win;

	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof global !== "undefined") {
	    win = global;
	} else if (typeof self !== "undefined"){
	    win = self;
	} else {
	    win = {};
	}

	module.exports = win;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	assert.notEqual = notEqual
	assert.notOk = notOk
	assert.equal = equal
	assert.ok = assert

	module.exports = assert

	function equal (a, b, m) {
	  assert(a == b, m) // eslint-disable-line eqeqeq
	}

	function notEqual (a, b, m) {
	  assert(a != b, m) // eslint-disable-line eqeqeq
	}

	function notOk (t, m) {
	  assert(!t, m)
	}

	function assert (t, m) {
	  if (!t) throw new Error(m || 'AssertionError')
	}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/* The following list is defined in React's core */
	var IS_UNITLESS = {
	  animationIterationCount: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridColumn: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  stopOpacity: true,
	  strokeDashoffset: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	module.exports = function(name, value) {
	  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
	    return value + 'px';
	  } else {
	    return value;
	  }
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(h, module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!function (e, t) {
		"object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.pulqui = t() : e.pulqui = t();
	}(undefined, function () {
		return function (e) {
			function t(r) {
				if (n[r]) return n[r].exports;var o = n[r] = { exports: {}, id: r, loaded: !1 };return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
			}var n = {};return t.m = e, t.c = n, t.p = "", t(0);
		}([function (e, t, n) {
			"use strict";
			function r(e) {
				return e && e.__esModule ? e : { default: e };
			}function o() {
				if (!(this instanceof o)) return new o();
			}Object.defineProperty(t, "__esModule", { value: !0 }), t.Pulqui = t.router = void 0;var i = n(1),
			    u = r(i),
			    a = n(12),
			    s = r(a),
			    f = n(21),
			    l = r(f),
			    c = n(26),
			    p = r(c),
			    d = (0, s.default)(),
			    h = (0, l.default)();o.prototype.getRoute = function () {
				var e = window.location.pathname + window.location.hash;return h(e);
			}, o.prototype.start = function (e, t) {
				var n = this;t.appendChild(e), d.prependListener("pushState", function (e) {
					window.history.pushState({}, null, e), d.emit("render");
				}), d.prependListener("popState", function () {
					d.emit("render");
				}), window.addEventListener("popstate", function (e) {
					d.emit("popState");
				}), d.prependListener("render", function () {
					var e = n.getRoute();console.log("RENDER", e);var t = document.getElementById("pulqui-container"),
					    r = document.createElement("main");r.appendChild(e), r.id = "pulqui-container", u.default.update(t, r);
				});
			}, (0, p.default)(function (e) {
				var t = e.href,
				    n = window.location.href;t !== n && d.emit("pushState", t);
			}), t.router = h, t.Pulqui = o;
		}, function (e, t, n) {
			var r = n(2),
			    o = n(10),
			    i = n(11);e.exports = r, e.exports.update = function (e, t, n) {
				function r(e, t) {
					for (var r = n.events || i, o = 0; o < r.length; o++) {
						var u = r[o];t[u] ? e[u] = t[u] : e[u] && (e[u] = void 0);
					}var a = e.value,
					    s = t.value;"INPUT" === e.nodeName && "file" !== e.type || "SELECT" === e.nodeName ? s || t.hasAttribute("value") ? s !== a && (e.value = s) : t.value = e.value : "TEXTAREA" === e.nodeName && null === t.getAttribute("value") && (e.value = t.value);
				}return n || (n = {}), n.events !== !1 && (n.onBeforeElUpdated || (n.onBeforeElUpdated = r)), o(e, t, n);
			};
		}, function (e, t, n) {
			function r(e, t, n) {
				function i(e) {
					if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
						var n = e[t];if (Array.isArray(n)) i(n);else {
							if (("number" == typeof n || "boolean" == typeof n || "function" == typeof n || n instanceof Date || n instanceof RegExp) && (n = n.toString()), "string" == typeof n) {
								if (p.lastChild && "#text" === p.lastChild.nodeName) {
									p.lastChild.nodeValue += n;continue;
								}n = o.createTextNode(n);
							}n && n.nodeType && p.appendChild(n);
						}
					}
				}var p;c.indexOf(e) !== -1 && (t.namespace = a);var d = !1;if (t.namespace && (d = t.namespace, delete t.namespace), d) p = o.createElementNS(d, e);else {
					if (e === l) return o.createComment(t.comment);p = o.createElement(e);
				}if (t.onload || t.onunload) {
					var h = t.onload || function () {},
					    g = t.onunload || function () {};u(p, function () {
						h(p);
					}, function () {
						g(p);
					}, r.caller.caller.caller), delete t.onload, delete t.onunload;
				}for (var y in t) {
					if (t.hasOwnProperty(y)) {
						var v = y.toLowerCase(),
						    m = t[y];if ("classname" === v && (v = "class", y = "class"), "htmlFor" === y && (y = "for"), f[v]) if ("true" === m) m = v;else if ("false" === m) continue;"on" === v.slice(0, 2) ? p[y] = m : d ? "xlink:href" === y ? p.setAttributeNS(s, y, m) : /^xmlns($|:)/i.test(y) || p.setAttributeNS(null, y, m) : p.setAttribute(y, m);
					}
				}return i(n), p;
			}var o = n(3),
			    i = n(5),
			    u = n(7),
			    a = "http://www.w3.org/2000/svg",
			    s = "http://www.w3.org/1999/xlink",
			    f = { autofocus: 1, checked: 1, defaultchecked: 1, disabled: 1, formnovalidate: 1, indeterminate: 1, readonly: 1, required: 1, selected: 1, willvalidate: 1 },
			    l = "!--",
			    c = ["svg", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"];e.exports = i(r, { comments: !0 }), e.exports.default = e.exports, e.exports.createElement = r;
		}, function (e, t, n) {
			(function (t) {
				var r,
				    o = "undefined" != typeof t ? t : "undefined" != typeof window ? window : {},
				    i = n(4);"undefined" != typeof document ? r = document : (r = o["__GLOBAL_DOCUMENT_CACHE@4"], r || (r = o["__GLOBAL_DOCUMENT_CACHE@4"] = i)), e.exports = r;
			}).call(t, function () {
				return this;
			}());
		}, function (e, t) {}, function (e, t, n) {
			function r(e) {
				return e === g || e === y;
			}function o(e) {
				return w.test(e);
			}var i = n(6),
			    u = 0,
			    a = 1,
			    s = 2,
			    f = 3,
			    l = 4,
			    c = 5,
			    p = 6,
			    d = 7,
			    h = 8,
			    g = 9,
			    y = 10,
			    v = 11,
			    m = 12,
			    b = 13;e.exports = function (e, t) {
				function n(e) {
					return "function" == typeof e ? e : "string" == typeof e ? e : e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : w("", e);
				}t || (t = {});var w = t.concat || function (e, t) {
					return String(e) + String(t);
				};return t.attrToProp !== !1 && (e = i(e)), function (i) {
					function x(e) {
						var n = [];E === d && (E = l);for (var o = 0; o < e.length; o++) {
							var i = e.charAt(o);E === a && "<" === i ? (A.length && n.push([a, A]), A = "", E = s) : ">" !== i || r(E) || E === b ? E === b && /-$/.test(A) && "-" === i ? (t.comments && n.push([h, A.substr(0, A.length - 1)], [f]), A = "", E = a) : E === s && /^!--$/.test(A) ? (t.comments && n.push([s, A], [c, "comment"], [v]), A = i, E = b) : E === a || E === b ? A += i : E === s && /\s/.test(i) ? (n.push([s, A]), A = "", E = l) : E === s ? A += i : E === l && /[^\s"'=\/]/.test(i) ? (E = c, A = i) : E === l && /\s/.test(i) ? (A.length && n.push([c, A]), n.push([m])) : E === c && /\s/.test(i) ? (n.push([c, A]), A = "", E = p) : E === c && "=" === i ? (n.push([c, A], [v]), A = "", E = d) : E === c ? A += i : E !== p && E !== l || "=" !== i ? E !== p && E !== l || /\s/.test(i) ? E === d && '"' === i ? E = y : E === d && "'" === i ? E = g : E === y && '"' === i ? (n.push([h, A], [m]), A = "", E = l) : E === g && "'" === i ? (n.push([h, A], [m]), A = "", E = l) : E !== d || /\s/.test(i) ? E === h && /\s/.test(i) ? (n.push([h, A], [m]), A = "", E = l) : E !== h && E !== g && E !== y || (A += i) : (E = h, o--) : (n.push([m]), /[\w-]/.test(i) ? (A += i, E = c) : E = l) : (n.push([v]), E = d) : (E === s ? n.push([s, A]) : E === c ? n.push([c, A]) : E === h && A.length && n.push([h, A]), n.push([f]), A = "", E = a);
						}return E === a && A.length ? (n.push([a, A]), A = "") : E === h && A.length ? (n.push([h, A]), A = "") : E === y && A.length ? (n.push([h, A]), A = "") : E === g && A.length ? (n.push([h, A]), A = "") : E === c && (n.push([c, A]), A = ""), n;
					}for (var E = a, A = "", O = arguments.length, S = [], N = 0; N < i.length; N++) {
						if (N < O - 1) {
							var _ = arguments[N + 1],
							    T = x(i[N]),
							    L = E;L === y && (L = h), L === g && (L = h), L === d && (L = h), L === l && (L = c), T.push([u, L, _]), S.push.apply(S, T);
						} else S.push.apply(S, x(i[N]));
					}for (var C = [null, {}, []], j = [[C, -1]], N = 0; N < S.length; N++) {
						var q = j[j.length - 1][0],
						    T = S[N],
						    k = T[0];if (k === s && /^\//.test(T[1])) {
							var D = j[j.length - 1][1];j.length > 1 && (j.pop(), j[j.length - 1][0][2][D] = e(q[0], q[1], q[2].length ? q[2] : void 0));
						} else if (k === s) {
							var R = [T[1], {}, []];q[2].push(R), j.push([R, q[2].length - 1]);
						} else if (k === c || k === u && T[1] === c) {
							for (var M, P = ""; N < S.length; N++) {
								if (S[N][0] === c) P = w(P, S[N][1]);else {
									if (S[N][0] !== u || S[N][1] !== c) break;if ("object" != _typeof(S[N][2]) || P) P = w(P, S[N][2]);else for (M in S[N][2]) {
										S[N][2].hasOwnProperty(M) && !q[1][M] && (q[1][M] = S[N][2][M]);
									}
								}
							}S[N][0] === v && N++;for (var B = N; N < S.length; N++) {
								if (S[N][0] === h || S[N][0] === c) q[1][P] ? q[1][P] = w(q[1][P], S[N][1]) : q[1][P] = n(S[N][1]);else {
									if (S[N][0] !== u || S[N][1] !== h && S[N][1] !== c) {
										!P.length || q[1][P] || N !== B || S[N][0] !== f && S[N][0] !== m || (q[1][P] = P.toLowerCase());break;
									}q[1][P] ? q[1][P] = w(q[1][P], S[N][2]) : q[1][P] = n(S[N][2]);
								}
							}
						} else if (k === c) q[1][T[1]] = !0;else if (k === u && T[1] === c) q[1][T[2]] = !0;else if (k === f) {
							if (o(q[0]) && j.length) {
								var D = j[j.length - 1][1];j.pop(), j[j.length - 1][0][2][D] = e(q[0], q[1], q[2].length ? q[2] : void 0);
							}
						} else if (k === u && T[1] === a) void 0 === T[2] || null === T[2] ? T[2] = "" : T[2] || (T[2] = w("", T[2])), Array.isArray(T[2][0]) ? q[2].push.apply(q[2], T[2]) : q[2].push(T[2]);else if (k === a) q[2].push(T[1]);else if (k !== v && k !== m) throw new Error("unhandled: " + k);
					}if (C[2].length > 1 && /^\s*$/.test(C[2][0]) && C[2].shift(), C[2].length > 2 || 2 === C[2].length && /\S/.test(C[2][1])) throw new Error("multiple root elements must be wrapped in an enclosing tag");return Array.isArray(C[2][0]) && "string" == typeof C[2][0][0] && Array.isArray(C[2][0][2]) && (C[2][0] = e(C[2][0][0], C[2][0][1], C[2][0][2])), C[2][0];
				};
			};var w = (Object.prototype.hasOwnProperty, RegExp("^(" + ["area", "base", "basefont", "bgsound", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr", "!--", "animate", "animateTransform", "circle", "cursor", "desc", "ellipse", "feBlend", "feColorMatrix", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "font-face-format", "font-face-name", "font-face-uri", "glyph", "glyphRef", "hkern", "image", "line", "missing-glyph", "mpath", "path", "polygon", "polyline", "rect", "set", "stop", "tref", "use", "view", "vkern"].join("|") + ")(?:[.#][a-zA-Z0--￿_:-]+)*$"));
		}, function (e, t) {
			function n(e) {
				return function (t, n, o) {
					for (var i in n) {
						i in r && (n[r[i]] = n[i], delete n[i]);
					}return e(t, n, o);
				};
			}e.exports = n;var r = { class: "className", for: "htmlFor", "http-equiv": "httpEquiv" };
		}, function (e, t, n) {
			function r(e) {
				e.observe(f.body, { childList: !0, subtree: !0, attributes: !0, attributeOldValue: !0, attributeFilter: [h] });
			}function o(e, t) {
				p[e][0] && 0 === p[e][2] && (p[e][0](t), p[e][2] = 1);
			}function i(e, t) {
				p[e][1] && 1 === p[e][2] && (p[e][1](t), p[e][2] = 0);
			}function u(e, t, n) {
				var r = e.target.getAttribute(h);return a(e.oldValue, r) ? void (p[r] = p[e.oldValue]) : (p[e.oldValue] && n(e.oldValue, e.target), void (p[r] && t(r, e.target)));
			}function a(e, t) {
				return !(!e || !t) && p[e][3] === p[t][3];
			}function s(e, t) {
				for (var n = Object.keys(p), r = 0; r < e.length; r++) {
					if (e[r] && e[r].getAttribute && e[r].getAttribute(h)) {
						var o = e[r].getAttribute(h);n.forEach(function (n) {
							o === n && t(n, e[r]);
						});
					}e[r].childNodes.length > 0 && s(e[r].childNodes, t);
				}
			}var f = n(3),
			    l = n(8),
			    c = n(9),
			    p = Object.create(null),
			    d = "onloadid" + (new Date() % 9e6).toString(36),
			    h = "data-" + d,
			    g = 0;if (l && l.MutationObserver) {
				var y = new MutationObserver(function (e) {
					if (!(Object.keys(p).length < 1)) for (var t = 0; t < e.length; t++) {
						e[t].attributeName !== h ? (s(e[t].removedNodes, i), s(e[t].addedNodes, o)) : u(e[t], o, i);
					}
				});f.body ? r(y) : f.addEventListener("DOMContentLoaded", function (e) {
					r(y);
				});
			}e.exports = function e(t, n, r, o) {
				return c(f.body, "on-load: will not work prior to DOMContentLoaded"), n = n || function () {}, r = r || function () {}, t.setAttribute(h, "o" + g), p["o" + g] = [n, r, 0, o || e.caller], g += 1, t;
			}, e.exports.KEY_ATTR = h, e.exports.KEY_ID = d;
		}, function (e, t) {
			(function (t) {
				var n;n = "undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof self ? self : {}, e.exports = n;
			}).call(t, function () {
				return this;
			}());
		}, function (e, t) {
			function n(e, t, n) {
				i(e == t, n);
			}function r(e, t, n) {
				i(e != t, n);
			}function o(e, t) {
				i(!e, t);
			}function i(e, t) {
				if (!e) throw new Error(t || "AssertionError");
			}i.notEqual = r, i.notOk = o, i.equal = n, i.ok = i, e.exports = i;
		}, function (e, t) {
			"use strict";
			function n(e) {
				!c && h.createRange && (c = h.createRange(), c.selectNode(h.body));var t;return c && c.createContextualFragment ? t = c.createContextualFragment(e) : (t = h.createElement("body"), t.innerHTML = e), t.childNodes[0];
			}function r(e, t) {
				var n = e.nodeName,
				    r = t.nodeName;return n === r || !!(t.actualize && n.charCodeAt(0) < 91 && r.charCodeAt(0) > 90) && n === r.toUpperCase();
			}function o(e, t) {
				return t && t !== d ? h.createElementNS(t, e) : h.createElement(e);
			}function i(e, t) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;t.appendChild(n), n = r;
				}return t;
			}function u(e, t) {
				var n,
				    r,
				    o,
				    i,
				    u,
				    a,
				    s = t.attributes;for (n = s.length - 1; n >= 0; --n) {
					r = s[n], o = r.name, i = r.namespaceURI, u = r.value, i ? (o = r.localName || o, a = e.getAttributeNS(i, o), a !== u && e.setAttributeNS(i, o, u)) : (a = e.getAttribute(o), a !== u && e.setAttribute(o, u));
				}for (s = e.attributes, n = s.length - 1; n >= 0; --n) {
					r = s[n], r.specified !== !1 && (o = r.name, i = r.namespaceURI, i ? (o = r.localName || o, y(t, i, o) || e.removeAttributeNS(i, o)) : y(t, null, o) || e.removeAttribute(o));
				}
			}function a(e, t, n) {
				e[n] !== t[n] && (e[n] = t[n], e[n] ? e.setAttribute(n, "") : e.removeAttribute(n, ""));
			}function s() {}function f(e) {
				return e.id;
			}function l(e) {
				return function (t, u, a) {
					function l(e) {
						E ? E.push(e) : E = [e];
					}function c(e, t) {
						if (e.nodeType === m) for (var n = e.firstChild; n;) {
							var r = void 0;t && (r = A(n)) ? l(r) : (L(n), n.firstChild && c(n, t)), n = n.nextSibling;
						}
					}function p(e, t, n) {
						T(e) !== !1 && (t && t.removeChild(e), L(e), c(e, n));
					}function d(e) {
						if (e.nodeType === m) for (var t = e.firstChild; t;) {
							var n = A(t);n && (q[n] = t), d(t), t = t.nextSibling;
						}
					}function g(e) {
						S(e);for (var t = e.firstChild; t;) {
							var n = t.nextSibling,
							    o = A(t);if (o) {
								var i = q[o];i && r(t, i) && (t.parentNode.replaceChild(i, t), y(i, t));
							}g(t), t = n;
						}
					}function y(n, o, i) {
						var a,
						    s = A(o);if (s && delete q[s], !u.isSameNode || !u.isSameNode(t)) {
							if (!i) {
								if (N(n, o) === !1) return;if (e(n, o), _(n), C(n, o) === !1) return;
							}if ("TEXTAREA" !== n.nodeName) {
								var f,
								    c,
								    d,
								    x,
								    E = o.firstChild,
								    S = n.firstChild;e: for (; E;) {
									for (d = E.nextSibling, f = A(E); S;) {
										if (c = S.nextSibling, E.isSameNode && E.isSameNode(S)) {
											E = d, S = c;continue e;
										}a = A(S);var T = S.nodeType,
										    L = void 0;if (T === E.nodeType && (T === m ? (f ? f !== a && ((x = q[f]) ? S.nextSibling === x ? L = !1 : (n.insertBefore(x, S), c = S.nextSibling, a ? l(a) : p(S, n, !0), S = x) : L = !1) : a && (L = !1), L = L !== !1 && r(S, E), L && y(S, E)) : T !== b && T != w || (L = !0, S.nodeValue !== E.nodeValue && (S.nodeValue = E.nodeValue))), L) {
											E = d, S = c;continue e;
										}a ? l(a) : p(S, n, !0), S = c;
									}if (f && (x = q[f]) && r(x, E)) n.appendChild(x), y(x, E);else {
										var j = O(E);j !== !1 && (j && (E = j), E.actualize && (E = E.actualize(n.ownerDocument || h)), n.appendChild(E), g(E));
									}E = d, S = c;
								}for (; S;) {
									c = S.nextSibling, (a = A(S)) ? l(a) : p(S, n, !0), S = c;
								}
							}var k = v[n.nodeName];k && k(n, o);
						}
					}if (a || (a = {}), "string" == typeof u) if ("#document" === t.nodeName || "HTML" === t.nodeName) {
						var x = u;u = h.createElement("html"), u.innerHTML = x;
					} else u = n(u);var E,
					    A = a.getNodeKey || f,
					    O = a.onBeforeNodeAdded || s,
					    S = a.onNodeAdded || s,
					    N = a.onBeforeElUpdated || s,
					    _ = a.onElUpdated || s,
					    T = a.onBeforeNodeDiscarded || s,
					    L = a.onNodeDiscarded || s,
					    C = a.onBeforeElChildrenUpdated || s,
					    j = a.childrenOnly === !0,
					    q = {};d(t);var k = t,
					    D = k.nodeType,
					    R = u.nodeType;if (!j) if (D === m) R === m ? r(t, u) || (L(t), k = i(t, o(u.nodeName, u.namespaceURI))) : k = u;else if (D === b || D === w) {
						if (R === D) return k.nodeValue !== u.nodeValue && (k.nodeValue = u.nodeValue), k;k = u;
					}if (k === u) L(t);else if (y(k, u, j), E) for (var M = 0, P = E.length; M < P; M++) {
						var B = q[E[M]];B && p(B, B.parentNode, !1);
					}return !j && k !== t && t.parentNode && (k.actualize && (k = k.actualize(t.ownerDocument || h)), t.parentNode.replaceChild(k, t)), k;
				};
			}var c,
			    p,
			    d = "http://www.w3.org/1999/xhtml",
			    h = "undefined" == typeof document ? void 0 : document,
			    g = h ? h.body || h.createElement("div") : {};p = g.hasAttributeNS ? function (e, t, n) {
				return e.hasAttributeNS(t, n);
			} : g.hasAttribute ? function (e, t, n) {
				return e.hasAttribute(n);
			} : function (e, t, n) {
				return null != e.getAttributeNode(t, n);
			};var y = p,
			    v = { OPTION: function OPTION(e, t) {
					a(e, t, "selected");
				}, INPUT: function INPUT(e, t) {
					a(e, t, "checked"), a(e, t, "disabled"), e.value !== t.value && (e.value = t.value), y(t, null, "value") || e.removeAttribute("value");
				}, TEXTAREA: function TEXTAREA(e, t) {
					var n = t.value;e.value !== n && (e.value = n);var r = e.firstChild;if (r) {
						var o = r.nodeValue;if (o == n || !n && o == e.placeholder) return;r.nodeValue = n;
					}
				}, SELECT: function SELECT(e, t) {
					if (!y(t, null, "multiple")) {
						for (var n = -1, r = 0, o = t.firstChild; o;) {
							var i = o.nodeName;if (i && "OPTION" === i.toUpperCase()) {
								if (y(o, null, "selected")) {
									n = r;break;
								}r++;
							}o = o.nextSibling;
						}e.selectedIndex = r;
					}
				} },
			    m = 1,
			    b = 3,
			    w = 8,
			    x = l(u);e.exports = x;
		}, function (e, t) {
			e.exports = ["onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmousemove", "onmouseout", "ondragstart", "ondrag", "ondragenter", "ondragleave", "ondragover", "ondrop", "ondragend", "onkeydown", "onkeypress", "onkeyup", "onunload", "onabort", "onerror", "onresize", "onscroll", "onselect", "onchange", "onsubmit", "onreset", "onfocus", "onblur", "oninput", "oncontextmenu", "onfocusin", "onfocusout"];
		}, function (e, t, n) {
			function r(e) {
				return this instanceof r ? (this._name = e || "nanobus", this._starListeners = [], void (this._listeners = {})) : new r(e);
			}var o = n(13),
			    i = n(14),
			    u = n(16);e.exports = r, r.prototype.emit = function (e, t) {
				u.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanobus.emit: eventName should be type string");var n = i(this._name + "('" + e + "')"),
				    r = this._listeners[e];return r && r.length > 0 && this._emit(this._listeners[e], t), this._starListeners.length > 0 && this._emit(this._starListeners, e, t, n.uuid), n(), this;
			}, r.prototype.on = r.prototype.addListener = function (e, t) {
				return u.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanobus.on: eventName should be type string"), u.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "function", "nanobus.on: listener should be type function"), "*" === e ? this._starListeners.push(t) : (this._listeners[e] || (this._listeners[e] = []), this._listeners[e].push(t)), this;
			}, r.prototype.prependListener = function (e, t) {
				return u.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanobus.prependListener: eventName should be type string"), u.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "function", "nanobus.prependListener: listener should be type function"), "*" === e ? this._starListeners.unshift(t) : (this._listeners[e] || (this._listeners[e] = []), this._listeners[e].unshift(t)), this;
			}, r.prototype.once = function (e, t) {
				function n() {
					t.apply(r, arguments), r.removeListener(e, n);
				}u.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanobus.once: eventName should be type string"), u.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "function", "nanobus.once: listener should be type function");var r = this;return this.on(e, n), this;
			}, r.prototype.prependOnceListener = function (e, t) {
				function n() {
					t.apply(r, arguments), r.removeListener(e, n);
				}u.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanobus.prependOnceListener: eventName should be type string"), u.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "function", "nanobus.prependOnceListener: listener should be type function");var r = this;return this.prependListener(e, n), this;
			}, r.prototype.removeListener = function (e, t) {
				function n(e, t) {
					if (e) {
						var n = e.indexOf(t);return n !== -1 ? (o(e, n, 1), !0) : void 0;
					}
				}return u.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanobus.removeListener: eventName should be type string"), u.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "function", "nanobus.removeListener: listener should be type function"), "*" === e ? (this._starListeners = this._starListeners.slice(), n(this._starListeners, t)) : ("undefined" != typeof this._listeners[e] && (this._listeners[e] = this._listeners[e].slice()), n(this._listeners[e], t));
			}, r.prototype.removeAllListeners = function (e) {
				return e ? "*" === e ? this._starListeners = [] : this._listeners[e] = [] : (this._starListeners = [], this._listeners = {}), this;
			}, r.prototype.listeners = function (e) {
				var t = "*" !== e ? this._listeners[e] : this._starListeners,
				    n = [];if (t) for (var r = t.length, o = 0; o < r; o++) {
					n.push(t[o]);
				}return n;
			}, r.prototype._emit = function (e, t, n, r) {
				if ("undefined" != typeof e) {
					void 0 === n && (n = t, t = null);for (var o = e.length, i = 0; i < o; i++) {
						var u = e[i];t ? void 0 !== r ? u(t, n, r) : u(t, n) : u(n);
					}
				}
			};
		}, function (e, t) {
			"use strict";
			e.exports = function (e, t, n) {
				var r,
				    o = e.length;if (!(t >= o || 0 === n)) {
					n = t + n > o ? o - t : n;var i = o - n;for (r = t; r < i; ++r) {
						e[r] = e[r + n];
					}e.length = i;
				}
			};
		}, function (e, t, n) {
			function r(e) {
				function t(t) {
					var o = "end-" + n + "-" + e;i.mark(o), u(function () {
						var u = e + " [" + n + "]";i.measure(u, r, o), i.clearMarks(r), i.clearMarks(o), t && t(e);
					});
				}if (a.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "nanotiming: name should be type string"), s) return o;var n = (100 * i.now()).toFixed(),
				    r = "start-" + n + "-" + e;return i.mark(r), t.uuid = n, t;
			}function o(e) {
				e && u(e);
			}var i,
			    u = n(15),
			    a = n(16),
			    s = !0;try {
				i = window.performance, s = "true" === window.localStorage.DISABLE_NANOTIMING || !i.mark;
			} catch (e) {}e.exports = r;
		}, function (e, t, n) {
			function r(e, t) {
				t = t || i;var n;return o.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "function", "on-idle: cb should be type function"), o.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "object", "on-idle: opts should be type object"), a ? (n = window.requestIdleCallback(function (n) {
					return n.timeRemaining() <= 10 && !n.didTimeout ? r(e, t) : void e(n);
				}, t), window.cancelIdleCallback.bind(window, n)) : u ? (n = setTimeout(e, 0), clearTimeout.bind(window, n)) : void 0;
			}var o = n(16),
			    i = {},
			    u = "undefined" != typeof window,
			    a = u && window.requestIdleCallback;e.exports = r;
		}, function (e, t, n) {
			(function (t) {
				"use strict"; /*!
	                 * The buffer module from node.js, for the browser.
	                 *
	                 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	                 * @license  MIT
	                 */

				function r(e, t) {
					if (e === t) return 0;for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) {
						if (e[o] !== t[o]) {
							n = e[o], r = t[o];break;
						}
					}return n < r ? -1 : r < n ? 1 : 0;
				}function o(e) {
					return t.Buffer && "function" == typeof t.Buffer.isBuffer ? t.Buffer.isBuffer(e) : !(null == e || !e._isBuffer);
				}function i(e) {
					return Object.prototype.toString.call(e);
				}function u(e) {
					return !o(e) && "function" == typeof t.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer)));
				}function a(e) {
					if (w.isFunction(e)) {
						if (A) return e.name;var t = e.toString(),
						    n = t.match(S);return n && n[1];
					}
				}function s(e, t) {
					return "string" == typeof e ? e.length < t ? e : e.slice(0, t) : e;
				}function f(e) {
					if (A || !w.isFunction(e)) return w.inspect(e);var t = a(e),
					    n = t ? ": " + t : "";return "[Function" + n + "]";
				}function l(e) {
					return s(f(e.actual), 128) + " " + e.operator + " " + s(f(e.expected), 128);
				}function c(e, t, n, r, o) {
					throw new O.AssertionError({ message: n, actual: e, expected: t, operator: r, stackStartFunction: o });
				}function p(e, t) {
					e || c(e, !0, t, "==", O.ok);
				}function d(e, t, n, a) {
					if (e === t) return !0;if (o(e) && o(t)) return 0 === r(e, t);if (w.isDate(e) && w.isDate(t)) return e.getTime() === t.getTime();if (w.isRegExp(e) && w.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;if (null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
						if (u(e) && u(t) && i(e) === i(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === r(new Uint8Array(e.buffer), new Uint8Array(t.buffer));if (o(e) !== o(t)) return !1;a = a || { actual: [], expected: [] };var s = a.actual.indexOf(e);return s !== -1 && s === a.expected.indexOf(t) || (a.actual.push(e), a.expected.push(t), g(e, t, n, a));
					}return n ? e === t : e == t;
				}function h(e) {
					return "[object Arguments]" == Object.prototype.toString.call(e);
				}function g(e, t, n, r) {
					if (null === e || void 0 === e || null === t || void 0 === t) return !1;if (w.isPrimitive(e) || w.isPrimitive(t)) return e === t;if (n && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;var o = h(e),
					    i = h(t);if (o && !i || !o && i) return !1;if (o) return e = E.call(e), t = E.call(t), d(e, t, n);var u,
					    a,
					    s = N(e),
					    f = N(t);if (s.length !== f.length) return !1;for (s.sort(), f.sort(), a = s.length - 1; a >= 0; a--) {
						if (s[a] !== f[a]) return !1;
					}for (a = s.length - 1; a >= 0; a--) {
						if (u = s[a], !d(e[u], t[u], n, r)) return !1;
					}return !0;
				}function y(e, t, n) {
					d(e, t, !0) && c(e, t, n, "notDeepStrictEqual", y);
				}function v(e, t) {
					if (!e || !t) return !1;if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);try {
						if (e instanceof t) return !0;
					} catch (e) {}return !Error.isPrototypeOf(t) && t.call({}, e) === !0;
				}function m(e) {
					var t;try {
						e();
					} catch (e) {
						t = e;
					}return t;
				}function b(e, t, n, r) {
					var o;if ("function" != typeof t) throw new TypeError('"block" argument must be a function');"string" == typeof n && (r = n, n = null), o = m(t), r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), e && !o && c(o, n, "Missing expected exception" + r);var i = "string" == typeof r,
					    u = !e && w.isError(o),
					    a = !e && o && !n;if ((u && i && v(o, n) || a) && c(o, n, "Got unwanted exception" + r), e && o && n && !v(o, n) || !e && o) throw o;
				}var w = n(17),
				    x = Object.prototype.hasOwnProperty,
				    E = Array.prototype.slice,
				    A = function () {
					return "foo" === function () {}.name;
				}(),
				    O = e.exports = p,
				    S = /\s*function\s+([^\(\s]*)\s*/;O.AssertionError = function (e) {
					this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = l(this), this.generatedMessage = !0);var t = e.stackStartFunction || c;if (Error.captureStackTrace) Error.captureStackTrace(this, t);else {
						var n = new Error();if (n.stack) {
							var r = n.stack,
							    o = a(t),
							    i = r.indexOf("\n" + o);if (i >= 0) {
								var u = r.indexOf("\n", i + 1);r = r.substring(u + 1);
							}this.stack = r;
						}
					}
				}, w.inherits(O.AssertionError, Error), O.fail = c, O.ok = p, O.equal = function (e, t, n) {
					e != t && c(e, t, n, "==", O.equal);
				}, O.notEqual = function (e, t, n) {
					e == t && c(e, t, n, "!=", O.notEqual);
				}, O.deepEqual = function (e, t, n) {
					d(e, t, !1) || c(e, t, n, "deepEqual", O.deepEqual);
				}, O.deepStrictEqual = function (e, t, n) {
					d(e, t, !0) || c(e, t, n, "deepStrictEqual", O.deepStrictEqual);
				}, O.notDeepEqual = function (e, t, n) {
					d(e, t, !1) && c(e, t, n, "notDeepEqual", O.notDeepEqual);
				}, O.notDeepStrictEqual = y, O.strictEqual = function (e, t, n) {
					e !== t && c(e, t, n, "===", O.strictEqual);
				}, O.notStrictEqual = function (e, t, n) {
					e === t && c(e, t, n, "!==", O.notStrictEqual);
				}, O.throws = function (e, t, n) {
					b(!0, e, t, n);
				}, O.doesNotThrow = function (e, t, n) {
					b(!1, e, t, n);
				}, O.ifError = function (e) {
					if (e) throw e;
				};var N = Object.keys || function (e) {
					var t = [];for (var n in e) {
						x.call(e, n) && t.push(n);
					}return t;
				};
			}).call(t, function () {
				return this;
			}());
		}, function (e, t, n) {
			(function (e, r) {
				function o(e, n) {
					var r = { seen: [], stylize: u };return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), g(n) ? r.showHidden = n : n && t._extend(r, n), x(r.showHidden) && (r.showHidden = !1), x(r.depth) && (r.depth = 2), x(r.colors) && (r.colors = !1), x(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = i), s(r, e, r.depth);
				}function i(e, t) {
					var n = o.styles[t];
					
					return n ? ".colors[n][0] + "m" + e + ".colors[n][1] + "m" : e;
				}function u(e, t) {
					return e;
				}function a(e) {
					var t = {};return e.forEach(function (e, n) {
						t[e] = !0;
					}), t;
				}function s(e, n, r) {
					if (e.customInspect && n && N(n.inspect) && n.inspect !== t.inspect && (!n.constructor || n.constructor.prototype !== n)) {
						var o = n.inspect(r, e);return b(o) || (o = s(e, o, r)), o;
					}var i = f(e, n);if (i) return i;var u = Object.keys(n),
					    g = a(u);if (e.showHidden && (u = Object.getOwnPropertyNames(n)), S(n) && (u.indexOf("message") >= 0 || u.indexOf("description") >= 0)) return l(n);if (0 === u.length) {
						if (N(n)) {
							var y = n.name ? ": " + n.name : "";return e.stylize("[Function" + y + "]", "special");
						}if (E(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp");if (O(n)) return e.stylize(Date.prototype.toString.call(n), "date");if (S(n)) return l(n);
					}var v = "",
					    m = !1,
					    w = ["{", "}"];if (h(n) && (m = !0, w = ["[", "]"]), N(n)) {
						var x = n.name ? ": " + n.name : "";v = " [Function" + x + "]";
					}if (E(n) && (v = " " + RegExp.prototype.toString.call(n)), O(n) && (v = " " + Date.prototype.toUTCString.call(n)), S(n) && (v = " " + l(n)), 0 === u.length && (!m || 0 == n.length)) return w[0] + v + w[1];if (r < 0) return E(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special");e.seen.push(n);var A;return A = m ? c(e, n, r, g, u) : u.map(function (t) {
						return p(e, n, r, g, t, m);
					}), e.seen.pop(), d(A, v, w);
				}function f(e, t) {
					if (x(t)) return e.stylize("undefined", "undefined");if (b(t)) {
						var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";return e.stylize(n, "string");
					}return m(t) ? e.stylize("" + t, "number") : g(t) ? e.stylize("" + t, "boolean") : y(t) ? e.stylize("null", "null") : void 0;
				}function l(e) {
					return "[" + Error.prototype.toString.call(e) + "]";
				}function c(e, t, n, r, o) {
					for (var i = [], u = 0, a = t.length; u < a; ++u) {
						j(t, String(u)) ? i.push(p(e, t, n, r, String(u), !0)) : i.push("");
					}return o.forEach(function (o) {
						o.match(/^\d+$/) || i.push(p(e, t, n, r, o, !0));
					}), i;
				}function p(e, t, n, r, o, i) {
					var u, a, f;if (f = Object.getOwnPropertyDescriptor(t, o) || { value: t[o] }, f.get ? a = f.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : f.set && (a = e.stylize("[Setter]", "special")), j(r, o) || (u = "[" + o + "]"), a || (e.seen.indexOf(f.value) < 0 ? (a = y(n) ? s(e, f.value, null) : s(e, f.value, n - 1), a.indexOf("\n") > -1 && (a = i ? a.split("\n").map(function (e) {
						return "  " + e;
					}).join("\n").substr(2) : "\n" + a.split("\n").map(function (e) {
						return "   " + e;
					}).join("\n"))) : a = e.stylize("[Circular]", "special")), x(u)) {
						if (i && o.match(/^\d+$/)) return a;u = JSON.stringify("" + o), u.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (u = u.substr(1, u.length - 2), u = e.stylize(u, "name")) : (u = u.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), u = e.stylize(u, "string"));
					}return u + ": " + a;
				}function d(e, t, n) {
					var r = 0,
					    o = e.reduce(function (e, t) {
						return r++, t.indexOf("\n") >= 0 && r++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
					}, 0);return o > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1];
				}function h(e) {
					return Array.isArray(e);
				}function g(e) {
					return "boolean" == typeof e;
				}function y(e) {
					return null === e;
				}function v(e) {
					return null == e;
				}function m(e) {
					return "number" == typeof e;
				}function b(e) {
					return "string" == typeof e;
				}function w(e) {
					return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
				}function x(e) {
					return void 0 === e;
				}function E(e) {
					return A(e) && "[object RegExp]" === T(e);
				}function A(e) {
					return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
				}function O(e) {
					return A(e) && "[object Date]" === T(e);
				}function S(e) {
					return A(e) && ("[object Error]" === T(e) || e instanceof Error);
				}function N(e) {
					return "function" == typeof e;
				}function _(e) {
					return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "undefined" == typeof e;
				}function T(e) {
					return Object.prototype.toString.call(e);
				}function L(e) {
					return e < 10 ? "0" + e.toString(10) : e.toString(10);
				}function C() {
					var e = new Date(),
					    t = [L(e.getHours()), L(e.getMinutes()), L(e.getSeconds())].join(":");return [e.getDate(), R[e.getMonth()], t].join(" ");
				}function j(e, t) {
					return Object.prototype.hasOwnProperty.call(e, t);
				}var q = /%[sdj%]/g;t.format = function (e) {
					if (!b(e)) {
						for (var t = [], n = 0; n < arguments.length; n++) {
							t.push(o(arguments[n]));
						}return t.join(" ");
					}for (var n = 1, r = arguments, i = r.length, u = String(e).replace(q, function (e) {
						if ("%%" === e) return "%";if (n >= i) return e;switch (e) {case "%s":
								return String(r[n++]);case "%d":
								return Number(r[n++]);case "%j":
								try {
									return JSON.stringify(r[n++]);
								} catch (e) {
									return "[Circular]";
								}default:
								return e;}
					}), a = r[n]; n < i; a = r[++n]) {
						u += y(a) || !A(a) ? " " + a : " " + o(a);
					}return u;
				}, t.deprecate = function (n, o) {
					function i() {
						if (!u) {
							if (r.throwDeprecation) throw new Error(o);r.traceDeprecation ? console.trace(o) : console.error(o), u = !0;
						}return n.apply(this, arguments);
					}if (x(e.process)) return function () {
						return t.deprecate(n, o).apply(this, arguments);
					};if (r.noDeprecation === !0) return n;var u = !1;return i;
				};var k,
				    D = {};t.debuglog = function (e) {
					if (x(k) && (k = r.env.NODE_DEBUG || ""), e = e.toUpperCase(), !D[e]) if (new RegExp("\\b" + e + "\\b", "i").test(k)) {
						var n = r.pid;D[e] = function () {
							var r = t.format.apply(t, arguments);console.error("%s %d: %s", e, n, r);
						};
					} else D[e] = function () {};return D[e];
				}, t.inspect = o, o.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, o.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" }, t.isArray = h, t.isBoolean = g, t.isNull = y, t.isNullOrUndefined = v, t.isNumber = m, t.isString = b, t.isSymbol = w, t.isUndefined = x, t.isRegExp = E, t.isObject = A, t.isDate = O, t.isError = S, t.isFunction = N, t.isPrimitive = _, t.isBuffer = n(19);var R = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];t.log = function () {
					console.log("%s - %s", C(), t.format.apply(t, arguments));
				}, t.inherits = n(20), t._extend = function (e, t) {
					if (!t || !A(t)) return e;for (var n = Object.keys(t), r = n.length; r--;) {
						e[n[r]] = t[n[r]];
					}return e;
				};
			}).call(t, function () {
				return this;
			}(), n(18));
		}, function (e, t) {
			function n() {
				throw new Error("setTimeout has not been defined");
			}function r() {
				throw new Error("clearTimeout has not been defined");
			}function o(e) {
				if (l === setTimeout) return setTimeout(e, 0);if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);try {
					return l(e, 0);
				} catch (t) {
					try {
						return l.call(null, e, 0);
					} catch (t) {
						return l.call(this, e, 0);
					}
				}
			}function i(e) {
				if (c === clearTimeout) return clearTimeout(e);if ((c === r || !c) && clearTimeout) return c = clearTimeout, clearTimeout(e);try {
					return c(e);
				} catch (t) {
					try {
						return c.call(null, e);
					} catch (t) {
						return c.call(this, e);
					}
				}
			}function u() {
				g && d && (g = !1, d.length ? h = d.concat(h) : y = -1, h.length && a());
			}function a() {
				if (!g) {
					var e = o(u);g = !0;for (var t = h.length; t;) {
						for (d = h, h = []; ++y < t;) {
							d && d[y].run();
						}y = -1, t = h.length;
					}d = null, g = !1, i(e);
				}
			}function s(e, t) {
				this.fun = e, this.array = t;
			}function f() {}var l,
			    c,
			    p = e.exports = {};!function () {
				try {
					l = "function" == typeof setTimeout ? setTimeout : n;
				} catch (e) {
					l = n;
				}try {
					c = "function" == typeof clearTimeout ? clearTimeout : r;
				} catch (e) {
					c = r;
				}
			}();var d,
			    h = [],
			    g = !1,
			    y = -1;p.nextTick = function (e) {
				var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
					t[n - 1] = arguments[n];
				}h.push(new s(e, t)), 1 !== h.length || g || o(a);
			}, s.prototype.run = function () {
				this.fun.apply(null, this.array);
			}, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = f, p.addListener = f, p.once = f, p.off = f, p.removeListener = f, p.removeAllListeners = f, p.emit = f, p.prependListener = f, p.prependOnceListener = f, p.listeners = function (e) {
				return [];
			}, p.binding = function (e) {
				throw new Error("process.binding is not supported");
			}, p.cwd = function () {
				return "/";
			}, p.chdir = function (e) {
				throw new Error("process.chdir is not supported");
			}, p.umask = function () {
				return 0;
			};
		}, function (e, t) {
			e.exports = function (e) {
				return e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8;
			};
		}, function (e, t) {
			"function" == typeof Object.create ? e.exports = function (e, t) {
				e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
			} : e.exports = function (e, t) {
				e.super_ = t;var n = function n() {};n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
			};
		}, function (e, t, n) {
			function r(e) {
				function t(e, t) {
					e = e.replace(/^[#\/]/, ""), r.on(e, t);
				}function n(e) {
					return a ? (e = o(e, u), e === f ? s() : (f = e, (s = r(e))())) : r(e);
				}e = e || {};var r = i(e.default || "/404"),
				    a = e.curry || !1,
				    s = null,
				    f = null;return n.router = r, n.on = t, n;
			}function o(e, t) {
				return e = t ? e.replace(c, "") : e.replace(p, ""), e.replace(h, "").replace(d, "/");
			}var i = n(22),
			    u = /file:\/\//.test("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.location && window.location.origin),
			    a = "^(file://|/)(.*.html?/?)?",
			    s = "^(http(s)?(://))?(www.)?",
			    f = "[a-zA-Z0-9-_.]+(:[0-9]{1,5})?(/{1})?",
			    l = "[?].*$",
			    c = new RegExp(a),
			    p = new RegExp(s + f),
			    d = new RegExp("#"),
			    h = new RegExp(l);e.exports = r;
		}, function (e, t, n) {
			function r(e) {
				function t(e, t) {
					if (o.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string"), o.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "function"), e = e || "/", t.route = e, t && t._wayfarer && t._trie) a.mount(e, t._trie.trie);else {
						var r = a.create(e);r.cb = t;
					}return n;
				}function n(e) {
					o.notEqual(e, void 0, "'route' must be defined");for (var t = new Array(arguments.length), n = 1; n < t.length; n++) {
						t[n] = arguments[n];
					}var r = a.match(e);if (r && r.cb) {
						t[0] = r.params;var i = r.cb;return i.apply(i, t);
					}var s = a.match(u);if (s && s.cb) {
						t[0] = s.params;var f = s.cb;return f.apply(f, t);
					}throw new Error("route '" + e + "' did not match");
				}if (!(this instanceof r)) return new r(e);var u = (e || "").replace(/^\//, ""),
				    a = i();return n._trie = a, n.emit = n, n.on = t, n._wayfarer = !0, n;
			}var o = n(16),
			    i = n(23);e.exports = r;
		}, function (e, t, n) {
			function r() {
				return this instanceof r ? void (this.trie = { nodes: {} }) : new r();
			}var o = n(24),
			    i = n(16),
			    u = n(25);e.exports = r, r.prototype.create = function (e) {
				function t(e, r) {
					var o = n.hasOwnProperty(e) && n[e];if (o === !1) return r;var i = null;return (/^:|^\*/.test(o) ? (r.nodes.hasOwnProperty("$$") ? i = r.nodes.$$ : (i = { nodes: {} }, r.nodes.$$ = i), "*" === o[0] && (r.wildcard = !0), r.name = o.replace(/^:|^\*/, "")) : r.nodes.hasOwnProperty(o) ? i = r.nodes[o] : (i = { nodes: {} }, r.nodes[o] = i), t(e + 1, i)
					);
				}i.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "route should be a string");var n = e.replace(/^\//, "").split("/");return t(0, this.trie);
			}, r.prototype.match = function (e) {
				function t(e, o) {
					if (void 0 !== o) {
						var i = n[e];if (void 0 === i) return o;if (o.nodes.hasOwnProperty(i)) return t(e + 1, o.nodes[i]);if (o.name) {
							try {
								r[o.name] = decodeURIComponent(i);
							} catch (n) {
								return t(e, void 0);
							}return t(e + 1, o.nodes.$$);
						}if (o.wildcard) {
							try {
								r.wildcard = decodeURIComponent(n.slice(e).join("/"));
							} catch (n) {
								return t(e, void 0);
							}return o.nodes.$$;
						}return t(e + 1);
					}
				}i.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "route should be a string");var n = e.replace(/^\//, "").split("/"),
				    r = {},
				    o = t(0, this.trie);if (o) return o = u(o), o.params = r, o;
			}, r.prototype.mount = function (e, t) {
				i.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "string", "route should be a string"), i.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "object", "trie should be a object");var n = e.replace(/^\//, "").split("/"),
				    r = null,
				    u = null;if (1 === n.length) u = n[0], r = this.create(u);else {
					var a = n.splice(0, n.length - 1),
					    s = a.join("/");u = n[0], r = this.create(s);
				}o(r.nodes, t.nodes), t.name && (r.name = t.name), r.nodes[""] && (Object.keys(r.nodes[""]).forEach(function (e) {
					"nodes" !== e && (r[e] = r.nodes[""][e]);
				}), o(r.nodes, r.nodes[""].nodes), delete r.nodes[""].nodes);
			};
		}, function (e, t) {
			function n(e) {
				for (var t = 1; t < arguments.length; t++) {
					var n = arguments[t];for (var o in n) {
						r.call(n, o) && (e[o] = n[o]);
					}
				}return e;
			}e.exports = n;var r = Object.prototype.hasOwnProperty;
		}, function (e, t) {
			function n() {
				for (var e = {}, t = 0; t < arguments.length; t++) {
					var n = arguments[t];for (var o in n) {
						r.call(n, o) && (e[o] = n[o]);
					}
				}return e;
			}e.exports = n;var r = Object.prototype.hasOwnProperty;
		}, function (e, t, n) {
			function r(e, t) {
				o.notEqual(typeof window === "undefined" ? "undefined" : _typeof(window), "undefined", "nanohref: expected window to exist"), t = t || window.document, o.equal(typeof e === "undefined" ? "undefined" : _typeof(e), "function", "nanohref: cb should be type function"), o.equal(typeof t === "undefined" ? "undefined" : _typeof(t), "object", "nanohref: root should be type object"), window.addEventListener("click", function (n) {
					if (!(n.button && 0 !== n.button || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey || n.defaultPrevented)) {
						var r = function e(n) {
							if (n && n !== t) return "a" !== n.localName || void 0 === n.href ? e(n.parentNode) : n;
						}(n.target);r && (window.location.origin !== r.origin || r.hasAttribute("download") || "_blank" === r.getAttribute("target") && i.test(r.getAttribute("rel")) || u.test(r.getAttribute("href")) || (n.preventDefault(), e(r)));
					}
				});
			}var o = n(16),
			    i = /[noopener|noreferrer] [noopener|noreferrer]/,
			    u = /^[\w-_]+:/;e.exports = r;
		}]);
	});
	//# sourceMappingURL=pulqui.min.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(12)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(h) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _yoYo = __webpack_require__(14);

	var _yoYo2 = _interopRequireDefault(_yoYo);

	var _pulquiMin = __webpack_require__(11);

	var _Home = __webpack_require__(17);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//El componente PulquiContainer es la interfaz en MDL que engloba la informacion variable
	function PulquiContainer(props) {

		function render() {
			return h(
				'div',
				null,
				h(
					'section',
					{ style: 'background-color: #9b00d1', 'class': 'hero is-primary' },
					h(
						'div',
						{ 'class': 'hero-body' },
						h(
							'div',
							{ 'class': 'container' },
							h(
								'h1',
								{ 'class': 'title' },
								'Inventario'
							),
							h(
								'h2',
								{ 'class': 'subtitle' },
								'Carga rapida'
							)
						)
					)
				),
				h('br', null),
				h(
					'div',
					{ 'class': 'container is-fullhd' },
					h(
						'div',
						{ 'class': 'notification' },
						h(
							'main',
							{ id: 'pulqui-container' },
							props.component
						)
					)
				)
			);
		}

		var component = render();
		return component;
	}

	//El componente App solamente devuelve el componente 
	//<PulquiContainer> con el parametro llamado component
	//y este parametro es el componente <Home>
	function App(props) {

		function render() {

			return h(PulquiContainer, { component: h(_Home2.default, null) });
		}

		var component = render();
		return component;
	}

	exports.default = App;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var bel = __webpack_require__(2) // turns template tag into DOM elements
	var morphdom = __webpack_require__(15) // efficiently diffs + morphs two DOM elements
	var defaultEvents = __webpack_require__(16) // default events to be copied when dom elements update

	module.exports = bel

	// TODO move this + defaultEvents to a new module once we receive more feedback
	module.exports.update = function (fromNode, toNode, opts) {
	  if (!opts) opts = {}
	  if (opts.events !== false) {
	    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
	  }

	  return morphdom(fromNode, toNode, opts)

	  // morphdom only copies attributes. we decided we also wanted to copy events
	  // that can be set via attributes
	  function copier (f, t) {
	    // copy events:
	    var events = opts.events || defaultEvents
	    for (var i = 0; i < events.length; i++) {
	      var ev = events[i]
	      if (t[ev]) { // if new element has a whitelisted attribute
	        f[ev] = t[ev] // update existing element
	      } else if (f[ev]) { // if existing element has it and new one doesnt
	        f[ev] = undefined // remove it from existing element
	      }
	    }
	    var oldValue = f.value
	    var newValue = t.value
	    // copy values for form elements
	    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
	      if (!newValue && !t.hasAttribute('value')) {
	        t.value = f.value
	      } else if (newValue !== oldValue) {
	        f.value = newValue
	      }
	    } else if (f.nodeName === 'TEXTAREA') {
	      if (t.getAttribute('value') === null) f.value = t.value
	    }
	  }
	}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	var range; // Create a range object for efficently rendering strings to elements.
	var NS_XHTML = 'http://www.w3.org/1999/xhtml';

	var doc = typeof document === 'undefined' ? undefined : document;

	var testEl = doc ?
	    doc.body || doc.createElement('div') :
	    {};

	// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
	// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
	var actualHasAttributeNS;

	if (testEl.hasAttributeNS) {
	    actualHasAttributeNS = function(el, namespaceURI, name) {
	        return el.hasAttributeNS(namespaceURI, name);
	    };
	} else if (testEl.hasAttribute) {
	    actualHasAttributeNS = function(el, namespaceURI, name) {
	        return el.hasAttribute(name);
	    };
	} else {
	    actualHasAttributeNS = function(el, namespaceURI, name) {
	        return el.getAttributeNode(namespaceURI, name) != null;
	    };
	}

	var hasAttributeNS = actualHasAttributeNS;


	function toElement(str) {
	    if (!range && doc.createRange) {
	        range = doc.createRange();
	        range.selectNode(doc.body);
	    }

	    var fragment;
	    if (range && range.createContextualFragment) {
	        fragment = range.createContextualFragment(str);
	    } else {
	        fragment = doc.createElement('body');
	        fragment.innerHTML = str;
	    }
	    return fragment.childNodes[0];
	}

	/**
	 * Returns true if two node's names are the same.
	 *
	 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
	 *       nodeName and different namespace URIs.
	 *
	 * @param {Element} a
	 * @param {Element} b The target element
	 * @return {boolean}
	 */
	function compareNodeNames(fromEl, toEl) {
	    var fromNodeName = fromEl.nodeName;
	    var toNodeName = toEl.nodeName;

	    if (fromNodeName === toNodeName) {
	        return true;
	    }

	    if (toEl.actualize &&
	        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
	        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
	        // If the target element is a virtual DOM node then we may need to normalize the tag name
	        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
	        // are converted to upper case
	        return fromNodeName === toNodeName.toUpperCase();
	    } else {
	        return false;
	    }
	}

	/**
	 * Create an element, optionally with a known namespace URI.
	 *
	 * @param {string} name the element name, e.g. 'div' or 'svg'
	 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
	 * its `xmlns` attribute or its inferred namespace.
	 *
	 * @return {Element}
	 */
	function createElementNS(name, namespaceURI) {
	    return !namespaceURI || namespaceURI === NS_XHTML ?
	        doc.createElement(name) :
	        doc.createElementNS(namespaceURI, name);
	}

	/**
	 * Copies the children of one DOM element to another DOM element
	 */
	function moveChildren(fromEl, toEl) {
	    var curChild = fromEl.firstChild;
	    while (curChild) {
	        var nextChild = curChild.nextSibling;
	        toEl.appendChild(curChild);
	        curChild = nextChild;
	    }
	    return toEl;
	}

	function morphAttrs(fromNode, toNode) {
	    var attrs = toNode.attributes;
	    var i;
	    var attr;
	    var attrName;
	    var attrNamespaceURI;
	    var attrValue;
	    var fromValue;

	    for (i = attrs.length - 1; i >= 0; --i) {
	        attr = attrs[i];
	        attrName = attr.name;
	        attrNamespaceURI = attr.namespaceURI;
	        attrValue = attr.value;

	        if (attrNamespaceURI) {
	            attrName = attr.localName || attrName;
	            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

	            if (fromValue !== attrValue) {
	                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
	            }
	        } else {
	            fromValue = fromNode.getAttribute(attrName);

	            if (fromValue !== attrValue) {
	                fromNode.setAttribute(attrName, attrValue);
	            }
	        }
	    }

	    // Remove any extra attributes found on the original DOM element that
	    // weren't found on the target element.
	    attrs = fromNode.attributes;

	    for (i = attrs.length - 1; i >= 0; --i) {
	        attr = attrs[i];
	        if (attr.specified !== false) {
	            attrName = attr.name;
	            attrNamespaceURI = attr.namespaceURI;

	            if (attrNamespaceURI) {
	                attrName = attr.localName || attrName;

	                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
	                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
	                }
	            } else {
	                if (!hasAttributeNS(toNode, null, attrName)) {
	                    fromNode.removeAttribute(attrName);
	                }
	            }
	        }
	    }
	}

	function syncBooleanAttrProp(fromEl, toEl, name) {
	    if (fromEl[name] !== toEl[name]) {
	        fromEl[name] = toEl[name];
	        if (fromEl[name]) {
	            fromEl.setAttribute(name, '');
	        } else {
	            fromEl.removeAttribute(name, '');
	        }
	    }
	}

	var specialElHandlers = {
	    /**
	     * Needed for IE. Apparently IE doesn't think that "selected" is an
	     * attribute when reading over the attributes using selectEl.attributes
	     */
	    OPTION: function(fromEl, toEl) {
	        syncBooleanAttrProp(fromEl, toEl, 'selected');
	    },
	    /**
	     * The "value" attribute is special for the <input> element since it sets
	     * the initial value. Changing the "value" attribute without changing the
	     * "value" property will have no effect since it is only used to the set the
	     * initial value.  Similar for the "checked" attribute, and "disabled".
	     */
	    INPUT: function(fromEl, toEl) {
	        syncBooleanAttrProp(fromEl, toEl, 'checked');
	        syncBooleanAttrProp(fromEl, toEl, 'disabled');

	        if (fromEl.value !== toEl.value) {
	            fromEl.value = toEl.value;
	        }

	        if (!hasAttributeNS(toEl, null, 'value')) {
	            fromEl.removeAttribute('value');
	        }
	    },

	    TEXTAREA: function(fromEl, toEl) {
	        var newValue = toEl.value;
	        if (fromEl.value !== newValue) {
	            fromEl.value = newValue;
	        }

	        var firstChild = fromEl.firstChild;
	        if (firstChild) {
	            // Needed for IE. Apparently IE sets the placeholder as the
	            // node value and vise versa. This ignores an empty update.
	            var oldValue = firstChild.nodeValue;

	            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
	                return;
	            }

	            firstChild.nodeValue = newValue;
	        }
	    },
	    SELECT: function(fromEl, toEl) {
	        if (!hasAttributeNS(toEl, null, 'multiple')) {
	            var selectedIndex = -1;
	            var i = 0;
	            var curChild = toEl.firstChild;
	            while(curChild) {
	                var nodeName = curChild.nodeName;
	                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
	                    if (hasAttributeNS(curChild, null, 'selected')) {
	                        selectedIndex = i;
	                        break;
	                    }
	                    i++;
	                }
	                curChild = curChild.nextSibling;
	            }

	            fromEl.selectedIndex = i;
	        }
	    }
	};

	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var COMMENT_NODE = 8;

	function noop() {}

	function defaultGetNodeKey(node) {
	    return node.id;
	}

	function morphdomFactory(morphAttrs) {

	    return function morphdom(fromNode, toNode, options) {
	        if (!options) {
	            options = {};
	        }

	        if (typeof toNode === 'string') {
	            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
	                var toNodeHtml = toNode;
	                toNode = doc.createElement('html');
	                toNode.innerHTML = toNodeHtml;
	            } else {
	                toNode = toElement(toNode);
	            }
	        }

	        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
	        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
	        var onNodeAdded = options.onNodeAdded || noop;
	        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
	        var onElUpdated = options.onElUpdated || noop;
	        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
	        var onNodeDiscarded = options.onNodeDiscarded || noop;
	        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
	        var childrenOnly = options.childrenOnly === true;

	        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
	        var fromNodesLookup = {};
	        var keyedRemovalList;

	        function addKeyedRemoval(key) {
	            if (keyedRemovalList) {
	                keyedRemovalList.push(key);
	            } else {
	                keyedRemovalList = [key];
	            }
	        }

	        function walkDiscardedChildNodes(node, skipKeyedNodes) {
	            if (node.nodeType === ELEMENT_NODE) {
	                var curChild = node.firstChild;
	                while (curChild) {

	                    var key = undefined;

	                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
	                        // If we are skipping keyed nodes then we add the key
	                        // to a list so that it can be handled at the very end.
	                        addKeyedRemoval(key);
	                    } else {
	                        // Only report the node as discarded if it is not keyed. We do this because
	                        // at the end we loop through all keyed elements that were unmatched
	                        // and then discard them in one final pass.
	                        onNodeDiscarded(curChild);
	                        if (curChild.firstChild) {
	                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
	                        }
	                    }

	                    curChild = curChild.nextSibling;
	                }
	            }
	        }

	        /**
	         * Removes a DOM node out of the original DOM
	         *
	         * @param  {Node} node The node to remove
	         * @param  {Node} parentNode The nodes parent
	         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
	         * @return {undefined}
	         */
	        function removeNode(node, parentNode, skipKeyedNodes) {
	            if (onBeforeNodeDiscarded(node) === false) {
	                return;
	            }

	            if (parentNode) {
	                parentNode.removeChild(node);
	            }

	            onNodeDiscarded(node);
	            walkDiscardedChildNodes(node, skipKeyedNodes);
	        }

	        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
	        // function indexTree(root) {
	        //     var treeWalker = document.createTreeWalker(
	        //         root,
	        //         NodeFilter.SHOW_ELEMENT);
	        //
	        //     var el;
	        //     while((el = treeWalker.nextNode())) {
	        //         var key = getNodeKey(el);
	        //         if (key) {
	        //             fromNodesLookup[key] = el;
	        //         }
	        //     }
	        // }

	        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
	        //
	        // function indexTree(node) {
	        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
	        //     var el;
	        //     while((el = nodeIterator.nextNode())) {
	        //         var key = getNodeKey(el);
	        //         if (key) {
	        //             fromNodesLookup[key] = el;
	        //         }
	        //     }
	        // }

	        function indexTree(node) {
	            if (node.nodeType === ELEMENT_NODE) {
	                var curChild = node.firstChild;
	                while (curChild) {
	                    var key = getNodeKey(curChild);
	                    if (key) {
	                        fromNodesLookup[key] = curChild;
	                    }

	                    // Walk recursively
	                    indexTree(curChild);

	                    curChild = curChild.nextSibling;
	                }
	            }
	        }

	        indexTree(fromNode);

	        function handleNodeAdded(el) {
	            onNodeAdded(el);

	            var curChild = el.firstChild;
	            while (curChild) {
	                var nextSibling = curChild.nextSibling;

	                var key = getNodeKey(curChild);
	                if (key) {
	                    var unmatchedFromEl = fromNodesLookup[key];
	                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
	                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
	                        morphEl(unmatchedFromEl, curChild);
	                    }
	                }

	                handleNodeAdded(curChild);
	                curChild = nextSibling;
	            }
	        }

	        function morphEl(fromEl, toEl, childrenOnly) {
	            var toElKey = getNodeKey(toEl);
	            var curFromNodeKey;

	            if (toElKey) {
	                // If an element with an ID is being morphed then it is will be in the final
	                // DOM so clear it out of the saved elements collection
	                delete fromNodesLookup[toElKey];
	            }

	            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
	                return;
	            }

	            if (!childrenOnly) {
	                if (onBeforeElUpdated(fromEl, toEl) === false) {
	                    return;
	                }

	                morphAttrs(fromEl, toEl);
	                onElUpdated(fromEl);

	                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
	                    return;
	                }
	            }

	            if (fromEl.nodeName !== 'TEXTAREA') {
	                var curToNodeChild = toEl.firstChild;
	                var curFromNodeChild = fromEl.firstChild;
	                var curToNodeKey;

	                var fromNextSibling;
	                var toNextSibling;
	                var matchingFromEl;

	                outer: while (curToNodeChild) {
	                    toNextSibling = curToNodeChild.nextSibling;
	                    curToNodeKey = getNodeKey(curToNodeChild);

	                    while (curFromNodeChild) {
	                        fromNextSibling = curFromNodeChild.nextSibling;

	                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
	                            curToNodeChild = toNextSibling;
	                            curFromNodeChild = fromNextSibling;
	                            continue outer;
	                        }

	                        curFromNodeKey = getNodeKey(curFromNodeChild);

	                        var curFromNodeType = curFromNodeChild.nodeType;

	                        var isCompatible = undefined;

	                        if (curFromNodeType === curToNodeChild.nodeType) {
	                            if (curFromNodeType === ELEMENT_NODE) {
	                                // Both nodes being compared are Element nodes

	                                if (curToNodeKey) {
	                                    // The target node has a key so we want to match it up with the correct element
	                                    // in the original DOM tree
	                                    if (curToNodeKey !== curFromNodeKey) {
	                                        // The current element in the original DOM tree does not have a matching key so
	                                        // let's check our lookup to see if there is a matching element in the original
	                                        // DOM tree
	                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
	                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
	                                                // Special case for single element removals. To avoid removing the original
	                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
	                                                // we will instead discard the current node and wait until the next
	                                                // iteration to properly match up the keyed target element with its matching
	                                                // element in the original tree
	                                                isCompatible = false;
	                                            } else {
	                                                // We found a matching keyed element somewhere in the original DOM tree.
	                                                // Let's moving the original DOM node into the current position and morph
	                                                // it.

	                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
	                                                // the `removeNode()` function for the node that is being discarded so that
	                                                // all lifecycle hooks are correctly invoked
	                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

	                                                fromNextSibling = curFromNodeChild.nextSibling;

	                                                if (curFromNodeKey) {
	                                                    // Since the node is keyed it might be matched up later so we defer
	                                                    // the actual removal to later
	                                                    addKeyedRemoval(curFromNodeKey);
	                                                } else {
	                                                    // NOTE: we skip nested keyed nodes from being removed since there is
	                                                    //       still a chance they will be matched up later
	                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
	                                                }

	                                                curFromNodeChild = matchingFromEl;
	                                            }
	                                        } else {
	                                            // The nodes are not compatible since the "to" node has a key and there
	                                            // is no matching keyed node in the source tree
	                                            isCompatible = false;
	                                        }
	                                    }
	                                } else if (curFromNodeKey) {
	                                    // The original has a key
	                                    isCompatible = false;
	                                }

	                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
	                                if (isCompatible) {
	                                    // We found compatible DOM elements so transform
	                                    // the current "from" node to match the current
	                                    // target DOM node.
	                                    morphEl(curFromNodeChild, curToNodeChild);
	                                }

	                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
	                                // Both nodes being compared are Text or Comment nodes
	                                isCompatible = true;
	                                // Simply update nodeValue on the original node to
	                                // change the text value
	                                if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
	                                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
	                                }

	                            }
	                        }

	                        if (isCompatible) {
	                            // Advance both the "to" child and the "from" child since we found a match
	                            curToNodeChild = toNextSibling;
	                            curFromNodeChild = fromNextSibling;
	                            continue outer;
	                        }

	                        // No compatible match so remove the old node from the DOM and continue trying to find a
	                        // match in the original DOM. However, we only do this if the from node is not keyed
	                        // since it is possible that a keyed node might match up with a node somewhere else in the
	                        // target tree and we don't want to discard it just yet since it still might find a
	                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
	                        // that didn't find a home
	                        if (curFromNodeKey) {
	                            // Since the node is keyed it might be matched up later so we defer
	                            // the actual removal to later
	                            addKeyedRemoval(curFromNodeKey);
	                        } else {
	                            // NOTE: we skip nested keyed nodes from being removed since there is
	                            //       still a chance they will be matched up later
	                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
	                        }

	                        curFromNodeChild = fromNextSibling;
	                    }

	                    // If we got this far then we did not find a candidate match for
	                    // our "to node" and we exhausted all of the children "from"
	                    // nodes. Therefore, we will just append the current "to" node
	                    // to the end
	                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
	                        fromEl.appendChild(matchingFromEl);
	                        morphEl(matchingFromEl, curToNodeChild);
	                    } else {
	                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
	                        if (onBeforeNodeAddedResult !== false) {
	                            if (onBeforeNodeAddedResult) {
	                                curToNodeChild = onBeforeNodeAddedResult;
	                            }

	                            if (curToNodeChild.actualize) {
	                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
	                            }
	                            fromEl.appendChild(curToNodeChild);
	                            handleNodeAdded(curToNodeChild);
	                        }
	                    }

	                    curToNodeChild = toNextSibling;
	                    curFromNodeChild = fromNextSibling;
	                }

	                // We have processed all of the "to nodes". If curFromNodeChild is
	                // non-null then we still have some from nodes left over that need
	                // to be removed
	                while (curFromNodeChild) {
	                    fromNextSibling = curFromNodeChild.nextSibling;
	                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
	                        // Since the node is keyed it might be matched up later so we defer
	                        // the actual removal to later
	                        addKeyedRemoval(curFromNodeKey);
	                    } else {
	                        // NOTE: we skip nested keyed nodes from being removed since there is
	                        //       still a chance they will be matched up later
	                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
	                    }
	                    curFromNodeChild = fromNextSibling;
	                }
	            }

	            var specialElHandler = specialElHandlers[fromEl.nodeName];
	            if (specialElHandler) {
	                specialElHandler(fromEl, toEl);
	            }
	        } // END: morphEl(...)

	        var morphedNode = fromNode;
	        var morphedNodeType = morphedNode.nodeType;
	        var toNodeType = toNode.nodeType;

	        if (!childrenOnly) {
	            // Handle the case where we are given two DOM nodes that are not
	            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
	            if (morphedNodeType === ELEMENT_NODE) {
	                if (toNodeType === ELEMENT_NODE) {
	                    if (!compareNodeNames(fromNode, toNode)) {
	                        onNodeDiscarded(fromNode);
	                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
	                    }
	                } else {
	                    // Going from an element node to a text node
	                    morphedNode = toNode;
	                }
	            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
	                if (toNodeType === morphedNodeType) {
	                    if (morphedNode.nodeValue !== toNode.nodeValue) {
	                        morphedNode.nodeValue = toNode.nodeValue;
	                    }

	                    return morphedNode;
	                } else {
	                    // Text node to something else
	                    morphedNode = toNode;
	                }
	            }
	        }

	        if (morphedNode === toNode) {
	            // The "to node" was not compatible with the "from node" so we had to
	            // toss out the "from node" and use the "to node"
	            onNodeDiscarded(fromNode);
	        } else {
	            morphEl(morphedNode, toNode, childrenOnly);

	            // We now need to loop over any keyed nodes that might need to be
	            // removed. We only do the removal if we know that the keyed node
	            // never found a match. When a keyed node is matched up we remove
	            // it out of fromNodesLookup and we use fromNodesLookup to determine
	            // if a keyed node has been matched up or not
	            if (keyedRemovalList) {
	                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
	                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
	                    if (elToRemove) {
	                        removeNode(elToRemove, elToRemove.parentNode, false);
	                    }
	                }
	            }
	        }

	        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
	            if (morphedNode.actualize) {
	                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
	            }
	            // If we had to swap out the from node with a new node because the old
	            // node was not compatible with the target node then we need to
	            // replace the old DOM node in the original DOM tree. This is only
	            // possible if the original DOM node was part of a DOM tree which
	            // we know is the case if it has a parent node.
	            fromNode.parentNode.replaceChild(morphedNode, fromNode);
	        }

	        return morphedNode;
	    };
	}

	var morphdom = morphdomFactory(morphAttrs);

	module.exports = morphdom;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = [
	  // attribute events (can be set with attributes)
	  'onclick',
	  'ondblclick',
	  'onmousedown',
	  'onmouseup',
	  'onmouseover',
	  'onmousemove',
	  'onmouseout',
	  'ondragstart',
	  'ondrag',
	  'ondragenter',
	  'ondragleave',
	  'ondragover',
	  'ondrop',
	  'ondragend',
	  'onkeydown',
	  'onkeypress',
	  'onkeyup',
	  'onunload',
	  'onabort',
	  'onerror',
	  'onresize',
	  'onscroll',
	  'onselect',
	  'onchange',
	  'onsubmit',
	  'onreset',
	  'onfocus',
	  'onblur',
	  'oninput',
	  // other common events
	  'oncontextmenu',
	  'onfocusin',
	  'onfocusout'
	]


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(h) {'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	var _yoYo = __webpack_require__(14);

	var _yoYo2 = _interopRequireDefault(_yoYo);

	var _RecordButton = __webpack_require__(18);

	var _RecordButton2 = _interopRequireDefault(_RecordButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Home(props) {

			function handleClick() {
					console.log('Click');

					var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
					var recognition = new SpeechRecognition();

					recognition.lang = 'en-US';
					recognition.interimResults = false;
					recognition.maxAlternatives = 1;

					recognition.start();

					recognition.addEventListener('speechstart', function () {
							console.log('Speech has been detected.');
					});

					recognition.addEventListener('result', function (e) {
							console.log('Result has been detected.');

							var last = e.results.length - 1;
							var text = e.results[last][0].transcript;

							outputYou.textContent = text;
					});

					recognition.addEventListener('speechend', function () {
							recognition.stop();
					});

					recognition.addEventListener('error', function (e) {
							console.log('Error: ' + e.error);
					});
			}

			function render(state) {
					return h(
							'div',
							{ id: 'home' },
							h(_RecordButton2.default, { handleClick: handleClick })
					);
			}

			var state = {};

			var component = render(state);
			return component;
	}

	exports.default = Home;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(h) {"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function RecordButton(props) {

		function render() {
			return h(
				"a",
				{ style: "display: flex; flex-direction: row; justify-content: center;", "class": "button is-large", onclick: props.handleClick },
				h(
					"span",
					{ "class": "icon is-large" },
					h("i", { "class": "fa fa-microphone" })
				)
			);
		}

		var component = render();
		return component;
	}

	exports.default = RecordButton;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ })
/******/ ]);
