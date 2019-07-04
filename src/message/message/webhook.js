const TextTem = require('../template/Text');

module.exports = [
    {
        type: "follow",
        param: undefined,
        handler: function(event, mgr){
            console.log("关注了账户")
            return mgr.client.replyMessage(event.replyToken, TextTem.create("欢迎关注"));
        }
    },
    {
        type: "unfollow",
        param: undefined,
        handler: function(event, mgr){
            console.log("取关了账户")
        }
    },
]