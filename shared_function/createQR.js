require('dotenv').config();

const axios = require('axios');
const requestURL = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create'

async function createQR(billerID,amount,token,authType,UID,ownerID)
{
    const headers = {
        headers:{
            'Content-Type': 'application/json',
            'authorization':`${authType} ${token}`,
            'requestUID':`${UID}`,
            'resourceOwnerId':`${ownerID}`
        },
    }

    const body ={
        "qrType": "PP",
      "ppType": "BILLERID",
      "ppId": `${billerID}`,
      "amount": `${amount}`,
      "ref1": "REFERENCE1",
      "ref2": "REFERENCE2",
      "ref3": "SCB"
    }

    try{
    const {data} = await axios.post(requestURL,body,headers)
   return data;
    }
    catch(err)
    {
        throw err;

    }
}


module.exports = createQR;

