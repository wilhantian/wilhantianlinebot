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
    }

    handle(event) {
        var handlers = this.handlers[event.type] || [];
        for(var i=0; i<handlers.length; i++){
            var hand = handlers[i];
            var isMatch = true;
            for(var k in hand.param){
                var v = hand.param[k];
                // console.log(k, v, ':', this._getObjectVar(event, k));
                if(this._getObjectVar(event, k) != v){
                    isMatch = false;
                    break;
                }
            }
            if(isMatch && hand.handler){
                return hand.handler(event);
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