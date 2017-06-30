import { browserHistory } from 'react-router';

export const URL_Service = {
  queryParams: null,
  setQueryParam(key, value) {
    if (!key || !key.length) {
      return;
    }

    const params = _parseQueryParams(key, value);
    const paramIndex = params.queryParams.findIndex((item) => item.key === key);

    paramIndex === -1
      ? params.queryParams.push({ key: key, value: value })
      : params.queryParams[ paramIndex ].value = value;

    browserHistory.push({
      search: _stringifyQueryParams(params.queryParams)
    });
  },
  setQueryParams(params) {
    browserHistory.push({
      search: _stringifyQueryParams(params)
    });
  },
  getQueryParam(name) {
    return _parseQueryParams().queryParams.find((item) => item.key === name);
  },
  getQueryParams() {
    return _parseQueryParams().queryParams;
  },
};

function _parseQueryParams () {
  const { search } = document.location;
  const queryIndex = search.indexOf('?');
  console.log(search);
  const params = {
    hash: '',
    queryParams: []
  };

  if (queryIndex === -1) {
    params.hash = search.substring(0, search.length);
    return params;
  }

  params.hash = search.substring(0, queryIndex);
  search.substring(queryIndex + 1).split('&').map((param) => {
    const value = param.split('=');
    params.queryParams.push({ key: value[ 0 ], value: value[ 1 ] });
  });

  return params;
}

function _stringifyQueryParams (queryArray) {
  const queryItems = [];

  queryArray.map((item) => {
    queryItems.push(`${encodeURI(item.key)}=${encodeURI(item.value)}`);
  });

  return '?' + queryItems.join('&');
}

export default URL_Service;