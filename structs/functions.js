const XMLBuilder = require("xmlbuilder");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
function GetVersionInfo(req) {
    let memory = {
        season: 0,
        build: 0.0,
        CL: "0",
        lobby: ""
    }