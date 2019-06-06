class MsgMgr{
    constructor(){
        this.msgDict = {};
        this.followCallback = undefined;
    }
    
    // 注册Follow
    registerFollow(callback){
        this.followCallback = callback;
    }


    // 注册消息回复
    registerMsgReply(match, callback){
        if(this.msgDict[match]){
            console.warn("重复注册回复", text);
            return;
        }
        this.msgDict[match] = callback;
    }

    handle(event){
        if(event.type == "message" && event.message.type == "text"){//过滤文本消息
            return this.handleMsgReply(event);
        }
        if(event.type == "follow"){
            return this.handleFollow(event);
        }
    }

    // 处理follow消息
    handleFollow(event){
        if(this.followCallback){
            this.followCallback(event.replyToken, event.source.userId);
            return true;
        }
        return false;
    }

    // 处理消息回复
    handleMsgReply(event){
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