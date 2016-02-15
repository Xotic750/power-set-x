/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/power-set-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/power-set-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/power-set-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/power-set-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/power-set-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/power-set-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/power-set-x" title="npm version">
 * <img src="https://badge.fury.io/js/power-set-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * powerSet module. In mathematics, the power set (or powerset) of any set S,
 * written P(S), ℘(S), P(S), ℙ(S) or 2S, is the set of all subsets of S,
 * including the empty set and S itself.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.9
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module power-set-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:3, maxdepth:3,
  maxstatements:13, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var isArrayLike = require('is-array-like-x');
  var isString = require('is-string');
  var pPush = Array.prototype.push;
  var pPop = Array.prototype.pop;
  var pSlice = Array.prototype.slice;
  var pForEach = Array.prototype.forEach;
  var sSlice = String.prototype.slice;
  var pCharAt = String.prototype.charAt;

  /**
   * The Power Set method.
   *
   * @private
   * @param {Array} value The array like `value` to get the power set of.
   * @return {Array.<Array>} The power set of `value`.
   */
  function powerSet(value) {
    var val = [];
    if (isArrayLike(value)) {
      if (value.length < 1) {
        pPush.call(val, []);
      } else {
        var lastElement, object;
        if (isString(value)) {
          lastElement = pCharAt.call(value, value.length - 1);
          object = sSlice.call(value, 0, -1);
        } else {
          object = pSlice.call(value);
          lastElement = pPop.call(object);
        }
        pForEach.call(powerSet(object), function (item, index, oSet) {
          pPush.call(val, item);
          oSet[index] = item = pSlice.call(item);
          pPush.call(item, lastElement);
          pPush.call(val, item);
        });
      }
    } else {
      pPush.call(val, []);
    }
    return val;
  }

  /**
   * This method calculates the Power Set of `value`. Array sparseness is
   * ignored.
   *
   * @param {Array} value The array like `value` to get the power set of.
   * @return {Array.<Array>} The power set of `value`.
   * @see http://en.wikipedia.org/wiki/Power_set
   */
  module.exports = powerSet;
}());
