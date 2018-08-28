import {
    ORDER_LIST
} from "../mutation-types.js";

const state = {
    orderList: []
};

const mutations = {
    [ORDER_LIST](state,newData){
        state.orderList = newData.data;
    }
}

export default {
    state,
    mutations
}
