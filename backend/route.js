const chatbot = require('../backend/chatbot/chatbot');

module.exports = app => {
    app.post('/tq',async (req ,res)=>{
        console.log("hello"+req);
        const {text,userId} = req.body;
        const resultQuery = await chatbot.textQuery(text,userId);
        console.log("yo",resultQuery);
        res.send(resultQuery);
    })
}