const axios = require('axios');

module.exports = {
  config: {
    name: "ai2",
    aliases: [],
    version: 2.0,
    author: "Jun",
    shortDescription: "gpt-4",
    category: "ai"
  },
  onStart: async function ({ message, usersData, event, api, args }) {
    if (event.messageReply && event.messageReply.attachments) {
      const link = event.messageReply.attachments[0].url;
      const jun = "repl";
      try {
        const response = await axios.get(`https://api.whahhh.${jun}.co/apiv2/link?url=${encodeURIComponent(link)}`);
        const text = response.data.content;
        message.reply(text);
      } catch (error) {
        message.reply(error);
      }
    } else {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;
      const a = args.join(" ");
      const b = "repl";
      const apikey = `&name=${name}&id=${id}`; //dont modify this this is important, 50 request day per user
      try {
        const res = await axios.get(`https://api.whahhh.${b}.co/test?prompt=${a}${apikey}`);
        const m = res.data.result;
        const av = res.data.av;
        const array = [{ id: id, tag: name }];
        const g = m.replace(/{name}/g, name);
        if (av) {
          message.reply({
            body: g,
            mentions: array,
            attachment: await global.utils.getStreamFromURL(av)
          });
        } else {
          message.reply({
            body: g,
            mentions: array
          });
        }
      } catch (error) {
        message.reply(error);
      }
    }
  }
};