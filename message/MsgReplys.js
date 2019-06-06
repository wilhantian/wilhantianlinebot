var MsgMgr = require("./MsgMgr");
var Line = require("../Line");
var MsgBuilder = require('./MsgBuilder');

function init() {
    MsgMgr.registerFollow(function (token, userId) {
        const echo = MsgBuilder.createFollowMsg("-", [
            {
                title: "欢迎关注6699.JP",
                img: "https://static.6699.jp/mp/image/1559188833011_T1QFXxYtVb9eoFzx.png",
                label: "欢迎关注6699.JP",
                url: "https://baidu.com",
            },
            {
                title: "链接1",
                img: "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png",
                label: "链接1",
                url: "https://baidu.com",
            },
            {
                title: "链接2",
                img: "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png",
                label: "链接2",
                url: "https://baidu.com",
            },
            {
                title: "链接3",
                img: "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png",
                label: "链接3",
                url: "https://baidu.com",
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
