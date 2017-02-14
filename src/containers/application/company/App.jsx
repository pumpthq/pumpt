import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Wrapper from '../../../components/main/wrapper'
import { HeaderMini } from '../../../components/main/header'
import ScrollContainer from '../../../components/main/scrollContainer'
import EntryBlock from './EntryBlock'
import logoImage from '../../../img/sprites-svg/logo.svg'
import { STARTUP_COMPLETED_STEPS } from './../../../constants/applicationCompany'
@connect(
    function mapStateToProps(state, ownProps) {
        const {
            summary,
            profilePhoto,
            progress,
        } = state.applicationCompany;
        const { companyName } = summary;

        return {
            companyName,
            profilePhoto,
            progress: STARTUP_COMPLETED_STEPS + progress.length,
        };
    }
)
class ApplicationCompanyWrapper extends Component {

    render() {
        const {
            companyName,
            profilePhoto,
            progress
        } = this.props

        return (
            <Wrapper id='onboarding-candidate'>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <HeaderMini
                                class="header_small"
                                profilePhoto={profilePhoto}
                                logo={logoImage}
                                name={companyName}
                                progress={progress}
                            />
                        </div>
                    </div>
                </div>
                <ScrollContainer>
                    <EntryBlock/>
                </ScrollContainer>
            </Wrapper>
        )
    }

}

ApplicationCompanyWrapper.propTypes = {
    companyName : PropTypes.string,
    progress : PropTypes.number,
    completed : PropTypes.number,
    profilePhoto: PropTypes.string,
}
ApplicationCompanyWrapper.defaultProps = {
    completed : 5,
}

export default ApplicationCompanyWrapper
