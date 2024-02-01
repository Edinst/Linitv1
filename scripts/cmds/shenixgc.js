module.exports = {
  config: {
    name: "shenixgc",
    version: "1.0",
    author: "langit",
    role: 0,
    shortDescription: {
      en: "Adds the user to Supportgc."
    },
    longDescription: {
      en: "Adds the user to Supportgc."
    },
    category: "System",
    guide: {
      en: "Use {p} supportgc to join support box"
    }
  },
  onStart: async function ({ api, event, args }) {
    const threadID = "6658646420863253"; // ID of the thread to add the user to

    try {
      await api.addUserToGroup(event.senderID, threadID);
      api.sendMessage("You have been added to the group chat. Please check your Spam or Message Request folder if you can't find the supportgc.", event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage("Failed to add you to the supportgc.", event.senderID);
    }
  }
};