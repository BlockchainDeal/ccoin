/*!
 * db/index.js - data management for ccoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

'use strict';

/**
 * @module db
 */

exports.backends = require('./backends');
exports.LDB = require('./ldb');
exports.LowlevelUp = require('./lowlevelup');
exports.MemDB = require('./memdb');
