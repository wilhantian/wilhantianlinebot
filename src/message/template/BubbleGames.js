// 制作一个可以滚动的游戏列表
module.exports = {
    //@links [{title, img, url, desc}]
    create: function (links) {
        var contents = [];
        for (var i = 0; i < links.length; i++) {
            contents.push(this.createOne())
            // contents.push({
            //     "type": "bubble",
            //     "hero": {
            //         "type": "image",
            //         "url": links[i].img,
            //         "size": "full",
            //         "aspectRatio": "1.9:1",
            //         "action": {
            //             "type": "uri",
            //             "label": links[i].title,
            //             "uri": links[i].url
            //         }
            //     },
            //     "body": {
            //         "type": "box",
            //         "layout": "horizontal",
            //         "contents": [
            //             {
            //                 "type": "text",
            //                 "text": links[i].title
            //             }
            //         ],
            //         "action": {
            //             "type": "uri",
            //             "label": links[i].title,
            //             "uri": links[i].url
            //         }
            //     },
            // });
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
                  "text": desc || "大农场真的好玩\n哈哈阿萨德\naoisdjoas123123",
                  "color": "#666666",
                  "wrap": true,
                  "maxLines": 2
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