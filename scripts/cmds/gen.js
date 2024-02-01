const axios = require('axios');

module.exports = {
  config: {
    name: "gen",
    aliases: ["generate","imagine"],
    version: "1.1",
    author: "JARiF",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: 'Type -gen with your prompts | (number which model do you want)\nHere are the Supported models:\n1. Analog-diffusion-1.0\n2. Anythingv3_0\n3. Anything-v4.5\n4. Anything-V5\n5. AOM3A3_Orangemix\n6. Deliberate_v2\n7. Dreamlike-diffusion-1.0\n8. Dreamlike-diffusion-2.0\n9. Dreamshaper_5BakedVae\n10. Dreamshaper_6BakedVae\n11. Dreamshaper_7\n12. Elldreths-vivid-mix\n13. Lyriel_v15\n14. Lyriel_v16\n15. Mechamix_v10\n16. Meinamix_meinaV9\n17. Openjourney_V4\n18. Portrait+1.0\n19. PortraitPlus_V1.0\n20. Realistic_Vision_V1.4\n21. Realistic_Vision_V2.0\n22. Realistic_Vision_V4.0\n23. RevAnimated_v122\n24. Riffusion-Model-V1\n25. Sdv1_4\n26. V1-5\n27. ShoninsBeautiful_v10\n28. Theallys-mix-ii\n29. Timeless-1.0\n30. EimisAnimeDiffusion_V1.0\n31. Meinamix_v11'
    }
  },

  onStart: async function ({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = "22";  
    }

    let id; 

    message.reply("✅| Creating your Imagination...").then((info) => {
      id = info.messageID;  
    });

    try {
      const API = `https://gen.blackxlegend1.repl.co/imagine?model=${model}&prompt=${encodeURIComponent(prompt)}&apikey=emma_heesters_quiin`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed to generate your imagination.").then(() => {
        message.delete(id);
      });
    }
  }
};
