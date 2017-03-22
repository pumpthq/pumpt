import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    PROFILE_PHOTO_STEP,
    EXPERIENCE_STEP,
    EDUCATION_STEP,
    LOCATION_STEP,
    SOCIAL_MEDIA_STEP,
    SKILLS_STEP,
    INTERESTS_STEP,
    STARTUP_COMPLETED_STEPS,
} from '../../../constants/applicationCandidate'
import {
    showEducationStep,
    showExperienceStep,
    showLocationStep,
    showSocialMediaStep,
    showSkillsStep,
    showInterestsStep
} from '../../../actions/applicationCandidate'
import CircleProgressBar from './../../../components/application/circleProgressBar'
import ProgressChartSidebarPrototype from './../sidebarPrototype'
import ImportFromLinkedInButton from './parts/ImportFromLinkedInButton'

const propTypes = {
    isFilled: PropTypes.bool,
};

const defaultProps = {
    isFilled: 'false',
};

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            active,
            progress,
            accordion
        } = state.applicationCandidate

        return {
            active : active.slice(),
            filled : progress.slice(),
            isStarted : accordion
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
class ProgressChartSidebar extends ProgressChartSidebarPrototype {

    render() {
        const {
            isStarted,
            isFilled,
            dispatch,
        } = this.props;

        return (
            <aside class="column column_size_xs invisible-mobile">
                <CircleProgressBar title="Profile" text="Completed" {...this.setLevel(STARTUP_COMPLETED_STEPS)} />
                { isStarted ? [
                    <p class="text text_color_invert text_leading_normal">
                        {isFilled ? '100% complete! Congrats!' : 'Boost your profile score by telling us more about you.'}
                    </p>,
                    <nav class="navigation navigation_vertical navigation_color_invert">
                        <a class={this.makeClasses({ constant : PROFILE_PHOTO_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                        }}>Profile Photo {this.renderOkIcon({ constant : PROFILE_PHOTO_STEP })}</a>

                        <a class={this.makeClasses({ constant : EXPERIENCE_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showExperienceStep())
                        }}>Experience {this.renderOkIcon({ constant : EXPERIENCE_STEP })}</a>

                        <a class={this.makeClasses({ constant : EDUCATION_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showEducationStep())
                        }}>Education {this.renderOkIcon({ constant : EDUCATION_STEP })}</a>

                        <a class={this.makeClasses({ constant : LOCATION_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showLocationStep())
                        }}>Location {this.renderOkIcon({ constant : LOCATION_STEP })}</a>

                        <a class={this.makeClasses({ constant : SOCIAL_MEDIA_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showSocialMediaStep())
                        }}>Social Media {this.renderOkIcon({ constant : SOCIAL_MEDIA_STEP })}</a>

                        <a class={this.makeClasses({ constant : SKILLS_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showSkillsStep())
                        }}>Skills {this.renderOkIcon({ constant : SKILLS_STEP })}</a>

                        <a class={this.makeClasses({ constant : INTERESTS_STEP })}
                           href="" style={{pointerEvents: 'none', cursor: 'default'}} onClick={(event) => {
                            event.preventDefault()
                            dispatch(showInterestsStep())
                        }}>Interests {this.renderOkIcon({ constant : INTERESTS_STEP })}</a>
                    </nav>,
                    <ImportFromLinkedInButton isImporter="true"/>
                    ] :
                    null
                }
            </aside>
        )
    }
}

ProgressChartSidebar.propTypes = propTypes;
ProgressChartSidebar.defaultProps = defaultProps;

export default ProgressChartSidebar;
