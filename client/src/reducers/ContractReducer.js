import config from "../configs/actionTypes";

export const ItemManagerContractReducer = (state = null, action) => {
    switch(action.type){
        case config.INIT_ITEM_MANAGER_CONTRACT: 
            return action.payload;
        default: 
            return state;
    }
};

export const ItemContractReducer = (state = null, action) => {
    switch(action.type){
        case config.INIT_ITEM_CONTRACT: 
            return action.payload;
        default: 
            return state;
    }
};