import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import UploadImage from '../parts/uploadImage'
import PencilIcon from '../../../../components/icons/pencil'
import IconPhoto from '../../../../components/icons/photo'

@connect(
    function mapStateToProps(state, ownProps) {
        const { email } = state.authorization
        const {
            firstName,
            lastName,
            industry,
            fieldOfExpertise,
            jobTitle,
            income,
            experience
        } = state.applicationCandidate.summary
        const fullName = (firstName && lastName) ?
            ` ${firstName} ${lastName} ` : ' Jane Sullivan '

        return {
            onboardingState : {
                firstName : firstName || '',
                lastName : lastName || '',
                fullName,
                email : email || '',
                industry : industry ? industry.value : '',
                fieldOfExpertise : fieldOfExpertise ? fieldOfExpertise.value : '',
                jobTitle : jobTitle ? jobTitle.value : '',
                income : income ? income.value : '',
                experience : experience ? experience.value : ''
            }
        }
    },
    null
)
class SummaryHeadStandard extends Component {
    render() {
        const { onboardingState, onEdit } = this.props

        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item">
                        <div class="summary-head__title-column">
                            <UploadImage
                                iconPhoto={<IconPhoto />}
                                controllerId='SummaryHeadCandidate'
                            />
														<br></br>
														<br></br>
                            <div class="summary-head__title-block">
                                <h2 class="mdl-card__title-text heading heading_type_two">
                                    <span class="ellipsis-text">
                                        {onboardingState.fullName}
                                    </span>
                                    <a class="link" onClick={onEdit}
                                       style={{
                                        visibility: 'visible',
                                        opacity: 1
                                       }}>
                                        <PencilIcon />
                                        &nbsp;Edit
                                    </a>
                                </h2>
                                <div class="mdl-card__subtitle-text summary-head__subtitle-text">
                                    <span class="text ellipsis-text">{onboardingState.email}</span>
                                    <ul class="list list_type_inline">
                                        <li class="list__item"><span class="text">{`${onboardingState.industry} `}</span></li>
                                        <li class="list__item"><span class="text">{`${onboardingState.fieldOfExpertise} `}</span></li>
                                        <li class="list__item"><span class="text">{`${onboardingState.jobTitle} `}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Annual Income</span>
                            <span class="text text_size_s summary-head__summary">{onboardingState.income}</span>
                        </div>
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Industry Experience </span>
                            <span class="text text_size_s summary-head__summary">{onboardingState.experience}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SummaryHeadStandard.propTypes = {
    onboardingState : PropTypes.shape({
        fullName : PropTypes.string,
        email : PropTypes.string,
        industry : PropTypes.string,
        fieldOfExpertise : PropTypes.string,
        jobTitle : PropTypes.string,
        income : PropTypes.string,
        experience : PropTypes.string
    }),
    onEdit : PropTypes.func
}
SummaryHeadStandard.defaultProps = {
    onEdit : (event) => {}
}

export default SummaryHeadStandard
