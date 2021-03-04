const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors')
const lineconfig = require('./config/lineconfig');
server.use(express.json())
server.use(cors('*'))
const axios = require('axios');

const line = require('@line/bot-sdk');



const client = new line.Client(lineconfig);


server.post('/webhook', async (req, res) => {

    console.log(req.body)
    console.log(req.body.events[0])
    const userId = req.body.enents[0].source.userId;
    const replyToken = req.body.events[0].replyToken;
    const message = {
        type: 'text',
        text: 'Hello,'
    }

    

    const headers =
    {
        "content-type": "application/json",
        "resourceOwnderId": "l7cd7f3b133a5943f6a4ba36c490f80022",
        "requestUId": `${userId}`,
    }



    client.replyMessage(replyToken, message)


    res.sendStatus(200);

})

server.listen(4500, () =>
    console.log(`listen on 4500`))