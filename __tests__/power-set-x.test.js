let powerSet;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  powerSet = require('../../index.js');
} else {
  powerSet = returnExports;
}

const returnArgs = function() {
  return arguments;
};

describe('powerSet', function() {
  let a;
  let b;
  let c;
  beforeEach(function() {
    a = 'abc';
    b = returnArgs(1, 2, 3);
    c = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
    };
  });

  it('primitives/non array-like', function() {
    const expected = [[]];
    expect(powerSet()).toStrictEqual(expected);
    expect(powerSet(undefined)).toStrictEqual(expected);
    expect(powerSet(null)).toStrictEqual(expected);
    expect(powerSet(1)).toStrictEqual(expected);
    expect(powerSet(true)).toStrictEqual(expected);
    expect(
      powerSet(function test(x, y) {
        return [x, y];
      }),
    ).toStrictEqual(expected);
    expect(powerSet([])).toStrictEqual(expected);
    expect(powerSet({length: 0})).toStrictEqual(expected);
    expect(powerSet(returnArgs())).toStrictEqual(expected);
    expect(powerSet(new Date())).toStrictEqual(expected);
    expect(powerSet(/pattern/g)).toStrictEqual(expected);
  });

  it('array', function() {
    expect(powerSet([1, 2, 3])).toStrictEqual([[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]);

    expect(powerSet([a, b, c])).toStrictEqual([[], [c], [b], [b, c], [a], [a, c], [a, b], [a, b, c]]);
  });

  it('object', function() {
    expect(
      powerSet({
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      }),
    ).toStrictEqual([[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]);

    expect(
      powerSet({
        0: a,
        1: b,
        2: c,
        length: 3,
      }),
    ).toStrictEqual([[], [c], [b], [b, c], [a], [a, c], [a, b], [a, b, c]]);
  });

  it('arguments', function() {
    expect(powerSet(returnArgs(1, 2, 3))).toStrictEqual([[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]);

    expect(powerSet(returnArgs(a, b, c))).toStrictEqual([[], [c], [b], [b, c], [a], [a, c], [a, b], [a, b, c]]);
  });

  it('string', function() {
    expect(powerSet('abc')).toStrictEqual([[], ['c'], ['b'], ['b', 'c'], ['a'], ['a', 'c'], ['a', 'b'], ['a', 'b', 'c']]);
  });
});
