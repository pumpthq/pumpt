import React, { Component, PropTypes } from 'react'
<<<<<<< HEAD
//import { reduxReactRouter } from 'redux-router'
=======
>>>>>>> 672ff1d4ef6f51f708299601a35c3425b5986878
import { connect } from 'react-redux'

import EducationBlockDisplay from './display'
import EducationBlockEdit from  './edit'

import {
    EDUCATION_STEP
} from './../../../../../constants/applicationCandidate'

@connect(
    function mapStateToProps(state, ownProps) {
        const { active } = state.applicationCandidate

        return {
            active: active
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)
class EducationsContainer extends Component {
    constructor(props) {
        super(props)

        const { active } = this.props

        let isActive = false
        if(active.indexOf(EDUCATION_STEP) > -1) {
            isActive: true
        }
        this.state = {
            isActive: isActive
        }
    }

    render() {
        const { isActive } = this.state
        return(
            <div>
            { isActive ?
                <div>
                    <h2>Edit</h2>
                    <EducationBlockEdit/>
                </div> :
                <div>
                    <h2>Display</h2>
                    <EducationBlockDisplay/>
                </div>
            }
            </div>
        )
    }
}

export default EducationsContainer
