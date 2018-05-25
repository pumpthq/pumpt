import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import {findById} from '../../../../../constants/dropdownData'

import {gotoExperienceStep, saveIncomeData, showExperienceStep,} from './../../../../../actions/candidateOnboarding'

import {StepListLink} from '../../../renderHelpers'
import {
  ANNUAL_INCOME_DROPDOWN_DATA,
  INCOME_NA_ID as NAID,
  INCOME_NA as NA
} from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { income } = state.candidateOnboarding
        const activeItem = income && income.id === NAID ? NA : findById({
            id : income ? income.id : null,
            data : ANNUAL_INCOME_DROPDOWN_DATA
        })

        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value }) => {
          var val;
          if (id === NAID) {
            val = null;
          } else {
            val = value;
          }
            dispatch(saveIncomeData({
                income : {
                    id,
                    value: val
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
        const { nextStep, activeItem } = this.props
			{/*const listItems = [NA].concat(ANNUAL_INCOME_DROPDOWN_DATA);*/}
        const listItems = ANNUAL_INCOME_DROPDOWN_DATA;
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
    activeItem : PropTypes.object
}
IncomeForm.defaultProps = {
}

export default IncomeForm
