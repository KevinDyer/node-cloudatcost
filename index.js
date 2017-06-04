(() => {
  'use strict';

  const fs = require('fs');
  const path = require('path');
  const program = require('commander');

  const packageInfo = require(path.resolve(__dirname, 'package.json'));

  program
    .version(packageInfo.version)
    // .option('-k, --key [key]', 'API Key')
    // .option('-l, --login [login]', 'Login')
    .command('listservers', 'List all servers on the account')
    .command('listtemplates', 'List all templates available')
    .command('listtasks', 'List all tasks in operation')
    .command('powerop', 'Activate server power operations')
    .command('runmode', 'Set the run mode of the server to either \'normal\' or \'safe\'. Safe automatically turns off the server after 7 days of idle usage. Normal keeps it on indefinitely.')
    .command('renameserver', 'Rename the server label')
    .command('rdns', 'Modify the reverse DNS & hostname of the VPS')
    .command('console', 'Request URL for console access')
    .parse(process.argv);

  // console.log(require('util').inspect(program, {colors: true, depth: null}));
})();