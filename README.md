<a href="https://travis-ci.org/Xotic750/power-set-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/power-set-x.svg?branch=master"
   alt="Travis status" height="18"/>
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
   alt="npm version" height="18"/>
</a>
<a name="module_power-set-x"></a>

## power-set-x
Calculates the Power Set of a set S.

**Version**: 1.5.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_power-set-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>Array.&lt;Array&gt;</code> ⏏
This method calculates the Power Set of `value`. Array sparseness is
ignored.

In mathematics, the power set (or powerset) of any set S,
written P(S), ℘(S), P(S), ℙ(S) or 2S, is the set of all subsets of S,
including the empty set and S itself.

**Kind**: Exported function  
**Returns**: <code>Array.&lt;Array&gt;</code> - The power set of `value`.  
**See**: http://en.wikipedia.org/wiki/Power_set  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Array</code> | The array like `value` to get the power set of. |

**Example**  
```js
var powerSet = require('power-set-x');

powerSet([1, 2, 3]); // [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]
```
