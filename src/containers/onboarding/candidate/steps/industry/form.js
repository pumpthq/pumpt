import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from './../../../../../components/main/list'
import { findById } from '../../../../../constants/dropdownData'
import { INDUSTRY_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding'
import uuid from 'uuid'

import {
    saveIndustryData,
    showFieldOfExpertiseStep,
    gotoFieldOfExpertiseStep,
} from './../../../../../actions/candidateOnboarding'

import { AlternativeListItem, StepListLink } from '../../../renderHelpers'

@connect(
    function mapStateToProps(state, ownProps) {
        const { industry } = state.candidateOnboarding
        const activeItem = findById({
            id : industry ? industry.id : null,
            data : INDUSTRY_DROPDOWN_DATA
        })

        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value }) => {
            dispatch(saveIndustryData({
                industry : {
                    id,
                    value
                }
            }))
            dispatch(showFieldOfExpertiseStep())
            dispatch(gotoFieldOfExpertiseStep())
        }

        return {
            dispatch,
            nextStep
        }
    }
)
class IndustryForm extends Component {
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

IndustryForm.propTypes = {
    dispatch : PropTypes.func,
    nextStep : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.object),
    activeItem : PropTypes.object
}
IndustryForm.defaultProps = {
    listItems : INDUSTRY_DROPDOWN_DATA
}

export default IndustryForm
