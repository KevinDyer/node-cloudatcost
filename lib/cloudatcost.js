(() => {
  'use strict';

  const API_URL = 'https://panel.cloudatcost.com/';

  const os = require('os');
  const url = require('url');
  const path = require('path');
  const request = require('superagent');
  const Utils = require('./utils');

  const USER_CRED_FILEPATH = path.resolve(os.homedir(), '.cloudatcost');

  class CloudAtCost {
    _getUserCredentials() {
      return Utils.readJSON(USER_CRED_FILEPATH);
    }

    makeRequest({pathname, method='GET', body=null}={}) {
      if ('string' !== typeof(method)) {
        return Promise.reject(new TypeError('method must be a string'));
      }
      method = method.toUpperCase();

      return this._getUserCredentials()
      .then((creds) => {
        const decUrl = url.parse(API_URL);
        decUrl.pathname = pathname
        const conUrl = url.format(decUrl);

        let req = null;
        switch (method) {
          case 'GET':
            req = request.get(conUrl)
              .query({login: creds.email, key: creds.key});
            break;
          case 'POST':
            const b = Object.assign({}, body, {login: creds.email, key: creds.key});
            req = request.post(conUrl)
              .type('form')
              .send(b);
            break;
          default:
            return Promise.reject(new Error('Unsupported method'));
        }

        return req;
      });
    }
  }

  module.exports = CloudAtCost;
})()
