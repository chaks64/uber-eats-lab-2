import { userService } from "../../services/userService";
import { userConstants } from "./loginTypes";
export const loginAction = {
  login,
};

function login(username, password) {
    return (dispatch,getState) => { 
        dispatch(request({ username, password }));

        userService.login(username, password).then(
            (user) => {
                dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
  function request(user) {
    console.log("returning from action")
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    console.log("called success function");
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    console.log("called failure function");
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}