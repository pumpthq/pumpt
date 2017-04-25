import React, { Component, PropTypes } from 'react';
import Wrapper from './../../../components/main/wrapper';
import { HeaderMini } from './../../../components/main/header';
import ScrollContainer from './../../../components/main/scrollContainer';
import logoImage from './../../../img/sprites-svg/logo.svg';

import OnboardingCandidateStepSwitcher from './steps/stepSwitcher';
import WallpapersSwitcher from './steps/wallpapersSwitcher';

class OnboardingCandidate extends Component {

    componentDidMount() {
        return this.scrollContainer;
    }

    render() {
        return (
            <Wrapper id="onboarding-candidate">
                <WallpapersSwitcher />
                <div className="container">
                    <div className="row row-padding-bigger">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <HeaderMini className="header_mini" logo={logoImage} />
                        </div>
                    </div>
                </div>
                <ScrollContainer
                    ref={(node) => { this.scrollContainer = node; }}
                >
                    <OnboardingCandidateStepSwitcher
                        scrollTop={() => {
                            const Scroll = this.scrollContainer;
                            if (Scroll) {
                                const { scroll } = Scroll.refs;
                                scroll.scrollTop = 0;
                            }
                        }}
                    />
                </ScrollContainer>
            </Wrapper>
        );
    }
}

OnboardingCandidate.propTypes = {
    state: PropTypes.object,
};

module.exports = OnboardingCandidate;
