import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { OnboardingInput } from 'components/onboarding'
import List, { ListLink, ListItem } from 'components/main/list'
import { COMPANY_TYPE_DATA } from 'constants/companyOnboarding'
import uuid from 'uuid'
import { findById } from 'constants/dropdownData'

import {
    saveCompanyTypeData,
    showHeadquartersLocationStep
} from 'actions/companyOnboarding'

import { AlternativeListItem, StepListLink } from '../../../renderHelpers'

@connect(
    function mapStateToProps(state, ownProps) {
        const { companyType } = state.companyOnboarding
        const activeItem = findById({
            id : companyType ? companyType.id : null,
            data : COMPANY_TYPE_DATA
        })
        return {
            activeItem
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({ id, value }) => {
            dispatch(saveCompanyTypeData({
                companyType : {
                    id,
                    value
                }
            }))
            dispatch(showHeadquartersLocationStep())
        }
        return {
            dispatch,
            nextStep
        }
    }
)
class TypeForm extends Component {
    render() {
        const { nextStep, listItems, activeItem } = this.props
        return (
            <List type='onboarding'>
                {listItems.map(item => {
                    if(item.alternative) {
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

TypeForm.propTypes = {
    dispatch : PropTypes.func,
    nextStep : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.string),
    activeItem : PropTypes.object
}

TypeForm.defaultProps = {
    listItems : COMPANY_TYPE_DATA
}

export default TypeForm
