const axios = require('axios');
module.exports = {
  config: {
    name: "item",
    author: "jun| Samuel Kâñèñgeè",
    countDown: 2,
    role: 0,
    shortDescription: "Buy and exchange item",
    category: "economy",
    guide: {
      en: "{pn} show\n{pn} buy\n{pn} share\n{pn} sell\n{pn} price"
    }
  },
  onStart: async function ({ message, api, event, args, usersData }) {
    const c = this.config.name;
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);
    const jun = "yourboss12";
    const { senderID } = event;
    const id = senderID;
    const userData = await usersData.get(id);
    const userMoney = await usersData.get(id, "money");
    if (args.length === 0) {
      message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
Item command usage:\n\n◽${p}${c} show\n\n-shows your item\n\n◽${p}${c} buy <item> <total>\n\nexample usage:\n${p}${c} buy 💎Diamond 2\n◽${p}${c} share <item> <amount> <uid>\n\nexample usage:\n\n${p}${c} share 🏅Gold 3 61550337191223\n\n◽${p}${c} price\n\n-shows item price list\n\n◽${p}${c} sell\n\nusage: ${p}${c} <item> <amount>\n\n╚════ஜ۩۞۩ஜ═══╝`);
      return;
    } 
if (args.length < 1 || (args[0] !== 'share' && args[0] !== 'buy' && args[0] !== 'price' && args[0] !== 'show' && args[0] !=='sell')) {
  message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
invalid command usage please use\n${p}${c} share\n${p}${c} buy\n${p}${c} price\n${p}${c} show\n\n╚════ஜ۩۞۩ஜ═══╝`);
  return;
} else if (args[0] === 
"price") { 
  message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nprice list\n\n💎Diamond = 10m\n\n🏅Gold = 5m\n\n🥈Silver = 1m\n\n╚════ஜ۩۞۩ஜ═══╝");
return;
} 

if (args[0] === "sell") {
  const items = ["silver", "gold", "diamond"];
  const itm = args[1];
  
  if (!items.includes(itm)) {
    message.reply("╔════ஜ۩۞۩ஜ═══╗\n\ninvalid item\navailable items to sell: gold, silver, diamond\n\n╚════ஜ۩۞۩ஜ═══╝");
    return;
  }
  
  const item = args[1];
  const amount = parseInt(args[2]);
    const response = await axios.get(`https://api-test.${jun}.repl.co/item/itm?id=${event.senderID}`);
    const funds = response.data;
    
    const prices = {
      diamond: 100000,
      gold: 50000,
      silver: 10000
    };
    
    const totalPrice = prices[item] * amount;
    
    if (amount <= funds[item]) {
      usersData.set(event.senderID, {
        money: userData.money + totalPrice
      });
      
      await axios.get(`https://api-test.${jun}.repl.co/item?id=${event.senderID}&item=${item}&delete=${amount}`);
      
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nSuccessfully sold ${amount} ${item} for ${totalPrice}\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID, event.messageID);
    } else {
      api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\nYou don't have enough ${item} to sell\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID, event.messageID);
      return;
    }
}
     if (args[0] === "show") {
      const response = await axios.get(`https://api-test.${jun}.repl.co/item/itm?id=${id}`);
      const { silver = 0, diamond = 0, gold = 0 } = response.data;
      const s = silver * 10000;
      const d = diamond * 100000;
      const g = gold * 50000;
      const t = s + d + g;
      const f = t.toLocaleString();
      const msg = `╔════ஜ۩۞۩ஜ═══╗\n\n
your item:\n🥈Silver: ${silver}\n💎Diamond: ${diamond}\n🏅Gold: ${gold}\ntotal value: $${f}\n\n╚════ஜ۩۞۩ஜ═══╝`;
      api.sendMessage(msg, event.threadID, event.messageID); 
      return;
    } else if (args[0] === "buy") {
  if (args.length <3) {
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
invalid usage\n please use ${p}${c} buy <item> <amount>
\n\n╚════ஜ۩۞۩ஜ═══╝`);
return;
}
      const item = args[1];
      const total = parseInt(args[2]);
      let price;
      switch (item) {
        case "gold":
          price = 50000;
          break;
        case "silver":
          price = 10000;
          break;
        case "diamond":
          price = 100000;
          break;
        default:
          message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nInvalid item\navailable items are\n🏅Gold\n🥈Silver\n💎Diamond\n\n╚════ஜ۩۞۩ஜ═══╝");
          return;
      }
      if (userMoney < price * total) {
        message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
You don't have enough balance to buy ${item}\n\n╚════ஜ۩۞۩ஜ═══╝`);
        return;
      }
      try {
        await axios.get(`https://api-test.${jun}.repl.co/item?id=${id}&item=${item}&total=${total}`);
        usersData.set(id, {
          money: userData.money - (price * total),
          data: userData.data
        });        api.sendMessage(`Successfully bought ${total} ${item}`, event.threadID, event.messageID);
        return;
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred", event.threadID, event.messageID);
      }
    } else if (args[0] === "share") {
  const Items = ["silver", "gold", "diamond"];
  const itm = args[1];
  if (!Items.includes(itm)) {
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
invalid item\navailable item\n🥈Silver\n🏅Gold\n💎Diamond\n\n╚════ஜ۩۞۩ஜ═══╝`);
    return;
  }  
  const amount = parseInt(args[2]);
  const uid = parseInt(args[3]);
  if (isNaN(amount) || isNaN(uid)) {
    message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n
invalid usage\n please use ${p}${c} share <item> <amount> <uid>\n\n╚════ஜ۩۞۩ஜ═══╝`);
    return;
  }
      const item = args[1];
      const total = parseInt(args[2]);
      const shareId = parseInt(args[3]);
const user = await usersData.get(shareId);
const name = user.name;

      try {
        const response = await axios.get(`https://api-test.${jun}.repl.co/item/itm?id=${event.senderID}`);
        const funds = response.data;
        if (funds[item] >= total) {
          await axios.get(`https://api-test.${jun}.repl.co/item?id=${shareId}&item=${item}&total=${total}`);
          await axios.get(`https://api-test.${jun}.repl.co/item?id=${event.senderID}&item=${item}&delete=${total}`);
          api.sendMessage(`Successfully shared ${total} ${item} to ${name}`, event.threadID, event.messageID);
        } else {
          api.sendMessage(`╔════ஜ۩۞۩ஜ═══╗\n\n
You don't have enough ${item} to share\n\n╚════ஜ۩۞۩ஜ═══╝`, event.threadID, event.messageID);
        }
      } catch (error) {
        console.error(error);
        api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nAn error occurred\n\n╚════ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
      }
    }
  }
};