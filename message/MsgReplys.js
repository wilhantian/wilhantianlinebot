var MsgMgr = require("./MsgMgr");
var Line = require("../Line");
var MsgBuilder = require('./MsgBuilder');

function init() {
    MsgMgr.registerFollow(function (token, userId) {
        const echo = MsgBuilder.createFollowMsg("-", [
            {
                title: "萌犬",
                img: "https://box1.fanyoy.com/games/line-demo/res/dog_banner.png",
                label: "萌犬",
                url: "https://6699.jp/test/?appid=dog",
            },
            {
                title: "神经猫",
                img: "https://box1.fanyoy.com/games/line-demo/res/cat_icon.png",
                label: "神经猫",
                url: "line://app/1579130869-NEAZvJoV",
            },
            {
                title: "射苹果",
                img: "https://box1.fanyoy.com/games/line-demo/res/apple_icon.png",
                label: "射苹果",
                url: "line://app/1579130869-GYBx2Wg0",
            },
            {
                title: "怪兽",
                img: "https://box1.fanyoy.com/games/line-demo/res/monster_icon.png",
                label: "怪兽",
                url: "line://app/1579130869-1egl9v04",
            },
        ]);
        Line.replyMessage(token, echo);
    });

    MsgMgr.registerMsgReply("推荐", function (token, msg, userId, time) {
        const echo = MsgBuilder.createGameScrollListMsg("scroll", [
            {
                title: '萌犬变变变',
                img: 'https://box1.fanyoy.com/games/dog/resource/share_fb/share_1.png',
                url: 'line://app/1579130869-Dpk1R65p',
                desc: '挂机类',
            },
            {
                title: '足球',
                img: 'https://box1.fanyoy.com/games/dog/resource/share_fb/share_2.png',
                url: 'line://app/1579130869-pAZDoX4A',
                desc: '动作类',
            },
            {
                title: '萌犬变变变II',
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
            text: "TODO"
        });
    });
}

module.exports = {
    init: init
}
