// that is the function that says "Backend" when the backend starts

function backend() {
    let msg = "";

    for (let i in backend.arguments) {
        msg += `${i == "0" ? "" : " "}${backend.arguments[i]}`;
    }

    console.log(`\x1b[32mBACKEND\x1b[0m: ${msg}`);
}

// That says "Bot" whenever the bot logs something
function bot() {
    let msg = "";

    for (let i in bot.arguments) {
        msg += `${i == "0" ? "" : " "}${bot.arguments[i]}`;
    }

    console.log(`\x1b[33mBOT\x1b[0m: ${msg}`);
}

// This says "Error" infront of an error so its easier to see if its an error or not
function error() {
    let msg = "";

    for (let i in error.arguments) {
        msg += `${i == "0" ? "" : " "}${error.arguments[i]}`;
    }

    console.log(`\x1b[31mERROR\x1b[0m: ${msg}`);
}

// whenever the database says something it says database in front of it
function database() {
    let msg = "";

    for (let i in database.arguments) {
        msg += `${i == "0" ? "" : " "}${database.arguments[i]}`;
    }

    console.log(`\x1b[29mDATABASE\x1b[0m: ${msg}`);
}


module.exports = {
    backend,
    bot,
    error,
    database
}
