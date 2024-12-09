let logs = [];

function myLog(...args) {
  let str = args.join(" ");
  // if (str.includes("略过")) ignoreNum++;

  logs.push(`${str}`);
  console.log(...args);
}

const sendMsg = (type, payload = {}) => {
  if (!type) return;

  const stdIOMsg = {
    type,
    payload
  }
  myLog(`json_result:${JSON.stringify(stdIOMsg)}`);
}

module.exports = {
  sendMsg,
  myLog
}