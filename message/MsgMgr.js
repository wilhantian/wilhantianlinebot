class MsgMgr{
    constructor(){
        this.msgDict = {};
        this.postDict = {};
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

    // 注册Post回复
    registerPostReply(match, callback){
        if(this.postDict[match]){
            console.warn("重复注册回复", text);
            return;
        }
        this.postDict[match] = callback;
    }

    handle(event){
        console.log(event);
        if(event.type == "message" && event.message.type == "text"){//过滤文本消息
            return this.handleMsgReply(event);
        }
        if(event.type == "follow"){
            return this.handleFollow(event);
        }
        if(event.type == "postback"){
            return this.handlePostback(event);
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

    // 处理Postback
    // 必须含有type
    handlePostback(event){
        console.log("处理Postback", event);
        var data = this._postData(event.postback.data);
        var type = data.type;

        for(var match in this.postDict){
            if(match == type){
                this.postDict[match](event.replyToken, data, event.source && event.source.userId, event.timestamp);
                return true;
            }
        }
        return false;
    }

    // 处理消息回复
    handleMsgReply(event){
        console.log("处理消息回复", event);

        var inMsg = event.message.text;
        for(var match in this.msgDict){
            if(match == inMsg){
                this.msgDict[match](event.replyToken, inMsg, event.source && event.source.userId, event.timestamp);
                return true;
            }
        }
        return false;
    }

    _postData(str){
        // a=1&b=2
        var obj = {};
        var list = str.split('&');
        for(var i=0; i<list.length; i++){
            var s = list[i];
            var data = s.split('=')
            if(data.length >= 2){
                obj[data[0]] = data[1];
            }
        }
        return obj;
    }
}

module.exports = new MsgMgr();