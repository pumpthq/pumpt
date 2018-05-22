import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {List} from './../../../../../components/main/list2'
import Button from './../../../../../components/main/button'
import {JOB_TITLE_DROPDOWN_DATA} from './../../../../../constants/candidateOnboarding'
import {apiEnumToListData} from './../../../../../utils'

import {gotoIncomeStep, saveJobTitleStep, showIncomeStep,} from './../../../../../actions/candidateOnboarding'

@connect(
    function mapStateToProps(state) {
        const { jobTitle } = state.candidateOnboarding
        return {
            prefilledJobTitle: jobTitle
        }
    },
    function mapDispatchToProps(dispatch) {
        const nextStep = ({id, value }) => {
            dispatch(saveJobTitleStep({
                jobTitle : {
                    id,
                    value
                },
            }))
            dispatch(showIncomeStep())
            dispatch(gotoIncomeStep())
        };

        return {
            dispatch,
            nextStep
        }
    }
)
class JobTitleContent extends Component {
    constructor(props) {
        super(props)

        const { prefilledJobTitle } = this.props

        this.state = {
            stepValid: false,
            id: '',
            vaule: '',
        }
        if(prefilledJobTitle) {
						this.state = {
								stepValid: true,
								id: prefilledJobTitle.id,
								value: prefilledJobTitle.value,
						}
        }

        this.handleListChange = this.handleListChange.bind(this)
        this.handleNextButtonCLick = this.handleNextButtonCLick.bind(this)
    }

    handleListChange({ id, value }) {
        this.setState({
            stepValid: (value !== '' && value.charAt(0) !== ' '),
            id: id,
            value: value,

        })
    }

    handleNextButtonCLick(e) {
        const { dispatch, nextStep } = this.props
        const { id, value } = this.state
        nextStep({ id, value })
    }

    render() {
        const convertedItems = apiEnumToListData(JOB_TITLE_DROPDOWN_DATA)
        const classesToAdd = [
            'list_type_onboarding'
        ]
        //const { stepValid, id, value } = this.state
        return(
            <div>
								<List
                    items={convertedItems}
                    classesToAdd={classesToAdd}
                    allowNoSelection={true}
                    listValueSelected={this.handleListChange}
                    preselectedItem={this.state.id}
                    preselectedValue={this.state.value}
                    handleGroups={false}
                    otherPlaceholder={'Enter Title Here'}
                />
                <div class='form__actions'>
                    <Button
                        typeColored={true}
                        buttonSize={'l'}
                        disabled={!this.state.stepValid}
                        onClick={this.handleNextButtonCLick}
                    >Next</Button>
                </div>
            </div>
        )
    }
}

JobTitleContent.propTypes = {
    dispatch: PropTypes.func,
    nextStep: PropTypes.func,
    prefilledJobTitle: PropTypes.object
}

JobTitleContent.defaultProps = {
    dispatch: () => {},
    nextStep: () => {}
}

export default JobTitleContent
