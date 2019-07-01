const MsgMgr = require('./Manager');
const Line = require('../core/Line');


module.exports = {
    reg: function (mgr) {

        MsgMgr.inst.register('message', {
            'message.type': 'text',
            'message.text': 'hello'
        }, function (event) {
            return Line.replyMessage(event.replyToken, {
                type: 'text', text: event.message.text
            });
        });
    }
}