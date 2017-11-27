import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    List,
    LIST_ITEM_TYPE_TEXT,
    LIST_ITEM_TYPE_USER_ENTERED
} from './../../../../../components/main/list2'
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
        const nextStep = ({id, value}) => {
            dispatch(saveCompanyTypeData({
                companyType : {
                    id,
                    value
                }
            }))
            dispatch(showHeadquartersLocationStep())
            dispatch(gotoHeadquartersLocationStep())
        };

        return {
            dispatch,
            nextStep
        }
    }
)
class TypeContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledCompany } = this.props
        if(prefilledCompany) {
            console.log('Prefill state')
            console.log(this.props.prefilledCompany)
            this.state = {
                stepValid: true,
                id: prefilledCompany.id,
                value: prefilledCompany.value
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
            stepValid: value !== '',
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
        const convertedItems = apiEnumToListData(COMPANY_TYPE_DATA)
        const classesToAdd = [
            'list_type_onboarding'
        ]
        let { stepValid, id, value } = this.state
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
    prefilledCompany: PropTypes.object
}

TypeContent.defaultProps = {
    dispatch: () => {},
    nextStep: () => {}
}

export default TypeContent
