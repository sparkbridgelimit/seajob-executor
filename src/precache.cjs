const manifest = require('./manifest.json');

async function precache(page) {
  const tasks = [];

  // 预加载 CSS 文件
  if (manifest.styles) {
      for (const style of manifest.styles) {
        const task = page.addStyleTag({ url: style });
        tasks.push(task);
      }
  }

  // 预加载 JavaScript 文件
  if (manifest.scripts) {
      for (const script of manifest.scripts) {
        const task = page.addScriptTag({ url: script });
        tasks.push(task);
      }
  }

  // 并行执行所有加载任务
  await Promise.all(tasks);
}

module.exports = { precache };