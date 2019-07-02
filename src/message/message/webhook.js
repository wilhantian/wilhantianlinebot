module.exports = [
    {
        type: "follow",
        param: undefined,
        handler: function(event, mgr){
            console.log("关注了账户")
            return mgr.client.replyMessage(event.replyToken, {
                type: 'text', 
                text: '欢迎关注6699公众号'
            });
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