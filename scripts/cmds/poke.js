const fs = require("fs")



module.exports = {
	config: {
		name: "poke",
		version: "1.2",
		author: "Mero",
		countDown: 20,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "Pokemon",
		guide:{
     en: "{pn} pokename"
     },
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

let msg = args.join(" ")
if(!msg) return message.reply("Surely you are rose. Now enter any pokemon name")

var pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));

let poke = pokos.find(e => e.name==msg.toLowerCase() || e.name.split("-")[0] == msg.toLowerCase())

if(!poke) return message.reply(" pokemon not found")
				try {
					console.log(pokos.indexOf(poke))
message.reply({attachment:await global.utils.getStreamFromURL(poke.image)})
					
          
				} catch (e) {
					console.log(e)
					message.reply('server busy')
				}
			
		}
		
};