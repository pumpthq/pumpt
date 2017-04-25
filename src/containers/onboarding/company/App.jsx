import React, { Component, PropTypes } from 'react'

import Wrapper from './../../../components/main/wrapper'
import { HeaderMini } from './../../../components/main/header'
import ScrollContainer from './../../../components/main/scrollContainer'
import logoImage from './../../../img/sprites-svg/logo.svg'

import OnboardingCompanyStepSwitcher from './steps/stepSwitcher'
import WallpapersSwitcher from './steps/wallpapersSwitcher'

class OnboardingCompany extends Component {

    render() {
        return (
            <Wrapper id='onboarding-company'>
                <WallpapersSwitcher/>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12'>
                            <HeaderMini className='header_mini' logo={logoImage}/>
                        </div>
                    </div>
                </div>
                <ScrollContainer ref='ScrollContainer'>
                    <OnboardingCompanyStepSwitcher scrollTop={() => {
                        const { ScrollContainer } = this.refs

                        if (ScrollContainer) {
                            const { scroll } = ScrollContainer.refs

                            scroll.scrollTop = 0
                        }
                    }}/>
                </ScrollContainer>
            </Wrapper>
        )
    }
}

OnboardingCompany.propTypes = {
    state : PropTypes.object
}

module.exports = OnboardingCompany
