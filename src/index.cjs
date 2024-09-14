const { main: start } = require("./boss2.cjs");

console.log("Starting script...");

const keyword = process.env.keyword || "产品经理";
const city_code = process.env.city_code || "101280600";
const salary_range = process.env.salary_range || "[10, 30]";
const key_kills = process.env.key_kills || "[]";
const exclude_company = process.env.exclude_company || '[]';
const exclude_job = process.env.exclude_job || "[]";
const wt2Cookie = process.env.wt2_cookie;
// const wt2Cookie = process.env.wt2_cookie || "DDa8j0tAEmkPUX4o0y-rvA5TmRT81ZO1W50XcO7ed48A1PY74_zfmxiep-KssgRPaCz08saRZyg3wPSSJshbGtg~~";
const targetNum = process.env.target_num || 1;
const helloTxt = process.env.hello_txt || "你好";
const headless = process.env.headless || 'true';
const job_task_id = process.env.job_task_id || 'job_task_id';

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
  timeout: "10000",
  // true的时候不会打开浏览器
  headless: headless === 'true',
  excludeCompanies: JSON.parse(exclude_company),
  excludeJobs: JSON.parse(exclude_job),
  keySkills: JSON.parse(key_kills),
  job_task_id,
});
