import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Multi} from './../../../../../components/main/multilist'
import Button from './../../../../../components/main/button'
import {FIELD_OF_EXPERTISE_DROPDOWN_DATA} from './../../../../../constants/candidateOnboarding';
import {apiEnumToListData} from './../../../../../utils'

import {
    gotoJobTitleStep,
    saveFieldOfExpertiseStep,
    showJobTitleStep,
} from './../../../../../actions/candidateOnboarding'


@connect(
    function mapStateToProps(state) {
        const { fieldOfExpertise } = state.candidateOnboarding
        return {
            prefilledFieldOfExpertise: fieldOfExpertise
        }
    },
    function mapDispatchToProps(dispatch) {
        const nextStep = ( selected ) => {
            dispatch(saveFieldOfExpertiseStep({
                fieldOfExpertise: selected
            }))
            dispatch(showJobTitleStep())
            dispatch(gotoJobTitleStep())
        };

        return { nextStep }
    }
)
class FieldOfExpertiseContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledFieldOfExpertise } = this.props

        this.state = {
            stepValid: false,
            selected: []
        }
        if(prefilledFieldOfExpertise && prefilledFieldOfExpertise.size > 0) {
                this.state = {
                    stepValid: true,
                    selected: prefilledFieldOfExpertise
                }
        }

        this.handleListChange = this.handleListChange.bind(this)
        this.handleNextButtonCLick = this.handleNextButtonCLick.bind(this)
    }

    handleListChange(selected) {
        this.setState({
            stepValid: selected.length !== 0,
            selected
        })
    }

    handleNextButtonCLick(e) {
        const { nextStep } = this.props
        const { selected } = this.state
        nextStep(selected)
    }

    render() {
        const convertedItems = apiEnumToListData(FIELD_OF_EXPERTISE_DROPDOWN_DATA)
        const classesToAdd = [
            'list_type_onboarding',
            'list_sublayer_true'
        ]
        const { stepValid } = this.state
        const { prefilledFieldOfExpertise } = this.props
        return(
            <div>
                <Multi
                    items={convertedItems}
                    classesToAdd={classesToAdd}
                    allowNoSelection={true}
                    listValuesSelected={this.handleListChange}
                    preselectedItems={prefilledFieldOfExpertise}
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
    nextStep: PropTypes.func,
    prefilledFieldOfExpertise: PropTypes.object
}

FieldOfExpertiseContent.defaultProps = {
    nextStep: () => {}
}

export default FieldOfExpertiseContent
