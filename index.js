'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
    channelAccessToken: 'AojV3z6Gc9fVBrJ9Rp+XxesFOlx13rBI2exyURMRMfNvZ/QnpCzmishSbNZmnae4h3llcXgpeTuiCiW2+5OZmG6T5PRin0D+IW2awXui96BoMknBI3GWgSLprFFpx7Aj40zcN2cV9uowqi6BJ6Qxw1GUYhWQfeY8sLGRXgo3xvw=',
    channelSecret: '5af26a49f07ea7bb0dc6aa0df047d9a7',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.all('/', (req, res) => {
    res.send(JSON.stringify({
        name: 'ok'
    }))
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.all('/callback', line.middleware(config), (req, res) => {
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
    console.log("收到消息:", event)
    return handleReply(event);
    // if (event.type !== 'message' || event.message.type !== 'text') {
    //     // ignore non-text-message event
    //     return Promise.resolve(null);
    // }

    // // create a echoing text message
    // const echo = { type: 'text', text: event.message.text + '.....' };

    // // use reply API
    // return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

///////////////////////////////////////////////////////////////////////
var msgDict = {};
// 注册回复
// @callback 如果返回true说明此消息已处理
function regReply(type, callback){
    if(!msgDict[type]){
        msgDict[type] = [];
    }
    msgDict[type].push(callback);
}

function handleReply(event){
    var type = event.type;
    var list = msgDict[type] || [];
    for(var i=0; i<list.length; i++){
        var callback = list[i];
        var ret = callback(event);
        if(ret){
            return ret
        }
    }
    return Promise.resolve(null);
}


regReply("message", function(event){
    if(event.message.type == "text" && event.message.text == "110"){
        const echo = { type: 'text', text: "你要报警吗？" };
        // use reply API
        return client.replyMessage(event.replyToken, echo);
    }
    return false;
})