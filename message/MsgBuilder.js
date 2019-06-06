// @link [{label, url, img, title}]
function createFollowMsg(altText, links) {
    if (!links || links.length == 0) {
        return {};
    }

    var gameContents = [];
    for (var i = 1; i < links.length; i++) {
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

        if (i != links.length - 1) {
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

function createGameListMsg(title, img, url) {
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

//@ like[{title, img, url, desc}]
function createGameScrollListMsg(altText, links) {
    var contents = [];
    for (var i = 0; i < links.length; i++) {
        contents.push({
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": links[i].img,
                "size": "full",
                "aspectRatio": "1.9:1"
            },
            "body": {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "text",
                        "text": links[i].title
                    }
                ]
            },
            "action": {
                "type": "uri",
                "label": links[i].title,
                "uri": links[i].url
            }
        });
    }
    return {
        type: "flex",
        altText: altText,
        contents: [{
            "type": "carousel",
            "contents": contents
        }]
    };
}


module.exports = {
    createFollowMsg: createFollowMsg,
    createGameListMsg: createGameListMsg,
    createGameScrollListMsg: createGameScrollListMsg
}