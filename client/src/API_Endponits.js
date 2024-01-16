/*
This File provides all the api endpoints already setup in the server(for localhost) for the development purpose 
*/

const baseURL = "http://localhost:5000/api/v1";

const Auth = {
  login: baseURL + "/auth/login",
  register: baseURL + "/auth/register",
  logout: baseURL + "/auth/logout",
};

const User = {};

const PublicCollections = {
  getCollections: baseURL + "/public/list",
  getCategoryList: baseURL + "/public/list",
  // /public/list/:collectionName
};

const PrivateCollections = {
  getCollections: baseURL + "/private",
  createCollection: baseURL + "/private/add",
  removeCollection: baseURL + "/private",
  // /private/:collectionName
  createList: baseURL + "/private/add/list",
  updateList: baseURL + "/private/update",
  removeList: baseURL + "/private/remove",
  getCategoryList: baseURL + "/private",
  // /private/:collectionName
};

const Settings = {
  application: baseURL + "/setting",
};

export { Auth, User, PublicCollections, PrivateCollections, Settings };
