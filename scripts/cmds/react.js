module.exports = {
  config: {
    name: "react",
    version: "3.2",
    author: "sami génie 🎀",
    cooldown: 5,
    role: 0,
    shortDescription: "Réagit automatiquement avec emoji",
    longDescription: "Détecte un emoji dans le message et réagit avec le même",
    category: "fun",
    guide: "Fonctionne automatiquement via onChat"
  },

  onStart: async () => {},

  onChat: async ({ api, event }) => {
    const { body, messageID } = event;
    if (!body) return;

    // Regex pour détecter les emojis
    const emojiRegex = /([\p{Emoji_Presentation}\p{Extended_Pictographic}])/gu;
    const match = body.match(emojiRegex);

    if (!match) return;

    const detectedEmoji = match[0]; // premier emoji trouvé

    await api.setMessageReaction(detectedEmoji, messageID, () => {}, true);
  }
};
