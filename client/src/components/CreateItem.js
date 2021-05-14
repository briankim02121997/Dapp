import React from 'react';
import {connect} from 'react-redux';
import {createItem, initWeb3, initItemManagerContract, getAccounts} from '../actions';
import ItemForm from "./ItemForm";

class CreateItem extends React.Component {

    async componentDidMount(){
        if(!this.props.web3)
            await this.props.initWeb3();
        if(!this.props.itemManagerContract) 
            await this.props.initItemManagerContract();
        if(!this.props.accounts)
            this.props.getAccounts();
        
    }

    onSubmit = (formValues) => {
        this.props.createItem(formValues);
    }

    render() {
        if(!this.props.web3 || !this.props.accounts){
            return (
                <div>Loading account infos</div>
            );
        }
        return (
            <div>
                <h2>Create a item</h2>
                <ItemForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        web3: state.web3,
        accounts: state.accounts
    };
}

export default connect(mapStateToProps, {
    createItem,
    initWeb3,
    initItemManagerContract,
    getAccounts
})(CreateItem);