#!/usr/bin/env bash

src_dir="src"
out_dir="dist"

tsc && cp ${src_dir}/*.css $out_dir
