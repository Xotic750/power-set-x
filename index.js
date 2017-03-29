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
 * Requires ES3 or above.
 *
 * @version 1.2.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module power-set-x
 */

/* eslint strict: 1, max-statements: 1 */

/* global module */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var isArrayLike = require('is-array-like-x');
  var isString = require('is-string');
  var forEach = require('foreach');
  var slice = require('lodash._slice');

  /**
   * The Power Set method.
   *
   * @private
   * @param {Array} value The array like `value` to get the power set of.
   * @return {Array.<Array>} The power set of `value`.
   */
  var pSet = function powerSet(value) {
    var val = [];
    if (isArrayLike(value)) {
      if (value.length < 1) {
        val.push([]);
      } else {
        var lastElement;
        var object;
        if (isString(value)) {
          lastElement = value.charAt(value.length - 1);
          object = value.slice(0, -1);
        } else {
          object = slice(value);
          lastElement = object.pop();
        }
        forEach(pSet(object), function (item, index, oSet) {
          var entry = item;
          val.push(entry);
          entry = entry.slice();
          oSet[index] = entry;
          entry.push(lastElement);
          val.push(entry);
        });
      }
    } else {
      val.push([]);
    }
    return val;
  };

  /**
   * This method calculates the Power Set of `value`. Array sparseness is
   * ignored.
   *
   * @param {Array} value The array like `value` to get the power set of.
   * @return {Array.<Array>} The power set of `value`.
   * @see http://en.wikipedia.org/wiki/Power_set
   */
  module.exports = pSet;
}());
