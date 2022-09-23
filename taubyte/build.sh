#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

#!/bin/bash

cd monaco
npm install
npm run dist
mv index.html ${OUT}/index.html

cd ..
cp -r monaco/* ${OUT}
