/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = {}, assert = require('assert');


EX.isObj = function (x) { return ((x && typeof x) === 'object'); };
EX.deepCopyJSON = function (x) { return JSON.parse(JSON.stringify(x)); };


EX.sameData = function (a, b) {
  try {
    assert.deepStrictEqual(a, b);
  } catch (err) {
    if (err instanceof assert.AssertionError) { return false; }
    throw err;
  }
  return true;
};


EX.deleteIf = function (obj, key, decide) {
  var del = decide(obj[key], key, obj);
  if (del) { delete obj[key]; }
  return del;
};


EX.deleteIfEqual = function (obj, key, cmp) {
  return EX.deleteIf(obj, key, EX.sameData.bind(null, cmp));
};


EX.deleteIfInArray = function (obj, key, arr) {
  var val = obj[key], idx = arr.findIndex(EX.sameData.bind(null, val));
  if (idx < 0) { return false; }
  delete obj[key];
  return { idx: idx, val: val };
};


EX.mapKeys = function (keys, iter) {
  var vals = {};
  if (!Array.isArray(keys)) { keys = Object.keys(keys); }
  keys.forEach(function (key) { vals[key] = iter(key); });
  return vals;
};


EX.popProp = function (obj, key) {
  if (EX.isObj(key)) { return EX.mapKeys(key, EX.popProp.bind(null, obj)); }
  var val = obj[key];
  delete obj[key];
  return val;
};

























module.exports = EX;
