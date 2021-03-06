import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import TopNav from './components/top-navbar/index';
import DataUpload from './components/data-upload/index';
import './components/side-navbar/side-navbar.css';
import SideNavClass from './components/side-navbar/index';
import WelcomePage from './components/welcome-page/index';
import HelpPage from './components/help/index';
import ApiPage from './components/api/index';
import Lispat from './components/lispat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: true,
      showData: false,
      showLispat: false,
      showGraph: false,
      showHelp: false,
      showApi: false,
      data: null,
    };
  }

  switchView = view => {
    if (view === 'Home') {
      this.setState({
        showHome: true,
        showData: false,
        showLispat: false,
        showGraph: false,
        showHelp: false,
        showApi: false,
      });
    }
    if (view === 'Data') {
      this.setState({
        showHome: false,
        showData: true,
        showLispat: false,
        showGraph: false,
        showHelp: false,
        showApi: false,
      });
    }
    if (view === 'Lispat') {
      this.setState({
        showHome: false,
        showData: false,
        showLispat: true,
        showGraph: false,
        showHelp: false,
        showApi: false,
      });
    }
    if (view === 'Graph') {
      this.setState({
        showHome: false,
        showData: false,
        showLispat: true,
        showGraph: false,
        showHelp: false,
        showApi: false,
      });
    }
    if (view === 'Help') {
      this.setState({
        showHome: false,
        showData: false,
        showLispat: false,
        showGraph: false,
        showHelp: true,
        showApi: false,
      });
    }
    if (view === 'Api') {
      this.setState({
        showHome: false,
        showData: false,
        showLispat: false,
        showGraph: false,
        showHelp: false,
        showApi: true,
      });
    }
  };

  switchToLispat = statusCode => {
    console.log(statusCode);
    if (statusCode === 200) {
      this.setState({
        showLispat: true,
        showData: false,
        showHome: false,
      });
    }
  };

  showGraphNav = () => {
    const { showGraph, data } = this.state;
    return showGraph === true || data !== null;
  };

  showLispatNav = () => {
    const { showLispat, data } = this.state;
    return showLispat === true || data !== null;
  };

  switchLispat = () => {
    const { showLispat } = this.state;
    if (showLispat === true) {
      return 'Lispat';
    }
    return null;
  };

  render() {
    const {
      showHome,
      showData,
      showLispat,
      showApi,
      showHelp,
      data,
    } = this.state;
    return (
      <div>
        <TopNav handleStateChange={this.switchView} />
        <div className={showHome ? 'show' : 'hide'}>
          <WelcomePage />
        </div>
        <div className={showHelp ? 'show' : 'hide'}>
          <HelpPage />
        </div>
        <div className={showApi ? 'show' : 'hide'}>
          <ApiPage />
        </div>
        {showData ? (
          <DataUpload
            stateChange={this.switchToLispat}
            getData={d => {
              this.setState({ data: d });
            }}
          />
        ) : null}
        <div className={showLispat ? 'show' : 'hide'}>
          <Lispat data={data} />
        </div>
        <SideNavClass
          handleStateChange={this.switchView}
          graph={this.showGraphNav()}
          lispat={this.showLispatNav()}
          onChange={showLispat}
        />
      </div>
    );
  }
}

export default hot(module)(App);
