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

  it('logs with the format [label] value', function() {
    R.tapLog('step', 42);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, '[step]', 42);
  });

  it('logs with different labels independently', function() {
    R.tapLog('first', 1);
    R.tapLog('second', 2);
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, '[first]', 1);
    sinon.assert.calledWith(spy, '[second]', 2);
  });

  it('is curried', function() {
    eq(typeof R.tapLog('label'), 'function');
    eq(R.tapLog('label')(42), 42);
  });

  it('returns a curried function that logs when applied', function() {
    var logged = R.tapLog('curried');
    eq(logged(100), 100);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, '[curried]', 100);
  });

  it('works within a pipe', function() {
    var result = R.pipe(
      R.map(R.inc),
      R.tapLog('after inc'),
      R.filter(function(x) { return x > 2; })
    )([1, 2, 3]);
    eq(result, [3, 4]);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, '[after inc]', [2, 3, 4]);
  });

  it('preserves undefined and null values', function() {
    eq(R.tapLog('nil', undefined), undefined);
    eq(R.tapLog('nil', null), null);
  });
});
