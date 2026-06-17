import _curry2 from './internal/_curry2.js';


/**
 * Runs `console.log` with the supplied label and value, then returns the value.
 *
 * Useful for debugging within a pipeline, allowing inspection of intermediate
 * values without breaking the chain. The output format is `[label] value`.
 *
 * @func
 * @memberOf R
 * @since v0.32.0
 * @category Function
 * @sig String -> a -> a
 * @param {String} label A label to identify the logging step.
 * @param {*} x The value to log and return.
 * @return {*} The input value, `x`, unchanged.
 * @example
 *
 *      R.tapLog('value', 42); //=> 42
 *      // logs: [value] 42
 *
 *      R.pipe(
 *        R.map(R.inc),
 *        R.tapLog('after inc'),
 *        R.filter(x => x > 2)
 *      )([1, 2, 3]);
 *      // logs: [after inc] [2, 3, 4]
 *      //=> [3, 4]
 * @symb R.tapLog(label, a) = (console.log('[' + label + ']', a), a)
 */
var tapLog = _curry2(function tapLog(label, x) {
  console.log('[' + label + ']', x);
  return x;
});
export default tapLog;
