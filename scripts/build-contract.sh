#!/bin/bash

echo "===================================="
echo "Building Soroban Smart Contract"
echo "===================================="
echo ""

cd sorbon/geo_drop

echo "Step 1: Building WASM..."
cargo build --target wasm32-unknown-unknown --release
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi

echo ""
echo "Step 2: Optimizing WASM..."
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/geo_drop.wasm
if [ $? -ne 0 ]; then
    echo "ERROR: Optimization failed!"
    exit 1
fi

echo ""
echo "===================================="
echo "✅ Smart contract built successfully!"
echo "===================================="
echo ""
echo "WASM file location:"
echo "sorbon/geo_drop/target/wasm32-unknown-unknown/release/geo_drop.wasm"
echo ""
echo "Next steps:"
echo "1. Deploy the contract: soroban contract deploy --wasm target/wasm32-unknown-unknown/release/geo_drop.wasm --source deployer --network testnet"
echo "2. Copy the contract ID and add it to .env.local as NEXT_PUBLIC_SOROBAN_CONTRACT_ID"
echo "3. Initialize the contract with a token address"
echo ""

cd ../..
