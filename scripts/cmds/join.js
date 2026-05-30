module.exports = {
  config: {
    name: "join",
    version: "4.0",
    author: "Sami génie 🎀",
    countDown: 5,
    role: 2,
    dev: true,
    shortDescription: "Rejoindre un groupe",
    longDescription: "Affiche tous les groupes avec leurs vrais noms",
    category: "owner",
    guide: {
      en: "{p}{n} [page|next|prev]"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {

      const groupList = await api.getThreadList(200, null, ["INBOX"]);

      const rawGroups = groupList.filter(
        group => group.isGroup && group.isSubscribed
      );

      if (!rawGroups.length) {
        return api.sendMessage(
          "❌ Aucun groupe trouvé.",
          event.threadID
        );
      }

      // 🔥 Récupération des vrais noms des groupes
      const filteredList = await Promise.all(
        rawGroups.map(async (group) => {
          try {
            const info = await api.getThreadInfo(group.threadID);

            return {
              threadID: group.threadID,
              threadName:
                info.threadName ||
                group.name ||
                group.threadName ||
                "Nom introuvable",
              participantIDs: info.participantIDs || []
            };

          } catch (e) {
            return {
              threadID: group.threadID,
              threadName:
                group.name ||
                group.threadName ||
                "Nom introuvable",
              participantIDs: group.participantIDs || []
            };
          }
        })
      );

      const pageSize = 10;
      const totalPages = Math.ceil(filteredList.length / pageSize);

      if (!global.joinPage)
        global.joinPage = {};

      const currentThread = event.threadID;

      let page = 1;

      if (args[0]) {
        const input = args[0].toLowerCase();

        if (input === "next")
          page = (global.joinPage[currentThread] || 1) + 1;

        else if (input === "prev")
          page = (global.joinPage[currentThread] || 1) - 1;

        else
          page = parseInt(input) || 1;
      }

      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      global.joinPage[currentThread] = page;

      const startIndex = (page - 1) * pageSize;

      const currentGroups = filteredList.slice(
        startIndex,
        startIndex + pageSize
      );

      const formatted = currentGroups.map((g, i) => {
        return (
`┃ ${i + 1}. 『${g.threadName}』
┃ 👥 ${(g.participantIDs || []).length} membres
┃ 🆔 ${g.threadID}
┃━━━━━━━━━━━━━━`
        );
      }).join("\n");

      const msg = `
╭─────────────❃
│ 🤝 REJOINDRE UN GROUPE
│──────────────────
${formatted}
│──────────────────
│ 📄 Page ${page}/${totalPages}
│ 🌐 Total groupes : ${filteredList.length}
╰───────────────✦

👉 Répondez avec le numéro du groupe.
`;

      const sent = await api.sendMessage(
        msg,
        event.threadID
      );

      global.GoatBot.onReply.set(sent.messageID, {
        commandName: "join",
        messageID: sent.messageID,
        author: event.senderID,
        list: filteredList,
        page,
        pageSize
      });

    } catch (err) {
      console.error(err);

      api.sendMessage(
        "⚠️ Impossible de récupérer les groupes.",
        event.threadID
      );
    }
  },

  onReply: async function ({ api, event, Reply, args }) {

    if (event.senderID !== Reply.author)
      return;

    const num = parseInt(args[0]);

    if (isNaN(num) || num <= 0) {
      return api.sendMessage(
        "⚠️ Numéro invalide.",
        event.threadID,
        event.messageID
      );
    }

    const startIndex =
      (Reply.page - 1) * Reply.pageSize;

    const currentGroups = Reply.list.slice(
      startIndex,
      startIndex + Reply.pageSize
    );

    const selected = currentGroups[num - 1];

    if (!selected) {
      return api.sendMessage(
        "⚠️ Groupe introuvable.",
        event.threadID,
        event.messageID
      );
    }

    try {

      const info = await api.getThreadInfo(
        selected.threadID
      );

      if (
        info.participantIDs.includes(event.senderID)
      ) {
        return api.sendMessage(
          `⚠️ Vous êtes déjà dans 『${selected.threadName}』`,
          event.threadID,
          event.messageID
        );
      }

      if (info.participantIDs.length >= 250) {
        return api.sendMessage(
          `🚫 Groupe complet : 『${selected.threadName}』`,
          event.threadID,
          event.messageID
        );
      }

      await api.addUserToGroup(
        event.senderID,
        selected.threadID
      );

      api.sendMessage(
        `✅ Vous avez rejoint 『${selected.threadName}』`,
        event.threadID,
        event.messageID
      );

    } catch (e) {
      console.error(e);

      api.sendMessage(
        "⚠️ Impossible de rejoindre le groupe.",
        event.threadID,
        event.messageID
      );
    }
  }
};
