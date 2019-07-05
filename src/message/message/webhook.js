const TextTem = require('../template/Text');
const WelcomeTem = require('../template/Welcome');
const config = require('../../config');
const UserService = require('../../service/UserService');
const MsgService = require('../../service/MsgService');

module.exports = [
    {
        type: "follow",
        param: undefined,
        handler: function(event, mgr, userId){
            UserService.follow(userId);

            var objs = MsgService.welcomeGameInfos.map((info, index)=>{
                if(index == 0){
                    return {
                        title: info.subhead,
                        img: info.conductImage,
                        label: info.subhead,
                        url: info.liff
                    }
                }
                return {
                    title: info.subhead,
                    img: info.icon,
                    label: info.subhead,
                    url: info.liff
                }
            });

            var welcomeMsg = WelcomeTem.create(objs);
            return mgr.client.replyMessage(event.replyToken, welcomeMsg);
        }
    },
    {
        type: "unfollow",
        param: undefined,
        handler: function(event, mgr, userId){
            console.log("取关了账户");
            UserService.unfollow(userId);
        }
    },
]