import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Tab, Tabs } from 'material-ui/Tabs';

import Audit from './audit';
import Archive from './archive';
import Home from './home';
import Election from './election';


const Main = ({ page, changeTab }) => {
  return (
    <Tabs value={page} onChange={changeTab}>
      <Tab label='Home' value='home'>
        <Home />
      </Tab>
      <Tab label='Election' value='election'>
        <Election />
      </Tab>
      <Tab label='Audit' value='audit'>
        <Audit />
      </Tab>
      <Tab label='Archive' value='archive'>
        <Archive />
      </Tab>
    </Tabs>
  );
};

Main.PropTypes = {
  page: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

const mapStateToProps = ({ page }) => ({ page });

const mapDispatchToProps = dispatch => ({
  changeTab: page => dispatch({ type: 'SET_PAGE', page, }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
