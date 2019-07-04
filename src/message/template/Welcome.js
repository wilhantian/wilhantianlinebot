module.exports = {
    // @link [{label, url, img, title}]
    create: function (links) {
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
            altText: 'welcome',
            contents: {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": links[0].img,
                    "size": "full",
                    "aspectRatio": "2:1",
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
}