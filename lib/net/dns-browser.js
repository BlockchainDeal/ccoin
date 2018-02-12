/*!
 * dns.js - dns backend for ccoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

'use strict';

/**
 * Resolve host (no getaddrinfo).
 * @ignore
 * @param {String} host
 * @param {String?} proxy - Tor socks proxy.
 * @returns {Promise}
 */

exports.resolve = function resolve(host, proxy) {
  return new Promise((resolve, reject) => {
    reject(new Error('DNS not supported.'));
  });
};

/**
 * Resolve host (getaddrinfo).
 * @ignore
 * @param {String} host
 * @param {String?} proxy - Tor socks proxy.
 * @returns {Promise}
 */

exports.lookup = function lookup(host, proxy) {
  return new Promise((resolve, reject) => {
    reject(new Error('DNS not supported.'));
  });
};
