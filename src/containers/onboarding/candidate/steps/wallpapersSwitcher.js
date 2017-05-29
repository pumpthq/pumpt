import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import OnboardingWallpapers from '../../../../components/onboarding/onboardingWallpapers'

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
} from './../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state) {
        const { step } = state.candidateOnboarding

        return {
            state,
            step
        }
    }
)

export default class WallpapersSwitcher extends Component {
    render() {
        let { step, isRichWallpaperNeeded } = this.props
        let type = false

        if(isRichWallpaperNeeded) {
            step = SHOW_EXPERIENCE_STEP
        }
        switch (step) {
            case SHOW_CONTACT_INFO_STEP :
                type = false
                break
            case SHOW_INDUSTRY_STEP :
                type = 'second'
                break
            case SHOW_FIELD_OF_EXPERTISE_STEP :
                type = 'third'
                break
            case SHOW_JOB_TITLE_STEP :
                type = 'fourth'
                break
            case SHOW_INCOME_STEP :
                type = 'fifth'
                break
            case SHOW_EXPERIENCE_STEP :
                type = 'sixth'
                break
            case SHOW_VALUES_STEP :
                type = 'sixth'
                break
            case SHOW_COMPANY_SIZE_STEP :
                type = 'second'
                break
            case SHOW_SET_UP_PASSWORD_STEP :
                type = 'final'
                break
            default : type = false
        }

        return (
            <OnboardingWallpapers onboardingMode onboardingModeType={type}/>
        )
    }
}

WallpapersSwitcher.propTypes = {
    step : PropTypes.oneOf([
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth',
        'final',
        false
    ]),
    isRichWallpaperNeeded: PropTypes.bool
}

WallpapersSwitcher.defaultProps = {
    isRichWallpaperNeeded: false
}
