/*
This File provides all the api endpoints already setup in the server(for localhost) for the development purpose 
*/

const baseURL = "http://localhost:5000/api/v1";

const Contact = {
  contact: baseURL + "/contact",
};

const Auth = {
  login: baseURL + "/auth/login",
  register: baseURL + "/auth/register",
  logout: baseURL + "/auth/logout",
};

const User = {
  getUsername: baseURL + "/user/username",
  getUserDetail: baseURL + "/user",
  updateUserDeatil: baseURL + "/user",
  getDashboard: baseURL + "/user/dashboard",
  like: baseURL + "/user/like",
};

const PublicCollections = {
  getCollections: baseURL + "/public",
  // /public/:collectionName
  getCollectionList: baseURL + "/public",
};

const PrivateCollections = {
  getCollections: baseURL + "/private",
  createCollection: baseURL + "/private",

  // /private/:collectionName
  removeCollection: baseURL + "/private",
  updateCollection: baseURL + "/private",

  getCollectionList: baseURL + "/private",
  // /private/:collectionName/update
  updateCollectionList: baseURL + "/private",
  // /private/:collectionName/remove
  removeCollectionList: baseURL + "/private",
};

const Report = {
  // /report/:collectionName
  report: baseURL + "/report",
};

const Admin = {
  getUser: baseURL + "/admin/user",
  // /admin/user/:userName
  getSpecificUser: baseURL + "/admin/user",
  updateRole: baseURL + "/admin/userrole",
  banUser: baseURL + "/admin/banuser",

  getContactForm: baseURL + "/admin/contact",
  removeContactForm: baseURL + "/admin/contact",

  // /admin/collection/:collectionName
  getSpecificCollection: baseURL + "/admin/collection",
  // /admin/:collectionName
  removeSpecificCollection: baseURL + "/admin/",

  getReport: baseURL + "/admin/reports",
};

export { Auth, User, PublicCollections, PrivateCollections, Admin };
