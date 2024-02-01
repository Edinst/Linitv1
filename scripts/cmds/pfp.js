module.exports = {
  config: {
    name: "pfp",
    version: "1.4",
    author: "mhm",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "",
    },
  },

  onStart: async function ({ event, message, usersData, args }) {
    const { findUid } = global.utils;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const regExMatchFB = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
    let avt;
    let uid;

    if (args.length > 0) {
      const arg = args.join(" ");
      if (regExMatchFB.test(arg)) {
        const username = regExMatchFB.exec(arg)[1];
        uid = await findUid(username);
        if (!uid) {
          message.reply({
            body: "Could not find the UID of the user on Facebook",
          });
          return;
        }
      } else {
        uid = Number(arg); // Convert the string to a number
      }
    } else if (event.mentions.length > 0) {
      const uid2 = event.mentions[0].id;
      uid = uid2;
    } else {
      uid = event.senderID;
    }

    avt = await usersData.getAvatarUrl(uid);

    message.reply({
      body: `UID: ${uid}`,
      attachment: await global.utils.getStreamFromURL(avt),
    });
  },
};