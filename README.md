export CHROME_PATH=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
node src/index.cjs

pnpx pkg . --public --target node16-macos-arm64 --output dist/seajob-executor-macos-arm64

xattr -d com.apple.quarantine dist/seajob-executor-macos-arm64