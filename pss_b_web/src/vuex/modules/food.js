import {
    FOOD_LIST
} from "../mutation-types.js";

const state = {
    foodList: []
};

const mutations = {
    [FOOD_LIST](state,newData){
        state.foodList = newData.data;
    }
}

export default {
    state,
    mutations
}
