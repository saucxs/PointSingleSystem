import jsonp from 'jsonp';

import {
  REQ_TIME_OUT
} from 'configPath/index';

import {
  paramsSerializer
} from 'commonPath/utils';

export default function JSONP(url = '', params = {}, {
  jsonpName = false,
  jsonpCallback = false,
  timeout = REQ_TIME_OUT,
  cancleToken = null
} = {
  jsonpName: false,
  jsonpCallback: false,
  timeout: REQ_TIME_OUT,
  cancleToken: null
}) {
  const config = {
    param: jsonpName,
    name: jsonpCallback,
    timeout
  };

  const reqUrl = `${url}${url.indexOf('?') !== -1 ? '&' : '?'}${paramsSerializer(params)}`;

  return new Promise((resolve, reject) => {
    const cancel = jsonp(reqUrl, config, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });

  //  define cancle
    if (typeof cancleToken === 'function') {
      cancleToken(cancel);
    }
  })


}
