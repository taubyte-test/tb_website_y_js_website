#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

#!/bin/bash

cd monaco
npm install
npm run dist
cp index.html ../../out

cd ..
cp -r monaco ../out
