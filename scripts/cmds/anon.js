const { getStreamsFromAttachment } = global.utils;
const mediaTypes = ["photo", "png", "animated_image", "video", "audio"];

module.exports = {
	config: {
		name: "anon",
		version: "1.5",
		author: "jun",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "",
			en: "send message to thread or users"
		},
		category: "conta",
		guide: {
			vi: "{pn}",
			en: "{pn} threadid or uid <message>"
		}
	},

	langs: { 
		en: {
			success: "Sent message successfully",
			failed: "Failed to send message"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
		if (!args[0])
			return message.reply("Please provide the threadid or uid and message.");

		const { senderID, threadID, isGroup } = event;
		const senderName = await usersData.getName(senderID);
		const threadName = isGroup ? (await threadsData.get(threadID)).threadName : "User Direct Message";

		const msg = `Message from ${senderName} in ${threadName}:\n\n${args.slice(1).join(" ")}\n\nReply to this message to continue the conversation.`;

		const formMessage = {
			body: msg,
			mentions: [{
				tag: senderName,
				id: senderID
			}],
			attachment: await getStreamsFromAttachment(
				[...event.attachments, ...(event.messageReply?.attachments || [])]
					.filter(item => mediaTypes.includes(item.type))
			)
		};

		const successIDs = [];
		const failedIDs = [];

		for (const uid of args[0].split(",")) {
			try {
				const messageSend = await api.sendMessage(formMessage, uid);
				successIDs.push(uid);
				global.GoatBot.onReply.set(messageSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "u"
				});
			} catch (err) {failedIDs.push(uid);
			}
		}

		let msg2 = ""; 
		if (successIDs.length > 0) {
			msg2 += getLang("success") + " " + successIDs.length + ": " + successIDs.join(", ") + "\n";
		}
		if (failedIDs.length > 0) {
			msg2 += getLang("failed") + " " + failedIDs.length + ": " + failedIDs.join(", ");
		}
		return message.reply(msg2);
	},

	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const threadName = (await api.getThreadInfo(threadID)).name;
		const isGroup = threadID !== event.senderID;

		switch (type) {
			case "u": {
				const formMessage = {
					body: `Replied by ${senderName} from ${threadName}:\n\n================\n${args.join(" ")}\n\nReply to this message to continue the conversation.`,
					mentions: [{
						tag: senderName,
						id: event.senderID
					}],
					attachment: await getStreamsFromAttachment(event.attachments.filter(item => mediaTypes.includes(item.type)))
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err) {
						message.err(err);
						return;
					}
					message.reply("Your reply has been sent successfully.");
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				const sendByGroup = isGroup ? `Sent by ${senderName} from ${threadName}` : "";

				const formMessage = {
					body: `Replied by ${senderName}\n===============\n${args.join(" ")}\n\n\nReply to this message to continue the conversation.`,
					mentions: [{
						tag: senderName,
						id: event.senderID
					}],
					attachment: await getStreamsFromAttachment(event.attachments.filter(item => mediaTypes.includes(item.type)))
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err) {
						message.err(err);
						return;
					}
					message.reply("Your reply has been sent successfully.");
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
		}
	}
};