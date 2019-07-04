module.exports = [
    {
        type: "postback",
        param: {
            "postback.data": "推荐",
        },
        handler: function(event, mgr){
            return mgr.client.replyMessage(event.replyToken, {
                type: 'text', 
                text: '推荐你妹妹'
            });
        }
    },
    {
        type: "message",
        param: {
            "message.type": "text",
            "message.text": "卧槽"
        },
        handler: function(event, mgr){
            return mgr.client.replyMessage(event.replyToken, {
                type: 'text', 
                text: '我凑'
            });
        }
    },
]