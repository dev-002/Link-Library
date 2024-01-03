/*
This File provides all the api endpoints already setup in the server(for localhost) for the development purpose */

const baseURL = "http://localhost:5000";

const Auth = {
  login: baseURL + "/auth/login",
  register: baseURL + "/auth/register",
  logout: baseURL + "/auth/logout",
};

const User = {};

const PublicCollections = {
  getCollections: baseURL + "/public/list",
  getCategoryList: baseURL + "/public/list/category",
};

const PrivateCollections = {
  getCollections: baseURL + "/private/",
  getCategoryList: baseURL + "/private/",
};

const Settings = {
  application: baseURL + "/setting/application",
  theme: baseURL + "/setting/theme",
};

export { Auth, User, PublicCollections, PrivateCollections, Settings };
