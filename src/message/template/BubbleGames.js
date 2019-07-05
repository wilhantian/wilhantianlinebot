// 制作一个可以滚动的游戏列表
module.exports = {
    //@links [{title, img, url, desc}]
    create: function (links) {
        var contents = [];
        for (var i = 0; i < links.length; i++) {
            contents.push(this.createOne())
        }
        return {
            type: "flex",
            altText: "altText",
            contents: {
                type: "carousel",
                contents: contents
            }
        };
    },

    createOne: function(title, img, url, desc){
        return {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": img || "https://static.6699.jp/mp/image/1559806541208_GlfyiqmioH1Sv2MH.jpg",
              "size": "full",
              "aspectRatio": "1.88:1"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "lg",
              "contents": [
                {
                  "type": "text",
                  "text": title || '大数组',
                  "weight": "bold",
                  "color": "#000000",
                  "size": "lg"
                },
                {
                  "type": "text",
                  "text": desc,
                  "color": "#666666",
                  "wrap": true,
                  "maxLines": 3
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "separator"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "uri": url || "https://baidu.com",
                    "label": "立即开玩"
                  }
                }
              ]
            }
          }
    }
}