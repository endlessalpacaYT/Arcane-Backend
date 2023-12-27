const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema(
    {
        discordId: { type: string, required: true, unique: true }
        accountId: { type: string, required: true, unique: true }
        username: { type: string, required: true, unique: true }
        email: { type: string, required: true, unique: true }
        password: { type: string, required: true }
    }

    {
        collection: "Accounts"
    }
)

const UserData = mongoose.UserData("AccountSchema", AccountSchema);

module.exports = UserData;