import Api from "../api/api";
import * as types from "./mutation-types";

// get user info
export const getUserInfo = ({commit},params) => {
    return Api.getUserInfo(params).then(response => {
        commit(types.USER_INFO,response.data);
        return response;
    })
}
// login
export const login = ({ commit }, params) => {
    return Api.login(params).then(response => {
        return response;
    })
}
// logout
export const logOut = ({ commit }, params) => {
    return Api.logOut(params).then(response => {
        return response;
    })
}
