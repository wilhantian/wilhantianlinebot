module.exports = [
    {
        type: "message",
        param: {
            "message.type": "text",
            "message.text": "你好"
        },
        handler: function(event){
            console.log("你好你妹妹")
        }
    },
    {
        type: "message",
        param: {
            "message.type": "text",
            "message.text": "卧槽"
        },
        handler: function(event){
            console.log("卧槽？！")
        }
    },
]