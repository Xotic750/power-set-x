/**
 * @file Calculates the Power Set of a set S.
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module power-set-x
 */

'use strict';

var isArrayLike = require('is-array-like-x');
var isString = require('is-string');
var forEach = require('for-each');
var slice = require('array-slice-x');

/**
 * In mathematics, the power set (or powerset) of any set S,
 * written P(S), ℘(S), P(S), ℙ(S) or 2S, is the set of all subsets of S,
 * including the empty set and S itself.
 *
 * @private
 * @param {Array} value - The array like `value` to get the power set of.
 * @returns {Array.<Array>} The power set of `value`.
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
 * In mathematics, the power set (or powerset) of any set S,
 * written P(S), ℘(S), P(S), ℙ(S) or 2S, is the set of all subsets of S,
 * including the empty set and S itself.
 *
 * @param {Array} value - The array like `value` to get the power set of.
 * @returns {Array.<Array>} The power set of `value`.
 * @see http://en.wikipedia.org/wiki/Power_set
 */
module.exports = pSet;
