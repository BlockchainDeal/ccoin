# Ccoin

__NOTE__: The latest release of ccoin contains a non-backward compatible change
to the rest API. Please read the [changelog]'s "migrating" section for more
details.

---

**Ccoin** is an alternative implementation of the creativecoin protocol, written in
node.js.

Although still in a beta state, ccoin is well tested and aware of all known
consensus rules. It is currently used in production as the consensus backend
and wallet system for [purse.io][purse].

## Uses

- Full Node
- SPV Node
- Wallet Backend (bip44 derivation)
- Mining Backend (getblocktemplate support)
- Layer 2 Backend (lightning)
- General Purpose Bitcoin Library

Try it in the browser: http://ccoin.io/browser.html

## Install

```
$ git clone git://github.com/ccoin-org/ccoin.git
$ cd ccoin
$ npm install
$ ./bin/ccoin
```

See the [Beginner's Guide][guide] for more in-depth installation instructions.

## Documentation

- API Docs: http://ccoin.io/docs/
- REST Docs: http://ccoin.io/api-docs/index.html
- Docs: [docs/](docs/README.md)

## Support

Join us on [freenode][freenode] in the [#ccoin][irc] channel.

## Disclaimer

Ccoin does not guarantee you against theft or lost funds due to bugs, mishaps,
or your own incompetence. You and you alone are responsible for securing your
money.

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

- Copyright (c) 2014-2015, Fedor Indutny (MIT License).
- Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).

See LICENSE for more info.

[purse]: https://purse.io
[guide]: https://github.com/ccoin-org/ccoin/blob/master/docs/Beginner's-Guide.md
[freenode]: https://freenode.net/
[irc]: irc://irc.freenode.net/ccoin
[changelog]: https://github.com/ccoin-org/ccoin/blob/master/CHANGELOG.md
