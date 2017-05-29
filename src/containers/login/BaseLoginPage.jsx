import React, { Component, PropTypes } from 'react'
import PopUpBig from './../../components/main/popup'

import Wrapper from './../../components/main/wrapper';
import WallpapersSwitcher from './../onboarding/candidate/steps/wallpapersSwitcher';

import {
    SHOW_CONTACT_INFO_STEP,
    SHOW_INDUSTRY_STEP,
    SHOW_FIELD_OF_EXPERTISE_STEP,
    SHOW_JOB_TITLE_STEP,
    SHOW_INCOME_STEP,
    SHOW_EXPERIENCE_STEP,
    SHOW_VALUES_STEP,
    SHOW_COMPANY_SIZE_STEP,
    SHOW_SET_UP_PASSWORD_STEP
} from './../../constants/candidateOnboarding'

class BaseLoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { children } = this.props

        return (
            <Wrapper id="onboarding-candidate">
                <WallpapersSwitcher
                    step={'sixth'}
                    isRichWallpaperNeeded={true}
                />
                <PopUpBig
                    heading='Log In'
                    children={children}
                    backgroundTransparency={true}
                />
            </Wrapper>
        )
    }

}

BaseLoginPage.propTypes = {
    children : PropTypes.node
}
BaseLoginPage.defaultProps = {}

export default BaseLoginPage
