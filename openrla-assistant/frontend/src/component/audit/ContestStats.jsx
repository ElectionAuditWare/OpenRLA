import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
  Card,
  CardTitle,
  CardText
} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class ContestStats extends React.Component {
  constructor(props) {
    super(props);
  }

  openDialog() {
    this.setState({ open: true });
  }

  closeDialog() {
    this.setState({ open: false });
  }

  render() {
    const { audit, contests, election } = this.props;

    const listItems = _.map(audit.contests, ({ id, statistic }) => {
      return (
        <ListItem key={id}>
          <TextField
             floatingLabelText='Contest ID'
             value={id} />
          <TextField
             floatingLabelText='Description'
             value={contests[id].description} />
          <TextField
             floatingLabelText='Test Statistic'
             value={statistic} />
        </ListItem>
      );
    });

    const sampledBallotCount = audit.marks ? audit.marks.length : 0;
    const totalBallotCount = _.size(election.ballots);

    return (
      <Card>
        <TextField
           floatingLabelText='Sampled ballots'
           value={sampledBallotCount} />
        <TextField
           floatingLabelText='Total ballots'
           value={totalBallotCount} />
        <TextField
           floatingLabelText='1/α'
           value={1 / audit.riskLimit} />
        <List>
          {listItems}
        </List>
      </Card>
    );
  }
}

ContestStats.PropTypes = {
  audit: PropTypes.object.isRequired,
  contests: PropTypes.object.isRequired,
  election: PropTypes.object.isRequired,
};

export default ContestStats;