#!/bin/bash

cd src/monaco
npm install
npm run dist
mkdir out
mv dist ../../out
cp index.html ../../out
