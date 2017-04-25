import React, { Component, PropTypes } from 'react';
import Wrapper from './../../../components/main/wrapper';
import WallpapersSwitcher from './../../onboarding/candidate/steps/wallpapersSwitcher';
import TabBar from './parts/TabBar';
import CompanyHeader from './parts/HeaderMenu';

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class MatchesContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
            <Wrapper>
                <WallpapersSwitcher
                    step={'sixth'}
                    isRichWallpaperNeeded={true}
                />
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

MatchesContainer.propTypes = propTypes;
MatchesContainer.defaultProps = defaultProps;

module.exports = MatchesContainer
