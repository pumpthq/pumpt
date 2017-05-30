import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Wrapper from './../../../components/main/wrapper';
import WallpapersSwitcher from './../../onboarding/candidate/steps/wallpapersSwitcher';
import TabBar from './parts/TabBar';
import CompanyHeader from './parts/HeaderMenu';

// import ApplySuccessDialog from 'components/matches/ApplySuccessDialog'

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class MatchesContainer extends Component {

    render() {
        const { children } = this.props;

        return (
            <Wrapper>
                {/* <WallpapersSwitcher
                    step={'sixth'}
                    isRichWallpaperNeeded={true}
                /> */}
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-xs-12">
                            <CompanyHeader />
                        </div>
                    </div>
                </div>
                <div className="container">
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
