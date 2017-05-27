import React, { Component, PropTypes } from 'react';
import Wrapper from './../../components/main/wrapper';
import RecruiterHeader from './parts/HeaderMenu';

class RecruiterContainer extends Component {

    render() {
        const { children } = this.props;

        return (
            <Wrapper>
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-lg-12">
                            <RecruiterHeader />
                        </div>
                    </div>
                </div>
                <div className="container">
                    {children}
                </div>
            </Wrapper>
        );
    }

}

module.exports = RecruiterContainer
