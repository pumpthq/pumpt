import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PencilIcon from 'components/icons/pencil'

import ImageUploader from 'components/ImageUploader'
import IconPhoto from 'components/icons/photo'
import {updateCandidate} from 'actions/candidateMatches'
import { displayIndustries } from 'components/helpers'

export default class CandidateSummary extends Component {
    render() {
        const { candidate: { firstName, lastName, avatar, interestWorkingArea, recentWorkingAreas, recentJob, recentAnnualIncome, recentAreaExperience } } = this.props
        const { authorization: {email}, onEdit} = this.props
        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
													{/* //FIXME:not showing until we have better x=browser testing on photo upload
                            <ImageUploader
                                label="Photo"
                                iconPhoto={<IconPhoto />}
                                imageId={avatar}
                                onSuccessAction={(data) => updateCandidate({avatar:data.id})}
                            />*/}
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
																<br/>
                                    <span class="text ellipsis-text">{email}</span>

                            </div>
                        </div>
                    </div>
                    <div class="summary-head__title-item summary-head__title-item_type_alignment">
                        <div class="summary-head__title-column">
														<span class="text summary-head__label">Industry</span>
														<span class="text text_size_s summary-head__summary">{interestWorkingArea && Array.isArray(interestWorkingArea) ? interestWorkingArea.join(', ') : interestWorkingArea}</span>
                            <span class="text summary-head__label">Annual Income</span>
                            <span class="text text_size_s summary-head__summary">{recentAnnualIncome}</span>
                        </div>
                        <div class="summary-head__title-column">
														<span class="text summary-head__label">Working Areas</span>
                            <span class="text text_size_s summary-head__summary">{displayIndustries(recentWorkingAreas)}</span>
                            <span class="text summary-head__label">Job Title </span>
                            <span class="text text_size_s summary-head__summary">{recentJob}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
