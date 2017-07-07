import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import { findById } from '../../../../../constants/dropdownData'

import {
    saveCompanySizeData,
    showValuesStep,
} from './../../../../../actions/candidateOnboarding'

import { StepListLink } from '../../../renderHelpers'
import { COMPANY_SIZE_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { preferredCompanySize } = state.candidateOnboarding
        const activeItem = findById({
            id : preferredCompanySize ? preferredCompanySize.id : null,
            data : COMPANY_SIZE_DROPDOWN_DATA
        })

        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value }) => {
            dispatch(saveCompanySizeData({
                preferredCompanySize : {
                    id,
                    value
                }
            }))
            dispatch(showValuesStep())
        }

        return {
            dispatch,
            nextStep
        }
    }
)
class CompanySizeForm extends Component {
    render() {
        const { listItems, nextStep, activeItem } = this.props

        return (
            <List type='onboarding'>
                {listItems.map(item => {
                    return (
                        <StepListLink {...{
                            key : uuid.v4(),
                            item,
                            activeItem,
                            onClick : nextStep
                        }} />
                    )
                })}
            </List>
        )
    }
}

CompanySizeForm.propTypes = {
    nextStep : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItem : PropTypes.object
}
CompanySizeForm.defaultProps = {
    listItems : COMPANY_SIZE_DROPDOWN_DATA
}

export default CompanySizeForm
