import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

const mapStateToProps = state => ({ company: state.companyJobs.company })

@connect(mapStateToProps)
class CompanyContainer extends Component {

    render() {
        return (
              <div>
                {JSON.stringify(this.props)}
              </div>
        );
    }

}

// CompanyContainer.propTypes = propTypes;
// CompanyContainer.defaultProps = defaultProps;

module.exports = CompanyContainer
