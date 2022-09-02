#!/bin/bash

npm install
npm audit fix
npm run build && mv dist out