require('dotenv').config();

const axios = require('axios');




const create_oauth = async (billerID,amount,ppID,token,authType,UID) =>
{
    const headers = {
        headers:{
            'Content-Type': 'application/json',
            'authorization':`${authType} ${token}`,
            'requestUID':`${UID}`,
            
        },
    }

    const body ={
        "qrType" :"PP",
        "amount":`${amount}`,
         "ppType": "BILLERID",
        "ppId": "889097429042018",
         "ref1": "REFERENCE1",
         "ref2": "REFERENCE2",
         "ref3": "SCB"
    }
    const {data} = await axios.post('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',body,headers)
   return data;
}


module.exports = create_oauth;

