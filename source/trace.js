import tapLog from './tapLog.js';


/**
 * An alias for `R.tapLog`. Runs `console.log` with the supplied label and value,
 * then returns the value. The output format is `[label] value`.
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
 *      // logs: [value] 42
 *
 *      R.pipe(
 *        R.map(R.inc),
 *        R.trace('after inc'),
 *        R.filter(x => x > 2)
 *      )([1, 2, 3]);
 *      // logs: [after inc] [2, 3, 4]
 *      //=> [3, 4]
 * @symb R.trace(label, a) = (console.log('[' + label + ']', a), a)
 */
var trace = tapLog;
export default trace;
