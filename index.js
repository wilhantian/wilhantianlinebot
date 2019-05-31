'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const Menu = require("./Menu");

// LINE配置
const config = {
    channelAccessToken: 'AojV3z6Gc9fVBrJ9Rp+XxesFOlx13rBI2exyURMRMfNvZ/QnpCzmishSbNZmnae4h3llcXgpeTuiCiW2+5OZmG6T5PRin0D+IW2awXui96BoMknBI3GWgSLprFFpx7Aj40zcN2cV9uowqi6BJ6Qxw1GUYhWQfeY8sLGRXgo3xvw=',
    channelSecret: '5af26a49f07ea7bb0dc6aa0df047d9a7',
};

// LINE SDK client
const client = new line.Client(config);

const app = express();
const menu = new Menu(client);

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
    console.log("收到消息:", event, event.source.userId);
    client.getProfile(event.source.userId).then((res)=>{
        console.log("获取用户信息", res);
        client.replyMessage(event.replyToken, {
            type: 'text',
            text: JSON.stringify(res)
        }).catch((err)=>{
            console.error("发送用户信息错误", err);
        });
        client.replyMessage(event.replyToken, {
            type: 'text',
            text: "我是接下来的消息"
        }).catch((err)=>{
            console.error("发送用户信息错误", err);
        });
    }, ()=>{});
    
    return handleReply(event);
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
function regReply(type, callback) {
    if (!msgDict[type]) {
        msgDict[type] = [];
    }
    msgDict[type].push(callback);
}

function handleReply(event) {
    var type = event.type;
    var list = msgDict[type] || [];
    for (var i = 0; i < list.length; i++) {
        var callback = list[i];
        var ret = callback(event);
        if (ret) {
            return ret
        }
    }
    return Promise.resolve(null);
}

///////////////////////////////////////////////////////////////////////
regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text.indexOf("110") >= 0) {
        const echo = { type: 'text', text: "110？你要报警吗？" };
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});

regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text.indexOf("傻") >= 0) {
        const echo = { type: 'text', text: "你再骂一句试试？" };
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});

regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text.indexOf("几点") >= 0) {
        const echo = { type: 'text', text: "现在是 " + new Date().toString() };
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});

regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text.indexOf("游戏") >= 0) {
        const echo = {
            type: "flex",
            altText: "萌犬...",
            contents: {
                "type": "bubble",
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "萌犬变变💩"
                        }
                    ]
                },
                "hero": {
                    "type": "image",
                    "url": "https://static.6699.jp/mp/image/1559188833011_T1QFXxYtVb9eoFzx.png",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "http://linecorp.com/"
                    }
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "开始玩！",
                                "uri": "line://app/1579130869-1bQDdkGB"
                            }
                        }
                    ],
                    "flex": 0
                }
            }
        };
        console.log("发送游戏消息");
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});

regReply("message", function (event) {
    if (event.message.type == "text" && (event.message.text.indexOf("位置") >= 0 || event.message.text.indexOf("在哪") >= 0)) {
        const echo = {
            "type": "location",
            "title": "位置",
            "address": "这是我的位置，欢迎光临哦~",
            "latitude": 38.862505,
            "longitude": 121.531048
        };
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});
