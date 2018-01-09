import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    Multi,
    MULTI_ITEM_TYPE_TEXT,
    MULTI_ITEM_TYPE_USER_ENTERED,
    MULTI_ITEM_TYPE_GROUP
} from './../../../../../components/main/multilist'
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
        const { industries } = state.candidateOnboarding
        return {
            prefilledIndustries: industries
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = (industries) => {
            dispatch(saveIndustryData({
                industries
            }))
            dispatch(showFieldOfExpertiseStep())
            dispatch(gotoFieldOfExpertiseStep())
        };
      const onChange = (industries) => dispatch(saveIndustryData({
        industries
      }))

        return {
            dispatch,
          nextStep,
          onChange
        }
    }
)
class IndustryContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledIndustries } = this.props
        if(prefilledIndustries) {
            this.state = {
                stepValid: true,
                industries: prefilledIndustries,
            }
        } else {
            this.state = {
                stepValid: false,
                industries: []
            }
        }
        this.handleListChange = this.handleListChange.bind(this)
        this.handleNextButtonCLick = this.handleNextButtonCLick.bind(this)
    }

    handleListChange(selected) {
        this.setState({
            stepValid: selected.length !== 0, 
            industries: selected
        })

      const { onChange } = this.props;
      onChange(selected);
    }

    handleNextButtonCLick(e) {
        let { dispatch, nextStep } = this.props
        let { industries } = this.state
        nextStep( industries )
    }

    render() {
        const { prefilledIndustries } = this.props
        const convertedItems = apiEnumToListData(INDUSTRY_DROPDOWN_DATA)
        const classesToAdd = [
            'list_type_onboarding'
        ]
        const { stepValid } = this.state

        return (
            <div>
                <Multi
                    items={convertedItems}
                    classesToAdd={classesToAdd}
                    allowNoSelection={true}
                    listValuesSelected={this.handleListChange}
                    preselectedItems={prefilledIndustries}
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
    prefilledIndustries: PropTypes.array
}

IndustryContent.defaultProps = {
    dispatch: () => {},
    nextStep: () => {}
}

export default IndustryContent
