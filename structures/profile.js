const fs = require("fs");
// account creation function
function createProfiles(accountId) {
    let profiles = {};
 // adds the profile shit in a file
    fs.readdirSync("./config/defprofiles").forEach(fileName => {
        const profile = require(`../config/defprofiles/${fileName}`);

        profile.accountId = accountId;
        profile.created = new Date().toISOString();
        profile.updated = new Date().toISOString();

        profiles[profile.profileId] = profile;
    });

    return profiles;
}
// it validates if the account is created or if there is no profile with the linked discord / profile ID
async function validateProfile(profileId, profiles) {
    try {
        let profile = profiles.profiles[profileId];

        if (!profile || !profileId) throw new Error("Invalid profile/profileId");
    } catch {
        return false;
    }

    return true;
}

// just exports everything so the code knows that its wanted xD
module.exports = {
    createProfiles,
    validateProfile
}