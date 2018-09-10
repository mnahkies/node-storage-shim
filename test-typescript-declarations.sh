#!/usr/bin/env bash

set -e

echo "Testing typescript declarations..."

cd ./test-typescript-declarations
npm install &> /dev/null
npm link ../ &> /dev/null
./node_modules/.bin/tsc &> /dev/null

if [ $(node ./test-typescript-declarations.js) != "bar" ]; then
    echo "Something went wrong"
    exit 1
else
    echo "Typescript Declaration is working"
    exit 0
fi
