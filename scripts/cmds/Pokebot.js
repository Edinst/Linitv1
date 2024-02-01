let fs = require("fs");
global.poke = {};
global.fff = [];

module.exports = {
  config: {
    name: "Pokebot",
    aliases: ["pokebot"],
    version: "1.0",
    author: "Samir Œ",
    countDown: 1,
    role: 0,
    shortDescription: "Run the Pokémon bot",
    longDescription: "",
    category: "Games",
    guide: "{pn} {{[on | off]}}",
    envConfig: {
      deltaNext: 5
    }
  },

  onStart: async function ({ message, event, threadsData, args }) {
    var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
    let pokebot = await threadsData.get(event.threadID, "settings.pokebot");

    if (pokebot === undefined) {
      await threadsData.set(event.threadID, true, "settings.pokebot");
    }
    console.log(await threadsData.get(event.threadID, "settings.pokebot"));
    if (!["on", "off"].includes(args[0])) return message.reply("Turn on or off?");
    await threadsData.set(event.threadID, args[0] === "on", "settings.pokebot");
    if (args[0] == "on") {
      if (!pokedb.hasOwnProperty(event.threadID)) {
        pokedb[event.threadID] = { taken: [], usdata: {} };
        fs.writeFile('pokedb.json', JSON.stringify(pokedb), err => {
          if (err) return console.error(err);
        });
      }
    }
    return message.reply(`Pokémon bot has been ${args[0] === "on" ? "enabled" : "disabled"} 🐍✅`);
  },

  onChat: async function ({ api, threadsData, usersData, event, message, commandName }) {
    var pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));
    var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));

    const pokebot = await threadsData.get(event.threadID, "settings.pokebot");
    if (!pokebot)
      return;

    if (!global.poke.hasOwnProperty(event.threadID)) {
      global.poke[event.threadID] = 1;
    }
    global.poke[event.threadID]++;
    if (global.poke[event.threadID] == 1) {
      let time = 1; // Change the time value to 5 for 5 minutes
      console.log(`Waifu timer started for ${time} minutes`);
      setTimeout(async function () {
        let ind = getRandom(pokos, pokedb[event.threadID].taken);
        try {
          const form = {
            body: "A wild Pokemon appeared! Add them to your Pokemon collection by replying with the Pokemon name.",
            attachment: await global.utils.getStreamFromURL(pokos[ind].image)
          };
          message.send(form, (err, info) => {
            global.fff.push(info.messageID);
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              mid: info.messageID,
              name: pokos[ind].name,
              ind: ind
            });
          });
          global.poke[event.threadID] = 0;
        } catch (e) {
          console.log(e);
          message.reply('Server busy. Please try again later.');
        }
      }, time * 1);
    }
  },

  onReply: async ({ event, api, Reply, message, getLang }) => {
    var pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));
    var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));

    if (Reply.name == event.body.toLowerCase() || Reply.name.split("-")[0] == event.body.toLowerCase()) {
      message.unsend(Reply.mid);
      pokedb[event.threadID].taken.push(Reply.ind);

      if (!pokedb[event.threadID].usdata.hasOwnProperty(event.senderID)) {
        pokedb[event.threadID].usdata[event.senderID] = [];
      }

      pokedb[event.threadID].usdata[event.senderID].push(Reply.name);

      fs.writeFile('pokedb.json', JSON.stringify(pokedb), err => {
        if (err) return console.error(err);
      });

      message.reply({
        body: "Well done! " + Reply.name + " is now in your Pokedex.",
        attachment: await global.utils.getStreamFromURL(pokos[Reply.ind].image)
      });
    } else {
      message.send("Wrong answer.");
    }
  }
};

function getRandomInt(arra) {
  return Math.floor(Math.random() * arra.length);
}

function getRandom(arra, excludeArrayNumbers) {
  let randomNumber;

  if (!Array.isArray(excludeArrayNumbers)) {
    randomNumber = getRandomInt(arra);
    return randomNumber;
  }

  do {
    randomNumber = getRandomInt(arra);
  } while ((excludeArrayNumbers || []).includes(randomNumber));

  return randomNumber;
}