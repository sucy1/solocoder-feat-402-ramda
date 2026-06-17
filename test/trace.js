var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var sinon = require('sinon');


describe('trace', function() {
  var spy;

  beforeEach(function() {
    spy = sinon.spy(console, 'log');
  });

  afterEach(function() {
    spy.restore();
  });

  it('is not the same reference as tapLog (has independent implementation)', function() {
    eq(R.trace === R.tapLog, false);
  });

  it('has the same behavior as tapLog (identical semantics)', function() {
    eq(typeof R.trace, 'function');
    eq(R.trace('label', 42), 42);
    eq(R.trace('label')(42), 42);
  });

  it('returns the value unchanged', function() {
    eq(R.trace('label', 42), 42);
    eq(R.trace('label', 'hello'), 'hello');
    eq(R.trace('label', [1, 2, 3]), [1, 2, 3]);
    eq(R.trace('label', {a: 1}), {a: 1});
  });

  it('logs with the format trace label: value (uses its own prefix)', function() {
    R.trace('step', 99);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'trace step:', 99);
  });

  it('uses a different prefix from tapLog so output can be distinguished', function() {
    R.tapLog('same-label', 1);
    R.trace('same-label', 1);
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, 'tapLog same-label:', 1);
    sinon.assert.calledWith(spy, 'trace same-label:', 1);
  });

  it('is curried', function() {
    eq(typeof R.trace('label'), 'function');
    eq(R.trace('label')(42), 42);
  });

  it('returns a curried function of arity 1 when given the label only', function() {
    var partial = R.trace('curried');
    eq(partial.length, 1);
    eq(partial(100), 100);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'trace curried:', 100);
  });

  it('returns itself when called with no arguments', function() {
    eq(R.trace(), R.trace);
  });

  it('supports the R.__ placeholder', function() {
    var f = R.trace(R.__, 42);
    eq(typeof f, 'function');
    eq(f('answer'), 42);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'trace answer:', 42);
  });

  it('works within a pipe', function() {
    var result = R.pipe(
      R.map(R.inc),
      R.trace('after inc'),
      R.filter(function(x) { return x > 2; })
    )([1, 2, 3]);
    eq(result, [3, 4]);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'trace after inc:', [2, 3, 4]);
  });
});
