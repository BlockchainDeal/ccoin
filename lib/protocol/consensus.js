/*!
 * consensus.js - consensus constants and helpers for ccoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/creativechain/ccoin
 */

'use strict';

/**
 * @module protocol/consensus
 */

const assert = require('assert');
const BN = require('../crypto/bn');

/**
 * One creativecoin in satoshis.
 * @const {Amount}
 * @default
 */

exports.COIN = 100000000;

/**
 * Maximum amount of money in satoshis:
 * `21million * 1crea` (consensus).
 * @const {Amount}
 * @default
 */

exports.MAX_MONEY = 115000000 * exports.COIN;

/**
 * Base block subsidy (consensus).
 * Note to shitcoin implementors: if you
 * increase this to anything greater than
 * 33 bits, getReward will have to be
 * modified to handle the shifts.
 * @const {Amount}
 * @default
 */

exports.BASE_REWARD = 50 * exports.COIN;

/**
 * Half base block subsidy. Required to
 * calculate the reward properly (with
 * only 32 bit shifts available).
 * @const {Amount}
 * @default
 */

exports.HALF_REWARD = Math.floor(exports.BASE_REWARD / 2);

/**
 * Maximum block base size (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_BLOCK_SIZE = 4000000;

/**
 * Maximum block serialization size (protocol).
 * @const {Number}
 * @default
 */

exports.MAX_RAW_BLOCK_SIZE = 4000000;

/**
 * Maximum block weight (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_BLOCK_WEIGHT = 4000000;

/**
 * Maximum block sigops (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_BLOCK_SIGOPS = 1000000 / 50;

/**
 * Maximum block sigops cost (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_BLOCK_SIGOPS_COST = 80000;

/**
 * What bits to set in version
 * for versionbits blocks.
 * @const {Number}
 * @default
 */

exports.VERSION_TOP_BITS = 0x20000000;

/**
 * What bitmask determines whether
 * versionbits is in use.
 * @const {Number}
 * @default
 */

exports.VERSION_TOP_MASK = 0xe0000000;

/**
 * Number of blocks before a coinbase
 * spend can occur (consensus).
 * @const {Number}
 * @default
 */

exports.COINBASE_MATURITY = 8;

/**
 * Amount to multiply base/non-witness sizes by.
 * @const {Number}
 * @default
 */

exports.WITNESS_SCALE_FACTOR = 4;

/**
 * nLockTime threshold for differentiating
 * between height and time (consensus).
 * Tue Nov 5 00:53:20 1985 UTC
 * @const {Number}
 * @default
 */

exports.LOCKTIME_THRESHOLD = 500000000;

/**
 * Highest nSequence bit -- disables
 * sequence locktimes (consensus).
 * @const {Number}
 */

exports.SEQUENCE_DISABLE_FLAG = (1 << 31) >>> 0;

/**
 * Sequence time: height or time (consensus).
 * @const {Number}
 * @default
 */

exports.SEQUENCE_TYPE_FLAG = 1 << 22;

/**
 * Sequence granularity for time (consensus).
 * @const {Number}
 * @default
 */

exports.SEQUENCE_GRANULARITY = 9;

/**
 * Sequence mask (consensus).
 * @const {Number}
 * @default
 */

exports.SEQUENCE_MASK = 0x0000ffff;

/**
 * Max serialized script size (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_SCRIPT_SIZE = 10000;

/**
 * Max stack size during execution (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_SCRIPT_STACK = 1000;

/**
 * Max script element size (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_SCRIPT_PUSH = 520;

/**
 * Max opcodes executed (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_SCRIPT_OPS = 201;

/**
 * Max `n` value for multisig (consensus).
 * @const {Number}
 * @default
 */

exports.MAX_MULTISIG_PUBKEYS = 20;

/**
 * The date bip16 (p2sh) was activated (consensus).
 * @const {Number}
 * @default
 */

exports.BIP16_TIME = 1333238400;

/**
 * Convert a compact number to a big number.
 * Used for `block.bits` -> `target` conversion.
 * @param {Number} compact
 * @returns {BN}
 */

exports.fromCompact = function fromCompact(compact) {
  if (compact === 0)
    return new BN(0);

  const exponent = compact >>> 24;
  const negative = (compact >>> 23) & 1;

  let mantissa = compact & 0x7fffff;
  let num;

  if (exponent <= 3) {
    mantissa >>>= 8 * (3 - exponent);
    num = new BN(mantissa);
  } else {
    num = new BN(mantissa);
    num.iushln(8 * (exponent - 3));
  }

  if (negative)
    num.ineg();

  return num;
};

/**
 * Convert a big number to a compact number.
 * Used for `target` -> `block.bits` conversion.
 * @param {BN} num
 * @returns {Number}
 */

exports.toCompact = function toCompact(num) {
  if (num.isZero())
    return 0;

  let exponent = num.byteLength();
  let mantissa;

  if (exponent <= 3) {
    mantissa = num.toNumber();
    mantissa <<= 8 * (3 - exponent);
  } else {
    mantissa = num.ushrn(8 * (exponent - 3)).toNumber();
  }

  if (mantissa & 0x800000) {
    mantissa >>= 8;
    exponent++;
  }

  let compact = (exponent << 24) | mantissa;

  if (num.isNeg())
    compact |= 0x800000;

  compact >>>= 0;

  return compact;
};

/**
 * Verify proof-of-work.
 * @param {Network} network
 * @param {AbstractBlock} block
 * @param {Hash} hash
 * @param {Number} bits
 * @returns {Boolean}
 */

exports.verifyPOW = function verifyPOW(network, block, hash, bits) {

  const target = exports.fromCompact(bits);
  let powLimit = block.hasNewPowVersion() ? network.keccakPow.limit : network.pow.limit;

  if (target.isNeg() || target.isZero()) {
    return false;
  }

  //console.log(hash.toString('hex'));
  const num = new BN(hash, 'le');

  if (num.gt(target)) {
    console.log(num.toBuffer().toString('hex'));
    return false;
  }

  return true;
};

/**
 * Calculate block subsidy.
 * @param {Number} height - Reward era by height.
 * @returns {Amount}
 */

exports.getReward = function getReward(height, interval) {
  assert(height >= 0, 'Bad height for reward.');

  let subsidy = 0 * exports.COIN;

  //Creativechain reward design with fibonachi progress the firt year
  if(height < 2) // The first block pre-mine, for the manteniance of the plattform and incentive the content publication
    subsidy = 12226641 * exports.COIN;
  if(height <= 6765 && height > 1)
    subsidy = 1 * exports.COIN;
  if(height <= 10946 && height > 6765)
    subsidy = 1 * exports.COIN;
  if(height <= 17711 && height > 10946)
    subsidy = 2 * exports.COIN;
  if(height <= 28657 && height > 17711)
    subsidy = 3 * exports.COIN;
  if(height <= 46368 && height > 28657)
    subsidy = 5 * exports.COIN;
  if(height <= 75025 && height > 46368)
    subsidy = 8 * exports.COIN;
  if(height <= 121393 && height > 75025)
    subsidy = 13 * exports.COIN;
  if(height <= 196418 && height > 121393)
    subsidy = 21 * exports.COIN;
  if(height <= 317811 && height > 196148)
    subsidy = 34 * exports.COIN;
  if(height <= 514229 && height > 317811)
    subsidy = 55 * exports.COIN;
  if(height <= 832040 && height > 514229)
    subsidy = 34 * exports.COIN;
  if(height <= 1346269 && height > 832040)
    subsidy = 21 * exports.COIN;
  if(height <= 2178309 && height > 1346269)
    subsidy = 13 * exports.COIN;
  if(height <= 3524578 && height > 2178309)
    subsidy = 8 * exports.COIN;
  if(height <= 5702887 && height > 3524578)
    subsidy = 5 * exports.COIN;
  if(height <= 9227465 && height > 5702887)
    subsidy = 3 * exports.COIN;
  if(height <= 14930352 && height > 9227465)
    subsidy = 2 * exports.COIN;
  if(height <= 24157817 && height > 14930352)
    subsidy = 1 * exports.COIN;

  return subsidy;
};

/**
 * Test version bit.
 * @param {Number} version
 * @param {Number} bit
 * @returns {Boolean}
 */

exports.hasBit = function hasBit(version, bit) {
  const TOP_MASK = exports.VERSION_TOP_MASK;
  const TOP_BITS = exports.VERSION_TOP_BITS;
  const bits = (version & TOP_MASK) >>> 0;
  const mask = 1 << bit;
  return bits === TOP_BITS && (version & mask) !== 0;
};
