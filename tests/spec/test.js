/* jslint maxlen:80, es6:true, white:true */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
   freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
   nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
   es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
   maxstatements:12, maxcomplexity:4 */

/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1, max-statements-per-line: 1 */

/* global JSON:true, expect, module, require, describe, it, beforeEach,
   returnExports */

;(function () { // eslint-disable-line no-extra-semi

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
    var es7 = require('es7-shim');
    Object.keys(es7).forEach(function (key) {
      var obj = es7[key];
      if (typeof obj.shim === 'function') {
        obj.shim();
      }
    });
    powerSet = require('../../index.js');
  } else {
    powerSet = returnExports;
  }

  var returnArgs = function () {
    return arguments;
  };

  describe('powerSet', function () {
    var a, b, c;
    beforeEach(function () {
      a = 'abc';
      b = returnArgs(1, 2, 3);
      c = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
      };
    });

    it('primitives/non array-like', function () {
      var expected = [
        []
      ];
      expect(powerSet()).toEqual(expected);
      expect(powerSet(undefined)).toEqual(expected);
      expect(powerSet(null)).toEqual(expected);
      expect(powerSet(1)).toEqual(expected);
      expect(powerSet(true)).toEqual(expected);
      /* jslint unused:false */
      expect(powerSet(function test(x, y) { return [x, y]; })).toEqual(expected);
      /* jslint unused:true */
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

      expect(powerSet([a, b, c])).toEqual([
        [],
        [c],
        [b],
        [b, c],
        [a],
        [a, c],
        [a, b],
        [a, b, c]
      ]);
    });

    it('object', function () {
      expect(powerSet({
        0: 1,
        1: 2,
        2: 3,
        length: 3
      })).toEqual([
        [],
        [3],
        [2],
        [2, 3],
        [1],
        [1, 3],
        [1, 2],
        [1, 2, 3]
      ]);

      expect(powerSet({
        0: a,
        1: b,
        2: c,
        length: 3
      })).toEqual([
        [],
        [c],
        [b],
        [b, c],
        [a],
        [a, c],
        [a, b],
        [a, b, c]
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

      expect(powerSet(returnArgs(a, b, c))).toEqual([
        [],
        [c],
        [b],
        [b, c],
        [a],
        [a, c],
        [a, b],
        [a, b, c]
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
