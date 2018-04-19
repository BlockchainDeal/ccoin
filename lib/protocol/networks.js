/*!
 * network.js - creativecoin networks for ccoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/creativechain/ccoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('../crypto/bn');

const network = exports;

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest', 'simnet'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'dnsseed.creativecoin.net', // Creativechain
  'creaseed.owldevelopers.site', // Owldevelopers
];

/**
 * Default seed nodes.
 * @const {String[]}
 * @default
 */
main.nodes = [
  "144.217.106.113",
  "144.217.106.114",
  "5.189.152.67"
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xcccccccc;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 10946;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  10000: 'e8a3af196392b5e002f08b0c9df31c1d3f64d8981af8717c1eb8f0dfc37f6b2a',
  20000: 'b0dcb5182748d42d3104f1c694a532743241961618e942fe72e6c42650986d01',
  30000: 'b4607d5cc0c36d14242f14c098adb115154d7dc959b48e14631dfcf1867cfd70',
  40000: '6d4d4baf545d780af7f915672ea9b31f41998414f547dbcd259d5b90ed5435d9',
  50000: '23b9370c2a7a6fd73800c88e8a730d211113e73c33f008d7f093bb0100000000',
  60000: '3ed2c1082dc2e81af6a50f75a4f43ac22c40d19534c7bdf9d5e9040000000000',
  70000: '7667fa50f7c640d5527b658c353ca95cd4876c3af43635e6511c030000000000',
  80000: 'a86b38fdaa07ea14eb836e6e1c01944ae32d635ba6c61c9db7d0000000000000',
  90000: 'e63665c71b5dd82d6272bb88df121b61014ec70d5e7cc000d6b7020000000000',
  100000: '968ff1eb6c57c7518d1944220f37d8cccf0545b88c307101de10000000000000',
  110000: 'af8869cb1134f36cec8bad3aa0e774a3e4e373a35174952591d6020000000000',
  120000: '3e3ae6cac158ace8583972ed8ec94e509204339520d08a29e666000000000000',
  130000: '100acc04fb1ab7cf2aeee95d32698cefebce92559cbf6040259e010000000000',
  140000: 'e5d5aeb9a94560eba1a2026d43dcb4e9e611be1bdf726419a2f1000000000000',
  150000: 'dc9802bbd60afaa4e99b820f7144cfea39470f0057768152bbb2000000000000',
  160000: '761920cfe19ef10279fa2d4acf7a697bdd030c7ec1c46cbe596f000000000000',
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 160000;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 210000;

/**
 * Genesis block header.
 * @const {NakedBlock}
 */

main.genesis = {
  version: 1,
  hash: '9ef893f1c128cbe857e521cc4edbe8665724253ec8c2a82dacb5e19acb984d1f',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '11ec6c914724bc0d77d28568f806ff505488dd506ef122c1b21a6ecd672df221',
  time: 1493601901,
  bits: 504365040,
  nonce: 741491,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000' +
  '0011ec6c914724bc0d77d28568f806ff505488dd506ef122c1b21a6ecd672df2216d8e' +
  '0659f0ff0f1e73500b0001010000000100000000000000000000000000000000000000' +
  '00000000000000000000000000ffffffff5304ffff001d01044b4e592054696d657320' +
  '31204d61792032303137207475726b657920507572676573203420303030204d6f7265' +
  '206f6666696369616c7320616e6420626c6f636b732077696b697065646961ffffffff' +
  '0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909' +
  'a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c' +
  '702b6bf11d5fac00000000';

main.uncheckedPowBlocks = [0, 720, 1440, 2160, 2880, 3600, 4320, 5040, 5760,
  6480, 7200, 7920, 8640, 9360, 10080, 10800, 11520, 12240, 12960, 13680,
  14400, 15120, 15840, 16560, 17280, 18000, 18720, 19440, 20160, 20880, 21600,
  22320, 23040, 23760, 24480, 25200, 25920, 26640, 27360, 28080, 28800, 29520,
  30240, 30960, 31680, 32400, 33120, 33840, 34560, 35280, 36000, 36720, 37440,
  38160, 38880, 39600, 40320, 41040, 41760, 42480, 43200, 43920, 44640, 45360,
  46080];
/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 504365040,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '000000000000000000000000000000000000000000000005c13f99f6d0b1a908',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 1 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 2 * 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 720,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

main.keccakPow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 503382015,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '000000000000000000000000000000000000000000000005c13f99f6d0b1a908',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 2 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 2 * 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 1,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {

  /**
   * Height at which Keccak PoW Hash was activated
   */
  changePowHeight: 46368,

  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 0,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash: '9ef893f1c128cbe857e521cc4edbe8665724253ec8c2a82dacb5e19acb984d1f',

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 46368,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash: '27f541ee75d1ea2d96095bd7ecde8b5dd422126e45a06f63aa01649d5a000000',

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 46368,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash: '27f541ee75d1ea2d96095bd7ecde8b5dd422126e45a06f63aa01649d5a000000',

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 325000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/creativecoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {
/*  91842: 'eccae000e3c8e4e093936360431f3b7603c563c1ff6181390a4d0a0000000000',
  91880: '21d77ccb4c08386a04ac0196ae10f6a1d2c2a377558ca190f143070000000000'*/
};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 6048; // 95% of 2016

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 8064; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1485561600, // May 1st, 2016
    timeout: 1517356801, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1485561600, // November 15th, 2016.
    timeout: 1517356801, // November 15th, 2017.
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x80,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x1c,
  scripthash: 0x05,
  witnesspubkeyhash: 0x23,
  witnessscripthash: 0x23,
  bech32: 'bc'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 17711;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 100000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet (v3)
 * https://en.creativecoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'testnet-seed.creativecoin.net', // Creativechain
  'tcreaseed.owldevelopers.site', // Owldevelopers
];

testnet.nodes = [
  "144.217.106.112",
  "5.189.152.67"
];

testnet.magic = 0xcacacaca;

testnet.port = 11946;

testnet.checkpointMap = {
  0: '2e2c14337dda72e3a49b8ab9b7fef9653b594dfd9af947f9906aeb4819f08d6b'
};

testnet.lastCheckpoint = 0;

testnet.halvingInterval = 210000;

testnet.genesis = {
  version: 1,
  hash: '2e2c14337dda72e3a49b8ab9b7fef9653b594dfd9af947f9906aeb4819f08d6b',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '11ec6c914724bc0d77d28568f806ff505488dd506ef122c1b21a6ecd672df221',
  time: 1514393320,
  bits: 504365040,
  nonce: 201857,
  height: 0
};

testnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000' +
  '0011ec6c914724bc0d77d28568f806ff505488dd506ef122c1b21a6ecd672df221e8ce' +
  '435af0ff0f1e8114030001010000000100000000000000000000000000000000000000' +
  '00000000000000000000000000ffffffff5304ffff001d01044b4e592054696d657320' +
  '31204d61792032303137207475726b657920507572676573203420303030204d6f7265' +
  '206f6666696369616c7320616e6420626c6f636b732077696b697065646961ffffffff' +
  '0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909' +
  'a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c' +
  '702b6bf11d5fac00000000';

testnet.pow = {
  limit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 504365040,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000286d17360c5492b2c4',
    'hex'
  ),
  targetTimespan: 1 * 24 * 60 * 60,
  targetSpacing: 1 * 60,
  retargetInterval: 720,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: -1,
  bip34hash: '00',
  bip65height: 720,
  bip65hash: 'cb89fc44647e0316fe4487ade26ec1ccfa613e451837208bdeac210988000000',
  bip66height: 720,
  bip66hash: 'cb89fc44647e0316fe4487ade26ec1ccfa613e451837208bdeac210988000000',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 1512; // 75% for testchains

testnet.minerWindow = 720; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1483228800, // March 1st, 2016
    timeout: 1517356801, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1483228800, // May 1st 2016
    timeout: 1517356801, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x57,
  scripthash: 0xc4,
  witnesspubkeyhash: 0x5f,
  witnessscripthash: 0x5f,
  bech32: 'tb'
};

testnet.requireStandard = false;

testnet.rpcPort = 18711;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [
  '127.0.0.1'
];

regtest.nodes = [];

regtest.magic = 0xdab5bffa;

regtest.port = 48444;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: '06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1296688602,
  bits: 545259519,
  nonce: 2,
  height: 0
};

regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5'
  + '494dffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 100000000,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0x5a,
  xpubkey: 0xeab4fa05,
  xprivkey: 0xeab404c7,
  xpubkey58: 'rpub',
  xprivkey58: 'rprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x3c,
  scripthash: 0x26,
  witnesspubkeyhash: 0x7a,
  witnessscripthash: 0x14,
  bech32: 'rb'
};

regtest.requireStandard = false;

regtest.rpcPort = 48332;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Simnet (cread)
 */

const simnet = {};

simnet.type = 'simnet';

simnet.seeds = [
  '127.0.0.1'
];

simnet.nodes = [];

simnet.magic = 0x12141c16;

simnet.port = 18555;

simnet.checkpointMap = {};

simnet.lastCheckpoint = 0;

simnet.halvingInterval = 210000;

simnet.genesis = {
  version: 1,
  hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1401292357,
  bits: 545259519,
  nonce: 2,
  height: 0
};

simnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
  + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

simnet.pow = {
  limit: new BN(
    // High target of 0x207fffff (545259519)
    '7fffff0000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

simnet.block = {
  bip34height: 0,
  bip34hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip65height: 0,
  bip65hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip66height: 0,
  bip66hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

simnet.bip30 = {};

simnet.activationThreshold = 75; // 75% for testchains

simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

simnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0, // March 1st, 2016
    timeout: 0xffffffff, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // May 1st 2016
    timeout: 0xffffffff, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

simnet.deploys = [
  simnet.deployments.csv,
  simnet.deployments.segwit,
  simnet.deployments.segsignal,
  simnet.deployments.testdummy
];

simnet.keyPrefix = {
  privkey: 0x64,
  xpubkey: 0x0420bd3a,
  xprivkey: 0x0420b900,
  xpubkey58: 'spub',
  xprivkey58: 'sprv',
  coinType: 115
};

simnet.addressPrefix = {
  pubkeyhash: 0x3f,
  scripthash: 0x7b,
  witnesspubkeyhash: 0x19,
  witnessscripthash: 0x28,
  bech32: 'sc'
};

simnet.requireStandard = false;

simnet.rpcPort = 18556;

simnet.minRelay = 1000;

simnet.feeRate = 20000;

simnet.maxFeeRate = 60000;

simnet.selfConnect = false;

simnet.requestMempool = false;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
network.simnet = simnet;
