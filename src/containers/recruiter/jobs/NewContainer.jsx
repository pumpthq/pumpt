import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewCard from 'components/jobs/newCard'
const propTypes = {};
const defaultProps = {};

// @connect
class NewContainer extends Component {

    render() {

        return (
          <div className="container slider-container">
              <div className="row row-padding-bigger">
                  <div className="col-lg-12">
                    <NewCard {...this.props.job} />
                  </div>
              </div>
          </div>
        );
    }

}

NewContainer.propTypes = propTypes;
NewContainer.defaultProps = defaultProps;

module.exports = NewContainer;
