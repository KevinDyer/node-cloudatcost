(() => {
  'use strict';

  const logger = require('winston');
  const CloudAtCost = require('./lib/cloudatcost');
  const cloudAtCost = new CloudAtCost();
  cloudAtCost.makeRequest({pathname: '/api/v1/listtasks.php'})
  .then((res) => {
    const body = JSON.parse(res.text);
    const tasks = body.data;
    console.log('\tID\t\tAction\t\tStatus\t\tServer ID');
    tasks.forEach((task) => {
      console.log(`\t${task.idf}\t${task.action}${(8 > task.action.length ? '\t' : '')}\t${task.status}${(8 > task.status.length ? '\t' : '')}\t${task.serverid}`);
      // console.log(require('util').inspect(task, {colors: true, depth: null }));
    });
  })
  .catch((err) => {
    const body = JSON.parse(err.response.text);
    console.log(require('util').inspect(err.response.headers, {colors: true, depth: null }));
    console.log(require('util').inspect(body, {colors: true, depth: null }));
  });
})();
