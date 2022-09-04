#!/bin/bash

cd monaco
npm install
npm run dist
mv dist ../out
cp index.html ../out
