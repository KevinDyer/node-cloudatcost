(() => {
  'use strict';

  const logger = require('winston');
  const CloudAtCost = require('./lib/cloudatcost');
  const cloudAtCost = new CloudAtCost();
  cloudAtCost.makeRequest({pathname: '/api/v1/listtasks.php'})
  .then((res) => {
    const body = JSON.parse(res.text);
    const tasks = body.data;
    console.log('\tID\t\tAction\t\tStatus');
    tasks.forEach((task) => {
      console.log(`\t${task.cid}  ${task.action}  ${task.status}`);
    });
  })
  .catch((err) => {
    const body = JSON.parse(err.response.text);
    console.log(require('util').inspect(err.response.headers, {colors: true, depth: null }));
    console.log(require('util').inspect(body, {colors: true, depth: null }));
  });
})();
