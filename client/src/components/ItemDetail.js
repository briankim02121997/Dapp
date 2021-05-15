import React from 'react';
import {Link} from 'react-router-dom';
import {delivery} from '../actions';
import {connect} from "react-redux";
import {deliveryManager} from "../configs/ownerAddress";

const ItemDetail = ({item, currentUserAddress, delivery}) => {

    const renderHelper = () => {

        return (
            <div className="right floated content">
                { item._state == 1 && deliveryManager && currentUserAddress && currentUserAddress.toLowerCase() === deliveryManager.toLowerCase() ? 
                    <button onClick={() => delivery(item._itemIndex)} className="ui inverted red button">
                        Delivery
                    </button> : null
                }
                { item._state == 0 ? 
                    <Link to={`/payment/${item._itemIndex}`} className="ui inverted green button">
                        Payment
                    </Link> : null
                }
            </div>
        );
    };

    return (
        <div className="item">
            <div className="content">
                {
                    renderHelper()
                }
                Item: {item._identifier}
                <div className="description">
                    State: {item._state}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUserAddress: state.currentUserAddress
    };
}

export default connect(mapStateToProps, {
    delivery
})(ItemDetail);