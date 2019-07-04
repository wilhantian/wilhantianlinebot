module.exports = {
    //@actions [action({type: "", label: "", more...}), action, action]
    create: function(title, actions){
        var contents = actions.map((ac)=>{
            return {
                "type": "button",
                "style": "primary",
                "action": ac
            }
        })
        return {
            type: "flex",
            altText: "alert",
            contents: {
                "type": "bubble",
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": title
                        }
                    ]
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "contents": contents
                }
            }
        };
    }
}