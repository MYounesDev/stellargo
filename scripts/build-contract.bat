@echo off
echo ====================================
echo Building Soroban Smart Contract
echo ====================================
echo.

cd sorbon\geo_drop

echo Step 1: Building WASM...
cargo build --target wasm32-unknown-unknown --release
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    exit /b %errorlevel%
)

echo.
echo Step 2: Optimizing WASM...
soroban contract optimize --wasm target\wasm32-unknown-unknown\release\geo_drop.wasm
if %errorlevel% neq 0 (
    echo ERROR: Optimization failed!
    exit /b %errorlevel%
)

echo.
echo ====================================
echo ✅ Smart contract built successfully!
echo ====================================
echo.
echo WASM file location:
echo sorbon\geo_drop\target\wasm32-unknown-unknown\release\geo_drop.wasm
echo.
echo Next steps:
echo 1. Deploy the contract: soroban contract deploy --wasm target\wasm32-unknown-unknown\release\geo_drop.wasm --source deployer --network testnet
echo 2. Copy the contract ID and add it to .env.local as NEXT_PUBLIC_SOROBAN_CONTRACT_ID
echo 3. Initialize the contract with a token address
echo.

cd ..\..
