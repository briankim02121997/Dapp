import config from "../configs/actionTypes";

const Reducer = (state = {}, action) => {
    switch(action.type){
        case config.FETCH_ITEM: 
            return {...state, [action.payload._itemIndex]: action.payload};
        case config.CREATE_ITEM:
            return {...state, [action.payload._itemIndex]: action.payload}
        default:
            return state;
    }
};

export default Reducer;