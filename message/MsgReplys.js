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

    MsgMgr.registerMsgReply("fuck", function (token, msg, userId, time) {
        Line.replyMessage(token, {
            type: 'text', text: "卧槽"
        });
    });
}

module.exports = {
    init: init
}
