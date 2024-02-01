module.exports = {
  config: {
    name: "test2",
    author: "Jarif's api",
    category: "ai image"
  },
  onStart: async function ({ message, api, args }) {
    const j = args.join(" ");
    message.reply({
      attachment: await global.utils.getStreamFromURL(`https://fuck-sadman.jarif00.repl.co/generate?prompt=${j}&model=3&ratio=3`)
    });
  }
};