<a name="module_power-set-x"></a>
## power-set-x
<a href="https://travis-ci.org/Xotic750/power-set-x"
title="Travis status">
<img src="https://travis-ci.org/Xotic750/power-set-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/power-set-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/power-set-x.svg"
alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/power-set-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/power-set-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/power-set-x" title="npm version">
<img src="https://badge.fury.io/js/power-set-x.svg"
alt="npm version" height="18">
</a>

powerSet module. In mathematics, the power set (or powerset) of any set S,
written P(S), ℘(S), P(S), ℙ(S) or 2S, is the set of all subsets of S,
including the empty set and S itself.

<h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
`es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
methods that can be faithfully emulated with a legacy JavaScript engine.

`es5-sham.js` monkey-patches other ES5 methods as closely as possible.
For these methods, as closely as possible to ES5 is not very close.
Many of these shams are intended only to allow code to be written to ES5
without causing run-time errors in older engines. In many cases,
this means that these shams cause many ES5 methods to silently fail.
Decide carefully whether this is what you want. Note: es5-sham.js requires
es5-shim.js to be able to work properly.

`json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.

`es6.shim.js` provides compatibility shims so that legacy JavaScript engines
behave as closely as possible to ECMAScript 6 (Harmony).

**Version**: 1.0.5  
**Author:** Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_power-set-x--module.exports"></a>
### `module.exports` ⇒ <code>Array.&lt;Array&gt;</code> ⏏
This method calculates the Power Set of `value`. Array sparseness is
ignored.

**Kind**: Exported member  
**Returns**: <code>Array.&lt;Array&gt;</code> - The power set of `value`.  
**See**: http://en.wikipedia.org/wiki/Power_set  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Array</code> | The array like `value` to get the power set of. |

