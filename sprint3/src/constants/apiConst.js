const getBaseUrl = () => {
  const { NODE_ENV } = process.env;

  const urls = {
    development: `http://localhost:3001`,
    production: window.location.protocol + "//" + window.location.host,
  };
  return urls[NODE_ENV] || urls.production;
};


const BASE_URL = getBaseUrl();

const URL_BASE = `${BASE_URL}/api`;

const API_URL = {
  /* AUTH */
  LOGIN: `${URL_BASE}/auth/login`,
  SIGNUP: `${URL_BASE}/auth/signup`,
  LOGOUT: `${URL_BASE}/logout`,

  /* PRODUCTS */
  GET_PRODUCTS: `${URL_BASE}/products`,
  CREATE_PRODUCT: `${URL_BASE}/products`,
  UPDATE_PRODUCT: `${URL_BASE}/products/update`,
  DELETE_PRODUCT: `${URL_BASE}/products/delete`,

  /* CART */
  PURCHASE: `${URL_BASE}/purchase`,
}

export default API_URL;