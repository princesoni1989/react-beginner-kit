import fetch from 'isomorphic-fetch';
import {getApiUrl, flatternObj} from './helper';

export const API_URL = getApiUrl('"development"'); //process.env.NODE_ENV
//export const API_URL = getApiUrl(process.env.NODE_ENV);

export default function callApi ({path, method = 'get', body, headers, query}) {

  let queryString = query ? `?${flatternObj(query)}` : '';
  let url = `${path}${queryString}`;
  return fetch(url, {
    headers: {'Accept': 'application/json','Content-Type': 'application/json', ...headers},
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => response,
      error => error
    );
}
