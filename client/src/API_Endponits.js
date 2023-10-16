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
};

const PrivateCollections = {};

const Settings = {};

export { Auth, User, PublicCollections, PrivateCollections, Settings };
