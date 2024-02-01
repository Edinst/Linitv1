const fs = require("fs-extra");
const moment = require("moment-timezone");

const lastRedeemTime = {};

module.exports = {
  config: {
    name: "redeem",
    version: "1.0",
    author: "Riley",
    countdown: 100,
    role: 0,
    shortdescription: {
      
      en: "."
    },
    longdescription: {
      
      en: "Redeem money"
    },
    category: "free",
    guide: {
      
      en: "{pn} <code>"
    }
  },
  onStart: async function ({ api, message, event, args, usersData }) {
    const redeemCode = "Lina_is_a_bestbot"; // Kode redeem
    const userSenderID = event.senderID;

    const lastRedeem = lastRedeemTime[userSenderID];
    const currentTime = moment.tz("Asia/Jakarta"); 

    if (lastRedeem && currentTime.diff(lastRedeem, 'days') < 7) {
      return message.reply("redeem again tomorrow with new redeem code.");
    }

    if (args[0] === redeemCode) {
      const rewardAmount = 1000000; 
      const userData = await usersData.get(userSenderID);

      await usersData.set(userSenderID, {
        money: userData.money + rewardAmount,
        data: userData.data
      });

      
      lastRedeemTime[userSenderID] = currentTime;

      return message.reply(`done \you got: ${rewardAmount}$`);
    } else {
      return message.reply("use a valid redeem code.");
    }
  }
};