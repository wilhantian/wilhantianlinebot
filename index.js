'use strict';

const config = require("./config");
const line = require('@line/bot-sdk');
const express = require('express');
const Menu = require("./Menu");
const client = require("./Line");
const MsgMgr = require("./message/MsgMgr");
const MsgReplys = require("./message/MsgReplys");

const app = express();

Menu.init();
MsgReplys.init();

app.all('/', (req, res) => {
    res.send(JSON.stringify({
        name: 'ok'
    }))
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.all('/callback', line.middleware(config.LineConfig), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            res.json({
                error: "错误了",
            })
        });
});

// event handler
function handleEvent(event) {
    console.log("收到消息:", event, event.source.userId);
    MsgMgr.handle(event);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
