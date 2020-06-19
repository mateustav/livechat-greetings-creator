require('dotenv').config();

const auth = 'Basic ' + new Buffer(process.env.LC_USER + ':' + process.env.LC_PW).toString('base64');

const options = {
  hostname: 'api.livechatinc.com',
  path: '/greetings',
  method: 'POST',
  headers: {
      'Authorization': auth,
      'X-API-Version': 2,
      'Content-Type': 'application/json',
    }
};

module.exports = options;