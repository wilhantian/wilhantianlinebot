const MsgRegister = require('./MsgRegister');

class Manager {
    static get inst() {
        console.log('1')
        if (!Manager._inst) {
            console.log('2')
            Manager._inst = new Manager();
        }
        console.log('3')
        return Manager._inst;
    }

    constructor() {
        this.handlers = {};

        MsgRegister.reg(this);
    }

    handle(event) {
        var handlers = this.handlers[event.type] || [];
        for(var i=0; i<handlers.length; i++){
            var hand = handlers[i];
            
            for(var k in hand.param){
                var v = hand.param[k];
                if(this._getObjectVar(event, k) == v){
                    if(hand.handler){
                        return hand.handler(event);
                    }
                }
            }
        }

        return Promise.resolve(null);
    }

    register(type, param, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push({
            param: param || {},
            handler, handler
        });
    }

    _getObjectVar(obj, keyStr){
        var kList = keyStr.split('.');
        
        for(var i=0; i<kList.length; i++){
            var k = kList[i];
            if(!obj){
                return undefined;
            }
            obj = obj[k];
        }
        return obj;
    }
}

module.exports = Manager;