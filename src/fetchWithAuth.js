import formurlencoded from "form-urlencoded";

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
    body = formurlencoded(options.body);
  }
  let authheaders = {};
  if (process.env.NODE_ENV !== "production")
    authheaders.username = window.username;
  return fetch(url, {
    ...options,
    body,
    credentials: "same-origin",
    headers: {
      ...options.headers,
      ...authheaders,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
