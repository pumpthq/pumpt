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
            <Wrapper id="dashboard">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <CompanyHeader location={activeLocation} />
                  </div>
                </div>
              </div>
              {this.props.location.pathname.indexOf('edit')<=0
                  && this.props.location.pathname.indexOf('settings')<=0
                  ? <TabBar />
                  : ''
              }
              <div className="container main">
                {children}
              </div>
            </Wrapper>
        );
    }

}

MatchesContainer.propTypes = propTypes;
MatchesContainer.defaultProps = defaultProps;

module.exports = MatchesContainer
