const XMLBuilder = require("xmlbuilder");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");


const User = require("../models/user.js");
const Profile = require("../models/profiles.js");
const profileManager = require("../structures/profile.js");

// function to geister
async function registerUser(discordId, username, email, plainPassword) {
    email = email.toLowerCase();

    if (!discordId || !username || !email || !plainPassword) return { message: "Username/email/password is required.", status: 400 };

    if (await User.findOne({ discordId })) return { message: "You already created an account!", status: 400 };

    const accountId = MakeID().replace(/-/ig, "");

    // filters
    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailFilter.test(email)) return { message: "You did not provide a valid email address!", status: 400 };
    if (username.length >= 25) return { message: "Your username must be less than 25 characters long.", status: 400 };
    if (username.length < 3) return { message: "Your username must be atleast 3 characters long.", status: 400 };
    if (plainPassword.length >= 128) return { message: "Your password must be less than 128 characters long.", status: 400 };
    if (plainPassword.length < 8) return { message: "Your password must be atleast 8 characters long.", status: 400 };

    const allowedCharacters = (" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~").split("");
    
    for (let character of username) {
        if (!allowedCharacters.includes(character)) return { message: "Your username has special characters, please remove them and try again.", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    try {
        await User.create({ created: new Date().toISOString(), discordId, accountId, username, username_lower: username.toLowerCase(), email, password: hashedPassword }).then(async (i) => {
            await Profile.create({ created: i.created, accountId: i.accountId, profiles: profileManager.createProfiles(i.accountId) });
            await Friends.create({ created: i.created, accountId: i.accountId });
        });
    } catch (err) {
        if (err.code == 11000) return { message: `Username or email is already in use.`, status: 400 };

        return { message: "An unknown error has occured, please try again later.", status: 400 };
    };

    return { message: `Successfully created an account with the username ${username}`, status: 200 };
}

// function to make safe the password so no one will see it in the Database
function DecodeBase64(str) {
    return Buffer.from(str, 'base64').toString();
}

function MakeID() {
    return uuid.v4();
}

module.exports = {
    registerUser,
    DecodeBase64,
    MakeID
}