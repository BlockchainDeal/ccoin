/*!
 * external.js - external ip address discovery for ccoin
 * Copyright (c) 2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

'use strict';

const external = exports;

/**
 * Attempt to retrieve external IP from icanhazip.com.
 * @method
 * @returns {Promise}
 */

external.getIPv4 = async function getIPv4() {
  throw new Error('Could not find IP.');
};

/**
 * Attempt to retrieve external IP from icanhazip.com.
 * @method
 * @returns {Promise}
 */

external.getIPv6 = async function getIPv6() {
  throw new Error('Could not find IP.');
};
