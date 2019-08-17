import isArrayLike from 'is-array-like-x';
import forEach from 'array-for-each-x';
import slice from 'array-slice-x';
import methodize from 'simple-methodize-x';

const aPop = methodize([].pop);

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
const powerSet = function powerSet(value) {
  const val = [];

  if (isArrayLike(value)) {
    if (value.length < 1) {
      val[0] = [];
    } else {
      const object = slice(value);
      const lastElement = aPop(object);
      forEach(powerSet(object), function iteratee(item, index, oSet) {
        let entry = item;
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

export default powerSet;
