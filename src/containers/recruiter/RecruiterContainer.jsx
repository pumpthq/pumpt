import React, {Component} from 'react';
import Wrapper from 'components/main/wrapper';
import RecruiterHeader from './parts/HeaderMenu';
import TabBar from 'containers/recruiter/jobs/parts/TabBar'

class RecruiterContainer extends Component {

    render() {
        const { children } = this.props;

        return (
            <Wrapper id="dashboard">
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-12">
                            <RecruiterHeader />
                        </div>
                    </div>
                </div>
                {this.props.location.pathname.indexOf('list')>=0  ? <TabBar /> : ''}
                <div className="container">
                    {children}
                </div>
            </Wrapper>
        );
    }

}

module.exports = RecruiterContainer
