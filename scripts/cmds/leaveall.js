const fs = require('fs');

module.exports = {
  config: {
    name: "leaveall",
    aliases: ["approveonly"],
    version: "1.0",
    author: "JARiF x MAHIR",
    countDown: 5,
    role: 2,
    category: "owner"
  },
  onStart: async function ({ api, args, message, event }) {
    const approveList = JSON.parse(fs.readFileSync('groups.json', 'utf8'));

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const botUserID = api.getCurrentUserID();

    const unapprovedThreads = [];
    
    const notificationTimeout = 5000; // 5 seconds

    for (const threadInfo of threadList) {
      if (threadInfo.isGroup && threadInfo.threadID !== event.threadID && !approveList.includes(threadInfo.threadID)) {
        unapprovedThreads.push(threadInfo.name || threadInfo.threadID);

        // Send notification before leaving after the timeout
        setTimeout(() => {
          const notificationMessage = ` your groups need approval talk my owner for get approval`;
          api.sendMessage(notificationMessage, threadInfo.threadID);

          // Remove user from group after sending the notification
          setTimeout(() => {
            api.removeUserFromGroup(botUserID, threadInfo.threadID);
          }, notificationTimeout);
        }, notificationTimeout);
      }
    }

    if (unapprovedThreads.length > 0) {
      const unapprovedMessage = `Successfully left from groups that aren't approved.`;
      api.sendMessage(unapprovedMessage, event.threadID);
    } else {
      api.sendMessage("No unapproved groups found.", event.threadID);
    }
  }
}