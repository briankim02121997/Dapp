import React, { Component } from "react";
import {Router, Route, Switch} from 'react-router-dom';
import "./App.css";
import history from '../history';
import CreateItem from "./CreateItem";
import ItemList from "./ItemList";
import Header  from "./Header";
import ConfirmPayment from "./ConfirmPayment";
import {connect} from "react-redux";
import {changeMetaMaskAccount, initWeb3, changeItemStatus,
  initItemManagerContract, initItemContract} from "../actions";

class App extends Component {

  async componentDidMount(){

    if(!this.props.web3)
        await this.props.initWeb3();
    if(!this.props.itemManagerContract) 
        await this.props.initItemManagerContract();
    if(!this.props.itemContract)
        await this.props.initItemContract();

    const currentMetaMask = await this.props.web3.eth.getAccounts();
    this.props.changeMetaMaskAccount(currentMetaMask[0]);
    this.detectAccountChanged();
    this.detectItemStatusChange();
  }

  detectAccountChanged = () => {
    window.ethereum.on('accountsChanged',(accounts) => {
        this.props.changeMetaMaskAccount(accounts[0]);
    })
  }

  detectItemStatusChange(){
    this.props.changeItemStatus();
  }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
                <Header />
                  <Switch>
                      <Route path="/" exact component={ItemList} />
                      <Route path="/create" exact component={CreateItem} />
                      <Route path="/payment/:id" exact component={ConfirmPayment} />
                  </Switch>
            </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3
  }
}

export default connect(mapStateToProps, {
  initWeb3,
  initItemManagerContract,
  initItemContract,
  changeMetaMaskAccount,
  changeItemStatus
})(App);
