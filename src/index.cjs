const { main: start } = require("./boss.cjs");
const { open } = require("./open.cjs");

console.log("Starting script...");

// 提取启动参数
const args = process.argv.slice(2);
console.log("args: ", args);
if (args.length === 0) {
  console.error("No arguments provided.");
  process.exit(1);
}

// 解析启动参数
let params;
try {
  params = JSON.parse(args[0]);
} catch (e) {
  console.error("Invalid JSON arguments.");
  process.exit(1);
}

const { user_data_dir, chrome_path, task, payload, headless } = params;

console.log("Parameters parsed successfully:", {
  user_data_dir,
  chrome_path,
  task,
  payload,
});

// 检查必要参数
if (!user_data_dir || !chrome_path || !task || !payload) {
  console.error(
    "Missing required parameters: user_data_dir, chrome_path, task, payload."
  );
  process.exit(1);
}

process.env.CHROME_PATH = chrome_path;
process.env.cache_dir = user_data_dir;

if (task === "open_browser") {
  open({
    headless,
    user_data_dir,
    executablePath: chrome_path,
    url: payload.url
  });
} else {
  let payloadObj = payload;

  // 从 payloadObj 提取字段
  const keyword = payloadObj.keyword || "产品经理";
  const city_code = payloadObj.city_code || "101280600";
  const salary_range = payloadObj.salary_range || "[10, 30]";
  const key_kills = payloadObj.key_kills || "[]";
  const exclude_company = payloadObj.exclude_company || "[]";
  const exclude_job = payloadObj.exclude_job || "[]";
  const wt2Cookie = payloadObj.wt2_cookie || null;
  const targetNum = payloadObj.target_num || 1;
  const helloTxt = payloadObj.hello_txt || "你好";
  const headless = payloadObj.headless || "true";
  const job_task_id = payloadObj.job_task_id || "job_task_id";
  const timeout = payloadObj.timeout || "5000";

  console.log("Extracted values:", {
    keyword,
    city_code,
    salary_range,
    key_kills,
    exclude_company,
    exclude_job,
    wt2Cookie,
    targetNum,
    helloTxt,
    headless,
    job_task_id,
  });

  start({
    queryParams: {
      query: keyword,
      city: city_code,
      page: 1,
    },
    helloTxt,
    wt2Cookie,
    targetNum,
    salaryRange: JSON.parse(salary_range || "[]"),
    // 服务端存的是秒
    timeout: timeout * 1000,
    // true的时候不会打开浏览器
    headless: headless === "false",
    excludeCompanies: JSON.parse(exclude_company),
    excludeJobs: JSON.parse(exclude_job),
    keySkills: JSON.parse(key_kills),
    job_task_id,
  });
}
