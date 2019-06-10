var MsgMgr = require("./MsgMgr");
var Line = require("../Line");
var MsgBuilder = require('./MsgBuilder');

function init() {
    MsgMgr.registerFollow(function (token, userId) {
        const echo = MsgBuilder.createFollowMsg("-", [
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
        Line.replyMessage(token, echo);
    });

    MsgMgr.registerMsgReply("推荐", function (token, msg, userId, time) {
        const echo = MsgBuilder.createGameScrollListMsg("scroll", [
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
        ]);
        Line.replyMessage(token, echo);
    });

    MsgMgr.registerMsgReply("客服", function (token, msg, userId, time) {
        Line.replyMessage(token, {
            type: "text",
            text: `如果您有任何问题请通过下方邮箱进行联系我们\nsupport@6699.jp\n我们会在当天进行回复`
        });
    });
}

module.exports = {
    init: init
}
