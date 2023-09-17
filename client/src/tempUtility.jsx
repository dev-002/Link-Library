import axios from "axios";
import { FetchUser } from "../API";

const UserGet = (cookies) => {
  return new Promise((resolve, reject) => {
    let id;
    axios({
      method: "get",
      url: FetchUser.getUser,
      headers: {
        Authorization: cookies.token,
      },
    })
      .then((res) => {
        id = res.data.user._id;
        resolve(id);
      })
      .catch((error) => {
        console.log("Temp Uitlity", error);
        reject(error);
      });
  });
};
export { UserGet };
