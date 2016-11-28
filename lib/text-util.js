/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = {}, objUtil = require('./obj-util.js'),
  hasOwn = Function.call.bind(Object.prototype.hasOwnProperty);


EX.stripBom = function (text) {
  text = String(text);
  return (text[0] === '\uFEFF' ? text.slice(1) : text);
};


EX.findWords = function (text) {
  // "word" = run of non-whitespace that starts and ends with a letter.
  var words = [];
  text = String(text || '').replace(/^|\s+|$/g, '  ');
  text.replace(/ ([a-z](\S*[a-z]|)) /ig, function (match, word) {
    if (match) { words[words.length] = word; }
  });
  return words;
};
EX.findWords.ifStr = function (x) {
  return (typeof x === 'string' ? EX.findWords(x) : x);
};



EX.uniq = function (texts, opts) {
  opts = (opts || false);
  var had = Object.create(null), order = [],
    exclude = opts.exclude, ignCase = opts.ignCase;

  function foundStr(tx) {
    if (ignCase) { tx = tx.toLowerCase(); }
    if (hasOwn(had, tx)) { return; }
    had[tx] = order.length;
    order[order.length] = tx;
  }

  if (exclude) {
    exclude.forEach(foundStr);
    order = [];
  }

  texts.forEach(foundStr);
  return order;
};


EX.countUniqueWords = function (text, opts) {
  if (!text) { return 0; }
  return EX.uniq(EX.findWords(text), opts).length;
};























module.exports = EX;
