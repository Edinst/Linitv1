const axios = require('axios');

module.exports = {
	config: {
		name: "car",
		version: "1.0",
		author: "tanvir",
		countDown: 31,
		role: 0,
		longDescription: {
			en: " get random car image/video"
     },
    category: "image",
    guide: {
      en: "{p}{n} "
    }
	},

	onStart: async function ({ message }) {
		const API_URL = `https://api.dev-tantrik.repl.co/cars?apikey=8ojsa5hFaGRryHj`;

		try {
			const response = await axios.get(API_URL);
			const carlink = response.data.url;

			if (carlink) {
				const form = {
					body: ``
				};
				form.attachment = await global.utils.getStreamFromURL(carlink);
				message.reply(form);
			} else {
				await message.reply('Failed to retrieve video/image');
			}
		} catch (e) {
			await message.reply('Error occurred while retrieving video/image');
			console.log(e);
		}
	}
};