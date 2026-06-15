import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import { createConnection } from 'mysql12/promise';
import {  } from "./utils/queries.js" // import queries

const dbConnection = await createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERRNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});



const [rows] = await dbConnection.execute(INSERIAMO QUI LA QUERY) // inserire la query
const rowsJSON = JSON.stringify(rows);


const model = new ChatAnthropic({
    model: 'claude-haiku-4-5',
    apiKey: process.env.CLAUDE_API_KEY
});

model.invoke([ // posso aggiungerci anche la cronologia
    new HumanMessage(''),
    new AIMessage('')
]);

const aiResponse = await model.invoke([
    new SystemMessage(`
        sei un assistente alla vendita dei nostri meravigliosi gelati, per la gelateria **iScream**, Qui la lista dei propdotti: ${rowsJSON}
        `)
])

