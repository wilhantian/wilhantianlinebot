// 制作一个可以滚动的游戏列表
module.exports = {
    //@links [{title, img, url, desc}]
    create: function (links) {
        var contents = [];
        for (var i = 0; i < links.length; i++) {
            contents.push({
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": links[i].img,
                    "size": "full",
                    "aspectRatio": "1.9:1",
                    "action": {
                        "type": "uri",
                        "label": links[i].title,
                        "uri": links[i].url
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "text",
                            "text": links[i].title
                        }
                    ],
                    "action": {
                        "type": "uri",
                        "label": links[i].title,
                        "uri": links[i].url
                    }
                },
            });
        }
        return {
            type: "flex",
            altText: "altText",
            contents: {
                type: "carousel",
                contents: contents
            }
        };
    }
}