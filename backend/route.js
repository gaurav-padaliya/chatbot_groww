const chatbot = require('../backend/chatbot/chatbot');

module.exports = app => {
    app.post('/tq',async (req ,res)=>{
        console.log("hello"+req);
        const {text,userId} = req.body;
        const resultQuery = await chatbot.textQuery(text,userId);
        console.log("yo",resultQuery);

        // console.log("yo",resultQuery.fulfillmentMessages[0].text.text);
        // console.log("yo1",resultQuery.fulfillmentMessages[1].text.text);

        res.send(resultQuery);
    })
}