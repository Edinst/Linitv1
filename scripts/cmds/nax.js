const axios = require("axios");

module.exports = {
  config: {
    name: 'nax',
    version: '2.0',
    author: 'Ohio03',
    countDown: 5,
    role: 0,
    shortDescription: 'Nax AI',
    longDescription: {
      vi: 'Chat với Nax!',
      en: 'Chat With Nax!'
    },
    category: 'AI',
    guide: {
      vi: '{pn} [on | off]: bật/tắt Nax!'
        + '\'\n'
        + '\n{pn} <word>: Chat nhanh với Nax!'
        + '\nVí dụ:\ {pn} Ayooo Homie!',
      en: '{pn} <word>: Chat With Nax!'
        + '\nExample:\ {pn} Ayooo Homie!'
    }
  },
  langs: {
    vi: {
      turnedOn: 'Bật Nax thành công!',
      turnedOff: 'Tắt Nax thành công!',
      chatting: 'Đang chat với Nax...',
      error: 'Nax đang bận, bạn hãy thử lại sau'
    },
    en: {
      turnedOn: 'Turned on Nax successfully!',
      turnedOff: 'Turned off Nax successfully!',
      chatting: 'Already Chatting with Nax...',
      error: 'Huh?'
    }
  },
  onStart: async function ({ args, threadsData, message, event, getLang }) {
    if (args[0] == 'on' || args[0] == 'off') {
      await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
      return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getMessage(yourMessage);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        console.log(err);
        return message.reply(getLang("error"));
      }
    }
  },
  onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
    if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.simsimi"))) {
      try {
        const langCode = (await threadsData.get(event.threadID, "settings.lang")) || global.GoatBot.config.language;
        const responseMessage = await getMessage(args.join(" "), langCode);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        return message.reply(getLang("error"));
      }
    }
  }
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${yourMessage}&filter=false`);
		if (!res.data.success) {
			throw new Error('API returned a non-successful message');
		}
		return res.data.success;
	} catch (err) {
		console.error('Error while getting a message:', err);
		throw err;
	}
      }