import axios from "axios";

function wrap(fun) {
  return async function(...args) {
    const resp = await fun(...args);
    return resp.data;
  };
}

export default (_, inject) => {
  axios.$delete = wrap(axios.delete);
  axios.$get = wrap(axios.get);
  axios.$post = wrap(axios.post);
  inject("axios", axios);
};
