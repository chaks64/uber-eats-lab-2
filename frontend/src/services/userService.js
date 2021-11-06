//import axios from "axios";
import axiosInstance from "../helpers/axios";
import jwt_decode from "jwt-decode";

export const userService = {
  login,
  register,
};

async function login(username, password) {
    let data = {
        username: username,
        password: password,
    };

    console.log("mai idhr aaya");
  axiosInstance.defaults.withCredentials = true;
  //make a post request with the user data
  const response = await axiosInstance
    .post("/user/login", data)
    .then((response) => {
      var token = response.data;
      localStorage.setItem("token", JSON.stringify(token));
      var decoded = jwt_decode(token.split(" ")[1]);
    
        // localStorage.setItem("user_id", decoded.id);
        // localStorage.setItem("username", decoded.username);
        // localStorage.setItem("usertype", decoded.usertype);
      var user = {
        u_id: decoded.id,
        username: decoded.username,
        usertype: decoded.usertype,
      };
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      return user;


    });
  console.log(response)
  return response;
}

async function register({ name, username, password }) {
  const data = {
    name: name,
    username: username,
    password: password,
  };

  axiosInstance.defaults.withCredentials = true;
  //make a post request with the user data
  const response = axiosInstance.post("/user/signup", data).then((response) => {
    console.log(response);
    var token = response.data;
    // localStorage.setItem("token", token);
    localStorage.setItem("token", JSON.stringify(token));
    var decoded = jwt_decode(token.split(" ")[1]);
    var user = {
      u_id: decoded.id,
      username: decoded.username,
      //username: decoded.username,
    };
    // localStorage.setItem("user", user);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  });
  return response;
}