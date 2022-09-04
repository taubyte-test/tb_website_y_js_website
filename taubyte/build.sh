#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

cd monaco
npm install
npm run dist
mkdir ../out
mv dist ../out
cp index.html ../out
