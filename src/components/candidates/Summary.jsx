import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PencilIcon from 'components/icons/pencil'

import ImageUploader from 'components/ImageUploader'
import IconPhoto from 'components/icons/photo'
import {updateCandidate} from 'actions/candidateMatches'

export default class CandidateSummary extends Component {
    render() {
        const { candidate: { firstName, lastName, avatar, interestWorkingArea, recentWorkingArea, recentWorkingAreaParent, recentJob, recentAnnualIncome, recentAreaExperience } } = this.props
        const { authorization: {email}, onEdit} = this.props
        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item">
                        <div class="summary-head__title-column">
                            <ImageUploader
                                label="Photo"
                                iconPhoto={<IconPhoto />}
                                imageId={avatar}
                                onSuccessAction={(data) => updateCandidate({avatar:data.id})}
                            />
                            <div class="summary-head__title-block">
                                <h2 class="mdl-card__title-text heading heading_type_two">
                                    <span class="ellipsis-text">
                                        {firstName} {lastName}
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
                                    <span class="text ellipsis-text">{email}</span>
                                    <ul class="list list_type_inline">
                                        <li class="list__item"><span class="text"><span class="text summary-head__label">Industry</span>{interestWorkingArea}</span></li>
                                        <li class="list__item"><span class="text"><span class="text summary-head__label">Working Area</span>{recentWorkingAreaParent}</span></li>
                                        <li class="list__item"><span class="text"><span class="text summary-head__label">Specialty</span>{recentWorkingArea}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Annual Income</span>
                            <span class="text text_size_s summary-head__summary">{recentAnnualIncome}</span>
                        </div>
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Job Title </span>
                            <span class="text text_size_s summary-head__summary">{recentJob}</span>
                        </div>
                        <div class="summary-head__title-column">
                            <span class="text summary-head__label">Industry Experience </span>
                            <span class="text text_size_s summary-head__summary">{recentAreaExperience}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
