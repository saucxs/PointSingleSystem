import qs from 'qs';

const toString = Object.prototype.toString;

export function paramsSerializer(params = {}) {
  return qs.stringify(params, {
    arrayFormat: 'brackets'
  });
}

export function isPlainObject(obj) {
  return toString.call(obj) === '[object Object]';
}
