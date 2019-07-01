const line = require('@line/bot-sdk');
const express = require('express');

const config = require('./config');
const MsgMgr = require('./message/Manager');
const Line = require('./core/Line');

const app = express();

const port = config.port;
const lineCfg = {
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret,
};

app.post(config.messageCallbackURI, line.middleware(lineCfg), (req, res) => {
    Promise
        .all(req.body.events.map((event)=>{
            return MsgMgr.inst.handle(event);
        }))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


app.listen(port, () => {
    console.log(`listening on ${port}`);
});


MsgMgr.inst.register('message', {
    'message.type': 'text',
    'message.text': 'hello'
}, function (event) {
    return Line.replyMessage(event.replyToken, {
        type: 'text', text: event.message.text + '...'
    });
});