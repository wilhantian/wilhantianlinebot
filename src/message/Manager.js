const Line = require('../core/Line');
var message = require('./message');

class Manager {
    static get inst() {
        if (!Manager._inst) {
            Manager._inst = new Manager();
            Manager._inst.init();
        }
        return Manager._inst;
    }

    constructor() {
        this.handlers = {};
    }

    init() {
        message.register(this);
    }

    get client() {
        return Line;
    }

    handle(event) {
        var handlers = this.handlers[event.type] || [];
        for (var i = 0; i < handlers.length; i++) {
            var hand = handlers[i];
            var isMatch = true;
            for (var k in hand.param) {
                var v = hand.param[k];

                if (this._getObjectVar(event, k) != v) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch && hand.handler) {
                var userId = undefined;
                if(event.source && event.source.type == 'user'){
                    userId = event.source.userId;
                }

                return hand.handler(event, this, userId);
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

    _getObjectVar(obj, keyStr) {
        var kList = keyStr.split('.');

        for (var i = 0; i < kList.length; i++) {
            var k = kList[i];
            if (!obj) {
                return undefined;
            }
            obj = obj[k];
        }
        return obj;
    }

    createRichMenu(size, selected, name, chatBarText, areas, imgBuffer, imgMimetype) {
        return new Promise((next)=>{
            this.client.createRichMenu({
                size: size,
                selected: selected,
                name: name,
                chatBarText: chatBarText,
                areas: areas
            }).then((id)=>{
                console.log("菜单设置成功: ", id);
                this.client.setRichMenuImage(id, imgBuffer, imgMimetype).then(()=>{
                    next({
                        state: true,
                        id: id
                    });
                    console.log("图片上传成功: ", id);

                    // 设置默认菜单 TODO
                    this.client.setDefaultRichMenu(id);
                }).catch((err)=>{
                    next({
                        state: false,
                        error: err
                    });
                    console.log("图片上传失败: ", id);
                });
            }).catch((err)=>{
                console.error(err);
                console.log("菜单设置失败");
                next({
                    state: false,
                    error: err
                });
            });
        });
    }

    deleteRichMenu(id) {
        return new Promise((next)=>{
            this.client.deleteRichMenu(id).then(()=>{
                next({
                    state: true
                });
            }).catch((err)=>{
                next({
                    state: false,
                    error: err
                });
            });
        })
    }

    getAllRichMenu(){
        return new Promise((next)=>{
            this.client.getRichMenuList().then((list)=>{
                next({
                    state: true,
                    list: list
                })
            }).catch((err)=>{
                next({
                    state: false,
                    errot: err
                })
            });
        });
    }

    setDefaultRichMenu(id){
        return new Promise((next)=>{
            this.client.setDefaultRichMenu(id).then(()=>{
                next({
                    state: true,
                    id: id
                })
            }).catch((err)=>{
                next({
                    state: false,
                    errot: err
                })
            })
        });
    }
}

module.exports = Manager;