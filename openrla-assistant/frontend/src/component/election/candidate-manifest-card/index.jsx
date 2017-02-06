import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { remote } from 'electron';

import _ from 'lodash';

import submitCandidateManifest from '../../../action/submitCandidateManifest';

import ManifestCard from '../manifest-card';

import CandidateManifest from './candidate-manifest';


const CandidateManifestCard = ({
  candidates,
  uploadDisabled,
  viewDisabled,
}) => {
  const manifestEl = <CandidateManifest candidates={candidates} />;
  const title = 'Candidate Manifest';
  const subtitle = 'Upload or view the manifest for the candidates in the election.';

  return (
    <ManifestCard
       manifestEl={manifestEl}
       title={title}
       subtitle={subtitle}
       submitManifest={submitCandidateManifest}
       uploadDisabled={uploadDisabled}
       viewDisabled={viewDisabled} />
  );
};

CandidateManifestCard.propTypes = {
  candidates: PropTypes.array.isRequired,
  uploadDisabled: PropTypes.bool.isRequired,
  viewDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { election: { contests } } = state;

  const candidates = _.flatten(_.map(contests, c => _.values(c.candidates)));

  return {
    candidates,
    uploadDisabled: !_.isEmpty(candidates),
    viewDisabled: _.isEmpty(candidates),
  };
};

export default connect(mapStateToProps)(CandidateManifestCard);
