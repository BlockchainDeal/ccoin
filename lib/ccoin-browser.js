/*!
 * ccoin.js - a javascript creativecoin library.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/ccoin-org/ccoin
 */

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
  ;
};

/*
 * Expose
 */

// Horrible BIP
ccoin.bip70 = require('./bip70');

// Blockchain
ccoin.blockchain = require('./blockchain');
ccoin.chain = require('./blockchain/chain');
ccoin.chaindb = require('./blockchain/chaindb');
ccoin.chainentry = require('./blockchain/chainentry');

// CREA
ccoin.crea = require('./crea');
ccoin.amount = require('./crea/amount');
ccoin.uri = require('./crea/uri');

// Coins
ccoin.coins = require('./coins');
ccoin.coinview = require('./coins/coinview');

// Crypto
ccoin.crypto = require('./crypto');
ccoin.bn = require('./crypto/bn');
ccoin.secp256k1 = require('./crypto/secp256k1');
ccoin.schnorr = require('./crypto/schnorr');

// DB
ccoin.db = require('./db');
ccoin.ldb = require('./db/ldb');

// HD
ccoin.hd = require('./hd');

// HTTP
ccoin.http = require('./http');
ccoin.rpc = require('./http/rpc');

// Mempool
ccoin.txmempool = require('./mempool');
ccoin.fees = require('./mempool/fees');
ccoin.mempool = require('./mempool/mempool');
ccoin.mempoolentry = require('./mempool/mempoolentry');

// Miner
ccoin.mining = require('./mining');
ccoin.miner = require('./mining/miner');
ccoin.template = require('./mining/template');

// Net
ccoin.net = require('./net');
ccoin.bip150 = require('./net/bip150');
ccoin.bip151 = require('./net/bip151');
ccoin.bip152 = require('./net/bip152');
ccoin.dns = require('./net/dns');
ccoin.packets = require('./net/packets');
ccoin.peer = require('./net/peer');
ccoin.pool = require('./net/pool');
ccoin.tcp = require('./net/tcp');

// Node
ccoin.node = require('./node');
ccoin.config = require('./node/config');
ccoin.fullnode = require('./node/fullnode');
ccoin.logger = require('./node/logger');
ccoin.spvnode = require('./node/spvnode');

// Primitives
ccoin.primitives = require('./primitives');
ccoin.address = require('./primitives/address');
ccoin.block = require('./primitives/block');
ccoin.coin = require('./primitives/coin');
ccoin.headers = require('./primitives/headers');
ccoin.input = require('./primitives/input');
ccoin.invitem = require('./primitives/invitem');
ccoin.keyring = require('./primitives/keyring');
ccoin.merkleblock = require('./primitives/merkleblock');
ccoin.mtx = require('./primitives/mtx');
ccoin.netaddress = require('./primitives/netaddress');
ccoin.outpoint = require('./primitives/outpoint');
ccoin.output = require('./primitives/output');
ccoin.tx = require('./primitives/tx');

// Protocol
ccoin.protocol = require('./protocol');
ccoin.consensus = require('./protocol/consensus');
ccoin.errors = require('./protocol/errors');
ccoin.network = require('./protocol/network');
ccoin.networks = require('./protocol/networks');
ccoin.policy = require('./protocol/policy');
ccoin.timedata = require('./protocol/timedata');

// Script
ccoin.txscript = require('./script');
ccoin.opcode = require('./script/opcode');
ccoin.program = require('./script/program');
ccoin.script = require('./script/script');
ccoin.scriptnum = require('./script/scriptnum');
ccoin.sigcache = require('./script/sigcache');
ccoin.stack = require('./script/stack');
ccoin.witness = require('./script/witness');

// Utils
ccoin.utils = require('./utils');
ccoin.base32 = require('./utils/base32');
ccoin.base58 = require('./utils/base58');
ccoin.bloom = require('./utils/bloom');
ccoin.co = require('./utils/co');
ccoin.encoding = require('./utils/encoding');
ccoin.int64 = require('./utils/int64');
ccoin.lock = require('./utils/lock');
ccoin.reader = require('./utils/reader');
ccoin.staticwriter = require('./utils/staticwriter');
ccoin.util = require('./utils/util');
ccoin.writer = require('./utils/writer');

// Wallet
ccoin.wallet = require('./wallet');
ccoin.path = require('./wallet/path');
ccoin.walletkey = require('./wallet/walletkey');
ccoin.walletdb = require('./wallet/walletdb');

// Workers
ccoin.workers = require('./workers');
ccoin.workerpool = require('./workers/workerpool');

// Package Info
ccoin.pkg = require('./pkg');

/*
 * Expose Globally
 */

global.ccoin = ccoin;
