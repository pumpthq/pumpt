import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardOpen from '../../../components/jobs/cardOpen';
import SummaryHead from './new/summaryHead';
import MiddleBlock from './new/middleBlock';

import { browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {};

function mapStateToProps(state, ownProps) {
    return find(state.companyJobs.all, job => job._id === ownProps.id)
}

@connect(mapStateToProps)
class EditContainer extends Component {

    render() {

        return (
          <div className="container slider-container">
              <div className="row row-padding-bigger">
                  <div className="col-lg-12">
                    <CardOpen key={this.props.id} {...this.props}
                        summaryHead={<SummaryHead filled={true} />}
                        middleBlock={<MiddleBlock />}
                        onClick={browserHistory.goBack}
                    />
                  </div>
              </div>
          </div>
        );
    }

}

EditContainer.propTypes = propTypes;
EditContainer.defaultProps = defaultProps;

module.exports = EditContainer;
