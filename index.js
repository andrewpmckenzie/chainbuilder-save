module.exports = function () {

  var save = function (name, done) {
    var value = this.previousResult();
    this.setSaved(name, value);
    done(null, value);
  };

  var injectSaved = function (name, done) {
    done(null, this.getSaved(name));
  };

  var getSaved = function (name) {
    if (!this._chainbuilderSave_savedValues) return undefined;
    return this._chainbuilderSave_savedValues[name];
  };

  var setSaved = function (name, value) {
    if (!this._chainbuilderSave_savedValues) this._chainbuilderSave_savedValues = {};
    this._chainbuilderSave_savedValues[name] = value;
  };

  getSaved.$contextMethod = true;
  setSaved.$contextMethod = true;

  return {
    save: save,
    injectSaved: injectSaved,
    getSaved: getSaved,
    setSaved: setSaved
  };
};
