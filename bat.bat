cd D:\github\stellargo\soroban\geo_drop

# Clean old build files
cargo clean

# Delete lock file (Windows)
del Cargo.lock

# Update dependencies with new version
cargo update

# Build the contract
cargo build --release

# Run tests
cargo test