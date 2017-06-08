(() => {
  'use strict';

  const fs = require('fs');

  class Utils {
    static readFile(path, options) {
      return new Promise(function(resolve, reject) {
        fs.readFile(path, options, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }

    static readJSON(path) {
      return Utils.readFile(path)
      .then(JSON.parse);
    }
  }

  module.exports = Utils;
})();
