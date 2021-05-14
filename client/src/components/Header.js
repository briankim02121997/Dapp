import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {owner} from "../configs/ownerAddress";

class Header extends React.Component {

    renderHelper(){
        if(this.props.currentUserAddress && this.props.currentUserAddress === owner)
            return (
                <div className="right menu">
                    <Link to="/create" className="item button pointer">
                        Create Item
                    </Link>
                </div>
            );
        return null;
    }

    render(){
        return (
            <div className="ui secondary pointing menu header-menu">
                <Link to="/" className="item">
                    Supply Chain
                </Link>
                {this.renderHelper()}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        currentUserAddress: state.currentUserAddress
    };
}

export default connect(mapStateToProps)(Header);