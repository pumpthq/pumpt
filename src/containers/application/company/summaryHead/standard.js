import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BuildingIcon from './../../../../components/icons/building'
import PencilIcon from '../../../../components/icons/pencil'
import UploadImage from './../parts/uploadImage'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            companyName,
            companyType,
            email,
            numberOfEmployees,
            foundationYear
        } = state.applicationCompany.summary
        const {
            place
        } = state.applicationCompany.location[0]

        return {
            onboardingState : {
                companyName : companyName || 'Rakuten Global',
                email : email || 'nick.thornton@rakuten.global',
                companyType : companyType ? companyType.value  : 'Digital Media',
                numberOfEmployees : numberOfEmployees ? numberOfEmployees.value : '500-1000',
                foundationYear : foundationYear || 1911,
                headquatersLocation : place || 'Headquarters'
            }
        }
    },
    null
)
class SummaryHeadStandard extends Component {
    render() {

        const { onboardingState, onEdit } = this.props

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
                                        {` ${onboardingState.companyName}`}
                                        <a class="link" onClick={onEdit}
                                           style={{
                                               visibility : 'visible',
                                               opacity: 1
                                           }}>
                                            <PencilIcon/>
                                            &nbsp;Edit
                                        </a>
                                    </h2>
                                    <div class="mdl-card__subtitle-text summary-head__subtitle-text">
                                        <span class="text">{` ${onboardingState.email}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="summary-head__title-item summary-head__title-item_type_alignment">
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Headquarters</span>
                                <span class="text text_size_s summary-head__summary">{` ${onboardingState.headquatersLocation}`}</span>
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Company Type</span>
                                <span class="text text_size_s summary-head__summary">{` ${onboardingState.companyType}`}</span>
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label"># of Employees</span>
                                <span class="text text_size_s summary-head__summary">{` ${onboardingState.numberOfEmployees}`}</span>
                            </div>
                            <div class="summary-head__title-column">
                                <span class="text summary-head__label">Founded</span>
                                <span class="text text_size_s summary-head__summary">{` ${onboardingState.foundationYear}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SummaryHeadStandard.propTypes = {
    onboardingState : PropTypes.shape({
        companyName : PropTypes.string,
        email : PropTypes.string,
        companyType : PropTypes.string,
        numberOfEmployees : PropTypes.string,
        foundationYear : PropTypes.number,
        headquatersLocation : PropTypes.string
    }),
    onEdit : PropTypes.func
}
SummaryHeadStandard.defaultProps = {
    onEdit : (event) => {}
}

export default SummaryHeadStandard
