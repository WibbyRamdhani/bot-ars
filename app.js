const {
  create,
  decryptMedia
} = require('@open-wa/wa-automate');
const fs = require('fs-extra')
const moment = require('moment')
const mime = require('mime-types')
const request = require('request')
const WA_Controller = require('./wa_handler')

const serverOption = {
  sessionId: "BOT_AKHDANI",
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
  chromiumArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}

const opsys = process.platform;
if (opsys == "win32" || opsys == "win64") {
  serverOption['executablePath'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
} else if (opsys == "linux") {
  serverOption['browserRevision'] = '737027';
} else if (opsys == "darwin") {
  serverOption['executablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

const start = async (client) => {
   client.onMessage((message) => {
     WA_Controller.getMessage(client,message)
      // request('http://157.230.35.21/jobstreet_api.php', function (error, response, body) {
      //   console.error('error:', error); // Print the error if one occurred
      //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //   console.log(body); // Print the HTML for the Google homepage.
      // });
    //  console.log(message);
   })
}

create(serverOption).then(async client => await start(client))
  .catch(e => {
    console.log('Error', e.message);
  });