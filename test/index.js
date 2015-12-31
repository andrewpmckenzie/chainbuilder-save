var assert = require('chai').assert;
var chainBuilder = require('chainbuilder');
var sinon = require('sinon');

describe('chainbuilder-save', function () {
  var myChain;
  beforeEach(function () {
    myChain = chainBuilder({
      methods: {
        plus: function (val, done) { done(null, this.previousResult() + val); }
      },
      mixins: [
        require('..')()
      ]
    });
  });

  it('saves and re-injects values with #save(str) and #injectSaved(str)', function (done) {
    myChain(2)
      .plus(1)
      .save('three')
      .plus(2)
      .save('five')
      .injectSaved('three')
      .plus(1)
      .tap(function (err, result) {
        if (err) return err;
        assert.equal(result, 4);
      })
      .end(done);
  });

  it('provides access to saved values via the #getSaved context method', function (done) {
    myChain(2)
      .plus(1)
      .save('three')
      .plus(1)
      .save('four')
      .plus(1)
      .tap(function (err) {
        if (err) return err;
        assert.equal(typeof this.getSaved, 'function');
        assert.equal(this.getSaved('three'), 3);
        assert.equal(this.getSaved('four'), 4);
      })
      .end(done);
  });
});
