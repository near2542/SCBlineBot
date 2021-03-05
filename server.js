const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors')
const lineconfig = require('./config/lineconfig');
server.use(express.json())
server.use(cors('*'))
const axios = require('axios');
const create_oauth = require('./shared_function/create_oauth');
const createQR = require('./shared_function/createQR');
const FS = require('fs').promises
const serverURL = process.env.serverURL
const line = require('@line/bot-sdk');
const { error } = require('console');
server.use(express.static('QR_image'));
console.log(create_oauth);

const qr = require('qr-image');


const client = new line.Client(lineconfig);


server.post('/webhook', async (req, res) => {

    // console.log(req.body)
    // console.log(req.body.events[0])
    const userId = req.body.events[0].source.userId;
    const replyToken = req.body.events[0].replyToken;
    
    const RequestQRData = await create_oauth(process.env.APIkey,process.env.APISecret,userId,'test')
    // console.log(RequestQRData);
    let amount = 1.00;
    const {accessToken,tokenType} = RequestQRData.data;
    
    const QRcodeData = await createQR(
                                process.env.billerID,
                                amount,
                                accessToken,
                                tokenType,
                                userId,
                                process.env.APIkey
                                ) 

    console.log(QRcodeData)

    const {qrRawData,qrImage} = QRcodeData.data
    const currentTime = new Date().getTime();
    try{
    // const QRtoPNG = qr.image(`${__dirname}/QR_image/${userId}/${currentTime}`,{type:'png'});
    // QRtoPNG.pipe(FS.createWriteStream(`${__dirname}/QR_image/${userId}/${currentTime}.jpg`))
    await FS.writeFile(`${__dirname}/QR_image/${userId}/${currentTime}.jpg`,qrImage,{encoding:'base64'});
    }
    catch(err){
        console.log(`${__dirname}/QR_image/${userId}/${currentTime}.jpg`)
        throw err;
    }

    
    
    const message = {
        type: 'image',
        "originalContentUrl": `${serverURL}/${userId}/${currentTime}.jpg`,
        "previewImageUrl": `${serverURL}/${userId}/${currentTime}.jpg`
    }
    client.replyMessage(replyToken,message);


    res.sendStatus(200);

})

const PORT = process.env.PORT || 4500
server.listen(PORT || 4500, () =>
    console.log(`listen on ${PORT}`))