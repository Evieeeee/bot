const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs-extra');

module.exports = {
  data: 
     new SlashCommandBuilder()
      .setName('add-server')
      .setDescription('Add a server for automatic translation')
      .addChannelOption(
        option => 
        option.setName('general-channel')
        .setDescription('Please select the general channel of the server you are adding')
        .setRequired(true))
      .addStringOption(
        option =>
        option.setName('default-language')
        .setDescription('Please select the main language (Other than English) spoken on your server')
        .setRequired(true)
        .setAutocomplete(true)
      )      
      .addStringOption(
        option =>
        option.setName('language-2')
        .setDescription('Please select another language other than English you wish to include')
        .setRequired(false)
        .setAutocomplete(true)

      )      
        .addStringOption(
        option =>
        option.setName('language-3')
        .setDescription('Please select one more language you wish to include in your translations (you can add more later)')
        .setRequired(false)
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