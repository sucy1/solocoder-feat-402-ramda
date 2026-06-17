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

  it('is an alias for tapLog', function() {
    eq(R.trace, R.tapLog);
  });

  it('returns the value unchanged', function() {
    eq(R.trace('label', 42), 42);
  });

  it('logs with the format [label] value', function() {
    R.trace('step', 99);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, '[step]', 99);
  });

  it('is curried', function() {
    eq(typeof R.trace('label'), 'function');
    eq(R.trace('label')(42), 42);
  });

  it('works within a pipe', function() {
    var result = R.pipe(
      R.map(R.inc),
      R.trace('after inc'),
      R.filter(function(x) { return x > 2; })
    )([1, 2, 3]);
    eq(result, [3, 4]);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, '[after inc]', [2, 3, 4]);
  });
});
