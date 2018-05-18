import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import List from './../../../../../components/main/list'
import uuid from 'uuid'
import Button from './../../../../../components/main/button'
import {findById} from '../../../../../constants/dropdownData'
import {apiEnumToListData} from './../../../../../utils'
import {StepListLink} from '../../../renderHelpers'

import {
    gotoIndustryStep,
    saveDegreeData,
    showIndustryStep,
} from './../../../../../actions/candidateOnboarding'

import { DEGREE_DROPDOWN_DATA } from '../../../../../constants/candidateOnboarding'
const constants = require('../../../../../constants/candidateOnboarding');

@connect(
    function mapStateToProps(state, ownProps) {
        const { degree } = state.candidateOnboarding

        return {
          degree
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {

        const nextStep = ({id, value }) => {
            dispatch(saveDegreeData({
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
    } 

  render() {
        const { stepValid, degree } = this.state
    const { nextStep } = this.props;
    // This is a workaround for an unexplained problem: listItems is
    // inexplicably null.
    let listItems = this.props.listItems || DEGREE_DROPDOWN_DATA || constants.DEGREE_DROPDOWN_DATA;
        const classesToAdd = [
            'list_type_onboarding'
        ]
        return (
            <List type='onboarding'>
                {listItems.map(item => {
                    return (
                        <StepListLink {...{
                            key : uuid.v4(),
                            item,
                            activeItem: degree,
                            onClick : nextStep
                        }} />
                    )
                })}
            </List>
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
