import React, {Component, PropTypes} from 'react';
import Wrapper from './../../../components/main/wrapper';
import TabBar from './parts/TabBar';
import CompanyHeader from './parts/HeaderMenu';

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class MatchesContainer extends Component {

    render() {
      const { children } = this.props;
      const activeLocation = this.props.location;

        return (
            <Wrapper>
                <div className="container topnav">
                    <div className="row">
                        <div className="col-12">
                            <CompanyHeader location={activeLocation} />
                        </div>
                    </div>
                </div>
                <div className="container main">
                    {children}
                </div>
                <TabBar />
            </Wrapper>
        );
    }

}

MatchesContainer.propTypes = propTypes;
MatchesContainer.defaultProps = defaultProps;

module.exports = MatchesContainer
