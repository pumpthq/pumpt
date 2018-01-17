import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    Multi,
    MULTI_ITEM_TYPE_TEXT,
    MULTI_ITEM_TYPE_USER_ENTERED
} from './../../../../../components/main/multilist'
import Button from './../../../../../components/main/button'
import { COMPANY_TYPE_DATA } from './../../../../../constants/companyOnboarding'
import { apiEnumToListData } from './../../../../../utils'

import {
    saveCompanyTypeData,
    showHeadquartersLocationStep,
    gotoHeadquartersLocationStep,
} from './../../../../../actions/companyOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { companyType } = state.companyOnboarding
        return {
            prefilledCompany: companyType
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        const nextStep = (type) => {
            dispatch(saveCompanyTypeData({companyType: type}))
            dispatch(showHeadquartersLocationStep())
            dispatch(gotoHeadquartersLocationStep())
        };
      const onChange = (type) => dispatch(saveCompanyTypeData({
        companyType: type
      }))

        return {
            dispatch,
            nextStep,
            onChange
        }
    }
)
class TypeContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledCompany } = this.props
        if(prefilledCompany) {
            this.state = {
                stepValid: true,
                type: prefilledCompany
            }
        } else {
            this.state = {
                stepValid: false,
                type: []
            }
        }
        this.handleListChange = this.handleListChange.bind(this)
        this.handleNextButtonCLick = this.handleNextButtonCLick.bind(this)
    }

    handleListChange(selected) {
        this.setState({
            stepValid: selected.length !== 0,
            type: selected
        })

      const { onChange } = this.props;
      onChange(selected);
    }

    handleNextButtonCLick(e) {
        let { dispatch, nextStep } = this.props
        let { type } = this.state
        nextStep( type )
    }

    render() {
        const { prefilledCompany } = this.props
        const convertedItems = apiEnumToListData(COMPANY_TYPE_DATA)
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
                    preselectedItems={prefilledCompany}
                    handleGroups={false}
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

TypeContent.propTypes = {
    dispatch: PropTypes.func,
    nextStep: PropTypes.func,
    prefilledCompany: PropTypes.array
}

TypeContent.defaultProps = {
    dispatch: () => {},
    nextStep: () => {}
}

export default TypeContent
