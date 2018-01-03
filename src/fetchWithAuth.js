/**
 * Global function which wraps fetch to set username header (useful in development)
 * Also if body is an normal object, makes a formdata object out of it
 * See https://davidwalsh.name/fetch and https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * @param  {string} url          Fetch URL
 * @param  {Object} [options={}] Fetch options
 * @return {Promise}             Fetch promise
 */
window.fetchWithAuth = (url, options = {}) => {
  url = url.startsWith("/") ? url : "/" + url;
  url = process.env.INFERNO_APP_BACKEND_URL + url;
  var body = options.body;
  if (body && typeof body.getAll !== "function") {
    // is not formdata
    body = new FormData();
    for (var key in options.body) {
      body.append(key, options.body[key]);
    }
  }
  return fetch(url, {
    ...options,
    body,
    headers: {
      ...options.headers,
      username: window.username
    }
  });
};
