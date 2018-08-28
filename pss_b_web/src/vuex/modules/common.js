import {
    USER_INFO,
    FOOD_CATEGORY
} from "../mutation-types.js";

const state = {
    userInfo:{
        username: '',
        userId: ''
    },
    foodCategory:[]
};

const mutations = {
    [USER_INFO](state,newData){
        state.userInfo = newData;
    },
    [FOOD_CATEGORY](state,newData){
        state.foodCategory = newData;
    }
}

export default {
    state,
    mutations
}
