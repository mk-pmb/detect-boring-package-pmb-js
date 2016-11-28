/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, ou = require('./obj-util'), txu = require('./text-util'),
  fs = require('fs');


EX = function filterRelevantPkgMeta(pkMeta) {
  pkMeta = ou.deepCopyJSON(pkMeta);
  var basics = ou.popProp(pkMeta, ['name', 'version', 'author', 'main']),
    report = ou.deepCopyJSON(basics);

  report.pkNameWords = txu.findWords(String(basics.name || ''
    ).replace(/\-|_|\.|:/g, ' '));

  ou.deleteIfInArray(pkMeta, 'description', [
    '',
  ]);

  ou.deleteIfInArray(pkMeta, 'license', [
    'BSD-2-Clause',
    'ISC',
    'MIT',
    'UNLICENSED',
  ]);

  ou.deleteIfInArray(pkMeta, 'scripts', [
    { test: 'echo "Error: no test specified" && exit 1' },
  ]);


  function countWordsNotInPackageName(text) {
    if (!text) { return 0; }
    var allWords = txu.findWords(text),
      notInPkName = txu.uniq(allWords,
        { exclude: report.pkNameWords, ignCase: true });
    // console.log('words:', text, report.pkNameWords, notInPkName);
    return notInPkName.length;
  }


  ou.deleteIf(pkMeta, 'keywords', function (kw) {
    kw = (kw ? kw.join(' ') : '');
    return (countWordsNotInPackageName(kw) < 3);
  });


  ou.deleteIf(pkMeta, 'description', function (descr) {
    return (countWordsNotInPackageName(descr) < 3);
  });

  report.info = ((!ou.sameData(pkMeta, {})) && pkMeta);
  return report;
};


EX.async = function (deliver, srcErr, data) {
  if (srcErr) { return deliver(srcErr); }
  try {
    data = JSON.parse(txu.stripBom(data));
    data = EX(data);
  } catch (parseErr) {
    return deliver(parseErr);
  }
  return deliver(null, data);
};


EX.fromFile = function (jsonFn, deliver) {
  fs.readFile(jsonFn, 'UTF-8', EX.async.bind(null, deliver));
};


EX.runFromCLI = function () {
  var pkMetaFn = process.argv[2],
    rvBoring = (+process.env.RETVAL_BORING || 13);
  EX.fromFile(pkMetaFn, function (err, report) {
    if (err) {
      console.error('!', pkMetaFn, err);
      return process.exit(2);
    }
    if (!report.info) { return process.exit(rvBoring); }
    console.log('@', pkMetaFn, report.info);
  });
};







module.exports = EX;
if (require.main === module) { EX.runFromCLI(); }
