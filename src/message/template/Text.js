module.exports = {
    create: function(text){
        if(typeof text == 'number'){
            text = '' + text;
        }
        if(typeof text == 'object'){
            text = '[object]';
        }
        return {
            type: 'text', 
            text: text || ''
        }
    }
}