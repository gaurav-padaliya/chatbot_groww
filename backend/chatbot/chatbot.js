const dialogflow = require('dialogflow');
const config = require('../config/df-key')

const projectId = config.project_id;
const sessionId = config.sessionId;

// const credentials = {
//     privateKey : config.private_key,
//     // privateKeyId : config.private_key_id,
//     client_email : config.client_email
// }

 // Create a new session
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./chatbot/growwchatbot-jai9-f1d3b908ca17.json"  
});

const textQuery = async (Utext,userId ) => {
    //connect with df api --> dfclient
    
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId);
      // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: Utext,
                // The language used by the client (en-US)
                languageCode: config.df_language_code,
            },
            },
        };
    //detect the intent
    try{
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent'+ responses);
        const arr = {
            queryText: responses[0].queryResult.queryText,
            fulfillmentText: responses[0].queryResult.fulfillmentText,
            fulfillmentMessages: responses[0].queryResult.fulfillmentMessages

        }
        // console.log(responses);
        return arr;
    }catch(err){
        console.log(err);
        return err;
    }

    //filter out
    //send res
}

module.exports ={
    textQuery
}