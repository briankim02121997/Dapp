import getWeb3 from "../utils/getWeb3"; 
import config from "../configs/actionTypes";
import ItemManagerContract from "../contracts/ItemManager.json";
import ItemContract from "../contracts/Item.json";
import history from "../history";

export const initWeb3 = () => async (dispatch) => {
    const web3 = await getWeb3();
    dispatch({
        type: config.INIT_WEB3,
        payload: web3
    });
};

export const initItemManagerContract = () => async (dispatch, getState) => {
    const {web3} = getState();
    const networkId = await web3.eth.net.getId();
    const itemManager = new web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[networkId] && ItemManagerContract.networks[networkId].address,
    );

    dispatch({
        type: config.INIT_ITEM_MANAGER_CONTRACT,
        payload: itemManager
    });
};

export const initItemContract = () => async (dispatch, getState) => {
    const {web3} = getState();
    const networkId = await web3.eth.net.getId();
    const item = new web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[networkId] && ItemContract.networks[networkId].address,
    );

    dispatch({
        type: config.INIT_ITEM_CONTRACT,
        payload: item
    });
};

export const getAccounts = () => async (dispatch, getState) => {
    const {web3} = getState();
    const accounts = await web3.eth.getAccounts();
    dispatch({
        type: config.GET_ACCOUNTS_CHAIN,
        payload: accounts
    });
};

export const createItem = ({itemIndex, priceInWei}) => async (dispatch, getState) => {
    const {itemManagerContract, currentUserAddress} = getState();
    await itemManagerContract.methods.createItem(itemIndex, priceInWei).send({from: currentUserAddress});

    history.push("/");
};

export const proceedPayment = (asset, priceInWei) => async (dispatch, getState) => {
    const {web3, currentUserAddress} = getState();
    await web3.eth.sendTransaction({to: asset, value: priceInWei, from: currentUserAddress, gas: 6721975});
    
    history.push("/");
}

export const delivery = (itemIndex) => async (dispatch, getState) => {
    const {itemManagerContract, currentUserAddress} = getState();
    await itemManagerContract.methods.triggerDelivery(itemIndex).send({from: currentUserAddress});
};

export const changeItemStatus = () => (dispatch, getState) => {
    const {itemManagerContract} = getState();
    itemManagerContract.events.SupplyChainStep().on("data", async ({returnValues}) => {
        dispatch(fetchItem(returnValues._itemIndex));
    });
}

export const fetchItems = () => async (dispatch, getState) => {
    const {itemManagerContract} = getState();
    const latestItemIdex = await itemManagerContract.methods.itemIndex().call();

    let itemGotNum = 0;
    while(itemGotNum < 10 && latestItemIdex - itemGotNum >= 0){
        dispatch(fetchItem(itemGotNum));
        itemGotNum++;
    }
};

export const fetchItem = (itemIndex) => async (dispatch, getState) => {
    const {itemManagerContract} = getState();
    const result = await itemManagerContract.methods.items(itemIndex).call();
    dispatch({
        type: config.FETCH_ITEM,
        payload: result
    });
}

export const changeMetaMaskAccount = (address) => {
    return {
        type: config.CHANGE_META_MASK_ACC,
        payload: address.toLowerCase()
    };
}