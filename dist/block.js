;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);
  var index = path + '/index.js';

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
  }

  if (require.aliases.hasOwnProperty(index)) {
    return require.aliases[index];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("block/index.js", function(exports, require, module){
var regex = /(\{\{\s*\w+\s*\}\})/

module.exports = Block

function Block(string) {
  if (!(this instanceof Block))
    return new Block(string)

  var blocks = this.blocks = string.split(regex)
  var names = this.names = {}

  var block

  for (var i = 0, l = blocks.length; i < l; i++)
    if (regex.test(block = blocks[i]))
      names[i] = block.match(/(\w+)/)[0]
}

Block.prototype.local = function (name, value) {
  var names = this.names
  var j

  for (var i in names)
    if (names[i] === name && names.hasOwnProperty(i))
      j = i

  if (j == null)
    throw new Error('Name ' + name + ' is not defined.')

  delete names[j]
  this.blocks[j] = value || ''

  return this
}

Block.prototype.locals = function (object) {
  for (var name in object)
    if (object.hasOwnProperty(name))
      this.local(name, object[name])

  return this
}

Block.prototype.render = function (locals) {
  locals = locals || {}

  var blocks = this.blocks
  var names = this.names

  var html = ''
  var name

  for (var i = 0, l = blocks.length; i < l; i++)
    html += (name = names[i]) ? locals[name] : blocks[i]

  return html
}

// Node only!
try {
  var fs = require('fs')

  Block.read = function (filename, minify) {
    var string = fs.readFileSync(filename, 'utf8')
    return new Block(minify ? string.replace(/\n\s*/g, '') : string)
  }
} catch (err) {}

});
require.alias("block/index.js", "block/index.js");

if (typeof exports == "object") {
  module.exports = require("block");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("block"); });
} else {
  this["block"] = require("block");
}})();