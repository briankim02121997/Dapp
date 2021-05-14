import config from "../configs/actionTypes";

export const Web3Reducer = (state = null, action) => {
    switch(action.type){
        case config.INIT_WEB3:
            return action.payload;
        default: 
            return state;
    }
};

export const AccountReducer = (state = null, action) => {
    switch(action.type){
        case config.GET_ACCOUNTS_CHAIN: 
            return action.payload;
        default: 
            return state;
    }
};

export const ChangeAccountMetaMask = (state = null, action) => {
    switch(action.type){
        case config.CHANGE_META_MASK_ACC: 
            return action.payload;
        default: 
            return state;
    }
};