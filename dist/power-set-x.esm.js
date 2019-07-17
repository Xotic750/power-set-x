function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import isArrayLike from 'is-array-like-x';
import forEach from 'array-for-each-x';
import slice from 'array-slice-x';
var aPop = [].pop;
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

var powerSet = function powerSet(value) {
  var _this = this;

  var val = [];

  if (isArrayLike(value)) {
    if (value.length < 1) {
      val[0] = [];
    } else {
      var object = slice(value);
      var lastElement = aPop.call(object);
      forEach(powerSet(object), function (item, index, oSet) {
        _newArrowCheck(this, _this);

        var entry = item;
        val[val.length] = entry;
        entry = slice(entry);
        oSet[index] = entry;
        entry[entry.length] = lastElement;
        val[val.length] = entry;
      }.bind(this));
    }
  } else {
    val[0] = [];
  }

  return val;
};

export default powerSet;

//# sourceMappingURL=power-set-x.esm.js.map