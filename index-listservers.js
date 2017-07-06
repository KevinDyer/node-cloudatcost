(() => {
  'use strict';

  const logger = require('winston');
  const CloudAtCost = require('./lib/cloudatcost');
  const cloudAtCost = new CloudAtCost();
  cloudAtCost.makeRequest({pathname: '/api/v1/listservers.php'})
  .then((res) => {
    const body = JSON.parse(res.text);
    const servers = body.data;
    console.log('\tSID\t\tIP\t\tLabel\tStatus');
    servers.forEach((server) => {
      console.log(`\t${server.sid}\t${server.ip}\t${server.label || server.servername}\t${server.status}`);
      // console.log(require('util').inspect(server, {colors: true, depth: null }));
    });
  })
  .catch((err) => {
    const body = JSON.parse(err.response.text);
    console.log(require('util').inspect(err.response.headers, {colors: true, depth: null }));
    console.log(require('util').inspect(body, {colors: true, depth: null }));
  });
})();
