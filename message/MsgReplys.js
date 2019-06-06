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
        const uri = "line://app/1579130869-Dpk1R65p";
        const echo = MsgBuilder.createGameListMsg("萌犬💩💩💩", "https://static.6699.jp/mp/image/1559188833011_T1QFXxYtVb9eoFzx.png", uri);
        Line.replyMessage(token, echo);
    });

    MsgMgr.registerMsgReply("社区", function (token, msg, userId, time) {
        Line.replyMessage(token, {
            type: "text",
            text: "TODO"
        });
    });
}

module.exports = {
    init: init
}
