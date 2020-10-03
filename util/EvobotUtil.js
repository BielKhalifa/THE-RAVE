const { MessageEmbed } = require("discord.js");


module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {

      let TheEmbed = new MessageEmbed()
      .setColor("#a97f4d");
      TheEmbed.setTitle("**Você precisa ingressar no canal de voz primeiro!**", true)
 
      member.channel.send(TheEmbed).catch(console.error);
      return false;
    }

    return true;
  }
};
