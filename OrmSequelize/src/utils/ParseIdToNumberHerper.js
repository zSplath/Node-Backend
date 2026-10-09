module.exports = (params) => {
  for (let prop in params) {
    if (/id$/i.test(prop)) {
      params[prop] = Number(params[prop]);
    }
  }
  return params;
};