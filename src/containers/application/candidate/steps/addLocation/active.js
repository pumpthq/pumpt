import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import CheckboxInput from './../../../../../components/application/input/checkboxInput'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import ExperiencedInputDropdown from '../../../../../components/parts/experiencedInputDropdown'
import LocationFilter from './../../../../../components/parts/locationFilter'

import {
    saveLocationData,
    cancelLocationStep
} from './../../../../../actions/applicationCandidate'

@connect(
    function mapStateToProps(appState, ownProps) {
        const location = appState.applicationCandidate.location || {}
        const {
            canRelocate,
            city,
            state
        } = location
        const place = city && state ? `${city}, ${state}` : location.place

        return {
            city,
            state,
            initialValues : {
                place,
                canRelocate
            }
            
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
@reduxForm({
    form : 'applicationCandidateAddLocation',
    fields : [
        'place',
        'canRelocate'
    ],
    validate : (values) => {
        const errors = {}

        return errors
    }
})
class AddLocationForm extends Component {

    constructor(props) {
        super(props)
        const { city, state } = this.props

        this.state = {
            city,
            state
        }
    }    
    
    render() {
        const {
            fields : {
                place,
                canRelocate
            },
            invalid,
            submitting,
            handleSubmit,
            dispatch
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <DescriptionListItem>
                <Form onSubmit={
                    handleSubmit((fields, dispatch) => {
                        if (!fields.place) {
                           return dispatch(cancelLocationStep({
                               replace : true
                           }))
                        }

                        const { city, state } = this.state
                        dispatch(saveLocationData({
                            ...fields,
                            city,
                            state
                        }))
                    })
                }>
                    <fieldset class="row form__row">
                        <div class="col-lg-6 col-xs-12">
                            <ExperiencedInputDropdown
                                {...{
                                    label : 'Location',
                                    ctrl : place,
                                    dropdownSize : 's',
                                    listTypeSize : 'm',
                                    listTypeNowrapClass : false,
                                    textFieldSize : false,
                                    textSizeForEachList : false,
                                    filter : LocationFilter,
                                    onFilter : ({ dispatch, value }) => {
                                        dispatch({
                                            type : 'redux-form/CHANGE',
                                            field : 'place',
                                            value,
                                            touch : true,
                                            form : 'applicationCandidateAddLocation'
                                        })
                                    },
                                    onClickListItem : ({ dispatch, place, filter }) => {
                                        const value = `${place.city}, ${place.state}`
                                        this.setState({
                                            city : place.city,
                                            state : place.state
                                        })
                                        filter({ value })
                                    },
                                }}
                            />
                        </div>
                        <div class="col-lg-6 col-xs-12">
                            <CheckboxInput {...canRelocate}
                                label='Can relocate'
                                isChecked={canRelocate.value}
                            />
                        </div>
                    </fieldset>
    
    
                    <div class="form__actions">
                        <Button
                            type='submit'
                            typeColored
                            disabled={isDisabledSubmit}
                        >Add</Button>
                        <a class="link" href="" onClick={(event) => {
                            event.preventDefault()
                            dispatch(cancelLocationStep({}))
                        }}>Cancel</a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddLocationForm.propTypes = {
    fields : PropTypes.shape({
        place : PropTypes.object,
        canRelocate : PropTypes.object
    }),
    invalid : PropTypes.bool,
    submitting : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func,
    city : PropTypes.string,
    state : PropTypes.string
}

export default AddLocationForm
