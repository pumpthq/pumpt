import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AccordionLayout, AccordionItem } from '../../../../components/application/accordion'
import AddExperienceActive from './addExperience/active'
import AddExperienceFilled from './addExperience/filled'
import AddEducationActive from './addEducation/active'
import AddEducationFilled from './addEducation/filled'
import AddLocationActive from './addLocation/active'
import AddLocationFilled from './addLocation/filled'
import AddSocialActive from './addSocial/active'
import AddSocialFilled from './addSocial/filled'
import AddSkillsActive from './addSkills/active'
import AddSkillsFilled from './addSkills/filled'
import AddInterestsActive from './addInterests/active'
import AddInterestsFilled from './addInterests/filled'

import EducationBlockDisplay from './education/display'
import EducationBlockEdit from './education/edit'
import EducationContainer from './education/container'

import CaseIcon from '../../../../components/icons/case'
import EducationIcon from '../../../../components/icons/education'
import PinIcon from '../../../../components/icons/pin'
import SocialIcon from '../../../../components/icons/social'
import Skills from '../../../../components/icons/skills'
import Heart from '../../../../components/icons/heart'

import ImportFromLinkedInButton from './../parts/ImportFromLinkedInButton'

import {
    EXPERIENCE_STEP,
    EDUCATION_STEP,
    LOCATION_STEP,
    SOCIAL_MEDIA_STEP,
    SKILLS_STEP,
    INTERESTS_STEP
} from './../../../../constants/applicationCandidate'

import {
    showExperienceStep,
    cancelExperienceStep,
    showEducationStep,
    cancelEducationStep,
    showLocationStep,
    cancelLocationStep,
    showSocialMediaStep,
    cancelSocialMediaStep,
    showSkillsStep,
    cancelSkillsStep,
    showInterestsStep,
    cancelInterestsStep
} from './../../../../actions/applicationCandidate'

import ApplicationAccordionPrototype from './../../accordionPrototype'

@connect(
    function mapStateToProps(state) {
        const { progress, active } = state.applicationCandidate

        return {
            filled : progress.slice(),
            active : active.slice().pop()
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)
class ApplicationCandidateAccordion extends ApplicationAccordionPrototype {
    constructor(props) {
        super(props)

        this.isActiveOrFilled = this.isActiveOrFilled.bind(this)
        this.syncWithStore = this.syncWithStore.bind(this)
    }

    syncWithStore() {
        const nextState = {
            experience : this.isActiveOrFilled({ constant : EXPERIENCE_STEP }),
            education : this.isActiveOrFilled({ constant : EDUCATION_STEP }),
            location : this.isActiveOrFilled({ constant : LOCATION_STEP }),
            socialMedia : this.isActiveOrFilled({ constant : SOCIAL_MEDIA_STEP }),
            skills : this.isActiveOrFilled({ constant : SKILLS_STEP }),
            interests : this.isActiveOrFilled({ constant : INTERESTS_STEP })
        }

        return nextState
    }

    render() {
        const { dispatch } = this.props
        const { experience, education, location, socialMedia, skills, interests } = this.syncWithStore()

        return (
            <AccordionLayout importButton={<ImportFromLinkedInButton/>}>
                <AccordionItem
                    iconElement={<CaseIcon/>}
                    title="Add Experience"
                    defaultTitle="Experience"
                    editTitle="Add Position"
                    status={experience}
                    childrenActive={<AddExperienceActive/>}
                    childrenFilled={<AddExperienceFilled/>}
                    onClick={dispatch.bind(null, showExperienceStep())}
                    onWhenActiveClick={dispatch.bind(null, cancelExperienceStep())}
                    onWhenFilledClick={dispatch.bind(null, showExperienceStep())}
                    onEdit={dispatch.bind(null, showExperienceStep())}
                />

                <EducationContainer
                    id={123}
                    />

                <AccordionItem
                    iconElement={<EducationIcon/>}
                    title="Add Education"
                    defaultTitle="Education"
                    editTitle="Add Education"
                    status={education}
                    childrenActive={<AddEducationActive/>}
                    childrenFilled={<AddEducationFilled/>}
                    onClick={dispatch.bind(null, showEducationStep())}
                    onWhenActiveClick={dispatch.bind(null, cancelEducationStep())}
                    onWhenFilledClick={dispatch.bind(null, showEducationStep())}
                    onEdit={dispatch.bind(null, showEducationStep())}
                />
                <AccordionItem
                    iconElement={<PinIcon/>}
                    title="Add Location"
                    defaultTitle="Location"
                    status={location}
                    childrenActive={<AddLocationActive/>}
                    childrenFilled={<AddLocationFilled/>}
                    onClick={dispatch.bind(null, showLocationStep())}
                    onWhenActiveClick={dispatch.bind(null, cancelLocationStep({}))}
                    onWhenFilledClick={dispatch.bind(null, showLocationStep())}
                    onEdit={dispatch.bind(null, showLocationStep())}
                />
                <AccordionItem
                    iconElement={<SocialIcon/>}
                    title="Add Social Media"
                    defaultTitle="Social Media"
                    status={socialMedia}
                    childrenActive={<AddSocialActive/>}
                    childrenFilled={<AddSocialFilled/>}
                    onClick={dispatch.bind(null, showSocialMediaStep())}
                    onWhenActiveClick={dispatch.bind(null, cancelSocialMediaStep({}))}
                    onWhenFilledClick={dispatch.bind(null, showSocialMediaStep())}
                    onEdit={dispatch.bind(null, showSocialMediaStep())}
                />
                <AccordionItem
                    iconElement={<Skills/>}
                    title="Add Skills"
                    defaultTitle="Skills"
                    status={skills}
                    childrenActive={<AddSkillsActive/>}
                    childrenFilled={<AddSkillsFilled/>}
                    onClick={dispatch.bind(null, showSkillsStep())}
                    onWhenActiveClick={dispatch.bind(null, cancelSkillsStep({}))}
                    onWhenFilledClick={dispatch.bind(null, showSkillsStep())}
                    onEdit={dispatch.bind(null, showSkillsStep())}
                />
                <AccordionItem
                    iconElement={<Heart/>}
                    title="Add Interests"
                    defaultTitle="Interests"
                    status={interests}
                    childrenActive={<AddInterestsActive/>}
                    childrenFilled={<AddInterestsFilled/>}
                    onClick={dispatch.bind(null, showInterestsStep())}
                    onWhenActiveClick={dispatch.bind(null, cancelInterestsStep())}
                    onWhenFilledClick={dispatch.bind(null, showInterestsStep())}
                    onEdit={dispatch.bind(null, showInterestsStep())}
                />

            </AccordionLayout>
        )
    }
}

ApplicationCandidateAccordion.propTypes = {
    dispatch : PropTypes.func
}
ApplicationCandidateAccordion.defaultProps = {}

export default ApplicationCandidateAccordion
