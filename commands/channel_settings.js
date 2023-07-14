const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs-extra');


module.exports = {
  data: new SlashCommandBuilder()
      .setName('channel-settings')
      .setDescription('Silence automatic translations in a particular channel')
      .addChannelOption(
        option => 
        option.setName('channel')
        .setDescription('Please select the channel that you wish to change')
        .setRequired(true))
      .addBooleanOption(
        option =>
        option.setName('automatic-translation')
        .setDescription('Should this channel be automatically translated?')
        .setRequired(true)
      ),

  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}. and they selected` +interaction.data);
  }
};
