var webhook = require('./webhook');

function reg(list, mgr){
    for(var i=0; i<list.length; i++){
        var o = list[i];
        mgr.register(o.type, o.param, o.handler);
    }
}

module.exports = {
    register: function(mgr){
        reg(webhook, mgr);
        // reg(webhook, mgr);
    }
}