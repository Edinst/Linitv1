const fs = require("fs")
const jimp = require("jimp")
module.exports = {
  config: {
    name: "pairv2",
    aliases: ["match"],
    version: "1.0",
    author: "Samuel",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Find a random pair in your group."
    },
    longDescription: {
      en: "Use this command to randomly match two people in the gc."
    },
    category: "reply",
    guide: {
      en: "To use this command, simply type $pair or $match in the chat. The bot will select two random people in the group and display their names."
    }
  },
  onStart: async function ({ api, event, args }) {
    // Get a list of group members
    const groupMembers = await api.getThreadInfo(event.threadID, true);
    // Filter out the bot's ID and any inactive members
    const activeMembers = groupMembers.participantIDs.filter((id) => id !== api.getCurrentUserID() && groupMembers.nicknames[id] !== null);
    // Choose two random members from the active members list
    const pair = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * activeMembers.length);
      pair.push(activeMembers.splice(randomIndex, 1)[0]);
    }
    // Get the nicknames of the selected members
    const nicknames = pair.map((id) => groupMembers.nicknames[id]);
    // Display the pair in the chat
    const name1 = nicknames[0];
    const name2 = nicknames[1];
    const attachment = await global.utils.getStreamFromURL("avatar");
    api.sendMessage({ body: `The pair for today is ${name1} and ${name2}`, attachment }, event.threadID);
  }
};