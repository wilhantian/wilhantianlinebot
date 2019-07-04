const BubbleGamesTem = require('../template/BubbleGames');
const AlertTem = require('../template/Alert');

module.exports = [
    {
        type: "postback",
        param: {
            "postback.data": "推荐",
        },
        handler: function(event, mgr){
            var message = BubbleGamesTem.create([
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
        type: "postback",
        param: {
            "postback.data": "社区",
        },
        handler: function(event, mgr){
            var message = AlertTem.create('你想要做什么?', [
                {
                    "type": "message",
                    "label": "客服",
                    "text": "客服"
                },
                // {
                //     "type": "uri",
                //     "label": "领奖",
                //     "uri": "line://app/1579130869-2mbJK3nm"
                // },
            ])
            return mgr.client.replyMessage(event.replyToken, message);
        }
    },
]