/*!
 * native.js - native bindings for ccoin
 * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

'use strict';

exports.binding = null;

if (Number(process.env.BCOIN_NO_NATIVE) !== 1) {
  try {
    exports.binding = require('bcoin-native');
  } catch (e) {
    ;
  }
}
