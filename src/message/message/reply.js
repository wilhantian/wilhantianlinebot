const BubbleGames = require('../template/BubbleGames');

module.exports = [
    {
        type: "postback",
        param: {
            "postback.data": "推荐",
        },
        handler: function(event, mgr){
            var message = BubbleGames.create([
                {
                    title: 'あなたはワンコがお好き？？',//萌犬
                    img: 'https://box1.fanyoy.com/games/dog/resource/share_fb/share_1.png',
                    url: 'line://app/1579130869-Dpk1R65p',
                    desc: '挂机类',
                },
                {
                    title: '足球',//足球
                    img: 'https://box1.fanyoy.com/games/dog/resource/share_fb/share_2.png',
                    url: 'line://app/1579130869-pAZDoX4A',
                    desc: '动作类',
                },
                {
                    title: 'あなたはワンコがお好き？？',//萌犬
                    img: 'https://box1.fanyoy.com/games/dog/resource/share_fb/share_3.png',
                    url: 'line://app/1579130869-Dpk1R65p',
                    desc: '挂机类',
                }
            ])
            return mgr.client.replyMessage(event.replyToken, message);
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