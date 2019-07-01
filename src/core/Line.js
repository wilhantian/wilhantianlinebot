const line = require('@line/bot-sdk');
const config = require('../config');

const _lineClient = new line.Client({
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret
});

module.exports = _lineClient;