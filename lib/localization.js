/*
  knockback-localization.js 0.18.4
  (c) 2011-2013 Kevin Malakoff - http://kmalakoff.github.com/knockback/
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
  Dependencies: Knockout.js, Backbone.js, and Underscore.js.
*/
(function() {
  return (function(factory) {
    if (typeof exports == 'object') {
      module.exports = module.exports = factory.call(this, require);
    } else if (typeof define == 'function' && define.amd) {
      define(['require', 'underscore', 'backbone', 'knockout', 'knockback'], factory);
    } else {
      this.kb = factory.call(this, (typeof require !== 'undefined') ? require : undefined);
    }
  })(function(require) {// Generated by CoffeeScript 1.7.1
var kb, ko, _, _publishMethods, _unwrapObservable;

kb = this.kb || require('knockback');

_ = kb._;

ko = kb.ko;

_unwrapObservable = ko.utils.unwrapObservable;


/*
  knockback-extensions.js (knockback-localization)
  (c) 2011-2013 Kevin Malakoff.
  Knockback.js is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
  Dependencies: Knockout.js, Backbone.js, and Underscore.js.
    Optional dependency: Backbone.ModelRef.js.
 */

kb.locale_manager = void 0;


/*
  knockback-localized-observable.js 0.18.4
  (c) 2011-2013 Kevin Malakoff.
  Knockback.LocalizedObservable is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
 */

_publishMethods = kb._publishMethods;

kb.LocalizedObservable = (function() {
  LocalizedObservable.extend = kb.extend;

  function LocalizedObservable(value, options, vm) {
    var observable;
    this.value = value;
    this.vm = vm;
    options || (options = {});
    this.vm || (this.vm = {});
    this.read || _throwMissing(this, 'read');
    kb.locale_manager || _throwMissing(this, 'kb.locale_manager');
    this.__kb || (this.__kb = {});
    this.__kb._onLocaleChange = _.bind(this._onLocaleChange, this);
    this.__kb._onChange = options.onChange;
    if (this.value) {
      value = _unwrapObservable(this.value);
    }
    this.vo = ko.observable(!value ? null : this.read(value, null));
    observable = kb.utils.wrappedObservable(this, ko.dependentObservable({
      read: (function(_this) {
        return function() {
          if (_this.value) {
            _unwrapObservable(_this.value);
          }
          _this.vo();
          return _this.read(_unwrapObservable(_this.value));
        };
      })(this),
      write: (function(_this) {
        return function(value) {
          _this.write || _throwUnexpected(_this, 'writing to read-only');
          _this.write(value, _unwrapObservable(_this.value));
          _this.vo(value);
          if (_this.__kb._onChange) {
            return _this.__kb._onChange(value);
          }
        };
      })(this),
      owner: this.vm
    }));
    _publishMethods(observable, this, ['destroy', 'observedValue', 'resetToCurrent']);
    kb.locale_manager.bind('change', this.__kb._onLocaleChange);
    if (options.hasOwnProperty('default')) {
      observable = kb.DefaultObservable && ko.defaultObservable(observable, options["default"]);
    }
    return observable;
  }

  LocalizedObservable.prototype.destroy = function() {
    kb.locale_manager.unbind('change', this.__kb._onLocaleChange);
    this.vm = null;
    return kb.utils.wrappedDestroy(this);
  };

  LocalizedObservable.prototype.resetToCurrent = function() {
    var current_value, observable;
    observable = kb.utils.wrappedObservable(this);
    current_value = this.value ? this.read(_unwrapObservable(this.value)) : null;
    if (observable() === current_value) {
      return;
    }
    return observable(current_value);
  };

  LocalizedObservable.prototype.observedValue = function(value) {
    if (arguments.length === 0) {
      return this.value;
    }
    this.value = value;
    this._onLocaleChange();
  };

  LocalizedObservable.prototype._onLocaleChange = function() {
    var value;
    value = this.read(_unwrapObservable(this.value));
    this.vo(value);
    if (this.__kb._onChange) {
      return this.__kb._onChange(value);
    }
  };

  return LocalizedObservable;

})();

kb.localizedObservable = function(value, options, view_model) {
  return new kb.LocalizedObservable(value, options, view_model);
};
; return kb;});
}).call(this);
