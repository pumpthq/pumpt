import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findById } from '../../../../../constants/dropdownData'

import {
    saveJobTitleStep,
    showIncomeStep
} from './../../../../../actions/candidateOnboarding'

//import { StepTopAccordion } from '../../../renderHelpers'
import { AlternativeListItem, StepListLink } from '../../../renderHelpers'
import { JOB_TITLE_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { jobTitle } = state.candidateOnboarding
        const activeItem = findById({
            id : jobTitle ? jobTitle.id : null,
            data : JOB_TITLE_DROPDOWN_DATA
        })

        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value, parent }) => {
            dispatch(saveJobTitleStep({
                jobTitle : {
                    id,
                    value
                },
                jobTitleHead : {
                    value : parent
                }
            }))
            dispatch(showIncomeStep())
        }

        return {
            dispatch,
            nextStep
        }
    }

)
class JobTitleForm extends Component {
    render() {
        const { listItems, nextStep, activeItem } = this.props
        return (
            <List type='onboarding'>
                {listItems.map(item => {
                    if (item.alternative) {
                        return (
                            <AlternativeListItem {...{
                                key : uuid.v4(),
                                item,
                                activeItem,
                                onClick : nextStep
                            }} />
                        )
                    }
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

JobTitleForm.propTypes = {
    nextStep : PropTypes.func,
    activeItem : PropTypes.object
}

export default JobTitleForm
