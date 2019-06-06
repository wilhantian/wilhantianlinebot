const line = require('@line/bot-sdk');
const config = require('./config');

module.exports = new line.Client(config.LineConfig);