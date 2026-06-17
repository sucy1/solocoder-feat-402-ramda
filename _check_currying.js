var R = require('./source/index.js');

console.log('=== R.tap (reference) ===');
console.log('typeof R.tap:', typeof R.tap);
console.log('R.tap.length:', R.tap.length);
console.log('R.tap.name:', R.tap.name);
console.log('R.tap() === R.tap:', R.tap() === R.tap);
var partialTap = R.tap(function(){});
console.log('typeof R.tap(fn):', typeof partialTap);
console.log('R.tap(fn).length:', partialTap.length);
console.log('R.tap(R.__).length:', R.tap(R.__).length);

console.log();
console.log('=== R.tapLog ===');
console.log('typeof R.tapLog:', typeof R.tapLog);
console.log('R.tapLog.length:', R.tapLog.length);
console.log('R.tapLog.name:', R.tapLog.name);
console.log('R.tapLog() === R.tapLog:', R.tapLog() === R.tapLog);
var partialTapLog = R.tapLog('label');
console.log('typeof R.tapLog(label):', typeof partialTapLog);
console.log('R.tapLog(label).length:', partialTapLog.length);
console.log('R.tapLog(R.__).length:', R.tapLog(R.__).length);

console.log();
console.log('=== R.trace ===');
console.log('typeof R.trace:', typeof R.trace);
console.log('R.trace.length:', R.trace.length);
console.log('R.trace.name:', R.trace.name);
console.log('R.trace() === R.trace:', R.trace() === R.trace);
console.log('R.trace === R.tapLog:', R.trace === R.tapLog);
var partialTrace = R.trace('label');
console.log('R.trace(label).length:', partialTrace.length);

console.log();
console.log('=== Curried result identity check ===');
console.log('partialTapLog === R.tapLog(label):', partialTapLog === R.tapLog('label'));
console.log('partialTapLog(1) === 1:', partialTapLog(1) === 1);

console.log();
console.log('=== R.add partial identity (reference) ===');
var add2a = R.add(2);
var add2b = R.add(2);
console.log('R.add(2) === R.add(2):', add2a === add2b);
console.log('R.add(2)(3):', R.add(2)(3));

console.log();
console.log('=== R.tap partial identity (reference) ===');
var fn = function(){};
var tapFnA = R.tap(fn);
var tapFnB = R.tap(fn);
console.log('R.tap(fn) === R.tap(fn):', tapFnA === tapFnB);

console.log();
console.log('=== Pipe integration ===');
var result = R.pipe(
  R.map(R.inc),
  R.tapLog('after inc'),
  R.trace('after inc via trace'),
  R.filter(function(x) { return x > 2; })
)([1, 2, 3]);
console.log('pipe result:', result);
