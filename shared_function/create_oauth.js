require('dotenv').config();

const axios = require('axios');




const create_oauth = async (applicationKey,applicationSecret,UID,ownerID) =>
{

    const headers = {
        headers:{
            'Content-Type': 'application/json',
            'resourceOwnerId':ownerID,
            requestUId:UID,
        },
    }

    const body ={
        "applicationKey": applicationKey,
        "applicationSecret": applicationSecret
    }
    const {data} = await axios.post('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',body,headers)
   return data;
}

module.exports = create_oauth;

