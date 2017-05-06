import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardOpen from '../../../components/jobs/cardOpen';
import SummaryHead from './new/summaryHead';
import MiddleBlock from './new/middleBlock';

import { browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {};

// @connect
class NewContainer extends Component {

    render() {

        return (
          <div className="container slider-container">
              <div className="row row-padding-bigger">
                  <div className="col-lg-12">
                    <CardOpen
                        summaryHead={<SummaryHead />}
                        middleBlock={<MiddleBlock />}
                        onClick={browserHistory.goBack}
                    />
                  </div>
              </div>
          </div>
        );
    }

}

NewContainer.propTypes = propTypes;
NewContainer.defaultProps = defaultProps;

module.exports = NewContainer;
