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
    if (event.message.type == "text" && event.message.text == ("玩游戏")) {
        client.linkRichMenuToUser(event.source.userId, menu.gameMenuId);
        return true;
    }
    return null;
});
regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text == ("主菜单")) {
        client.linkRichMenuToUser(event.source.userId, menu.defaultMenuId);
        return true;
    }
    return null;
});
regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text == ("选类型")) {
        const echo = {
            type: "flex",
            altText: "选类型",
            contents:{
            "type": "bubble",
            "body":{
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "游戏分类"
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "primary",
                  "height": "sm",
                  "action": {
                    "type": "message",
                    "label": "模拟经营类",
                    "text": "模拟经营类"
                  }
                },
                {
                  "type": "button",
                  "style": "primary",
                  "height": "sm",
                  "action": {
                    "type": "message",
                    "label": "休闲类",
                    "text": "休闲类"
                  }
                }
              ],
              "flex": 0
            }}
        }
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});


regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text == ("帮助")) {
        const echo = { type: 'text', text: "我就不帮助你" };
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});

regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text == ("模拟经营类")) {
        const uri = "line://app/1579130869-Dpk1R65p";
        const echo = createGameListMsg("萌犬💩💩💩", "https://static.6699.jp/mp/image/1559188833011_T1QFXxYtVb9eoFzx.png", uri);
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});
regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text == ("休闲类")) {
        const uri = "line://app/1579130869-pAZDoX4A";
        const echo = createGameMsg("⚽️足球⚽️", "https://static.pk123.jp/gameInfo/FootBall/FootBall1.jpg", uri);
        return client.replyMessage(event.replyToken, echo);
    }
    return null;
});

regReply("message", function (event) {
    if (event.message.type == "text" && event.message.text == ("换一批")) {
        const uri = "line://app/1579130869-Dpk1R65p";
        const echo = createGameListMsg("萌狗💩💩💩", "https://static.6699.jp/mp/image/1559188833011_T1QFXxYtVb9eoFzx.png", uri);
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

regReply("message", function(event){
  if(event.message.type == "text" && event.message.text == "test"){
    const echo = createWelcomeMsg("-", [
      {
        title: "欢迎关注6699.JP",
        img: "https://static.6699.jp/mp/image/1559188833011_T1QFXxYtVb9eoFzx.png",
        label: "欢迎关注6699.JP", 
        url: "https://baidu.com",
      },
      {
        title: "链接1",
        img: "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png",
        label: "链接1", 
        url: "https://baidu.com",
      },
      {
        title: "链接2",
        img: "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png",
        label: "链接2", 
        url: "https://baidu.com",
      },
      {
        title: "链接3",
        img: "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png",
        label: "链接3", 
        url: "https://baidu.com",
      },
    ]);
    return client.replyMessage(event.replyToken, echo);
  }
});



//---------------------------------------------------------
function createGameMsg(title, img, url){
    return {
        type: "flex",
        altText: title,
        contents: {
            "type": "bubble",
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": title
                    }
                ]
            },
            "hero": {
                "type": "image",
                "url": img,
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
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
                            "uri": url
                        }
                    }
                ],
                "flex": 0
            }
        }
    };
}

function createGameListMsg(title, img, url){
    return {
        type: "flex",
        altText: title,
        contents: {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "spacing": "md",
                  "action": {
                    "type": "uri",
                    "label": title,
                    "uri": url
                  },
                  "contents": [
                    {
                      "type": "image",
                      "url": img,
                      "size": "sm",
                      "flex": 0
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "flex": 1,
                      "contents": [
                        {
                          "type": "text",
                          "text": title,
                          "size": "md",
                          "color": "#000000"
                        },
                        {
                          "type": "text",
                          "text": title + "..........",
                          "wrap": false,
                          "size": "sm",
                          "color": "#999999"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "spacing": "md",
                  "action": {
                    "type": "uri",
                    "label": title,
                    "uri": url
                  },
                  "contents": [
                    {
                      "type": "image",
                      "url": img,
                      "size": "sm",
                      "flex": 0
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "flex": 1,
                      "contents": [
                        {
                          "type": "text",
                          "text": title,
                          "size": "md",
                          "color": "#000000"
                        },
                        {
                          "type": "text",
                          "text": title + "..........",
                          "wrap": false,
                          "size": "sm",
                          "color": "#999999"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "spacing": "md",
                  "action": {
                    "type": "uri",
                    "label": title,
                    "uri": url
                  },
                  "contents": [
                    {
                      "type": "image",
                      "url": img,
                      "size": "sm",
                      "flex": 0
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "flex": 1,
                      "contents": [
                        {
                          "type": "text",
                          "text": title,
                          "size": "md",
                          "color": "#000000"
                        },
                        {
                          "type": "text",
                          "text": title + "..........",
                          "wrap": false,
                          "size": "sm",
                          "color": "#999999"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "style": "link",
                      "action": {
                        "type": "message",
                        "label": "换一批",
                        "text": "换一批"
                      }
                    }
                  ]
                }
              ]
            }
          }
    };
}

// @link [{label, url, img, title}]
function createWelcomeMsg(altText, links){
  if(!links || links.length == 0){
    return {};
  }

  var gameContents = [];
  for(var i=1; i<links.length; i++){
    var l = links[i];
    gameContents.push({
        "type": "box",
        "layout": "horizontal",
        "spacing": "md",
        "action": {
          "type": "uri",
          "label": l.label,
          "uri": l.url
        },
        "contents": [
          {
                "flex": 3,
                "type": "text",
                "text": l.title,
                "size": "sm",
                "color": "#000000",
                "gravity": "center"
          },
          {
            "flex": 1,
            "type": "image",
            "url": l.img,
            "aspectRatio": "1:1"
          }
        ]
    });

    if(i != links.length - 1){
      gameContents.push({
        "type": "separator"
      });
    }
  }

  return {
    type: "flex",
    altText: altText,
    contents: {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": links[0].img,
        "size": "full",
        "aspectRatio": "1.9:1",
        "action": {
          "type": "uri",
          "label": links[0].label,
          "uri": links[0].url,
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "contents": gameContents
      }
    }
  }
}