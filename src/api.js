/*
* Api between client and server
*/

let ajax = function (path, data, callback, method) {
  if (!callback) {
    callback = data;
    data = {};
  }

  let params = {
    method: method
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  return fetch(`${process.env.API_URL}${path}`, params)
    .then((r) => {
      if (r.status === 200) {
        return callback(null, r.json());
      } else {
        console.error('[auth error]', `API -> ${r.json}`);
        return callback('An error occured')
      }
    });
};

let call = {
  get: (path, data, callback) => ajax(path, data, callback, 'GET')
};

let api = {
  getProducts(page, pageSize) {
    return new Promise((resolve, reject) => {
      call.get(`/products?page=${page}&pageSize=${pageSize}`, null, (err, res) => {
        if (err)
          return reject(err);
        resolve(res);
      });
    })
  }
};


export default api
