require('dotenv').config();


const bankconfig = {
    channelAccessToken: process.env.accesstoken,
    channelSecret: process.env.channelSecret,
}

module.exports = lineconfig;