const fs = require("fs-extra");

module.exports = {
  config: {
    name: "restart",
    version: "1.0",
    author: "NTKhang ",
    countDown: 5,
    role: 1,
    shortDescription: {
      vi: "Khởi động lại bot",
      en: "Restart bot"
    },
    longDescription: {
      vi: "Khởi động lại bot",
      en: "Restart bot"
    },
    category: "Owner",
    guide: {
      vi: " {pn}: Khởi động lại bot",
      en: " {pn}: Restart bot"
    }
  },
  
  langs: {
    vi: {
      restartting: "🔄 | Đang khởi động lại lina bot(beta)..."
    },
    en: {
      restartting: "🔄 | Restarting lina bot(beta)..."
    }
  },
  
  onLoad: function ({ api }) {
    const pathFile = `${__dirname}/tmp/restart.txt`;
    if (fs.existsSync(pathFile)) {
      const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
      api.sendMessage(`✅ | lina bot has been restarted
\ | Time: ${(Date.now() - time) / 1000}s`, tid)
      \? | api: ${botLatency};
      fs.unlinkSync(pathFile);
    }
  },
  
  onStart: async function ({ message, event, getLang, startTime }) {
    const botLatency = Date.now() - startTime;
    const pathFile = `${__dirname}/tmp/restart.txt`;
    fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
    await message.reply(getLang("restartting"));
    process.exit(2);
  }
};