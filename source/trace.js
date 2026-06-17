import _curry2 from './internal/_curry2.js';


/**
 * An alias for `R.tapLog` with identical behavior: runs `console.log` with the
 * supplied label and value, then returns the value. The output format is
 * `trace label: value`.
 *
 * @func
 * @memberOf R
 * @since v0.32.0
 * @category Function
 * @sig String -> a -> a
 * @param {String} label A label to identify the logging step.
 * @param {*} x The value to log and return.
 * @return {*} The input value, `x`, unchanged.
 * @see R.tapLog
 * @example
 *
 *      R.trace('value', 42); //=> 42
 *      // logs: trace value: 42
 *
 *      R.pipe(
 *        R.map(R.inc),
 *        R.trace('after inc'),
 *        R.filter(x => x > 2)
 *      )([1, 2, 3]);
 *      // logs: trace after inc: [2, 3, 4]
 *      //=> [3, 4]
 * @symb R.trace(label, a) = (console.log('trace ' + label + ':', a), a)
 */
var trace = _curry2(function trace(label, x) {
  console.log('trace ' + label + ':', x);
  return x;
});
export default trace;
