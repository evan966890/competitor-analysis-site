#!/bin/sh
set -eu

eval_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
eval_tmp=$(mktemp -d "${TMPDIR:-/tmp}/harness-eval-verify.XXXXXX")
trap 'rm -rf -- "$eval_tmp"' EXIT HUP INT TERM

cp -R "$eval_dir/fixture/." "$eval_tmp/"
git -C "$eval_tmp" apply "$eval_dir/expected-fix.patch"
npm test --prefix "$eval_tmp"
