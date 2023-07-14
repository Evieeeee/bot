const { SlashCommandBuilder } = require('discord.js');
const langs = process.env.languages;

module.exports = {
  data: new SlashCommandBuilder()
      .setName('add-language')
      .setDescription('Add a language for an existing server')
      .addChannelOption(
        option => 
        option.setName('general-channel')
        .setDescription('Please select the general channel of the server you are changing')
        .setRequired(true)
      )
      .addStringOption(
        option =>
        option.setName('language')
        .setDescription('The language you will add')
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
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}. and they selected ${interaction.data}`);
  }
};