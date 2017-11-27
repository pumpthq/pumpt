import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    List,
    LIST_ITEM_TYPE_TEXT,
    LIST_ITEM_TYPE_USER_ENTERED,
    LIST_ITEM_TYPE_GROUP
} from './../../../../../components/main/list2'
import Button from './../../../../../components/main/button'
import { FIELD_OF_EXPERTISE_DROPDOWN_DATA } from './../../../../../constants/candidateOnboarding';
import { apiEnumToListData } from './../../../../../utils'

import {
    saveFieldOfExpertiseStep,
    showJobTitleStep,
    gotoJobTitleStep,
} from './../../../../../actions/candidateOnboarding'


@connect(
    function mapStateToProps(state) {
        const { fieldOfExpertise, fieldOfExpertiseHead } = state.candidateOnboarding
        return {
            prefilledFieldOfExpertise: {
                fieldOfExpertise,
                fieldOfExpertiseHead
            }
        }
    },
    function mapDispatchToProps(dispatch) {
        const nextStep = ({id, value, parent }) => {
            dispatch(saveFieldOfExpertiseStep({
                fieldOfExpertise: {
                    id: id,
                    value: value
                },
                fieldOfExpertiseHead: parent
            }))
            dispatch(showJobTitleStep())
            dispatch(gotoJobTitleStep())
        };

        return {
            dispatch,
            nextStep
        }
    }
)
class FieldOfExpertiseContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledFieldOfExpertise } = this.props

        this.state = {
            stepValid: false,
            id: '',
            vaule: '',
            parent: ''
        }
        if(prefilledFieldOfExpertise) {
            if(prefilledFieldOfExpertise.fieldOfExpertise && prefilledFieldOfExpertise.fieldOfExpertiseHead) {
                this.state = {
                    stepValid: true,
                    id: prefilledFieldOfExpertise.fieldOfExpertise.id,
                    value: prefilledFieldOfExpertise.fieldOfExpertise.value,
                    parent: prefilledFieldOfExpertise.fieldOfExpertiseHead.value
                }
            }
        }

        this.handleListChange = this.handleListChange.bind(this)
        this.handleNextButtonCLick = this.handleNextButtonCLick.bind(this)
    }

    handleListChange({ id, value, parent }) {
        this.setState({
            stepValid: (value !== '' && value.charAt(0) !== ' '),
            id: id,
            value: value,
            parent: parent
        })
    }

    handleNextButtonCLick(e) {
        const { dispatch, nextStep } = this.props
        const { id, value, parent } = this.state
        nextStep({ id, value, parent })
    }

    render() {
        const convertedItems = apiEnumToListData(FIELD_OF_EXPERTISE_DROPDOWN_DATA)
        const classesToAdd = [
            'list_type_onboarding',
            'list_sublayer_true'
        ]
        const { stepValid, id, value, parent } = this.state
        return(
            <div>
                <List
                    items={convertedItems}
                    classesToAdd={classesToAdd}
                    allowNoSelection={true}
                    listValueSelected={this.handleListChange}
                    preselectedItem={id}
                    preselectedValue={value}
                    handleGroups={true}
                    otherPlaceholder={'Enter Experience Here'}
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

FieldOfExpertiseContent.propTypes = {
    dispatch: PropTypes.func,
    nextStep: PropTypes.func,
    prefilledFieldOfExpertise: PropTypes.object
}

FieldOfExpertiseContent.defaultProps = {
    dispatch: () => {},
    nextStep: () => {}
}

export default FieldOfExpertiseContent
