const fetch = require('node-fetch');
const API = module.exports

API.getJobstreet = () => new Promise((resolve, reject) => {
  fetch('http://157.230.35.21/jobstreet_api.php', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      resolve(res.data.jobs)
    })
    .catch(err => {
      reject(err)
    });
})