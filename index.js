import express from 'express';
const http = require('express');
const app = http();
const mongoose = require("mongoose");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const path = require("path");

//paths that point to files so js can work with them
const config = JSON.parse(fs.readFileSync("./Config/config.json").toString());

//should create a http server with port "3551"
//creating http server does not currently work
const server = app.listen(3551);
