/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const assert = require('./util/assert');
const {U64, I64} = require('../lib/utils/int64');
const base58 = require('../lib/utils/base58');
const encoding = require('../lib/utils/encoding');
const Amount = require('../lib/crea/amount');
const Validator = require('../lib/utils/validator');
const util = require('../lib/utils/util');

const base58Tests = [
  ['', ''],
  ['61', '2g'],
  ['626262', 'a3gV'],
  ['636363', 'aPEr'],
  [
    '73696d706c792061206c6f6e6720737472696e67',
    '2cFupjhnEsSn59qHXstmK2ffpLv2'
  ],
  [
    '00eb15231dfceb60925886b67d065299925915aeb172c06647',
    '1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L'
  ],
  ['516b6fcd0f', 'ABnLTmg'],
  ['bf4f89001e670274dd', '3SEo3LWLoPntC'],
  ['572e4794', '3EFU7m'],
  ['ecac89cad93923c02321', 'EJDM8drfXA6uyA'],
  ['10c8511e', 'Rt5zm'],
  ['00000000000000000000', '1111111111']
];

const validBech32Tests = [
  'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4',
  'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7',
  'bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw50'
  + '8d6qejxtdg4y5r3zarvary0c5xw7k7grplx',
  'BC1SW50QA3JX3S',
  'bc1zw508d6qejxtdg4y5r3zarvaryvg6kdaj',
  'tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy'
];

const unsigned = [
  new U64('ffeeffee', 16),
  new U64('001fffeeffeeffee', 16),
  new U64('eeffeeff', 16),
  new U64('001feeffeeffeeff', 16),
  new U64(0),
  new U64(1)
];

const signed = [
  new I64('ffeeffee', 16),
  new I64('001fffeeffeeffee', 16),
  new I64('eeffeeff', 16),
  new I64('001feeffeeffeeff', 16),
  new I64(0),
  new I64(1),
  new I64('ffeeffee', 16).ineg(),
  new I64('001fffeeffeeffee', 16).ineg(),
  new I64('eeffeeff', 16).ineg(),
  new I64('001feeffeeffeeff', 16).ineg(),
  new I64(0).ineg(),
  new I64(1).ineg()
];

describe('Utils', function() {
  it('should encode/decode base58', () => {
    const buf = Buffer.from('000000deadbeef', 'hex');
    const str = base58.encode(buf);

    assert.strictEqual(str, '1116h8cQN');
    assert.bufferEqual(base58.decode(str), buf);

    for (const [hex, b58] of base58Tests) {
      const data = Buffer.from(hex, 'hex');
      assert.strictEqual(base58.encode(data), b58);
      assert.bufferEqual(base58.decode(b58), data);
    }
  });

  it('should convert satoshi to crea', () => {
    assert.strictEqual(Amount.crea(5460), '0.0000546');
    assert.strictEqual(Amount.crea(54678 * 1000000), '546.78');
    assert.strictEqual(Amount.crea(5460 * 10000000), '546.0');
  });

  it('should convert crea to satoshi', () => {
    assert.strictEqual(Amount.value('0.0000546'), 5460);
    assert.strictEqual(Amount.value('546.78'), 54678 * 1000000);
    assert.strictEqual(Amount.value('546'), 5460 * 10000000);
    assert.strictEqual(Amount.value('546.0'), 5460 * 10000000);
    assert.strictEqual(Amount.value('546.0000'), 5460 * 10000000);

    assert.doesNotThrow(() => {
      Amount.value('546.00000000000000000');
    });

    assert.throws(() => {
      Amount.value('546.00000000000000001');
    });

    assert.doesNotThrow(() => {
      Amount.value('90071992.54740991');
    });

    assert.doesNotThrow(() => {
      Amount.value('090071992.547409910');
    });

    assert.throws(() => {
      Amount.value('90071992.54740992');
    });

    assert.throws(() => {
      Amount.value('190071992.54740991');
    });

    assert.strictEqual(0.15645647 * 1e8, 15645646.999999998);
    assert.strictEqual(parseFloat('0.15645647') * 1e8, 15645646.999999998);
    assert.strictEqual(15645647 / 1e8, 0.15645647);

    assert.strictEqual(util.fromFixed('0.15645647', 8), 15645647);
    assert.strictEqual(util.toFixed(15645647, 8), '0.15645647');
    assert.strictEqual(util.fromFloat(0.15645647, 8), 15645647);
    assert.strictEqual(util.toFloat(15645647, 8), 0.15645647);
  });

  it('should write/read new varints', () => {
    /*
     * 0:         [0x00]  256:        [0x81 0x00]
     * 1:         [0x01]  16383:      [0xFE 0x7F]
     * 127:       [0x7F]  16384:      [0xFF 0x00]
     * 128:  [0x80 0x00]  16511: [0x80 0xFF 0x7F]
     * 255:  [0x80 0x7F]  65535: [0x82 0xFD 0x7F]
     * 2^32:           [0x8E 0xFE 0xFE 0xFF 0x00]
     */

    let b = Buffer.alloc(1, 0xff);
    encoding.writeVarint2(b, 0, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 0);
    assert.deepEqual(b, [0]);

    b = Buffer.alloc(1, 0xff);
    encoding.writeVarint2(b, 1, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 1);
    assert.deepEqual(b, [1]);

    b = Buffer.alloc(1, 0xff);
    encoding.writeVarint2(b, 127, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 127);
    assert.deepEqual(b, [0x7f]);

    b = Buffer.alloc(2, 0xff);
    encoding.writeVarint2(b, 128, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 128);
    assert.deepEqual(b, [0x80, 0x00]);

    b = Buffer.alloc(2, 0xff);
    encoding.writeVarint2(b, 255, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 255);
    assert.deepEqual(b, [0x80, 0x7f]);

    b = Buffer.alloc(2, 0xff);
    encoding.writeVarint2(b, 16383, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 16383);
    assert.deepEqual(b, [0xfe, 0x7f]);

    b = Buffer.alloc(2, 0xff);
    encoding.writeVarint2(b, 16384, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 16384);
    assert.deepEqual(b, [0xff, 0x00]);

    b = Buffer.alloc(3, 0xff);
    encoding.writeVarint2(b, 16511, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 16511);
    assert.deepEqual(b.slice(0, 2), [0xff, 0x7f]);
    // assert.deepEqual(b, [0x80, 0xff, 0x7f]);

    b = Buffer.alloc(3, 0xff);
    encoding.writeVarint2(b, 65535, 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, 65535);
    assert.deepEqual(b, [0x82, 0xfe, 0x7f]);
    // assert.deepEqual(b, [0x82, 0xfd, 0x7f]);

    b = Buffer.alloc(5, 0xff);
    encoding.writeVarint2(b, Math.pow(2, 32), 0);
    assert.strictEqual(encoding.readVarint2(b, 0).value, Math.pow(2, 32));
    assert.deepEqual(b, [0x8e, 0xfe, 0xfe, 0xff, 0x00]);
  });

  for (const num of unsigned) {
    const bits = num.bitLength();

    it(`should write+read a ${bits} bit unsigned int`, () => {
      const buf1 = Buffer.allocUnsafe(8);
      const buf2 = Buffer.allocUnsafe(8);

      encoding.writeU64N(buf1, num, 0);
      encoding.writeU64(buf2, num.toNumber(), 0);
      assert.bufferEqual(buf1, buf2);

      const n1 = encoding.readU64N(buf1, 0);
      const n2 = encoding.readU64(buf2, 0);

      assert.strictEqual(n1.toNumber(), n2);
    });
  }

  for (const num of signed) {
    const bits = num.bitLength();
    const sign = num.isNeg() ? 'negative' : 'positive';

    it(`should write+read a ${bits} bit ${sign} int`, () => {
      const buf1 = Buffer.allocUnsafe(8);
      const buf2 = Buffer.allocUnsafe(8);

      encoding.writeI64N(buf1, num, 0);
      encoding.writeI64(buf2, num.toNumber(), 0);
      assert.bufferEqual(buf1, buf2);

      const n1 = encoding.readI64N(buf1, 0);
      const n2 = encoding.readI64(buf2, 0);

      assert.strictEqual(n1.toNumber(), n2);
    });

    it(`should write+read a ${bits} bit ${sign} int as unsigned`, () => {
      const buf1 = Buffer.allocUnsafe(8);
      const buf2 = Buffer.allocUnsafe(8);

      encoding.writeU64N(buf1, num.toU64(), 0);
      encoding.writeU64(buf2, num.toNumber(), 0);
      assert.bufferEqual(buf1, buf2);

      const n1 = encoding.readU64N(buf1, 0);

      if (num.isNeg()) {
        assert.throws(() => encoding.readU64(buf2, 0));
      } else {
        const n2 = encoding.readU64(buf2, 0);
        assert.strictEqual(n1.toNumber(), n2);
      }
    });
  }

  it('should validate integers 0 and 1 as booleans', () => {
    const validator = new Validator({
      shouldBeTrue: 1,
      shouldBeFalse: 0
    });
    assert.strictEqual(validator.bool('shouldBeTrue'), true);
    assert.strictEqual(validator.bool('shouldBeFalse'), false);
  });

  it('should validate bech32 addresses based only on string data', () => {
    for (const bech32addr of validBech32Tests) {
      assert.strictEqual(util.isBech32(bech32addr), true);
    }
  });
});
