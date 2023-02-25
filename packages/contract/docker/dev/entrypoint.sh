#!/bin/bash

# Install
npm i

# Start hardhat node then deploy the contract
npm run node & sleep 4 && npm run deploy:localhost:watch
