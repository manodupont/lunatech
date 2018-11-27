const fetch = require('node-fetch');

let ajax = function (path, data, method) {
  let params = {
    method: method,
    headers: {
      'accept': 'application/json',
      'X-API-LunaFactory': process.env.TOKEN
    }
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  return fetch(`${process.env.LUNATECH_API_URL}${path}`, params)
    .then(res => {
      try {
        return res.json()
          .then((response) => {
            return response;
          }).catch((err) => {
            console.log(err);
          })
      } catch (err) {
        console.log(err);
      }
    });
};

exports.call = {
  get: (path, data) => ajax(path, data, 'GET'),
  post: (path, data) => ajax(path, data, 'POST')
};


