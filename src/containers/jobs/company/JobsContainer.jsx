import React, { Component, PropTypes } from 'react';
import Wrapper from './../../../components/main/wrapper';
import TabBar from './parts/TabBar';
import CompanyHeader from './parts/HeaderMenu';

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
            <Wrapper>
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-lg-12">
                            <CompanyHeader />
                        </div>
                    </div>
                </div>
                <div className="container slider-container">
                    <div className="row row-padding-bigger">
                        <div className="col-lg-12">
                            {children}
                        </div>
                    </div>
                </div>
                <TabBar />
            </Wrapper>
        );
    }

}

JobsContainer.propTypes = propTypes;
JobsContainer.defaultProps = defaultProps;

module.exports = JobsContainer
