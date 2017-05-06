import React, { Component, PropTypes } from 'react';
import Wrapper from './../../components/main/wrapper';
import CompanyHeader from './parts/HeaderMenu';

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class RecruiterContainer extends Component {

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
                {children}
            </Wrapper>
        );
    }

}

RecruiterContainer.propTypes = propTypes;
RecruiterContainer.defaultProps = defaultProps;

module.exports = RecruiterContainer
