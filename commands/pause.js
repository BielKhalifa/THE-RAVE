const { canModifyQueue } = require("../util/EvobotUtil");

const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Não há nada tocando.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);


      
      let PauseEmbed = new MessageEmbed()
      .setColor("#a97f4d");
      PauseEmbed.setTitle(`pausou a música.`, true)
 
      return message.channel.send(PauseEmbed).catch(console.error);

    }
  }
};
