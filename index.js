/**
 * @file Calculates the Power Set of a set S.
 * @version 1.5.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module power-set-x
 */

'use strict';

var isArrayLike = require('is-array-like-x');
var forEach = require('array-for-each-x');
var slice = require('array-slice-x');
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
