class MsgMgr{
    constructor(){
        this.msgDict = {};
    }

    // 注册消息回复
    registerMsgReply(match, callback){
        if(this.msgDict[match]){
            console.warn("重复注册回复", text);
            return;
        }
        this.msgDict[match] = callback;
    }

    // 处理消息回复
    handleMsgReply(event){
        if(event.type != "message" || event.message.type != "text"){//过滤文本消息
            return false;
        }
        var inMsg = event.message.text;
        for(var match in this.msgDict){
            if(match == inMsg){
                this.msgDict[match](event.replyToken, inMsg, event.source && event.source.userId, event.timestamp);
                return true;
            }
        }
        return false;
    }
}

module.exports = new MsgMgr();