(() => {
  'use strict';

  const logger = require('winston');
  const program = require('commander');
  const CloudAtCost = require('./lib/cloudatcost');

  program
    .option('-s, --server-id [serverId]', 'Server ID')
    .option('-h, --hostname [hostname]', 'Hostname')
    .parse(process.argv);

  const cloudAtCost = new CloudAtCost();
  cloudAtCost.makeRequest({pathname: '/api/v1/rdns.php', method: 'POST', body: {sid: program.serverId, hostname: program.hostname}})
  .then((res) => {
    const body = JSON.parse(res.text);
    console.log(`\t${body.serverid}:\t${body.result}`);
  })
  .catch((err) => {
    const body = JSON.parse(err.response.text);
    console.log(require('util').inspect(err.response.headers, {colors: true, depth: null }));
    console.log(require('util').inspect(body, {colors: true, depth: null }));
  });
})();
