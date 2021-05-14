import React from 'react';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import histoty from '../history';
import {initWeb3, fetchItem, proceedPayment} from "../actions";
import {connect} from "react-redux";


class ConfirmPayment extends React.Component {

    async componentDidMount(){
        if(!this.props.web3)
            await this.props.initWeb3();
        this.props.fetchItem(this.props.match.params.id);
    }

    renderActions = () => {
        const {_itemPrice, _item} = this.props.item;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.proceedPayment(_item, _itemPrice)} 
                    className="ui button"
                >
                    Confirm Payment
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent = () => {
        const {_itemPrice, _item} = this.props.item;
        return `Copy and send ${_itemPrice} wei to this address ${_item}`;
    }

    render(){
        return <Modal
                    header="Payment Information"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => histoty.push("/")}
                />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        web3: state.web3,
        item: state.items[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {
    initWeb3,
    fetchItem,
    proceedPayment
})(ConfirmPayment);