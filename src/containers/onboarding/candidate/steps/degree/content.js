import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import Button from './../../../../../components/main/button'
import {findById} from '../../../../../constants/dropdownData'
import {apiEnumToListData} from './../../../../../utils'

import {
    gotoIndustryStep,
    saveDegreeData,
    showIndustryStep,
} from './../../../../../actions/candidateOnboarding'

import {StepListCheckLink} from '../../../renderHelpers'
import {DEGREE_DROPDOWN_DATA } from '../../../../../constants/candidateOnboarding'
import {JOB_TITLE_DROPDOWN_DATA} from '../../../../../constants/candidateOnboarding';

@connect(
    function mapStateToProps(state, ownProps) {
        const { degree } = state.candidateOnboarding

        return {
          degree
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {

        const nextStep = ({id, value }) => {
            dispatch(saveDegreeStep({
                degree : {
                    id,
                    value
                },
            }))
            dispatch(showIndustryStep())
            dispatch(gotoIndustryStep())
        };

        return {
            dispatch,
            nextStep
        }
    }
)
class DegreeForm extends Component {
    constructor(props) {
        super(props)

        const { degree } = this.props

        this.state = {
            stepValid: false,
            id: '',
            vaule: '',
        }
        if(degree) {
						this.state = {
								stepValid: true,
								id: degree.id,
								value: degree.value,
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
        const { stepValid, id, value, listItems } = this.state
    console.log(JOB_TITLE_DROPDOWN_DATA);
    console.log(listItems);
        const convertedItems = apiEnumToListData(listItems)
        const classesToAdd = [
            'list_type_onboarding'
        ]
        return(
            <div>
								<List
                    items={convertedItems}
                    classesToAdd={classesToAdd}
                    allowNoSelection={false}
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

DegreeForm.propTypes = {
    nextStep : PropTypes.func,
    listItems : PropTypes.arrayOf(PropTypes.object),
    activeItems : PropTypes.array
}
DegreeForm.defaultProps = {
    activeItems: [],
    listItems : DEGREE_DROPDOWN_DATA
}

export default DegreeForm
