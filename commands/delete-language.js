const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs-extra');


module.exports = {
  data: new SlashCommandBuilder()
      .setName('delete-language')
      .setDescription('Delete a language for an existing server')
      .addChannelOption(
        option => 
        option.setName('general-channel')
        .setDescription('Please select the general channel of the server you are changing')
        .setRequired(true))
      .addStringOption(
        option =>
        option.setName('delete-language')
        .setRequired(true)
        .setAutocomplete(true)
      ),
async autocomplete(interaction){
    const focusedValue = interaction.options.getFocused();
    const temp =  json.parse(process.env.languages);
    const choices = temp.languages;
    const filtered = choices.filter(choice => choice.display.startsWith(focusedValue));

    await interaction.respond(
            filtered.map(choice => ({ name: choice.display, value: choice.iso })),
    );
  },
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}. and they selected` +interaction.data);
  }
};