import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from './../../../../../components/main/form'
import { reduxForm } from 'redux-form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import CheckboxInput from './../../../../../components/application/input/checkboxInput'
import DateInput from './../../../../../components/application/input/dateInput'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import ExperiencedInputDropdown from '../../../../../components/parts/experiencedInputDropdown'
import LocationFilter from './../../../../../components/parts/locationFilter'
import moment from 'moment'

import {
    saveExperienceData,
    cancelExperienceStep
} from './../../../../../actions/applicationCandidate'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            companyName,
            title,
            location,
            fromDate,
            toDate,
            workHere,
            description
        } = state.applicationCandidate.experience
        const startDate = moment(fromDate, 'MM-DD-YYYY')
        const endDate = workHere ? moment(new Date()) : moment(toDate, 'MM-DD-YYYY')
        const isStartDateAvailable = fromDate && startDate
        const isEndDateAvailable = toDate && endDate

        return {
            initialValues : {
                companyName,
                title,
                location : location ? location.place : '',
                fromMonth : isStartDateAvailable ? startDate.format('MM') : '',
                fromDay : isStartDateAvailable ? startDate.format('DD') : '1',
                fromYear : isStartDateAvailable ? startDate.format('YYYY') : '',
                toMonth : isEndDateAvailable ? endDate.format('MM') : '',
                toDay : isEndDateAvailable ? endDate.format('DD') : '1',
                toYear : isEndDateAvailable ? endDate.format('YYYY') : '',
                workHere,
                description
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
    form : 'applicationCandidateAddExperience',
    fields : [
        'companyName',
        'title',
        'location',
        'fromMonth',
        'fromDay',
        'fromYear',
        'toMonth',
        'toDay',
        'toYear',
        'workHere',
        'description'
    ],
    validate : (values) => {
        const errors = {}

        if (!values.companyName) {
            errors.companyName = 'Can\'t be blank'
        }

        if (!values.title) {
            errors.title = 'Can\'t be blank'
        }

        if (!values.location) {
            errors.location = 'Can\'t be blank'
        }

        // TODO
        if (!values.workHere) {
            const endDate = moment()

            endDate.set('month', values.toMonth)
            endDate.set('date', values.toDay)
            endDate.set('year', values.toYear)

            if (!endDate.isValid()) {
                errors.toMonth = ''
                errors.toDay = ''
                errors.toYear = ''
            }
        }

        // TODO
        const startDate = moment()

        startDate.set('month', values.fromMonth)
        startDate.set('date', values.fromDay)
        startDate.set('year', values.fromYear)

        if (!startDate.isValid()) {
            errors.fromMonth = ''
            errors.fromDay = ''
            errors.fromYear = ''
        }

        if (!values.description) {
            errors.description = 'Please, leave short feedback'
        }

        return errors
    }
})
class AddExperienceForm extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            location : {
                city : null,
                state : null
            }
        }
    }

    render() {
        const {
            fields : {
                companyName,
                title,
                location,
                fromMonth,
                fromDay,
                fromYear,
                toMonth,
                toDay,
                toYear,
                workHere,
                description
            },
            invalid,
            submitting,
            handleSubmit,
            dispatch
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <DescriptionListItem>
                <Form class='form_indent-size_none' onSubmit={
                    handleSubmit((fields, dispatch) => {
                        const locationState = this.state.location
                        const fromDate = `${fields.fromMonth}-${fields.fromDay}-${fields.fromYear}`
                        const toDate = `${fields.toMonth}-${fields.toDay}-${fields.toYear}`

                        dispatch(saveExperienceData({
                            ...fields,
                            location : {
                                place : fields.location,
                                city : locationState.city,
                                state : locationState.state
                            },
                            fromDate,
                            toDate : fields.workHere ? null : toDate
                        }))
                    })
                }>
                    <fieldset class="form__row">
                        <OnboardingInput {...companyName}
                            label='Company Name'
                            textFieldSize={false}
                            error={companyName.touched && companyName.error}
                        />
                    </fieldset>

                    <fieldset class="row form__row">
                        <div class="col-lg-6 col-xs-12">
                            <div class="mdl-textfield mdl-js-textfield textfield">
                                <OnboardingInput {...title}
                                    textFieldSize={false}
                                    label='Title'
                                    error={title.touched && title.error}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 col-xs-12">
                            <ExperiencedInputDropdown
                                {...{
                                    label : 'Location',
                                    ctrl : location,
                                    dropdownSize : 's',
                                    listTypeSize : 'm',
                                    listTypeNowrapClass : false,
                                    textFieldSize : false,
                                    textSizeForEachList : false,
                                    filter : LocationFilter,
                                    onFilter : ({ dispatch, value }) => {
                                        dispatch({
                                            type : 'redux-form/CHANGE',
                                            field : 'location',
                                            value,
                                            touch : true,
                                            form : 'applicationCandidateAddExperience'
                                        })
                                    },
                                    onClickListItem : ({ dispatch, place, filter }) => {
                                        const value = `${place.city}, ${place.state}`

                                        this.setState({
                                            location : {
                                                city : place.city,
                                                state : place.state
                                            }
                                        })
                                        filter({ value })
                                    },
                                    error : location.touched && location.error
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset class="row form__row">
                        <div class="col-lg-6 col-xs-12">
                            <div class="row">
                                <div class="col-lg-3 col-xs-3">
                                    <label class="text text_size_s text_helper text_helper_s">From:</label>
                                </div>
                                <div class="col-lg-9 col-xs-9">
                                    <DateInput {...{
                                        fields : {
                                            month : fromMonth,
                                            year : fromYear
                                        },
                                        error : fromMonth.error || fromYear.error
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-xs-12">
                            {!workHere.value ?
                                <div class="row">
                                    <div class="col-lg-2 col-xs-3">
                                        <label class="text text_size_s text_helper text_helper_s">To:</label>
                                    </div>
                                    <div class="col-lg-10 col-xs-9">
                                        <DateInput {...{
                                            fields : {
                                                month : toMonth,
                                                year : toYear
                                            },
                                            error : toMonth.error || toYear.error
                                        }}/>
                                        <CheckboxInput {...workHere}
                                            label='I currently work here'
                                        />
                                    </div>
                                </div> :
                                <div class="row">
                                    <div class="col-lg-2">
                                        <label class="text text_size_s text_helper text_helper_s"></label>
                                    </div>
                                    <div class="col-lg-10">
                                        <CheckboxInput {...{
                                            ...workHere,
                                            value : true,
                                            isChecked : true
                                        }}
                                            label='I currently work here'
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </fieldset>

                    <fieldset class="form__row">
                        <div class="mdl-textfield mdl-js-textfield textfield">
                            <OnboardingInput {...description}
                                textFieldSize={false}
                                label='Description of your work'
                                error={description.touched && description.error}
                            />
                        </div>
                    </fieldset>

                    <div class="form__actions">
                        <Button type='submit' typeColored disabled={isDisabledSubmit}>Add</Button>
                        <a class="link" href="" onClick={(event) => {
                            event.preventDefault()

                            dispatch(cancelExperienceStep())
                        }}>Cancel</a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddExperienceForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func
}

export default AddExperienceForm

