import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardOpen from '../../../components/jobs/cardOpen';
import SummaryHead from './new/summaryHead';
import MiddleBlock from './new/middleBlock';
import { find } from 'lodash'
import { browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {};

function mapStateToProps(state, ownProps) {
    return { job: find(state.companyJobs.jobs, job => job._id == ownProps.id)}
}

@connect(mapStateToProps)
class EditContainer extends Component {

    render() {
        return (
          <div className="container slider-container">
              <div className="row row-padding-bigger">
                  <div className="col-lg-12">
                    { this.props.job &&
                        <CardOpen key={this.props.id} {...this.props.job}
                            summaryHead={<SummaryHead filled={true} {...this.props.job} />}
                            middleBlock={<MiddleBlock {...this.props.job} />}
                            onClick={browserHistory.goBack}
                        />
                    }
                  </div>
              </div>
          </div>
        );
    }

}

EditContainer.propTypes = propTypes;
EditContainer.defaultProps = defaultProps;

module.exports = EditContainer;
