var JSLINT = require("../lib/nodelint");

function addDefaults(options) {
    'use strict';
    ['node', 'es5'].forEach(function (opt) {
        if (!options.hasOwnProperty(opt)) {
            options[opt] = true;
        }
    });
    return options;
}

exports.lint = function (script, options) {
    'use strict';
    // remove shebang
    /*jslint regexp: true*/
    script = script.replace(/^\#\!.*/, "");

    options = options || {};
    delete options.argv;
    options = addDefaults(options);

    var ok = JSLINT(script, options),
        result = {
            ok: true,
            errors: []
        };

    if (!ok) {
        result = JSLINT.data();
        result.errors = (result.errors || []).filter(function (error) {
            return !error.evidence || !(/\/\/.*bypass/).test(error.evidence);
        });
        result.ok = !result.errors.length;
    }

    result.options = options;

    return result;
};
