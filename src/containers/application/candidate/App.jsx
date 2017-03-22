import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Wrapper from '../../../components/main/wrapper'
import { HeaderMini } from '../../../components/main/header'
import ScrollContainer from '../../../components/main/scrollContainer'
import EntryBlock from './EntryBlock'
import logoImage from '../../../img/sprites-svg/logo.svg'
import { STARTUP_COMPLETED_STEPS } from './../../../constants/applicationCandidate';

@connect(
    (state) => {
        const {
            summary,
            profilePhoto,
            progress,
        } = state.applicationCandidate;
        const { firstName, lastName } = summary;

        return {
            firstName,
            lastName,
            profilePhoto,
            progress: STARTUP_COMPLETED_STEPS + progress.length,
        };
    }
)
class ApplicationCandidateWrapper extends Component {

    render() {
        const {
            firstName,
            lastName,
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
                                name={`${firstName} ${lastName}`}
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

ApplicationCandidateWrapper.propTypes = {
    firstName : PropTypes.string,
    lastName : PropTypes.string,
    profilePhoto : PropTypes.string,
    progress : PropTypes.number,
    completed : PropTypes.number
}
ApplicationCandidateWrapper.defaultProps = {
    completed : 5
}

export default ApplicationCandidateWrapper
