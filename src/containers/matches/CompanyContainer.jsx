import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { find } from 'lodash'

import CompanyProfile from 'components/company/Profile'
import VerticalScroller from 'components/VerticalScroller'

import { dispatchProp } from 'components/helpers'
import { fetchCompany } from 'actions/candidateMatches'


const mapStateToProps = (state, ownProps) => (
    //TODO: Handle the case where company had not been fetched yet.
    { company: find(state.candidateMatches.companies, company => company._id === ownProps.id) }
);

@connect(mapStateToProps, dispatchProp)
class CompanyContainer extends Component {
    componentWillMount() {
        const { dispatch, id, company } = this.props;
        if(!company) {
            dispatch(fetchCompany(id))
        }
    }

    render() {
        const { company } = this.props;
        return (
            <VerticalScroller>
                {company &&
                    // TODO: show loading indicator if company property is undefined
                    <CompanyProfile {...company} />
                }
            </VerticalScroller>
        );
    }

}

// CompanyContainer.propTypes = propTypes;
// CompanyContainer.defaultProps = defaultProps;

module.exports = CompanyContainer
