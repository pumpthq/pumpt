import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import CompanyProfile from 'components/CompanyProfile'
import {tintedBackground} from 'components/helpers'
const mapStateToProps = state => ({ company: state.companyJobs.company })

@connect(mapStateToProps)
class CompanyContainer extends Component {

    render() {
        return (
            <VerticalScroller>
                <CompanyProfile {...this.props.company}/>
            </VerticalScroller>
        );
    }

}

// CompanyContainer.propTypes = propTypes;
// CompanyContainer.defaultProps = defaultProps;

module.exports = CompanyContainer
