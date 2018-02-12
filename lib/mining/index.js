/*!
 * mining/index.js - mining infrastructure for ccoin
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

'use strict';

/**
 * @module mining
 */

exports.common = require('./common');
exports.CPUMiner = require('./cpuminer');
exports.mine = require('./mine');
exports.Miner = require('./miner');
exports.BlockTemplate = require('./template');
