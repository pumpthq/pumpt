import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    List,
    LIST_ITEM_TYPE_TEXT,
    LIST_ITEM_TYPE_USER_ENTERED,
    LIST_ITEM_TYPE_GROUP
} from './../../../../../components/main/list2'
import Button from './../../../../../components/main/button'
import { INDUSTRY_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding'
import { apiEnumToListData } from './../../../../../utils'

import {
    saveIndustryData,
    showFieldOfExpertiseStep,
    gotoFieldOfExpertiseStep,
} from './../../../../../actions/candidateOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { industry } = state.candidateOnboarding
        return {
            prefilledIndustry: industry
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = ({id, value}) => {
            dispatch(saveIndustryData({
                industry : {
                    id,
                    value
                }
            }))
            dispatch(showFieldOfExpertiseStep())
            dispatch(gotoFieldOfExpertiseStep())
        };

        return {
            dispatch,
            nextStep
        }
    }
)
class IndustryContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledIndustry } = this.props
        if(prefilledIndustry) {
            console.log('Prefill state (Industry)')
            console.log(this.props.prefilledIndustry)
            this.state = {
                stepValid: true,
                id: prefilledIndustry.id,
                value: prefilledIndustry.value
            }
        } else {
            this.state = {
                stepValid: false,
                id: '',
                value: ''
            }
        }
        this.handleListChange = this.handleListChange.bind(this)
        this.handleNextButtonCLick = this.handleNextButtonCLick.bind(this)
    }

    handleListChange({ id, value }) {
        this.setState({
            stepValid: (value !== '' && value.charAt(0) !== ' '),
            id: id,
            value: value
        })
    }

    handleNextButtonCLick(e) {
        let { dispatch, nextStep } = this.props
        let { id, value } = this.state
        nextStep({ id, value })
    }

    render() {
        const convertedItems = apiEnumToListData(INDUSTRY_DROPDOWN_DATA)
        const classesToAdd = [
            'list_type_onboarding'
        ]
        const { stepValid, id, value } = this.state
        return (
            <div>
                <List
                    items={convertedItems}
                    classesToAdd={classesToAdd}
                    allowNoSelection={true}
                    listValueSelected={this.handleListChange}
                    preselectedItem={id}
                    preselectedValue={value}
                    handleGroups={false}
                    otherPlaceholder={'Enter Industry Here'}
                />
                <div class='form__actions'>
                    <Button
                        typeColored={true}
                        buttonSize={'l'}
                        disabled={!stepValid}
                        onClick={this.handleNextButtonCLick}
                    >Next</Button>
                </div>
            </div>
        )
    }
}

IndustryContent.propTypes = {
    dispatch: PropTypes.func,
    nextStep: PropTypes.func,
    prefilledIndustry: PropTypes.object
}

IndustryContent.defaultProps = {
    dispatch: () => {},
    nextStep: () => {}
}

export default IndustryContent
