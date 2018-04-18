import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import List from './../../../../../components/main/list'
import {COMPANY_EMPLOYEES_DATA} from './../../../../../constants/companyOnboarding'
import {
    gotoFoundationYearStep,
    saveNumberOfEmployeesStep,
    showFoundationYearStep,
} from './../../../../../actions/companyOnboarding'
import uuid from 'uuid'
import {findById} from '../../../../../constants/dropdownData'

import {StepListLink} from '../../../renderHelpers'

@connect(
    function mapStateToProps(state, ownProps) {
        const { numberOfEmployees } = state.companyOnboarding
        const activeItem = findById({
            id : numberOfEmployees ? numberOfEmployees.id : null,
            data : COMPANY_EMPLOYEES_DATA
        })

        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value }) => {
            dispatch(saveNumberOfEmployeesStep({
                numberOfEmployees : {
                    id,
                    value
                }
            }))
            dispatch(showFoundationYearStep())
            dispatch(gotoFoundationYearStep())
        }

        return {
            dispatch,
            nextStep
        }
    }
)
class NumberOfEmployeesForm extends Component {
    render() {
        const { nextStep, listItems, activeItem } = this.props

        return (
            <List type='onboarding'>
                {listItems.map(item => {
                    return (
                        <StepListLink {...{
                            key : uuid.v4(),
                            item,
                            activeItem,
                            onClick : nextStep
                        }} >{item}</StepListLink>
                    )
                })}
            </List>
        )
    }
}

NumberOfEmployeesForm.propTypes = {
    dispatch : PropTypes.func,
    nextStep : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItem : PropTypes.object
}

NumberOfEmployeesForm.defaultProps = {
    listItems : COMPANY_EMPLOYEES_DATA
}

export default NumberOfEmployeesForm
