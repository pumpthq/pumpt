import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import CompanyProfile from 'components/CompanyProfile'
import VerticalScroller from 'components/VerticalScroller'

const mapStateToProps = (state, ownProps) => (
    //TODO: Handle the case where company had not been fetched yet.
    { company: find(state.candidateMatches.companies, company => company._id === ownProps.id) }
);

@connect(mapStateToProps)
class CompanyContainer extends Component {

    render() {
        return (
            <VerticalScroller>
              <CompanyProfile {...this.props.company} />
            </VerticalScroller>
        );
    }

}

// CompanyContainer.propTypes = propTypes;
// CompanyContainer.defaultProps = defaultProps;

module.exports = CompanyContainer
