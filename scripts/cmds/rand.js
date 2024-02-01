module.exports = {
  config: {
    name: "random",
    aliases: ["rnd","rand"],
    version: "1.1",
    author: "Riley",
    countDown: 3,
    role: 0,
    longDescription: "Choose a random text",
    category: "Miscellaneous",
    guide: {
      en: "{p}random <text1>, <text2>, ..."
    }
  },
  onStart: async function ({ message, args }) {
    if (args.length < 2) {
      return message.reply("Send 2 texts for random selection, you idiot. For example: !random me love you, you love me");
    }

    const kataKata = args.join(" ").split(",");
    const pilihan = kataKata[Math.floor(Math.random() * kataKata.length)];

    return message.reply(`Lina has chose:${pilihan.toUpperCase()}.`);
  }
};