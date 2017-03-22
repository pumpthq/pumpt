import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import OnboardingWallpapers from '../../../../components/onboarding/onboardingWallpapers'

import {
    SHOW_CONTACT_INFO_STEP,
    SHOW_COMPANY_TYPE_STEP,
    SHOW_HEADQUATERS_LOCATION_STEP,
    SHOW_NUMBER_OF_EMPLOYEES_STEP,
    SHOW_FOUNDATION_YEAR_STEP,
    SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
    SHOW_SET_UP_PASSWORD_STEP
} from './../../../../constants/companyOnboarding'

@connect(
    function mapStateToProps(state) {
        const { step } = state.companyOnboarding

        return {
            state,
            step
        }
    }
)

export default class WallpapersSwitcher extends Component {
    render() {
        const { step } = this.props
        let type = false

        switch (step) {
            case SHOW_CONTACT_INFO_STEP :
                type = false
                break
            case SHOW_COMPANY_TYPE_STEP :
                type = 'second'
                break
            case SHOW_HEADQUATERS_LOCATION_STEP :
                type = 'third'
                break
            case SHOW_NUMBER_OF_EMPLOYEES_STEP :
                type = 'fourth'
                break
            case SHOW_FOUNDATION_YEAR_STEP :
                type = 'fifth'
                break
            case SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP :
                type = 'sixth'
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
    ])
}
