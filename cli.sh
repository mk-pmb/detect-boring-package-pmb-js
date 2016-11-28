#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-
SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"


function cli () {
  local JSON_FN=
  local RV=
  for JSON_FN in "$@"; do
    RETVAL_BORING=44 nodejs "$SELFPATH"/lib/relevant-pkg-meta.js "$JSON_FN"
    RV=$?
    [ "$RV" == 44 ] && echo "_ $JSON_FN: boring"
  done
  return 0
}










[ "$1" == --lib ] && return 0; cli "$@"; exit $?
