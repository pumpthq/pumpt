import React, { Component, PropTypes } from 'react';
import Wrapper from './../../../components/main/wrapper';
import TabBar from './parts/TabBar'

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class ShowContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
              <div>
                <div className="container slider-container">
                    <div className="row row-padding-bigger">
                        <div className="col-lg-12">
                            {children}
                        </div>
                    </div>
                </div>
                <TabBar />
              </div>
        );
    }

}

ShowContainer.propTypes = propTypes;
ShowContainer.defaultProps = defaultProps;

module.exports = ShowContainer
