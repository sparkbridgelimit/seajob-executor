const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const { precache } = require("./precache.cjs");
const { myLog } = require("./utils.cjs");

puppeteer.use(stealthPlugin());

const context = {
  browser: null,
  page: null,
  headless: false,
  executablePath: "",
  user_data_dir: "./cache_dir",
  url: "",
};

/** 启动浏览器，写入 cookie */
async function initBrowserAndSetCookie() {
  const executablePath = context.executablePath;
  if (!executablePath) {
    throw new Error("CHROME_PATH environment variable is not set");
  }
  myLog("Executable path:", executablePath);
  const userDataDir = context.user_data_dir;

  myLog("userDataDir: ", userDataDir);

  context.browser = await puppeteer.launch({
    userDataDir: context.user_data_dir,
    headless: context.headless,
    defaultViewport: null,
    ignoreDefaultArgs: ['--enable-automation'],
    executablePath: context.executablePath,
    args: [
      '--disable-features=PortScanning',
      "--disable-infobars",
      "--start-maximized",
    ],
  });

  const [page] = await context.browser.pages();
  context.page = page;

  setupEventListeners();

  // 打开岗位页
  await context.page.goto(context.url, {
    waitUntil: "networkidle2",
  });
}


// 打开boss直聘
async function open(conf = {}) {
  Object.assign(context, conf);
  console.log(context);
  await initBrowserAndSetCookie();
}

/**
 * 设置事件监听器
 */
const setupEventListeners = () => {
  if (!context.browser) return;
  
  // 监听浏览器关闭
  context.browser.on("disconnected", () => {
    console.log("Browser has been closed. Exiting bee-headless...");
    process.exit(0); // 退出当前进程
  });

  if (context.page) {
    // 监听页面关闭
    context.page.on("close", () => {
      console.log("Page has been closed. Exiting bee-headless...");
      process.exit(0); // 退出当前进程
    });
  }
};

module.exports = { open };
