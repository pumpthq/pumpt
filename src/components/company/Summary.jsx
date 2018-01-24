import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PencilIcon from 'components/icons/pencil'

import ImageUploader from 'components/ImageUploader'
import BuildingIcon from 'components/icons/building'
import {updateCompany} from 'actions/applicationCompany'

const shortenLocation  = value => {
	return value.match(/[^,]+,[^,]+/)
}

export default class CompanySummary extends Component {

    render() {
        const { company: { name, type, headquartersLocation, foundDate, employeesAmount, logo, background } } = this.props
        const { authorization: {email}, onEdit} = this.props
        return (
                <div class="summary-head company-summary-head">
									<div class="summary-head__title mdl-card__title">
										<div class="row">
											<div class="col-md-11 col-lg-11 col-sm-10 col-xs-12">

                        <div class="summary-head__title-item">
                            <div class="row summary-head__title-column">
                                <div class="summary-head__title-block">
																	<div class="summary-head__title-block">
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
                        </div>
                        <div class="summary-head__title-item">
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Headquarters</span>
																{headquartersLocation &&
																		<span class="text text_size_s summary-head__summary">{`${shortenLocation(headquartersLocation)}`}</span>
																}
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Company Type</span>
                                <span class="text text_size_s summary-head__summary">{type && Array.isArray(type) ? ` ${type.join(', ')}` : type}</span>
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
                </div>
        )
    }
}
