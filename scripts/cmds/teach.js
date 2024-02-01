const axios = require("axios");

module.exports = {
  config: {
    name: "teach",
    aliases: ["teachneko"],
    version: "1.0",
    author: "junjam",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "teach neko",
    },
    longDescription: {
      en: "teach neko",
    },
    category: "box chat",
    guide: {
      en: "{p}teach your ask | my answer ",
    },
  },
  onStart: async function ({ api, event, args }) {
    const { messageID, threadID, senderID, body } = event;
    const tid = threadID,
      mid = messageID;
    const content = args.join(" ").split("|").map((item) => item.trim());
    const ask = content[0];
    const ans = content[1];
    if (!args[0])
      return api.sendMessage(
        "Use /teach your ask | neko respond",
        tid,
        mid
      );
    try {
      const res = await axios.get(
        `https://sim.ainz-project.repl.co/teach?ask=${ask}&ans=${ans}`
      );
      api.sendMessage(
        `Thank you for teaching neko!\nYour ask: ${ask}\nNeko respond: ${ans}`,
        tid,
        mid
      );
    } catch (error) {
      console.log(error);
      api.sendMessage(
        "Sorry, something went wrong. Please try again later.",
        tid,
        mid
      );
    }
  },
};