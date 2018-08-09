import {
  HTTP_METHOD,
  DEFAULT_REQ_METHOD,
  URL_DEFAULT_PREFIXER,
  IS_SERIALIZER_PARAMS
} from 'configPath/index'

import {
  paramsSerializer,
  isPlainObject
} from 'commonPath/utils';

import axiosInstance from './axios';
import jsonp from './jsonp';

import {
  ajaxFulFilledHandle,
  ajaxRejectedHandle,
} from "./ajaxErrorHandle";

/**
 *
 * @param url
 * @param params
 * @param opts
 * @returns {Promise.<TResult>|*}
 */
function reqJSONP(url = '', params = {}, opts = {}) {
  return jsonp(url, params, opts).then(ajaxFulFilledHandle, ajaxRejectedHandle);
}

export function getAxiosInstance() {
  return axiosInstance;
}

/**
 *
 * @type {{get: (function(*=, *=, *=)), post: (function(*=, *=, *=)), jsonp: (function(*=, *=, *=))}}
 */
export const AJAX = {
  get(url = '', params = {}, opts = {}) {
    return axiosInstance.get(url, {
      params,
      ...opts
    });
  },
  post(url = '', params = {}, opts = {}) {
    return axiosInstance.post(url, {
      params,
      ...opts
    });
  },
  jsonp(url, params, opts) {
    return reqJSONP(url, params, opts);
  }
};

const defaultPrefixer = URL_DEFAULT_PREFIXER;

export function reqHandle(path = '', {
  method = DEFAULT_REQ_METHOD,
  prefixer = defaultPrefixer,
  isSerializerParams = IS_SERIALIZER_PARAMS,
  ...props
} = {
  method: DEFAULT_REQ_METHOD,
  prefixer: defaultPrefixer,
  isSerializerParams: IS_SERIALIZER_PARAMS,
}) {
  const reqPath = path.indexOf('/') === 0 ? path.slice(1) : path;
  const reqUrl = /http(s)?:\/\//.test(reqPath) ? reqPath : `${prefixer}/${reqPath}`;

  return (params) => {
    let reqParams = params;
    if (isSerializerParams && method.toUpperCase() == HTTP_METHOD.POST
    && (isPlainObject(reqParams)) || Array.isArray(reqParams)) {
      reqParams = paramsSerializer(reqParams);
    }
    return AJAX[method.toLowerCase()](reqUrl, reqParams, {
      ...props
    })
  };
}
