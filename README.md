export CHROME_PATH=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
node src/index.cjs

pnpx pkg . --public --target node16-macos-arm64 --output dist/seajob-executor-macos-arm64

xattr -d com.apple.quarantine dist/seajob-executor-macos-arm64

## 本地启动
### 浏览器检测
node src/index.cjs '{"user_data_dir":"/Users/aleksichen/Library/Application Support/com.seajob/user_cache/587051161916224","chrome_path":"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome","task":"open_browser","payload":{"url":"https://www.baidu.com/"},"headless":false,"auto_close":false}'