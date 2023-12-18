const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config/config.json").toString());

const log = require("../structures/log.js");

client.once("ready", async () => {
    log.bot("Arcane Backend has successfully connected to your Discord bot!");

    const commands = [];

    fs.readdirSync("./bot/cmds").forEach(fileName => {
        const command = require(`./cmds/${fileName}`);
        commands.push(command.data);
    });

    const rest = new REST({ version: '9' }).setToken(config.bot.bot_token);

    try {
        log.bot('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.bot.bot_client, config.bot.bot_guild),
            { body: commands },
        );

        log.bot('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
        log.error('Error refreshing application (/) commands:', error.message);
    }
});

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return;

    if (fs.existsSync(`./bot/cmds/${interaction.commandName}.js`)) {
        require(`./cmds/${interaction.commandName}.js`).execute(interaction);
    }
});

client.login(config.bot.bot_token);
