const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const functions = require("../../structures/functions.js");
// Make the command
module.exports = {
    data: {
        name: "register",
        description: "Will create an account on the Arcane Backend.",
        // adds the Extra fields 
        options: [
            {
                name: "email",
                description: "Your E-Mail address.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "username",
                description: "Your username.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "password",
                description: "Your password.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    // it executes the command and looks for errors if no errors will create an account
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const { options } = interaction;

        const discordId = interaction.user.id;
        const email = options.getString("email");
        const username = options.getString("username");
        const password = options.getString("password");

        await functions.registerUser(discordId, username, email, password)
            .then((resp) => {
                const embed = new EmbedBuilder()
                    .setColor(resp.status >= 400 ? "#ff0000" : "#56ff00")
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                    .addFields(
                        { name: 'Message', value: resp.message },
                    )
                    .setTimestamp();

                if (resp.status >= 400) return interaction.editReply({ embeds: [embed], ephemeral: true });

                (interaction.channel ? interaction.channel : interaction.user).send({ embeds: [embed] });
                interaction.editReply({ content: "You successfully created an account on Arcane!", ephemeral: true });
            })
            .catch((error) => {
                console.error(error);
                interaction.followUp('An error occurred while processing your request.');
            });
    },
};
