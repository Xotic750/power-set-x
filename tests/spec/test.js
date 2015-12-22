/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:2,
  maxstatements:12, maxcomplexity:3 */

/*global JSON:true, expect, module, require, describe, it, returnExports */

(function () {
  'use strict';

  var powerSet;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    powerSet = require('../../index.js');
  } else {
    powerSet = returnExports;
  }

  function returnArgs() {
    return arguments;
  }

  describe('powerSet', function () {
    it('primitives/non array-like', function () {
      var expected = [[]];
      expect(powerSet()).toEqual(expected);
      expect(powerSet(undefined)).toEqual(expected);
      expect(powerSet(null)).toEqual(expected);
      expect(powerSet(1)).toEqual(expected);
      expect(powerSet(true)).toEqual(expected);
      /*jslint unused:false */
      expect(powerSet(function test(a, b) {})).toEqual(expected);
      /*jslint unused:true */
      expect(powerSet([])).toEqual(expected);
      expect(powerSet({ length: 0 })).toEqual(expected);
      expect(powerSet(returnArgs())).toEqual(expected);
      expect(powerSet(new Date())).toEqual(expected);
      expect(powerSet(/pattern/g)).toEqual(expected);
    });

    it('array', function () {
      expect(powerSet([1, 2, 3])).toEqual([
          [],
          [3],
          [2],
          [2, 3],
          [1],
          [1, 3],
          [1, 2],
          [1, 2, 3]
      ]);
    });

    it('object', function () {
      var testObject = {
        '0': 1,
        '1': 2,
        '2': 3,
        length: 3
      };
      expect(powerSet(testObject)).toEqual([
          [],
          [3],
          [2],
          [2, 3],
          [1],
          [1, 3],
          [1, 2],
          [1, 2, 3]
      ]);
    });

    it('arguments', function () {
      expect(powerSet(returnArgs(1, 2, 3))).toEqual([
          [],
          [3],
          [2],
          [2, 3],
          [1],
          [1, 3],
          [1, 2],
          [1, 2, 3]
      ]);
    });

    it('string', function () {
      expect(powerSet('abc')).toEqual([
          [],
          ['c'],
          ['b'],
          ['b', 'c'],
          ['a'],
          ['a', 'c'],
          ['a', 'b'],
          ['a', 'b', 'c']
      ]);
    });
  });
}());
