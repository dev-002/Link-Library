const baseURL = "http://localhost:5000";

const Auth = {
  register: baseURL + "/auth/register",
  login: baseURL + "/auth/login",
  logout: baseURL + "/auth/logout",
};
const UserList = {
  getAllList: baseURL + "/list",
  createList: baseURL + "/list/add",
  deleteList: baseURL + "/list/remove",
  updateList: baseURL + "/list/update",
  specificCategoryList: baseURL + "/list",
};
const PublicList = baseURL + "/public/list";

const FetchUser = baseURL + "/user";

export { Auth, UserList, PublicList, FetchUser };
