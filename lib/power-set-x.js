(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @file Calculates the Power Set of a set S.
 * @version 1.5.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module power-set-x
 */

'use strict';

var isArrayLike = _dereq_('is-array-like-x');
var forEach = _dereq_('array-for-each-x');
var slice = _dereq_('array-slice-x');
var aPop = Array.prototype.pop;

/**
 * This method calculates the Power Set of `value`. Array sparseness is
 * ignored.
 *
 * In mathematics, the power set (or powerset) of any set S,
 * written P(S), ℘(S), P(S), ℙ(S) or 2S, is the set of all subsets of S,
 * including the empty set and S itself.
 *
 * @param {Array} value - The array like `value` to get the power set of.
 * @returns {Array.<Array>} The power set of `value`.
 * @see http://en.wikipedia.org/wiki/Power_set
 * @example
 * var powerSet = require('power-set-x');
 *
 * powerSet([1, 2, 3]); // [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]
 */
module.exports = function powerSet(value) {
  var val = [];
  if (isArrayLike(value)) {
    if (value.length < 1) {
      val[0] = [];
    } else {
      var object = slice(value);
      var lastElement = aPop.call(object);
      forEach(powerSet(object), function (item, index, oSet) {
        var entry = item;
        val[val.length] = entry;
        entry = slice(entry);
        oSet[index] = entry;
        entry[entry.length] = lastElement;
        val[val.length] = entry;
      });
    }
  } else {
    val[0] = [];
  }

  return val;
};

},{"array-for-each-x":2,"array-slice-x":4,"is-array-like-x":11}],2:[function(_dereq_,module,exports){
/**
 * @file Executes a provided function once for each array element.
 * @version 2.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module array-for-each-x
 */

'use strict';

var nativeForEach = typeof Array.prototype.forEach === 'function' && Array.prototype.forEach;

var isWorking;
if (nativeForEach) {
  var attempt = _dereq_('attempt-x');
  var spy = 0;
  var res = attempt.call([1, 2], nativeForEach, function (item) {
    spy += item;
  });

  isWorking = res.threw === false && typeof res.value === 'undefined' && spy === 3;

  if (isWorking) {
    spy = '';
    res = attempt.call(Object('abc'), nativeForEach, function (item) {
      spy += item;
    });

    isWorking = res.threw === false && typeof res.value === 'undefined' && spy === 'abc';
  }

  if (isWorking) {
    spy = 0;
    res = attempt.call((function () {
      return arguments;
    }(1, 2, 3)), nativeForEach, function (item) {
      spy += item;
    });

    isWorking = res.threw === false && typeof res.value === 'undefined' && spy === 6;
  }

  if (isWorking) {
    spy = 0;
    res = attempt.call({
      0: 1,
      1: 2,
      3: 3,
      4: 4,
      length: 4
    }, nativeForEach, function (item) {
      spy += item;
    });

    isWorking = res.threw === false && typeof res.value === 'undefined' && spy === 6;
  }

  if (isWorking) {
    var doc = typeof document !== 'undefined' && document;
    if (doc) {
      spy = null;
      var fragment = doc.createDocumentFragment();
      var div = doc.createElement('div');
      fragment.appendChild(div);
      res = attempt.call(fragment.childNodes, nativeForEach, function (item) {
        spy = item;
      });

      isWorking = res.threw === false && typeof res.value === 'undefined' && spy === div;
    }
  }

  if (isWorking) {
    var isStrict = (function () {
      // eslint-disable-next-line no-invalid-this
      return Boolean(this) === false;
    }());

    if (isStrict) {
      spy = null;
      res = attempt.call([1], nativeForEach, function () {
        // eslint-disable-next-line no-invalid-this
        spy = typeof this === 'string';
      }, 'x');

      isWorking = res.threw === false && typeof res.value === 'undefined' && spy === true;
    }
  }

  if (isWorking) {
    spy = {};
    var fn = [
      'return nativeForEach.call("foo", function (_, __, context) {',
      'if (Boolean(context) === false || typeof context !== "object") {',
      'spy.value = true;}});'
    ].join('');

    // eslint-disable-next-line no-new-func
    res = attempt(Function('nativeForEach', 'spy', fn), nativeForEach, spy);

    isWorking = res.threw === false && typeof res.value === 'undefined' && spy.value !== true;
  }
}

var $forEach;
if (nativeForEach) {
  $forEach = function forEach(array, callBack /* , thisArg */) {
    var args = [callBack];
    if (arguments.length > 2) {
      args[1] = arguments[2];
    }

    return nativeForEach.apply(array, args);
  };
} else {
  var splitIfBoxedBug = _dereq_('split-if-boxed-bug-x');
  var toLength = _dereq_('to-length-x');
  var isUndefined = _dereq_('validate.io-undefined');
  var toObject = _dereq_('to-object-x');
  var assertIsFunction = _dereq_('assert-is-function-x');

  $forEach = function forEach(array, callBack /* , thisArg */) {
    var object = toObject(array);
    // If no callback function or if callback is not a callable function
    assertIsFunction(callBack);
    var iterable = splitIfBoxedBug(object);
    var length = toLength(iterable.length);
    var thisArg;
    if (arguments.length > 2) {
      thisArg = arguments[2];
    }

    var noThis = isUndefined(thisArg);
    for (var i = 0; i < length; i += 1) {
      if (i in iterable) {
        if (noThis) {
          callBack(iterable[i], i, object);
        } else {
          callBack.call(thisArg, iterable[i], i, object);
        }
      }
    }
  };
}

/**
 * This method executes a provided function once for each array element.
 *
 * @param {array} array - The array to iterate over.
 * @param {Function} callBack - Function to execute for each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @throws {TypeError} If array is null or undefined.
 * @throws {TypeError} If callBack is not a function.
 * @example
 * var forEach = require('array-for-each-x');
 *
 * var items = ['item1', 'item2', 'item3'];
 * var copy = [];
 *
 * forEach(items, function(item){
 *   copy.push(item)
 * });
 */
module.exports = $forEach;

},{"assert-is-function-x":5,"attempt-x":6,"split-if-boxed-bug-x":32,"to-length-x":34,"to-object-x":36,"validate.io-undefined":43}],3:[function(_dereq_,module,exports){
/**
 * @file Cross-browser array-like slicer.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module array-like-slice-x
 */

'use strict';

var toObject = _dereq_('to-object-x');
var toInteger = _dereq_('to-integer-x');
var toLength = _dereq_('to-length-x');
var isUndefined = _dereq_('validate.io-undefined');
var splitIfBoxedBug = _dereq_('split-if-boxed-bug-x');

var setRelative = function _setRelative(value, length) {
  return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
};

/**
 * The slice() method returns a shallow copy of a portion of an array into a new
 * array object selected from begin to end (end not included). The original
 * array will not be modified.
 *
 * @param {!Object} argsObject - The `arguments` to slice.
 * @param {number} [start] - Zero-based index at which to begin extraction.
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. slice(-2) extracts the last two elements in the sequence.
 *  If begin is undefined, slice begins from index 0.
 * @param {number} [end] - Zero-based index before which to end extraction.
 *  Slice extracts up to but not including end. For example, slice([0,1,2,3,4],1,4)
 *  extracts the second element through the fourth element (elements indexed
 *  1, 2, and 3).
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. slice(2,-1) extracts the third element through the second-to-last
 *  element in the sequence.
 *  If end is omitted, slice extracts through the end of the sequence (arr.length).
 *  If end is greater than the length of the sequence, slice extracts through
 *  the end of the sequence (arr.length).
 * @returns {Array} A new array containing the extracted elements.
 * @example
 * var arrayLikeSlice = require('array-like-slice-x');
 * var args = (function () {
    return arguments;
 * }('Banana', 'Orange', 'Lemon', 'Apple', 'Mango'));
 *
 * var citrus = arrayLikeSlice(args, 1, 3);
 *
 * // args contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
 * // citrus contains ['Orange','Lemon']
 */
module.exports = function slice(arrayLike, start, end) {
  var iterable = splitIfBoxedBug(toObject(arrayLike));
  var length = toLength(iterable.length);
  var k = setRelative(toInteger(start), length);
  var relativeEnd = isUndefined(end) ? length : toInteger(end);
  var finalEnd = setRelative(relativeEnd, length);
  var val = [];
  val.length = Math.max(finalEnd - k, 0);
  var next = 0;
  while (k < finalEnd) {
    if (k in iterable) {
      val[next] = iterable[k];
    }

    next += 1;
    k += 1;
  }

  return val;
};

},{"split-if-boxed-bug-x":32,"to-integer-x":33,"to-length-x":34,"to-object-x":36,"validate.io-undefined":43}],4:[function(_dereq_,module,exports){
/**
 * @file Cross-browser array slicer.
 * @version 3.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module array-slice-x
 */

'use strict';

var toObject = _dereq_('to-object-x');
var isArguments = _dereq_('is-arguments');
var isArray = _dereq_('is-array-x');
var arrayLikeSlice = _dereq_('array-like-slice-x');
var nativeSlice = Array.prototype.slice;
var isString;
var failArr;
var failDOM;
if (nativeSlice) {
  var attempt = _dereq_('attempt-x');
  var res = attempt.call([
    1,
    2,
    3
  ], nativeSlice, 1, 2);

  failArr = res.threw || isArray(res.value) === false || res.value.length !== 1 || res.value[0] !== 2;
  if (failArr === false) {
    res = attempt.call('abc', nativeSlice, 1, 2);
    isString = (res.threw || res.value.length !== 1 || res.value[0] !== 'b') && _dereq_('is-string');
    var doc = typeof document !== 'undefined' && document;
    failDOM = doc && attempt.call(doc.documentElement, nativeSlice).threw;
  }
} else {
  failArr = true;
}

/**
 * The slice() method returns a shallow copy of a portion of an array into a new
 * array object selected from begin to end (end not included). The original
 * array will not be modified.
 *
 * @param {Array|Object} array - The array to slice.
 * @param {number} [start] - Zero-based index at which to begin extraction.
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. slice(-2) extracts the last two elements in the sequence.
 *  If begin is undefined, slice begins from index 0.
 * @param {number} [end] - Zero-based index before which to end extraction.
 *  Slice extracts up to but not including end. For example, slice(1,4)
 *  extracts the second element through the fourth element (elements indexed
 *  1, 2, and 3).
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. slice(2,-1) extracts the third element through the second-to-last
 *  element in the sequence.
 *  If end is omitted, slice extracts through the end of the
 *  sequence (arr.length).
 *  If end is greater than the length of the sequence, slice extracts through
 *  the end of the sequence (arr.length).
 * @returns {Array} A new array containing the extracted elements.
 * @example
 * var slice = require('array-slice-x');
 * var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
 * var citrus = slice(fruits, 1, 3);
 *
 * // fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
 * // citrus contains ['Orange','Lemon']
 */
module.exports = function slice(array, start, end) {
  var object = toObject(array);
  if (failArr || (failDOM && isArray(object) === false) || (isString && isString(object)) || isArguments(object)) {
    return arrayLikeSlice(object, start, end);
  }

  return nativeSlice.apply(object, arrayLikeSlice(arguments, 1));
};

},{"array-like-slice-x":3,"attempt-x":6,"is-arguments":10,"is-array-x":12,"is-string":23,"to-object-x":36}],5:[function(_dereq_,module,exports){
/**
 * @file If isFunction(callbackfn) is false, throw a TypeError exception.
 * @version 2.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module assert-is-function-x
 */

'use strict';

var isFunction = _dereq_('is-function-x');
var safeToString = _dereq_('safe-to-string-x');
var isPrimitive = _dereq_('is-primitive');

/**
 * Tests `callback` to see if it is a function, throws a `TypeError` if it is
 * not. Otherwise returns the `callback`.
 *
 * @param {*} callback - The argument to be tested.
 * @throws {TypeError} Throws if `callback` is not a function.
 * @returns {*} Returns `callback` if it is function.
 * @example
 * var assertIsFunction = require('assert-is-function-x');
 * var primitive = true;
 * var mySymbol = Symbol('mySymbol');
 * var symObj = Object(mySymbol);
 * var object = {};
 * function fn () {}
 *
 * assertIsFunction(primitive);
 *    // TypeError 'true is not a function'.
 * assertIsFunction(object);
 *    // TypeError '#<Object> is not a function'.
 * assertIsFunction(mySymbol);
 *    // TypeError 'Symbol(mySymbol) is not a function'.
 * assertIsFunction(symObj);
 *    // TypeError '#<Object> is not a function'.
 * assertIsFunction(fn);
 *    // Returns fn.
 */
module.exports = function assertIsFunction(callback) {
  if (isFunction(callback) === false) {
    var msg = isPrimitive(callback) ? safeToString(callback) : '#<Object>';
    throw new TypeError(msg + ' is not a function');
  }

  return callback;
};

},{"is-function-x":16,"is-primitive":21,"safe-to-string-x":31}],6:[function(_dereq_,module,exports){
/**
 * @file Invokes function, returning an object of the results.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module attempt-x
 */

'use strict';

var arrayLikeSlice = _dereq_('array-like-slice-x');

/**
 * This method attempts to invoke the function, returning either the result or
 * the caught error object. Any additional arguments are provided to the
 * function when it's invoked.
 *
 * @param {Function} fn - The function to attempt.
 * @param {...*} [args] - The arguments to invoke the function with.
 * @returns {Object} Returns an object of the result.
 * @example
 * var attempt = require('attempt-x');
 *
 * function thrower() {
 *   throw new Error('Threw');
 * }
 *
 * attempt(thrower, 1, 2);
 * // {
 * //   threw: true,
 * //   value: // Error('Threw') object
 * // }
 *
 * function sumArgs(a, b) {
 *   return a + b;
 * }
 *
 * attempt(sumArgs, 1, 2);
 * // {
 * //   threw: false,
 * //   value: 3
 * // }
 *
 * var thisArg = [];
 * function pusher(a, b) {
 *   return this.push(a, b);
 * }
 *
 * attempt.call(thisArg, pusher, 1, 2);
 * // {
 * //   threw: false,
 * //   value: 2
 * // }
 * // thisArg => [1, 2];
 */
module.exports = function attempt(fn) {
  try {
    return {
      threw: false,
      value: fn.apply(this, arrayLikeSlice(arguments, 1))
    };
  } catch (e) {
    return {
      threw: true,
      value: e
    };
  }
};

},{"array-like-slice-x":3}],7:[function(_dereq_,module,exports){
/**
 * @file Check support of by-index access of string characters.
 * @version 1.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-boxed-string-x
 */

'use strict';

var boxedString = Object('a');

/**
 * Check failure of by-index access of string characters (IE < 9)
 * and failure of `0 in boxedString` (Rhino).
 *
 * `true` if no failure; otherwise `false`.
 *
 * @type boolean
 */
module.exports = boxedString[0] === 'a' && (0 in boxedString);

},{}],8:[function(_dereq_,module,exports){
/**
 * @file Tests if ES6 Symbol is supported.
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */

'use strict';

/**
 * Indicates if `Symbol`exists and creates the correct type.
 * `true`, if it exists and creates the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';

},{}],9:[function(_dereq_,module,exports){
/**
 * @file Tests if ES6 @@toStringTag is supported.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag|26.3.1 @@toStringTag}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-to-string-tag-x
 */

'use strict';

/**
 * Indicates if `Symbol.toStringTag`exists and is the correct type.
 * `true`, if it exists and is the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = _dereq_('has-symbol-support-x') && typeof Symbol.toStringTag === 'symbol';

},{"has-symbol-support-x":8}],10:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	return toStr.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr.call(value) !== '[object Array]' &&
		toStr.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{}],11:[function(_dereq_,module,exports){
/**
 * @file Determine if a value is array like.
 * @version 1.7.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-array-like-x
 */

'use strict';

var isNil = _dereq_('is-nil-x');
var isFunction = _dereq_('is-function-x');
var isLength = _dereq_('is-length-x');

/**
 * Checks if value is array-like. A value is considered array-like if it's
 * not a function and has a `length` that's an integer greater than or
 * equal to 0 and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @param {*} value - The object to be tested.
 * @returns {boolean} Returns `true` if subject is array-like, else `false`.
 * @example
 * var isArrayLike = require('is-array-like-x');
 *
 * isArrayLike([1, 2, 3]); // true
 * isArrayLike(document.body.children); // true
 * isArrayLike('abc'); // true
 * isArrayLike(_.noop); // false
 */
module.exports = function isArrayLike(value) {
  return isNil(value) === false && isFunction(value, true) === false && isLength(value.length);
};

},{"is-function-x":16,"is-length-x":18,"is-nil-x":20}],12:[function(_dereq_,module,exports){
/**
 * @file Determines whether the passed value is an Array.
 * @version 1.1.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-array-x
 */

'use strict';

var isFalsey = _dereq_('is-falsey-x');
var nativeIsArray = typeof Array.isArray === 'function' && Array.isArray;

var $isArray;
if (nativeIsArray) {
  try {
    if ($isArray([]) && $isArray({ length: 0 }) === false) {
      $isArray = nativeIsArray;
    }
  } catch (ignore) {}
}

if (isFalsey($isArray)) {
  var toStringTag = _dereq_('to-string-tag-x');
  $isArray = function isArray(obj) {
    return toStringTag(obj) === '[object Array]';
  };
}

/**
 * The isArray() function determines whether the passed value is an Array.
 *
 * @param {*} obj - The object to be checked..
 * @returns {boolean} `true` if the object is an Array; otherwise, `false`.
 * @example
 * var isArray = require('is-array-x');
 *
 * isArray([]); // true
 * isArray({}); // false
 */
module.exports = $isArray;

},{"is-falsey-x":14,"to-string-tag-x":38}],13:[function(_dereq_,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{}],14:[function(_dereq_,module,exports){
/**
 * @file Test if a given value is falsey.
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-falsey-x
 */

'use strict';

/**
 * This method tests if a given value is falsey.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} `true` if the value is falsey: otherwise `false`.
 * @example
 * var isFalsey = require('is-falsey-x');
 *
 * isFalsey(); // true
 * isFalsey(0); // true
 * isFalsey(''); // true
 * isFalsey(false); // true
 * isFalsey(null); // true
 *
 * isFalsey(true); // false
 * isFalsey([]); // false
 * isFalsey(1); // false
 * isFalsey(function () {}); // false
 */
module.exports = function isFalsey(value) {
  return Boolean(value) === false;
};

},{}],15:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for Number.isFinite.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-number.isfinite|20.1.2.2 Number.isFinite ( number )}
 * @version 3.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-finite-x
 */

'use strict';

var numberIsNaN = _dereq_('is-nan-x');
var inf = 1 / 0;
var negInf = 1 / -0;

/**
 * This method determines whether the passed value is a finite number.
 *
 * @param {*} number - The value to be tested for finiteness.
 * @returns {boolean} A Boolean indicating whether or not the given value is a finite number.
 * @example
 * var numIsFinite = require('is-finite-x');
 *
 * numIsFinite(Infinity);  // false
 * numIsFinite(NaN);       // false
 * numIsFinite(-Infinity); // false
 *
 * numIsFinite(0);         // true
 * numIsFinite(2e64);      // true
 *
 * numIsFinite('0');       // false, would've been true with
 *                         // global isFinite('0')
 * numIsFinite(null);      // false, would've been true with
 */
module.exports = function isFinite(number) {
  return typeof number === 'number' && numberIsNaN(number) === false && number !== inf && number !== negInf;
};

},{"is-nan-x":19}],16:[function(_dereq_,module,exports){
/**
 * @file Determine whether a given value is a function object.
 * @version 3.1.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-function-x
 */

'use strict';

var fToString = Function.prototype.toString;
var toStringTag = _dereq_('to-string-tag-x');
var hasToStringTag = _dereq_('has-to-string-tag-x');
var isPrimitive = _dereq_('is-primitive');
var normalise = _dereq_('normalize-space-x');
var deComment = _dereq_('replace-comments-x');
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var asyncTag = '[object AsyncFunction]';

var hasNativeClass = true;
try {
  // eslint-disable-next-line no-new-func
  Function('"use strict"; return class My {};')();
} catch (ignore) {
  hasNativeClass = false;
}

var ctrRx = /^class /;
var isES6ClassFn = function isES6ClassFunc(value) {
  try {
    return ctrRx.test(normalise(deComment(fToString.call(value), ' ')));
  } catch (ignore) {}

  // not a function
  return false;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @private
 * @param {*} value - The value to check.
 * @param {boolean} allowClass - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */

var tryFuncToString = function funcToString(value, allowClass) {
  try {
    if (hasNativeClass && allowClass === false && isES6ClassFn(value)) {
      return false;
    }

    fToString.call(value);
    return true;
  } catch (ignore) {}

  return false;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [allowClass=false] - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 * @example
 * var isFunction = require('is-function-x');
 *
 * isFunction(); // false
 * isFunction(Number.MIN_VALUE); // false
 * isFunction('abc'); // false
 * isFunction(true); // false
 * isFunction({ name: 'abc' }); // false
 * isFunction(function () {}); // true
 * isFunction(new Function ()); // true
 * isFunction(function* test1() {}); // true
 * isFunction(function test2(a, b) {}); // true
 * isFunction(async function test3() {}); // true
 * isFunction(class Test {}); // false
 * isFunction(class Test {}, true); // true
 * isFunction((x, y) => {return this;}); // true
 */
module.exports = function isFunction(value) {
  if (isPrimitive(value)) {
    return false;
  }

  var allowClass = arguments.length > 0 ? Boolean(arguments[1]) : false;
  if (hasToStringTag) {
    return tryFuncToString(value, allowClass);
  }

  if (hasNativeClass && allowClass === false && isES6ClassFn(value)) {
    return false;
  }

  var strTag = toStringTag(value);
  return strTag === funcTag || strTag === genTag || strTag === asyncTag;
};

},{"has-to-string-tag-x":9,"is-primitive":21,"normalize-space-x":28,"replace-comments-x":29,"to-string-tag-x":38}],17:[function(_dereq_,module,exports){
/**
 * @file Determine whether the passed value is an integer.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-integer-x
 */

'use strict';

var numberIsFinite = _dereq_('is-finite-x');
var toInteger = _dereq_('to-integer-x');

/**
 * This method determines whether the passed value is an integer.
 *
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean} A Boolean indicating whether or not the given value is an integer.
 * @example
 * var isInteger = require('is-integer-x');
 *
 * isInteger(0);         // true
 * isInteger(1);         // true
 * isInteger(-100000);   // true
 *
 * isInteger(0.1);       // false
 * isInteger(Math.PI);   // false
 *
 * isInteger(NaN);       // false
 * isInteger(Infinity);  // false
 * isInteger(-Infinity); // false
 * isInteger('10');      // false
 * isInteger(true);      // false
 * isInteger(false);     // false
 * isInteger([1]);       // false
 */
module.exports = function isInteger(value) {
  return numberIsFinite(value) && toInteger(value) === value;
};

},{"is-finite-x":15,"to-integer-x":33}],18:[function(_dereq_,module,exports){
/**
 * @file Checks if `value` is a valid array-like length.
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-length-x
 */

'use strict';

var isSafeInteger = _dereq_('is-safe-integer-x');

/**
 * This method checks if `value` is a valid array-like length.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 * var isLength = require('is-length-x');
 *
 * isLength(3); // => true
 * isLength(Number.MIN_VALUE); // => false
 * isLength(Infinity); // => false
 * isLength('3'); // => false
 */
module.exports = function isLength(value) {
  return isSafeInteger(value) && value >= 0;
};

},{"is-safe-integer-x":22}],19:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for Number.isNaN - the global isNaN returns false positives.
 * @version 1.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-nan-x
 */

'use strict';

/**
 * This method determines whether the passed value is NaN and its type is
 * `Number`. It is a more robust version of the original, global isNaN().
 *
 * @param {*} value - The value to be tested for NaN.
 * @returns {boolean} `true` if the given value is NaN and its type is Number;
 *  otherwise, `false`.
 * @example
 * var numberIsNaN = require('is-nan-x');
 *
 * numberIsNaN(NaN);        // true
 * numberIsNaN(Number.NaN); // true
 * numberIsNaN(0 / 0);      // true
 *
 * // e.g. these would have been true with global isNaN()
 * numberIsNaN('NaN');      // false
 * numberIsNaN(undefined);  // false
 * numberIsNaN({});         // false
 * numberIsNaN('blabla');   // false
 *
 * // These all return false
 * numberIsNaN(true);
 * numberIsNaN(null);
 * numberIsNaN(37);
 * numberIsNaN('37');
 * numberIsNaN('37.37');
 * numberIsNaN('');
 * numberIsNaN(' ');
 */
module.exports = function isNaN(value) {
  return value !== value;
};

},{}],20:[function(_dereq_,module,exports){
/**
 * @file Checks if `value` is `null` or `undefined`.
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-nil-x
 */

'use strict';

var isUndefined = _dereq_('validate.io-undefined');
var isNull = _dereq_('lodash.isnull');

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 * var isNil = require('is-nil-x');
 *
 * isNil(null); // => true
 * isNil(void 0); // => true
 * isNil(NaN); // => false
 */
module.exports = function isNil(value) {
  return isNull(value) || isUndefined(value);
};

},{"lodash.isnull":25,"validate.io-undefined":43}],21:[function(_dereq_,module,exports){
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

// see http://jsperf.com/testing-value-is-primitive/7
module.exports = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],22:[function(_dereq_,module,exports){
/**
 * @file Determine whether the passed value is a safe integer.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-safe-integer-x
 */

'use strict';

var isInteger = _dereq_('is-integer-x');
var MAX_SAFE_INTEGER = _dereq_('max-safe-integer');
var MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;

/**
 * This method determines whether the passed value is a safe integer.
 *
 * Can be exactly represented as an IEEE-754 double precision number, and
 * whose IEEE-754 representation cannot be the result of rounding any other
 * integer to fit the IEEE-754 representation.
 *
 * @param {*} value - The value to be tested for being a safe integer.
 * @returns {boolean} A Boolean indicating whether or not the given value is a
 *  safe integer.
 * @example
 * var isSafeInteger = require('is-safe-integer-x');
 *
 * isSafeInteger(0);                    // true
 * isSafeInteger(1);                    // true
 * isSafeInteger(-100000);              // true
 *
 * isSafeInteger(Math.pow(2, 53));      // false
 * isSafeInteger(0.1);                  // false
 * isSafeInteger(Math.PI);              // false
 *
 * isSafeInteger(NaN);                  // false
 * isSafeInteger(Infinity);             // false
 * isSafeInteger(-Infinity);            // false
 * isSafeInteger('10');                 // false
 * isSafeInteger(true);                 // false
 * isSafeInteger(false);                // false
 * isSafeInteger([1]);                  // false
 */
module.exports = function isSafeInteger(value) {
  return isInteger(value) && value >= MIN_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
};

},{"is-integer-x":17,"max-safe-integer":27}],23:[function(_dereq_,module,exports){
'use strict';

var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};

},{}],24:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],25:[function(_dereq_,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],26:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for Math.sign.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-math.sign|20.2.2.29 Math.sign(x)}
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module math-sign-x
 */

'use strict';

var toNumber = _dereq_('to-number-x');
var numberIsNaN = _dereq_('is-nan-x');

/**
 * This method returns the sign of a number, indicating whether the number is positive,
 * negative or zero.
 *
 * @param {*} x - A number.
 * @returns {number} A number representing the sign of the given argument. If the argument
 * is a positive number, negative number, positive zero or negative zero, the function will
 * return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.
 * @example
 * var mathSign = require('math-sign-x');
 *
 * mathSign(3);     //  1
 * mathSign(-3);    // -1
 * mathSign('-3');  // -1
 * mathSign(0);     //  0
 * mathSign(-0);    // -0
 * mathSign(NaN);   // NaN
 * mathSign('foo'); // NaN
 * mathSign();      // NaN
 */
module.exports = function sign(x) {
  var n = toNumber(x);
  if (n === 0 || numberIsNaN(n)) {
    return n;
  }

  return n > 0 ? 1 : -1;
};

},{"is-nan-x":19,"to-number-x":35}],27:[function(_dereq_,module,exports){
'use strict';
module.exports = 9007199254740991;

},{}],28:[function(_dereq_,module,exports){
/**
 * @file Trims and replaces sequences of whitespace characters by a single space.
 * @version 1.3.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module normalize-space-x
 */

'use strict';

var trim = _dereq_('trim-x');
var reNormalize = new RegExp('[' + _dereq_('white-space-x').string + ']+', 'g');

/**
 * This method strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} string - The string to be normalized.
 * @returns {string} The normalized string.
 * @example
 * var normalizeSpace = require('normalize-space-x');
 *
 * normalizeSpace(' \t\na \t\nb \t\n') === 'a b'; // true
 */
module.exports = function normalizeSpace(string) {
  return trim(string).replace(reNormalize, ' ');
};

},{"trim-x":42,"white-space-x":44}],29:[function(_dereq_,module,exports){
/**
 * @file Replace the comments in a string.
 * @version 1.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module replace-comments-x
 */

'use strict';

var isString = _dereq_('is-string');
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

/**
 * This method replaces comments in a string.
 *
 * @param {string} string - The string to be stripped.
 * @param {string} [replacement] - The string to be used as a replacement.
 * @returns {string} The new string with the comments replaced.
 * @example
 * var replaceComments = require('replace-comments-x');
 *
 * replaceComments(test;/* test * /, ''), // 'test;'
 * replaceComments(test; // test, ''), // 'test;'
 */
module.exports = function replaceComments(string) {
  var replacement = arguments.length > 1 && isString(arguments[1]) ? arguments[1] : '';
  return isString(string) ? string.replace(STRIP_COMMENTS, replacement) : '';
};

},{"is-string":23}],30:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for RequireObjectCoercible.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-requireobjectcoercible|7.2.1 RequireObjectCoercible ( argument )}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module require-object-coercible-x
 */

'use strict';

var isNil = _dereq_('is-nil-x');

/**
 * The abstract operation RequireObjectCoercible throws an error if argument
 * is a value that cannot be converted to an Object using ToObject.
 *
 * @param {*} value - The `value` to check.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {string} The `value`.
 * @example
 * var RequireObjectCoercible = require('require-object-coercible-x');
 *
 * RequireObjectCoercible(); // TypeError
 * RequireObjectCoercible(null); // TypeError
 * RequireObjectCoercible('abc'); // 'abc'
 * RequireObjectCoercible(true); // true
 * RequireObjectCoercible(Symbol('foo')); // Symbol('foo')
 */
module.exports = function RequireObjectCoercible(value) {
  if (isNil(value)) {
    throw new TypeError('Cannot call method on ' + value);
  }

  return value;
};

},{"is-nil-x":20}],31:[function(_dereq_,module,exports){
/**
 * @file Like ES6 ToString but handles Symbols too.
 * @see {@link https://github.com/Xotic750/to-string-x|to-string-x}
 * @version 2.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module safe-to-string-x
 */

'use strict';

var isSymbol = _dereq_('is-symbol');
var toStr = _dereq_('to-string-x');
var hasSymbols = _dereq_('has-symbol-support-x');
var pToString = hasSymbols && Symbol.prototype.toString;

/**
 * The abstract operation `safeToString` converts a `Symbol` literal or
 * object to `Symbol()` instead of throwing a `TypeError`.
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string} The converted value.
 * @example
 * var safeToString = require('safe-to-string-x');
 *
 * safeToString(); // 'undefined'
 * safeToString(null); // 'null'
 * safeToString('abc'); // 'abc'
 * safeToString(true); // 'true'
 * safeToString(Symbol('foo')); // 'Symbol(foo)'
 * safeToString(Symbol.iterator); // 'Symbol(Symbol.iterator)'
 * safeToString(Object(Symbol.iterator)); // 'Symbol(Symbol.iterator)'
 */
module.exports = function safeToString(value) {
  return hasSymbols && isSymbol(value) ? pToString.call(value) : toStr(value);
};

},{"has-symbol-support-x":8,"is-symbol":24,"to-string-x":39}],32:[function(_dereq_,module,exports){
/**
 * @file Tests if a value is a string with the boxed bug; splits to an array.
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module split-if-boxed-bug-x
 */

'use strict';

var splitString = _dereq_('has-boxed-string-x') === false;
var strSplit;
var isString;
if (splitString) {
  strSplit = String.prototype.split;
  isString = _dereq_('is-string');
}

/**
 * This method tests if a value is a string with the boxed bug; splits to an
 * array for iteration; otherwise returns the original value.
 *
 * @param {*} value - The value to be tested.
 * @returns {*} An array or characters if value was a string with the boxed bug;
 *  otherwise the value.
 * @example
 * var splitIfBoxedBug = require('split-if-boxed-bug-x');
 *
 * // No boxed bug
 * splitIfBoxedBug('abc'); // 'abc'
 *
 * // Boxed bug
 * splitIfBoxedBug('abc'); // ['a', 'b', 'c']
 */
module.exports = function splitIfBoxedBug(value) {
  return splitString && isString(value) ? strSplit.call(value, '') : value;
};


},{"has-boxed-string-x":7,"is-string":23}],33:[function(_dereq_,module,exports){
/**
 * @file ToInteger converts 'argument' to an integral numeric value.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger|7.1.4 ToInteger ( argument )}
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-integer-x
 */

'use strict';

var toNumber = _dereq_('to-number-x');
var numberIsNaN = _dereq_('is-nan-x');
var numberIsFinite = _dereq_('is-finite-x');
var mathSign = _dereq_('math-sign-x');

/**
 * Converts `value` to an integer.
 *
 * @param {*} value - The value to convert.
 * @returns {number} Returns the converted integer.
 *
 * @example
 * var toInteger = require('to-integer-x');
 * toInteger(3); // 3
 * toInteger(Number.MIN_VALUE); // 0
 * toInteger(Infinity); // 1.7976931348623157e+308
 * toInteger('3'); // 3
 */
module.exports = function toInteger(value) {
  var number = toNumber(value);
  if (numberIsNaN(number)) {
    return 0;
  }

  if (number === 0 || numberIsFinite(number) === false) {
    return number;
  }

  return mathSign(number) * Math.floor(Math.abs(number));
};

},{"is-finite-x":15,"is-nan-x":19,"math-sign-x":26,"to-number-x":35}],34:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for ToLength.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tolength|7.1.15 ToLength ( argument )}
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-length-x
 */

'use strict';

var toInteger = _dereq_('to-integer-x');
var MAX_SAFE_INTEGER = _dereq_('max-safe-integer');

/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 *
 * @param {*} value - The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 * var toLength = require('to-length-x');
 * toLength(3); // 3
 * toLength(Number.MIN_VALUE); // 0
 * toLength(Infinity); // Number.MAX_SAFE_INTEGER
 * toLength('3'); // 3
 */
module.exports = function toLength(value) {
  var len = toInteger(value);
  // includes converting -0 to +0
  if (len <= 0) {
    return 0;
  }

  if (len > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }

  return len;
};

},{"max-safe-integer":27,"to-integer-x":33}],35:[function(_dereq_,module,exports){
/**
 * @file Converts argument to a value of type Number.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-number-x
 */

'use strict';

var toPrimitive = _dereq_('to-primitive-x');
var trim = _dereq_('trim-x');
var pStrSlice = String.prototype.slice;

var binaryRegex = /^0b[01]+$/i;
// Note that in IE 8, RegExp.prototype.test doesn't seem to exist: ie, "test" is an own property of regexes. wtf.
var test = binaryRegex.test;
var isBinary = function _isBinary(value) {
  return test.call(binaryRegex, value);
};

var octalRegex = /^0o[0-7]+$/i;
var isOctal = function _isOctal(value) {
  return test.call(octalRegex, value);
};

var nonWS = [
  '\u0085',
  '\u200b',
  '\ufffe'
].join('');

var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = function _hasNonWS(value) {
  return test.call(nonWSregex, value);
};

var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = function _isInvalidHexLiteral(value) {
  return test.call(invalidHexLiteral, value);
};

var $toNumber = function toNumber(argument) {
  var value = toPrimitive(argument, Number);
  if (typeof value === 'symbol') {
    throw new TypeError('Cannot convert a Symbol value to a number');
  }

  if (typeof value === 'string') {
    if (isBinary(value)) {
      return $toNumber(parseInt(pStrSlice.call(value, 2), 2));
    }

    if (isOctal(value)) {
      return $toNumber(parseInt(pStrSlice.call(value, 2), 8));
    }

    if (hasNonWS(value) || isInvalidHexLiteral(value)) {
      return NaN;
    }

    var trimmed = trim(value);
    if (trimmed !== value) {
      return $toNumber(trimmed);
    }
  }

  return Number(value);
};

/**
 * This method converts argument to a value of type Number.

 * @param {*} argument The argument to convert to a number.
 * @throws {TypeError} If argument is a Symbol.
 * @return {*} The argument converted to a number.
 * @example
 * var toNumber = require('to-number-x');
 *
 * toNumber('1'); // 1
 * toNumber(null); // 0
 * toNumber(true); // 1
 */
module.exports = $toNumber;

},{"to-primitive-x":37,"trim-x":42}],36:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for ToObject.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-toobject|7.1.13 ToObject ( argument )}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-object-x
 */

'use strict';

var requireObjectCoercible = _dereq_('require-object-coercible-x');

/**
 * The abstract operation ToObject converts argument to a value of
 * type Object.
 *
 * @param {*} value - The `value` to convert.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {!Object} The `value` converted to an object.
 * @example
 * var ToObject = require('to-object-x');
 *
 * ToObject(); // TypeError
 * ToObject(null); // TypeError
 * ToObject('abc'); // Object('abc')
 * ToObject(true); // Object(true)
 * ToObject(Symbol('foo')); // Object(Symbol('foo'))
 */
module.exports = function toObject(value) {
  return Object(requireObjectCoercible(value));
};

},{"require-object-coercible-x":30}],37:[function(_dereq_,module,exports){
/**
 * @file Converts a JavaScript object to a primitive value.
 * @version 1.0.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-primitive-x
 */

'use strict';

var hasSymbols = _dereq_('has-symbol-support-x');
var isPrimitive = _dereq_('is-primitive');
var isDate = _dereq_('is-date-object');
var isSymbol = _dereq_('is-symbol');
var isFunction = _dereq_('is-function-x');
var requireObjectCoercible = _dereq_('require-object-coercible-x');
var isNil = _dereq_('is-nil-x');
var isUndefined = _dereq_('validate.io-undefined');
var symToPrimitive = hasSymbols && Symbol.toPrimitive;
var symValueOf = hasSymbols && Symbol.prototype.valueOf;

var toStringOrder = ['toString', 'valueOf'];
var toNumberOrder = ['valueOf', 'toString'];
var orderLength = 2;

var ordinaryToPrimitive = function _ordinaryToPrimitive(O, hint) {
  requireObjectCoercible(O);
  if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
    throw new TypeError('hint must be "string" or "number"');
  }

  var methodNames = hint === 'string' ? toStringOrder : toNumberOrder;
  var method;
  var result;
  for (var i = 0; i < orderLength; i += 1) {
    method = O[methodNames[i]];
    if (isFunction(method)) {
      result = method.call(O);
      if (isPrimitive(result)) {
        return result;
      }
    }
  }

  throw new TypeError('No default value');
};

var getMethod = function _getMethod(O, P) {
  var func = O[P];
  if (isNil(func) === false) {
    if (isFunction(func) === false) {
      throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
    }

    return func;
  }

  return void 0;
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive

/**
 * This method converts a JavaScript object to a primitive value.
 * Note: When toPrimitive is called with no hint, then it generally behaves as
 * if the hint were Number. However, objects may over-ride this behaviour by
 * defining a @@toPrimitive method. Of the objects defined in this specification
 * only Date objects (see 20.3.4.45) and Symbol objects (see 19.4.3.4) over-ride
 * the default ToPrimitive behaviour. Date objects treat no hint as if the hint
 * were String.
 *
 * @param {*} input - The input to convert.
 * @param {constructor} [prefferedtype] - The preffered type (String or Number).
 * @throws {TypeError} If unable to convert input to a primitive.
 * @returns {string|number} The converted input as a primitive.
 * @example
 * var toPrimitive = require('to-primitive-x');
 *
 * var date = new Date(0);
 * toPrimitive(date)); // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
 * toPrimitive(date, String)); // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
 * toPrimitive(date, Number)); // 0
 */
module.exports = function toPrimitive(input, preferredType) {
  if (isPrimitive(input)) {
    return input;
  }

  var hint = 'default';
  if (arguments.length > 1) {
    if (preferredType === String) {
      hint = 'string';
    } else if (preferredType === Number) {
      hint = 'number';
    }
  }

  var exoticToPrim;
  if (hasSymbols) {
    if (symToPrimitive) {
      exoticToPrim = getMethod(input, symToPrimitive);
    } else if (isSymbol(input)) {
      exoticToPrim = symValueOf;
    }
  }

  if (isUndefined(exoticToPrim) === false) {
    var result = exoticToPrim.call(input, hint);
    if (isPrimitive(result)) {
      return result;
    }

    throw new TypeError('unable to convert exotic object to primitive');
  }

  if (hint === 'default' && (isDate(input) || isSymbol(input))) {
    hint = 'string';
  }

  return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

},{"has-symbol-support-x":8,"is-date-object":13,"is-function-x":16,"is-nil-x":20,"is-primitive":21,"is-symbol":24,"require-object-coercible-x":30,"validate.io-undefined":43}],38:[function(_dereq_,module,exports){
/**
 * @file Get an object's ES6 @@toStringTag.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring|19.1.3.6 Object.prototype.toString ( )}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-tag-x
 */

'use strict';

var isNull = _dereq_('lodash.isnull');
var isUndefined = _dereq_('validate.io-undefined');
var toStr = Object.prototype.toString;

/**
 * The `toStringTag` method returns "[object type]", where type is the
 * object type.
 *
 * @param {*} value - The object of which to get the object type string.
 * @returns {string} The object type string.
 * @example
 * var toStringTag = require('to-string-tag-x');
 *
 * var o = new Object();
 * toStringTag(o); // returns '[object Object]'
 */
module.exports = function toStringTag(value) {
  if (isNull(value)) {
    return '[object Null]';
  }

  if (isUndefined(value)) {
    return '[object Undefined]';
  }

  return toStr.call(value);
};

},{"lodash.isnull":25,"validate.io-undefined":43}],39:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for ToString.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tostring|7.1.12 ToString ( argument )}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-x
 */

'use strict';

var isSymbol = _dereq_('is-symbol');

/**
 * The abstract operation ToString converts argument to a value of type String.
 *
 * @param {*} value - The value to convert to a string.
 * @throws {TypeError} If `value` is a Symbol.
 * @returns {string} The converted value.
 * @example
 * var $toString = require('to-string-x');
 *
 * $toString(); // 'undefined'
 * $toString(null); // 'null'
 * $toString('abc'); // 'abc'
 * $toString(true); // 'true'
 * $toString(Symbol('foo')); // TypeError
 * $toString(Symbol.iterator); // TypeError
 * $toString(Object(Symbol.iterator)); // TypeError
 */
module.exports = function ToString(value) {
  if (isSymbol(value)) {
    throw new TypeError('Cannot convert a Symbol value to a string');
  }

  return String(value);
};

},{"is-symbol":24}],40:[function(_dereq_,module,exports){
/**
 * @file This method removes whitespace from the left end of a string.
 * @version 1.3.5
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-left-x
 */

'use strict';

var $toString = _dereq_('to-string-x');
var reLeft = new RegExp('^[' + _dereq_('white-space-x').string + ']+');

/**
 * This method removes whitespace from the left end of a string.
 *
 * @param {string} string - The string to trim the left end whitespace from.
 * @returns {undefined|string} The left trimmed string.
 * @example
 * var trimLeft = require('trim-left-x');
 *
 * trimLeft(' \t\na \t\n') === 'a \t\n'; // true
 */
module.exports = function trimLeft(string) {
  return $toString(string).replace(reLeft, '');
};

},{"to-string-x":39,"white-space-x":44}],41:[function(_dereq_,module,exports){
/**
 * @file This method removes whitespace from the right end of a string.
 * @version 1.3.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-right-x
 */

'use strict';

var $toString = _dereq_('to-string-x');
var reRight = new RegExp('[' + _dereq_('white-space-x').string + ']+$');

/**
 * This method removes whitespace from the right end of a string.
 *
 * @param {string} string - The string to trim the right end whitespace from.
 * @returns {undefined|string} The right trimmed string.
 * @example
 * var trimRight = require('trim-right-x');
 *
 * trimRight(' \t\na \t\n') === ' \t\na'; // true
 */
module.exports = function trimRight(string) {
  return $toString(string).replace(reRight, '');
};

},{"to-string-x":39,"white-space-x":44}],42:[function(_dereq_,module,exports){
/**
 * @file This method removes whitespace from the left and right end of a string.
 * @version 1.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-x
 */

'use strict';

var trimLeft = _dereq_('trim-left-x');
var trimRight = _dereq_('trim-right-x');

/**
 * This method removes whitespace from the left and right end of a string.
 *
 * @param {string} string - The string to trim the whitespace from.
 * @returns {undefined|string} The trimmed string.
 * @example
 * var trim = require('trim-x');
 *
 * trim(' \t\na \t\n') === 'a'; // true
 */
module.exports = function trim(string) {
  return trimLeft(trimRight(string));
};

},{"trim-left-x":40,"trim-right-x":41}],43:[function(_dereq_,module,exports){
/**
*
*	VALIDATE: undefined
*
*
*	DESCRIPTION:
*		- Validates if a value is undefined.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isUndefined( value )
*	Validates if a value is undefined.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is undefined
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;

},{}],44:[function(_dereq_,module,exports){
/**
 * @file List of ECMAScript5 white space characters.
 * @version 2.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module white-space-x
 */

'use strict';

/**
 * An array of the ES5 whitespace char codes, string, and their descriptions.
 *
 * @name list
 * @type Array.<Object>
 * @example
 * var whiteSpace = require('white-space-x');
 * whiteSpaces.list.foreach(function (item) {
 *   console.log(lib.description, item.code, item.string);
 * });
 */
var list = [
  {
    code: 0x0009,
    description: 'Tab',
    string: '\u0009'
  },
  {
    code: 0x000a,
    description: 'Line Feed',
    string: '\u000a'
  },
  {
    code: 0x000b,
    description: 'Vertical Tab',
    string: '\u000b'
  },
  {
    code: 0x000c,
    description: 'Form Feed',
    string: '\u000c'
  },
  {
    code: 0x000d,
    description: 'Carriage Return',
    string: '\u000d'
  },
  {
    code: 0x0020,
    description: 'Space',
    string: '\u0020'
  },
  /*
  {
    code: 0x0085,
    description: 'Next line - Not ES5 whitespace',
    string: '\u0085'
  }
  */
  {
    code: 0x00a0,
    description: 'No-break space',
    string: '\u00a0'
  },
  {
    code: 0x1680,
    description: 'Ogham space mark',
    string: '\u1680'
  },
  {
    code: 0x180e,
    description: 'Mongolian vowel separator',
    string: '\u180e'
  },
  {
    code: 0x2000,
    description: 'En quad',
    string: '\u2000'
  },
  {
    code: 0x2001,
    description: 'Em quad',
    string: '\u2001'
  },
  {
    code: 0x2002,
    description: 'En space',
    string: '\u2002'
  },
  {
    code: 0x2003,
    description: 'Em space',
    string: '\u2003'
  },
  {
    code: 0x2004,
    description: 'Three-per-em space',
    string: '\u2004'
  },
  {
    code: 0x2005,
    description: 'Four-per-em space',
    string: '\u2005'
  },
  {
    code: 0x2006,
    description: 'Six-per-em space',
    string: '\u2006'
  },
  {
    code: 0x2007,
    description: 'Figure space',
    string: '\u2007'
  },
  {
    code: 0x2008,
    description: 'Punctuation space',
    string: '\u2008'
  },
  {
    code: 0x2009,
    description: 'Thin space',
    string: '\u2009'
  },
  {
    code: 0x200a,
    description: 'Hair space',
    string: '\u200a'
  },
  /*
  {
    code: 0x200b,
    description: 'Zero width space - Not ES5 whitespace',
    string: '\u200b'
  },
  */
  {
    code: 0x2028,
    description: 'Line separator',
    string: '\u2028'
  },
  {
    code: 0x2029,
    description: 'Paragraph separator',
    string: '\u2029'
  },
  {
    code: 0x202f,
    description: 'Narrow no-break space',
    string: '\u202f'
  },
  {
    code: 0x205f,
    description: 'Medium mathematical space',
    string: '\u205f'
  },
  {
    code: 0x3000,
    description: 'Ideographic space',
    string: '\u3000'
  },
  {
    code: 0xfeff,
    description: 'Byte Order Mark',
    string: '\ufeff'
  }
];

var string = '';
var length = list.length;
for (var i = 0; i < length; i += 1) {
  string += list[i].string;
}

/**
 * A string of the ES5 whitespace characters.
 *
 * @name string
 * @type string
 * @example
 * var whiteSpace = require('white-space-x');
 * var characters = [
 *   '\u0009',
 *   '\u000a',
 *   '\u000b',
 *   '\u000c',
 *   '\u000d',
 *   '\u0020',
 *   '\u00a0',
 *   '\u1680',
 *   '\u180e',
 *   '\u2000',
 *   '\u2001',
 *   '\u2002',
 *   '\u2003',
 *   '\u2004',
 *   '\u2005',
 *   '\u2006',
 *   '\u2007',
 *   '\u2008',
 *   '\u2009',
 *   '\u200a',
 *   '\u2028',
 *   '\u2029',
 *   '\u202f',
 *   '\u205f',
 *   '\u3000',
 *   '\ufeff'
 * ];
 * var ws = characters.join('');
 * var re1 = new RegExp('^[' + whiteSpace.string + ']+$)');
 * re1.test(ws); // true
 */
module.exports = {
  list: list,
  string: string
};

},{}]},{},[1])(1)
});