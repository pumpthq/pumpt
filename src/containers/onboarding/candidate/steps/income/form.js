import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import { findById } from '../../../../../constants/dropdownData'

import {
    saveIncomeData,
    showExperienceStep,
    gotoExperienceStep,
} from './../../../../../actions/candidateOnboarding'

import { StepListLink } from '../../../renderHelpers'
import { ANNUAL_INCOME_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { income } = state.candidateOnboarding
        const activeItem = findById({
            id : income ? income.id : null,
            data : ANNUAL_INCOME_DROPDOWN_DATA
        })

        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value }) => {
            dispatch(saveIncomeData({
                income : {
                    id,
                    value
                }
            }))
            dispatch(showExperienceStep())
            dispatch(gotoExperienceStep())
        }

        return {
            dispatch,
            nextStep
        }
    }
)
class IncomeForm extends Component {
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

IncomeForm.propTypes = {
    nextStep : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItem : PropTypes.object
}
IncomeForm.defaultProps = {
    listItems : ANNUAL_INCOME_DROPDOWN_DATA
}

export default IncomeForm
