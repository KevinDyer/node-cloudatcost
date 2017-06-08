(() => {
  'use strict';

  const logger = require('winston');
  const CloudAtCost = require('./lib/cloudatcost');
  const cloudAtCost = new CloudAtCost();
  cloudAtCost.makeRequest({pathname: '/api/v1/listtemplates.php'})
  .then((res) => {
    const body = JSON.parse(res.text);
    const templates = body.data;
    templates.sort((a, b) => a.ce_id - b.ce_id);
    console.log('\tID\t\tName');
    templates.forEach((template) => {
      console.log(`\t${template.ce_id}\t${template.name}`);
    });
  })
  .catch((err) => {
    const body = JSON.parse(err.response.text);
    console.log(require('util').inspect(err.response.headers, {colors: true, depth: null }));
    console.log(require('util').inspect(body, {colors: true, depth: null }));
  });
})();
