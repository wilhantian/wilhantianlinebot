var MsgMgr = require("./MsgMgr");
var Line = require("../Line");

function init() {
    MsgMgr.registerMsgReply("fuck", function (token, msg, userId, time) {
        Line.replyMessage(token, {
            type: 'text', text: "卧槽"
        })
    });
}

module.exports = {
    init: init
}
