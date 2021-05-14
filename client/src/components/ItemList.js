import React from 'react';
import {connect} from 'react-redux';
import ItemDetail from "./ItemDetail";
import {initWeb3, initItemManagerContract, initItemContract, fetchItems} from "../actions";


class ItemList extends React.Component {

    async componentDidMount(){
        if(!this.props.web3)
            await this.props.initWeb3();
        if(!this.props.itemManagerContract) 
            await this.props.initItemManagerContract();
        if(!this.props.itemContract)
            await this.props.initItemContract();
        if(!!this.props.itemManagerContract && !!this.props.itemContract)
            this.props.fetchItems();
    }

    renderHelper() {
        return this.props.items.map(item => {
            return (
                <ItemDetail 
                    key={item._item}
                    item={item}
                />
            );
        });
    }

    render(){
        return (
            <div>
                <h2>Items</h2>
                <div className="ui relaxed divided list">
                    {this.renderHelper()}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        web3: state.web3,
        itemManagerContract: state.itemManagerContract,
        itemContract: state.itemContract,
        items: Object.values(state.items)
            .filter(item => item._item !== "0x0000000000000000000000000000000000000000")
    };
};

export default connect(mapStateToProps, 
    {
        initWeb3,
        initItemManagerContract,
        initItemContract,
        fetchItems
    }
)(ItemList);