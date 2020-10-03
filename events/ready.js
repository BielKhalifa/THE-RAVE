
const { TOKEN, PREFIX } = require("../config.json");

module.exports = async (client) => {
  console.log(`Logado na conta com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);

  let activities = [
   `utilize ${PREFIX}help para obter ajuda`,
   `𝙉Ã𝙊 𝙀𝙉𝘾𝙊𝙎𝙏𝘼 𝙉𝙊 𝙈𝙀𝙐 𝙃𝙔𝙋𝙀𝙍. ⚡`,
   `𝐏𝐀𝐍𝐄𝐋𝐀 𝐍Ã𝐎 𝐓𝐄𝐌 𝐇𝐘𝐏𝐄𝐑👑`

  ],
  i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
  type: "STREAMING"
  }), 5000);
  client.user
  .setStatus("STREAMING")
  .catch(console.log);
  };