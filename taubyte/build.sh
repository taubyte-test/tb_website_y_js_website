#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

#!/bin/bash

cd monaco
npm install
npm run dist
mkdir ../out
cp -r dist/* ../out
cp index.html ../out

cd ..
cp -r monaco out
