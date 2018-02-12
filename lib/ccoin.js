/*!
 * ccoin.js - a javascript creativecoin library.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

/* eslint prefer-arrow-callback: "off" */

'use strict';

/**
 * A ccoin "environment" which exposes all
 * constructors for primitives, the blockchain,
 * mempool, wallet, etc. It also exposes a
 * global worker pool.
 *
 * @exports ccoin
 * @type {Object}
 *
 * @property {Function} bn - See {@url https://github.com/indutny/bn.js}.
 * @property {Object} elliptic - See {@url https://github.com/indutny/elliptic}.
 *
 * @property {Object} bip70 - See {@link module:bip70}.
 *
 * @property {Object} blockchain - See {@link module:blockchain}.
 * @property {Function} chain - See {@link module:blockchain.Chain}.
 * @property {Function} chaindb - See {@link module:blockchain.ChainDB}.
 * @property {Function} chainentry - See {@link module:blockchain.ChainEntry}.
 *
 * @property {Object} crea
 * @property {Function} amount
 * @property {Function} uri
 *
 * @property {Object} coins
 * @property {Function} coinview
 *
 * @property {Object} crypto
 * @property {Object} secp256k1
 * @property {Object} schnorr
 *
 * @property {Object} db
 * @property {Object} ldb
 *
 * @property {Object} hd
 *
 * @property {Object} http
 * @property {Object} rpc
 *
 * @property {Object} txmempool
 * @property {Object} fees
 * @property {Object} mempool
 * @property {Object} mempoolentry
 *
 * @property {Object} mining
 * @property {Object} miner
 * @property {Object} minerblock
 *
 * @property {Object} net
 * @property {Object} bip150
 * @property {Object} bip151
 * @property {Object} bip152
 * @property {Object} dns
 * @property {Object} packets
 * @property {Object} peer
 * @property {Object} pool
 * @property {Object} tcp
 *
 * @property {Object} node
 * @property {Object} config
 * @property {Object} fullnode
 * @property {Object} logger
 * @property {Object} spvnode
 *
 * @property {Object} primitives
 * @property {Object} address
 * @property {Object} block
 * @property {Object} coin
 * @property {Object} headers
 * @property {Object} input
 * @property {Object} invitem
 * @property {Object} keyring
 * @property {Object} merkleblock
 * @property {Object} mtx
 * @property {Object} netaddress
 * @property {Object} outpoint
 * @property {Object} output
 * @property {Object} tx
 *
 * @property {Object} protocol
 * @property {Object} consensus
 * @property {Object} errors
 * @property {Object} network
 * @property {Object} networks
 * @property {Object} policy
 * @property {Object} timedata
 *
 * @property {Object} txscript
 * @property {Object} opcodes
 * @property {Object} program
 * @property {Object} script
 * @property {Object} sigcache
 * @property {Object} stack
 * @property {Object} witness
 *
 * @property {Object} utils
 * @property {Object} base32
 * @property {Object} base58
 * @property {Object} bloom
 * @property {Object} co
 * @property {Object} encoding
 * @property {Object} lock
 * @property {Object} reader
 * @property {Object} staticwriter
 * @property {Object} util
 * @property {Object} writer
 *
 * @property {Object} wallet
 * @property {Object} path
 * @property {Object} walletkey
 * @property {Object} walletdb
 *
 * @property {Object} workers
 * @property {Object} workerpool
 */

const ccoin = exports;

/**
 * Define a module for lazy loading.
 * @param {String} name
 * @param {String} path
 */

ccoin.define = function define(name, path) {
  let cache;
  Object.defineProperty(ccoin, name, {
    get() {
      if (!cache)
        cache = require(path);
      return cache;
    }
  });
};

/**
 * Set the default network.
 * @param {String} network
 */

ccoin.set = function set(network) {
  ccoin.network.set(network);
  return ccoin;
};

/**
 * Cache all necessary modules.
 */

ccoin.cache = function cache() {
  ccoin.bip70;
  ccoin.blockchain;
  ccoin.crea;
  ccoin.coins;
  ccoin.crypto;
  ccoin.db;
  ccoin.hd;
  ccoin.http;
  ccoin.txmempool;
  ccoin.mining;
  ccoin.net;
  ccoin.node;
  ccoin.primitives;
  ccoin.protocol;
  ccoin.txscript;
  ccoin.utils;
  ccoin.wallet;
  ccoin.workers;
  ccoin.pkg;
};

/*
 * Expose
 */

// Horrible BIP
ccoin.define('bip70', './bip70');

// Blockchain
ccoin.define('blockchain', './blockchain');
ccoin.define('chain', './blockchain/chain');
ccoin.define('chaindb', './blockchain/chaindb');
ccoin.define('chainentry', './blockchain/chainentry');

// CREA
ccoin.define('crea', './crea');
ccoin.define('amount', './crea/amount');
ccoin.define('uri', './crea/uri');

// Coins
ccoin.define('coins', './coins');
ccoin.define('coinview', './coins/coinview');

// Crypto
ccoin.define('crypto', './crypto');
ccoin.define('bn', './crypto/bn');
ccoin.define('secp256k1', './crypto/secp256k1');
ccoin.define('schnorr', './crypto/schnorr');

// DB
ccoin.define('db', './db');
ccoin.define('ldb', './db/ldb');

// HD
ccoin.define('hd', './hd');

// HTTP
ccoin.define('http', './http');
ccoin.define('rpc', './http/rpc');

// Mempool
ccoin.define('txmempool', './mempool');
ccoin.define('fees', './mempool/fees');
ccoin.define('mempool', './mempool/mempool');
ccoin.define('mempoolentry', './mempool/mempoolentry');

// Miner
ccoin.define('mining', './mining');
ccoin.define('miner', './mining/miner');
ccoin.define('template', './mining/template');

// Net
ccoin.define('net', './net');
ccoin.define('bip150', './net/bip150');
ccoin.define('bip151', './net/bip151');
ccoin.define('bip152', './net/bip152');
ccoin.define('dns', './net/dns');
ccoin.define('packets', './net/packets');
ccoin.define('peer', './net/peer');
ccoin.define('pool', './net/pool');
ccoin.define('tcp', './net/tcp');

// Node
ccoin.define('node', './node');
ccoin.define('config', './node/config');
ccoin.define('fullnode', './node/fullnode');
ccoin.define('logger', './node/logger');
ccoin.define('spvnode', './node/spvnode');

// Primitives
ccoin.define('primitives', './primitives');
ccoin.define('address', './primitives/address');
ccoin.define('block', './primitives/block');
ccoin.define('coin', './primitives/coin');
ccoin.define('headers', './primitives/headers');
ccoin.define('input', './primitives/input');
ccoin.define('invitem', './primitives/invitem');
ccoin.define('keyring', './primitives/keyring');
ccoin.define('merkleblock', './primitives/merkleblock');
ccoin.define('mtx', './primitives/mtx');
ccoin.define('netaddress', './primitives/netaddress');
ccoin.define('outpoint', './primitives/outpoint');
ccoin.define('output', './primitives/output');
ccoin.define('tx', './primitives/tx');

// Protocol
ccoin.define('protocol', './protocol');
ccoin.define('consensus', './protocol/consensus');
ccoin.define('errors', './protocol/errors');
ccoin.define('network', './protocol/network');
ccoin.define('networks', './protocol/networks');
ccoin.define('policy', './protocol/policy');
ccoin.define('timedata', './protocol/timedata');

// Script
ccoin.define('txscript', './script');
ccoin.define('opcode', './script/opcode');
ccoin.define('program', './script/program');
ccoin.define('script', './script/script');
ccoin.define('scriptnum', './script/scriptnum');
ccoin.define('sigcache', './script/sigcache');
ccoin.define('stack', './script/stack');
ccoin.define('witness', './script/witness');

// Utils
ccoin.define('utils', './utils');
ccoin.define('base32', './utils/base32');
ccoin.define('base58', './utils/base58');
ccoin.define('bloom', './utils/bloom');
ccoin.define('co', './utils/co');
ccoin.define('encoding', './utils/encoding');
ccoin.define('int64', './utils/int64');
ccoin.define('lock', './utils/lock');
ccoin.define('reader', './utils/reader');
ccoin.define('staticwriter', './utils/staticwriter');
ccoin.define('util', './utils/util');
ccoin.define('writer', './utils/writer');

// Wallet
ccoin.define('wallet', './wallet');
ccoin.define('path', './wallet/path');
ccoin.define('walletkey', './wallet/walletkey');
ccoin.define('walletdb', './wallet/walletdb');

// Workers
ccoin.define('workers', './workers');
ccoin.define('workerpool', './workers/workerpool');

// Package Info
ccoin.define('pkg', './pkg');
