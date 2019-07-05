const BubbleGamesTem = require('../template/BubbleGames');
const AlertTem = require('../template/Alert');
const MsgService = require('../../service/MsgService');

module.exports = [
    {
        type: "postback",
        param: {
            "postback.data": "推荐",
        },
        handler: function(event, mgr){
            var objs = MsgService.recommendGameInfos.map((info)=>{
                return {
                    title: info.name,
                    img: info.conductImage,
                    url: info.liff,
                    desc: info.subhead,
                }
            });
            var message = BubbleGamesTem.create(objs);
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