import powerSet from '../src/power-set-x';

const returnArgs = function() {
  /* eslint-disable-next-line prefer-rest-params */
  return arguments;
};

describe('powerSet', function() {
  let a;
  let b;
  let c;

  /* eslint-disable-next-line jest/no-hooks */
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
    expect.assertions(11);
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
    expect.assertions(2);
    expect(powerSet([1, 2, 3])).toStrictEqual([[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]);

    expect(powerSet([a, b, c])).toStrictEqual([[], [c], [b], [b, c], [a], [a, c], [a, b], [a, b, c]]);
  });

  it('object', function() {
    expect.assertions(2);
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
    expect.assertions(2);
    expect(powerSet(returnArgs(1, 2, 3))).toStrictEqual([[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]);

    expect(powerSet(returnArgs(a, b, c))).toStrictEqual([[], [c], [b], [b, c], [a], [a, c], [a, b], [a, b, c]]);
  });

  it('string', function() {
    expect.assertions(1);
    expect(powerSet('abc')).toStrictEqual([[], ['c'], ['b'], ['b', 'c'], ['a'], ['a', 'c'], ['a', 'b'], ['a', 'b', 'c']]);
  });
});
