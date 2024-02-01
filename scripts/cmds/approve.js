const fs = require('fs-extra');

module.exports = {
  config: {
    name: "approve",
    version: "1.0",
    author: "JISHAN76",
    countDown: 0,
    role: 2,
    shortDescription: "Approve or delete a thread",
    longDescription: "",
    category: "admin",
    guide: {
      en: "{p}{n} <action> <threadID>"
    }
  },

  onStart: async function({ message, args }) {
    if (!args || args.length < 2) {
      return message.reply("Please provide an action ( add or del ) and a threadID.");
    }

    const action = args[0].toLowerCase();
    const threadID = args[1];

    try {
      let filepath = JSON.parse(fs.readFileSync('threads.json'));

      if (action === "add") {
        // Check if the threadID already exists
        if (filepath.includes(threadID)) {
          return message.reply("This threadID is already approved.");
        }

        filepath.push(threadID);

        message.reply(`ThreadID '${threadID}' has been approved.`);
      } else if (action === "del") {
        // Check if the threadID exists
        const index = filepath.indexOf(threadID);
        if (index === -1) {
          return message.reply("This threadID is not approved.");
        }

        filepath.splice(index, 1);

        message.reply(`ThreadID '${threadID}' has been deleted.`);
      } else {
        return message.reply("Invalid action. Please use add or del.");
      }

      fs.writeFileSync('threads.json', JSON.stringify(filepath, null, 2));
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing the action. Please try again later.");
    }
  }
};