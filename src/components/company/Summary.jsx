import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import UploadImage from 'containers/application/company/parts/uploadImage'
import PencilIcon from 'components/icons/pencil'
import BuildingIcon from 'components/icons/building'

export default class CompanySummary extends Component {
    render() {
        const { company: { name, type, locationHeadquarters, foundDate, employeesAmount } } = this.props
        const { city, state } = locationHeadquarters
        const { authorization: {email}, onEdit} = this.props
        return (
            <div class="mdl-card card card_type_mini card_onb-info card_onb-info_filled">
                <div class="summary-head">
                    <div class="summary-head__title mdl-card__title">

                        <div class="summary-head__title-item">
                            <div class="summary-head__title-column">
                                <UploadImage
                                    iconPhoto={<BuildingIcon/>}
                                    controllerId='SummaryHeadCompany'
                                />{`
                                `}<div class="summary-head__title-block">
                                    <h2 class="mdl-card__title-text heading heading_type_two">
                                        {` ${name}`}
                                        <a class="link" onClick={onEdit}
                                           style={{
                                               visibility : 'visible',
                                               opacity: 1
                                           }}>
                                            <PencilIcon/>
                                            &nbsp;Edit
                                        </a>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div class="summary-head__title-item summary-head__title-item_type_alignment">
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Headquarters</span>
                                <span class="text text_size_s summary-head__summary">{`${city}, ${state.slice(0,2)}`}</span>
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Company Type</span>
                                <span class="text text_size_s summary-head__summary">{` ${type}`}</span>
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label"># of Employees</span>
                                <span class="text text_size_s summary-head__summary">{` ${employeesAmount}`}</span>
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Founded</span>
                                <span class="text text_size_s summary-head__summary">{` ${foundDate}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
