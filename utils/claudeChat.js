import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import { createConnection } from 'mysql2/promise';
import { querySelectAllCategoriesandProducts } from "./queries.js"


const claudeChat = async () => {
const dbConnection = await createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});



const [rows] = await dbConnection.execute(querySelectAllCategoriesandProducts) // inserire la query
const rowsJSON = JSON.stringify(rows);


const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.CLAUDE_API_KEY
});




const aiResponse = await model.invoke([
    new SystemMessage(`
        sei un assistente alla vendita dei nostri meravigliosi gelati, per la gelateria **iScream**, Qui la lista dei propdotti: ${rowsJSON}
        `),
    new HumanMessage('Mi sapresti consigliare un gelato per gli amanti dei vampiri e delle ciliegie?')
])

console.log(`BellaAgent: ${aiResponse.content}`);

}


export { claudeChat };