const axios = require('axios');

module.exports = {
	config: {
		name: "say",
		aliases: ["say"],
		version: "1.0",
		author: "@tas33n",
		countDown: 5,
		role: 0,
		shortDescription: "say something",
		longDescription: "",
		category: "Entertainment",
		guide: "{pn} {{<say>}}"
	},

	onStart: async function ({ api, message, args, event}) {
    let lng = "en"
    let say;
		if(ln.includes(args[0])){
      lng = args[0]
      args.shift()
      say = encodeURIComponent(args.join(" "))
    } else{ say = args.join(" ")}
			try {
				let url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lng}&client=tw-ob&q=${say}`


        message.reply({body:"",
				attachment: await global.utils.getStreamFromURL(url)
                      })
				
					
			} catch (e) {
        console.log(e)
        message.reply(`🥺 server busy `) }

	}
};








































const ln = [
  "ab",
  "aa",
  "af",
  "ak",
  "sq",
  "am",
  "ar",
  "an",
  "hy",
  "as",
  "av",
  "ae",
  "ay",
  "az",
  "bm",
  "ba",
  "eu",
  "be",
  "bn",
  "bh",
  "bi",
  "bs",
  "br",
  "bg",
  "my",
  "ca",
  "km",
  "ch",
  "ce",
  "ny",
  "zh",
  "cu",
  "cv",
  "kw",
  "co",
  "cr",
  "hr",
  "cs",
  "da",
  "dv",
  "nl",
  "dz",
  "en",
  "eo",
  "et",
  "ee",
  "fo",
  "fj",
  "fi",
  "fr",
  "ff",
  "gd",
  "gl",
  "lg",
  "ka",
  "de",
  "ki",
  "el",
  "kl",
  "gn",
  "gu",
  "ht",
  "ha",
  "he",
  "hz",
  "hi",
  "ho",
  "hu",
  "is",
  "io",
  "ig",
  "id",
  "ia",
  "ie",
  "iu",
  "ik",
  "ga",
  "it",
  "ja",
  "jv",
  "kn",
  "kr",
  "ks",
  "kk",
  "rw",
  "kv",
  "kg",
  "ko",
  "kj",
  "ku",
  "ky",
  "lo",
  "la",
  "lv",
  "lb",
  "li",
  "ln",
  "lt",
  "lu",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "gv",
  "mi",
  "mr",
  "mh",
  "ro",
  "mn",
  "na",
  "nv",
  "nd",
  "ng",
  "ne",
  "se",
  "no",
  "nb",
  "nn",
  "ii",
  "oc",
  "oj",
  "or",
  "om",
  "os",
  "pi",
  "pa",
  "ps",
  "fa",
  "pl",
  "pt",
  "qu",
  "rm",
  "rn",
  "ru",
  "sm",
  "sg",
  "sa",
  "sc",
  "sr",
  "sn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "st",
  "nr",
  "es",
  "su",
  "sw",
  "ss",
  "sv",
  "tl",
  "ty",
  "tg",
  "ta",
  "tt",
  "te",
  "th",
  "bo",
  "ti",
  "to",
  "ts",
  "tn",
  "tr",
  "tk",
  "tw",
  "ug",
  "uk",
  "ur",
  "uz",
  "ve",
  "vi",
  "vo",
  "wa",
  "cy",
  "fy",
  "wo",
  "xh",
  "yi",
  "yo",
  "za",
  "zu"
]