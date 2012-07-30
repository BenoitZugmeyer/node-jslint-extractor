## node-jslint-extractor

This is a fork of [node-jslint][] aimed to ease JSLint validation of JavaScript source code
embedded in html files.

Use the `--extractjs auto|always|never` to do it.

    jslint --extractjs always index.html

## Install

    npm install git://github.com/BenoitZugmeyer/node-jslint-extractor.git

## Self-Lint

    make lint

## Usage examples

Multiple files

    jslint lib/worker.js lib/server.js

All JSLint options supported

    jslint --white --vars --regexp app.js

Defaults to true, but you can specify false

    jslint --bitwise false app.js

Pass arrays

	jslint --predef $ --predef Backbone app.js

JSLint your entire project

	find . -name "*.js" -print0 | xargs -0 jslint


## License

See LICENSE file.

[node-jslint]: https://github.com/reid/node-jslint
[JSLint]: http://jslint.com/
