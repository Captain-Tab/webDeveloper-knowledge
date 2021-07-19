1. [koa-route源码](#koaRoute源码)

x. [更多信息](#更多信息)


### koa-route源码
Methos源码
```
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var http = require('http')

/**
 * Module exports.
 * @public
 */

module.exports = getCurrentNodeMethods() || getBasicNodeMethods()

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods () {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod (method) {
    return method.toLowerCase()
  })
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods () {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ]
}
```

`koa-route`源码
```
'use strict';

/**
 * Module dependencies.
 */

const pathToRegexp = require('path-to-regexp');
const debug = require('debug')('koa-route');
const methods = require('methods');

methods.forEach(function(method){
  module.exports[method] = create(method);
});

module.exports.del = module.exports.delete;
module.exports.all = create();

function create(method) {
  if (method) method = method.toUpperCase();

  return function(path, fn, opts){
    const re = pathToRegexp(path, opts);
    debug('%s %s -> %s', method || 'ALL', path, re);

    const createRoute = function(routeFunc){
      return function (ctx, next){
        // method
        if (!matches(ctx, method)) return next();

        // path
        const m = re.exec(ctx.path);
        if (m) {
          const args = m.slice(1).map(decode);
          ctx.routePath = path;
          debug('%s %s matches %s %j', ctx.method, path, ctx.path, args);
          args.unshift(ctx);
          args.push(next);
          return Promise.resolve(routeFunc.apply(ctx, args));
        }

        // miss
        return next();
      }
    };

    if (fn) {
      return createRoute(fn);
    } else {
      return createRoute;
    }
  }
}

/**
 * Decode value.
 */

function decode(val) {
  if (val) return decodeURIComponent(val);
}

/**
 * Check request method.
 */

function matches(ctx, method) {
  if (!method) return true;
  if (ctx.method === method) return true;
  if (method === 'GET' && ctx.method === 'HEAD') return true;
  return false;
}
```

### 更多信息
> [Methods](https://github.com/jshttp/methods/blob/master/index.js)

> [koa-route](https://github.com/koajs/route/blob/master/index.js)

> [koa-route 源码阅读](https://imweb.io/topic/5bbb479779ddc80f36592f5a)