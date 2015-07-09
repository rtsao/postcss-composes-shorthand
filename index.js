'use strict';

var postcss = require('postcss');

function isString(foo) {
  return typeof foo === 'string';
}

function isObject(foo) {
  return typeof foo === 'object' && foo !== null;
}

function moduleReducer(acc, module) {
  if (isString(module)) {
    acc[module] = module;
  } else if (isObject(module)) {
    if (!isString(module.shorthand) || !isString(module.name)) {
      throw new Error('module object: ' + module
        + ' must specify `shorthand` and `name` properties.');
    }
    acc[module.shorthand] = module.name;
  } else {
    throw new Error('module definition: `' + module
      + '` expected to be a string or object.');
  }
  return acc;
}

module.exports = postcss.plugin('postcss-composes-shorthand', function (opts) {

  opts = opts || {};

  // if (!opts.modules) {
  //   throw new Error('`modules` option is required.');
  // }
  // Replace below with above when PostCSS issue #415 is resolved
  opts.modules = opts.modules || [];

  if (!Array.isArray(opts.modules)) {
    throw new Error('`modules` option must be an array.');
  }

  var modules = opts.modules.reduce(moduleReducer, {});

  var declHandler = function (decl) {
    if (modules.hasOwnProperty(decl.prop)) {
      decl.cloneBefore({
        prop: 'composes',
        value: decl.value + ' from ' + '"' + modules[decl.prop] + '"'
      });
      decl.removeSelf();
    }
  };

  return function (css) {
    css.eachDecl(declHandler);
  };
});
