const TextTem = require('../template/Text');
const WelcomeTem = require('../template/Welcome');
const config = require('../../config');
const UserService = require('../../service/UserService');

module.exports = [
    {
        type: "follow",
        param: undefined,
        handler: function(event, mgr, userId){
            UserService.follow(userId);

            var welcomeMsg = WelcomeTem.create([
                {
                    title: "あなたはワンコがお好き？？",//萌犬
                    img: config.getPublicPath('img/welcome-banner.png'),
                    label: "あなたはワンコがお好き？？",
                    url: "line://app/1579130869-Dpk1R65p",
                },
                {
                    title: "😹イカれてる？イカれてない？？",//神经猫
                    img: config.getPublicPath('img/test.png'),
                    label: "😹イカれてる？イカれてない？？",
                    url: "line://app/1579130869-NEAZvJoV",
                },
                {
                    title: "🔥ソコは違う！！！！",//苹果
                    img: config.getPublicPath('img/test.png'),
                    label: "🔥ソコは違う！！！！",
                    url: "line://app/1579130869-GYBx2Wg0",
                },
                {
                    title: "Monster",
                    img: config.getPublicPath('img/test.png'),
                    label: "Monster",
                    url: "line://app/1579130869-1egl9v04",
                },
            ]);
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