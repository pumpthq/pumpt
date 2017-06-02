import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import CompanyForm from 'components/company/PreviewForm'
import {tintedBackground} from 'components/helpers'

import VerticalScroller from 'components/VerticalScroller'
import { updateCompany } from 'actions/companyJobs'


const mapStateToProps = state => ({ company: state.companyJobs.company })

@connect(mapStateToProps)
class CompanyContainer extends Component {

    render() {
        const { dispatch } = this.props
        
        return (
            <VerticalScroller>
                <CompanyForm initialValues={this.props.company} onSubmit={values=> dispatch(updateCompany(values)) }/>
            </VerticalScroller>
        );
    }

}

// CompanyContainer.propTypes = propTypes;
// CompanyContainer.defaultProps = defaultProps;

module.exports = CompanyContainer
