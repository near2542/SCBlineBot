require('dotenv').config();

const axios = require('axios');

const requestURL='https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token';


async function create_oauth(applicationKey,applicationSecret,UID,ownerID)
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
    try{
    const {data} = await axios.post(requestURL,body,headers)
    console.log(data);
    return data;
    }
    catch(err)
    {
        console.error(err);
    }
   
}

module.exports = create_oauth;

