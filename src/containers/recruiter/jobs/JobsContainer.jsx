import React, { Component, PropTypes } from 'react';
// import Wrapper from './../../../components/main/wrapper';

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class JobsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
              <div>
                {children}
              </div>
        );
    }

}

JobsContainer.propTypes = propTypes;
JobsContainer.defaultProps = defaultProps;

module.exports = JobsContainer
