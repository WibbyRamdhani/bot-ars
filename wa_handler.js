const moment = require('moment')
const API = require('./lib/API')

WA_Controller = module.exports

WA_Controller.getMessage = async (client, message) => {
  try {
    const {id,chatId,type, body, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg} = message
      switch (body.trim().split(' ')[0].toLowerCase()) {
        case "/infolowongan":
            let jobstreet = await API.getJobstreet() //Error belum diminimalisir / ditangani
            let callback = `Total Lowongan Akhdani : ${jobstreet.totalJobs}\n`
            
            // sisipkan data job ke callback
            jobstreet.jobs.forEach((key,i)=>{
              callback += `Lowongan ${i+1} :  ${key.jobTitle}\n`
              callback += `Link  ${i + 1} :  ${key.jobUrl}\n\n`
            })

            // kirim pesan dengan mereply pesan
            await client.reply(chatId, callback, id);
          break;
      
        default:
          break;
      }
  } catch (err) {
    console.log(err);
  }
}