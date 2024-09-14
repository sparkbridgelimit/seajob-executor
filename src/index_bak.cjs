const { main: start } = require("./boss.cjs");

console.log("Starting script...");
console.log('CHROME_PATH: ', process.env.CHROME_PATH);

console.log('wt2Cookie: ', process.env.wt2_cookie);

const keyword = process.env.keyword || "产品经理";
const city_code = process.env.city_code || "101280600";
const salary_range = process.env.salary_range || "[10, 30]";
const key_kills = process.env.key_kills || "[]";
const exclude_company = process.env.exclude_company || '[]';
const exclude_job = process.env.exclude_job || "[]";
const wt2Cookie = process.env.wt2_cookie;
const targetNum = process.env.target_num || 1;
const helloTxt = process.env.hello_txt || "你好";
const headless = process.env.headless || 'true';
const job_task_id = process.env.job_task_id || '';

console.log('wt2Cookie: ', process.env.wt2_cookie);

// const helloTxt = `你好~~ 我是一个具备6年后端经验、5年前端经验的后端工程师。在过去的五年中，我曾在蚂蚁集团的证券和支付领域从事Java后端开发工作，积累了复杂分布式微服务系统下高可用、高并发架构设计的能力，同时具备金融级大数据开发的经验。 希望有机会可以详细了解一下`;

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
  job_task_id
  // excludeCompanies: [
  //   "字节跳动",
  //   "蚂蚁",
  //   "蚂蚁集团",
  //   "字节",
  //   "腾讯",
  //   "阿里巴巴",
  //   "灵变",
  //   "灵变科技",
  //   "Shopee",
  //   "SHEIN",
  //   "Xmind",
  //   "霏诺威云科技",
  //   "深圳霏诺威云科技",
  //   "霏诺威",
  // ],
});
