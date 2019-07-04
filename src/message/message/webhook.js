const TextTem = require('../template/Text');
const WelcomeTem = require('../template/Welcome');

module.exports = [
    {
        type: "follow",
        param: undefined,
        handler: function(event, mgr){
            var welcomeMsg = WelcomeTem.create([
                {
                    title: "あなたはワンコがお好き？？",//萌犬
                    img: "https://box1.fanyoy.com/games/line-demo/res/dog_banner.png",
                    label: "あなたはワンコがお好き？？",
                    url: "line://app/1579130869-Dpk1R65p",
                },
                {
                    title: "😹イカれてる？イカれてない？？",//神经猫
                    img: "https://box1.fanyoy.com/games/line-demo/res/cat_icon.png",
                    label: "😹イカれてる？イカれてない？？",
                    url: "line://app/1579130869-NEAZvJoV",
                },
                {
                    title: "🔥ソコは違う！！！！",//苹果
                    img: "https://box1.fanyoy.com/games/line-demo/res/apple_icon.png",
                    label: "🔥ソコは違う！！！！",
                    url: "line://app/1579130869-GYBx2Wg0",
                },
                {
                    title: "Monster",
                    img: "https://box1.fanyoy.com/games/line-demo/res/monster_icon.png",
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
        handler: function(event, mgr){
            console.log("取关了账户")
        }
    },
]