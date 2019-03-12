import axios from 'axios';

/**
 * Wrapper for http requests
 */
const Http = {
  httpErrorHandler(error) {
    throw error;
  },

  get(relativeUrl, data) {
    return this.send('get', relativeUrl, data);
  },

  post(relativeUrl, data) {
    return this.send('post', relativeUrl, data);
  },

  put(relativeUrl, data) {
    return this.send('put', relativeUrl, data);
  },

  delete(relativeUrl) {
    return this.send('delete', relativeUrl);
  },

  send(method, relativeUrl, data) {
    const url = `${process.env.VUE_APP_BACKEND_URL}/${relativeUrl}`;

    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data,
        credentials: true,
      })
        .then(resolve)
        .catch((error) => {
          try {
            reject(error.response);
          } catch (e) {
            reject(e);
          }
        });
    });
  },
};

export default Http;
