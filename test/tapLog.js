var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var sinon = require('sinon');


describe('tapLog', function() {
  var spy;

  beforeEach(function() {
    spy = sinon.spy(console, 'log');
  });

  afterEach(function() {
    spy.restore();
  });

  it('returns the value unchanged', function() {
    eq(R.tapLog('label', 42), 42);
    eq(R.tapLog('label', 'hello'), 'hello');
    eq(R.tapLog('label', [1, 2, 3]), [1, 2, 3]);
    eq(R.tapLog('label', {a: 1}), {a: 1});
  });

  it('logs with the format tapLog label: value', function() {
    R.tapLog('step', 42);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'tapLog step:', 42);
  });

  it('logs with different labels independently', function() {
    R.tapLog('first', 1);
    R.tapLog('second', 2);
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, 'tapLog first:', 1);
    sinon.assert.calledWith(spy, 'tapLog second:', 2);
  });

  it('is curried', function() {
    eq(typeof R.tapLog('label'), 'function');
    eq(R.tapLog('label')(42), 42);
  });

  it('returns a curried function of arity 1 when given the label only', function() {
    var partial = R.tapLog('curried');
    eq(partial.length, 1);
    eq(partial(100), 100);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'tapLog curried:', 100);
  });

  it('can be partially applied multiple times and produces the same log', function() {
    var partial1 = R.tapLog('multi');
    var partial2 = R.tapLog('multi');
    eq(partial1(1), 1);
    eq(partial2(2), 2);
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, 'tapLog multi:', 1);
    sinon.assert.calledWith(spy, 'tapLog multi:', 2);
  });

  it('returns itself when called with no arguments', function() {
    eq(R.tapLog(), R.tapLog);
  });

  it('supports the R.__ placeholder', function() {
    var f = R.tapLog(R.__, 42);
    eq(typeof f, 'function');
    eq(f('answer'), 42);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'tapLog answer:', 42);
  });

  it('works within a pipe', function() {
    var result = R.pipe(
      R.map(R.inc),
      R.tapLog('after inc'),
      R.filter(function(x) { return x > 2; })
    )([1, 2, 3]);
    eq(result, [3, 4]);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'tapLog after inc:', [2, 3, 4]);
  });

  it('preserves undefined and null values', function() {
    eq(R.tapLog('nil', undefined), undefined);
    eq(R.tapLog('nil', null), null);
  });
});
