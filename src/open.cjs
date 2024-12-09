const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const { precache } = require("./precache.cjs");
const { myLog } = require("./utils.cjs");

puppeteer.use(stealthPlugin());

let cookies = [
  {
    name: "wt2",
    value: "",
    domain: ".zhipin.com",
    httpOnly: true,
    secure: true,
  },
  {
    name: "wbg",
    value: "0",
    domain: ".zhipin.com",
    httpOnly: true,
    secure: true,
  },
];

const context = {
  browser: null,
  page: null,
  headless: false,
  executablePath: "",
  user_data_dir: "./cache_dir",
  url: "",
  wt2Cookie: "",
};

/** 启动浏览器，写入 cookie */
async function initBrowserAndSetCookie() {
  const executablePath = context.executablePath;
  if (!executablePath) {
    throw new Error("CHROME_PATH environment variable is not set");
  }
  myLog("Executable path:", executablePath);
  const userDataDir = context.user_data_dir;

  myLog("userDataDir:", userDataDir);

  context.browser = await puppeteer.launch({
    userDataDir: context.user_data_dir,
    headless: context.headless,
    defaultViewport: null,
    ignoreDefaultArgs: ["--enable-automation"],
    executablePath: context.executablePath,
    args: [
      "--disable-extensions",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--mute-audio",
      "--no-default-browser-check",
      "--disable-notifications",
    ],
  });

  const [page] = await context.browser.pages();
  context.page = page;

  // 获取并打印当前页面的 cookies
  const ex_cookies = await context.page.cookies();
  console.log("ex_cookies:", ex_cookies);

  await context.page.setCookie(...cookies);

  setupEventListeners();

  // 打开岗位页
  await context.page.goto(context.url, {
    waitUntil: "networkidle2",
  });
}

// 打开boss直聘
async function open(conf = {}) {
  Object.assign(context, conf);
  cookies[0].value = context.wt2Cookie;
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
