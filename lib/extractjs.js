/*jslint node: true*/
var hp = require('htmlparser2');

module.exports = function (data, callback) {
    'use strict';

    var result = '',
        index = 0;

    function extractScripts(dom, isScript) {
        dom.forEach(function (el) {
            var newIndex, newLines, jsScript;
            if (el.data && isScript) {
                newIndex = data.indexOf(el.data, index);
                newLines = data.slice(index, newIndex).match(/\n/g);

                if (newLines) {
                    result += newLines.join('');
                }

                result += el.data;
                index = newIndex + el.data.length;
            }

            if (el.children) {
                jsScript = el.type === 'script' && (
                    !el.attribs || !el.attribs.type || el.attribs.type.indexOf('text/javascript') !== -1
                );
                extractScripts(el.children, jsScript);
            }
        });
    }

    data = data.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');

    // parseComplete is not asynchrone, even if it has a cps signature
    new hp.Parser(new hp.DomHandler(function (error, dom) {
        if (error) {
            throw error;
        } else {
            extractScripts(dom, false);
        }
    })).parseComplete(data);

    return result;
};
