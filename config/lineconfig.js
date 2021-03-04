require('dotenv').config();


const lineconfig = {
    channelAccessToken: process.env.accesstoken,
    channelSecret: process.env.channelSecret,
}

module.exports = lineconfig;