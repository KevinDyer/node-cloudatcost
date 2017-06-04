(() => {
  'use strict';

  const os = require('os');
  const fs = require('fs');
  const path = require('path');
  const request = require('superagent');

  function readFile(file, options) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, options, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  function readJSON(file) {
    return readFile(file, 'utf8')
    .then(JSON.parse);
  }

  const userFilepath = path.resolve(os.homedir(), '.cloudatcost');
  const endpointUrl = 'https://panel.cloudatcost.com/api/v1/listservers.php';

  readJSON(userFilepath)
  .then((cloudatcost) => {
    const email  = cloudatcost.email;
    const key  = cloudatcost.key;

    request.get(endpointUrl)
      .query({login: email, key: key})
      .end((err, res) => {
        if (err) {
          return Promise.reject(err);
        } else {
          console.log(res.status);
          console.log(res.statusType);
          console.log(res.header);
          console.log(res.text);
          console.log(res.body);
        }
      });
  });
})();