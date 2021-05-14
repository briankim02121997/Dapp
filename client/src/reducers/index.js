import {combineReducers} from 'redux';
import {Web3Reducer, AccountReducer, ChangeAccountMetaMask} from "./CommonUtilsReducer";
import {ItemManagerContractReducer, ItemContractReducer} from "./ContractReducer";
import ItemReducer from "../reducers/ItemReducer";
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    form: formReducer,
    web3: Web3Reducer,
    accounts: AccountReducer,
    itemManagerContract: ItemManagerContractReducer,
    itemContract: ItemContractReducer,
    items: ItemReducer,
    currentUserAddress: ChangeAccountMetaMask
});