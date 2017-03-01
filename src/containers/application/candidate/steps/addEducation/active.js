import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from './../../../../../components/main/form'
import { reduxForm } from 'redux-form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import DateInput from './../../../../../components/application/input/dateInput'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import ExperiencedInputDropdown from '../../../../../components/parts/experiencedInputDropdown'
import SchoolFilter from './../../../../../components/parts/schoolFilter'
import moment from 'moment'

import {
    DEGREES_DROPDOWN_DATA
} from './../../../../../constants/companyJobs'

import { mapDropdown } from './../../../../../components/parts/mapDropdown'
import ApplicationFieldsetDropdown from './../../../../../components/application/applicationFieldsetDropdown'
import {
    saveEducationData,
    cancelEducationStep
} from './../../../../../actions/applicationCandidate'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            schoolName,
            fieldOfStudy,
            degree,
            fromDate,
            toDate
        } = state.applicationCandidate.education
        const startDate = moment(fromDate, 'MM-DD-YYYY')
        const endDate = moment(toDate, 'MM-DD-YYYY')
        const isStartDateAvailable = fromDate && startDate
        const isEndDateAvailable = toDate && endDate

        return {
            initialValues : {
                schoolName,
                fieldOfStudy,
                degree,
                fromMonth : isStartDateAvailable ? startDate.format('MM') : '',
                fromDay : isStartDateAvailable ? startDate.format('DD') : '1',
                fromYear : isStartDateAvailable ? startDate.format('YYYY') : '',
                toMonth : isEndDateAvailable ? endDate.format('MM') : '',
                toDay : isEndDateAvailable ? endDate.format('DD') : '1',
                toYear : isEndDateAvailable ? endDate.format('YYYY') : ''
            }
        }
    },

    function mapDispatchToProps(dispatch, ownProps) {
        return{
            dispatch
        }
    }
)
@reduxForm({
    form : 'applicationCandidateAddEducation',
    fields : [
        'schoolName',
        'fieldOfStudy',
        'degree',
        'fromMonth',
        'fromDay',
        'fromYear',
        'toMonth',
        'toDay',
        'toYear'
    ],
    validate : (values) => {
        const errors = {}

        if (!values.schoolName) {
            errors.schoolName = 'Can\'t be blank'
        }

        if (!values.fieldOfStudy) {
            errors.fieldOfStudy = 'Can\'t be blank'
        }

        if (!values.degree) {
            errors.degree = 'Can\'t be blank'
        }

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

        return errors

    }
})
class AddEducationForm extends Component {

    constructor(props) {
        super(props)

        const { dropDownData } = props

        this.state = {
            school : {
                name : null,
                city : null,
                state : null
            },
            degreeDropDownData: mapDropdown({
                arr: dropDownData.degrees,
                onClick: () => {
                    console.log('Clicked')
                }
            })
        }
    }

    render() {

        const {
            fields : {
                schoolName,
                fieldOfStudy,
                degree,
                fromMonth,
                fromDay,
                fromYear,
                toMonth,
                toDay,
                toYear
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
                        const fromDate = `${fields.fromMonth}-${fields.fromDay}-${fields.fromYear}`
                        const toDate = `${fields.toMonth}-${fields.toDay}-${fields.toYear}`

                        dispatch(saveEducationData({
                            ...fields,
                            fromDate,
                            toDate

                        }))
                    })
                }>
                    <fieldset class="form__row">
                        <div class="mdl-textfield mdl-js-textfield textfield dropdown__wrapper dropdown__wrapper_type_autofill">
                            <ExperiencedInputDropdown
                                {...{
                                    label : 'School Name',
                                    ctrl : schoolName,
                                    dropdownSize : 's',
                                    listTypeSize : 'm',
                                    listTypeNowrapClass : false,
                                    textFieldSize : false,
                                    textSizeForEachList : false,
                                    filter : SchoolFilter,
                                    onFilter : ({ dispatch, value }) => {
                                        dispatch({
                                            type : 'redux-form/CHANGE',
                                            field : 'schoolName',
                                            value,
                                            touch : true,
                                            form : 'applicationCandidateAddEducation'
                                        })
                                    },
                                    onClickListItem : ({ dispatch, school, filter }) => {
                                        this.setState({
                                            school : {
                                                name : school.name,
                                                city : school.city,
                                                state : school.state
                                            }
                                        })
                                        filter({ value : school.name })
                                    },
                                    error : schoolName.touched && schoolName.error
                                }}
                            />
                        </div>
                    </fieldset>

                    <fieldset class="row form__row">
                        <div class="col-lg-6 col-xs-12">
                            <div class="mdl-textfield mdl-js-textfield textfield">
                                <OnboardingInput {...fieldOfStudy}
                                    textFieldSize={false}
                                    label='Field of Study'
                                    error={fieldOfStudy.touched && fieldOfStudy.error}
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 col-xs-12">
                            <div
                                class="mdl-textfield mdl-js-textfield textfield">
                                { /* <OnboardingInput {...degree}
                                    textFieldSize={false}
                                    label='Degree'
                                    error={degree.touched && degree.error}
                                /> */ }
                                <ApplicationFieldsetDropdown
                                    id={degree.id}
                                    value={degree.value}
                                    label='Degree'
                                    error={degree.touched && degree.error}
                                    list={this.state.degreeDropDownData}
                                    checkedElementId={'0'}
                                    onChange={(event) => {}}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="row form__row">
                        <div class="col-lg-6 col-xs-12">
                            <div class='row'>
                                <div class='col-lg-3 col-xs-3'>
                                    <label class='text text_size_s text_helper text_helper_s'>From:</label>
                                </div>
                                <div class='col-lg-9 col-xs-9'>
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
                        <div class='col-lg-6 col-xs-12'>
                            <div class='row'>
                                <div class='col-lg-2 col-xs-3'>
                                    <label class='text text_size_s text_helper text_helper_s'>To:</label>
                                </div>
                                <div class='col-lg-10 col-xs-9'>
                                    <DateInput {...{
                                        fields : {
                                            month : toMonth,
                                            year : toYear
                                        },
                                        error : toMonth.error || toYear.error
                                    }}/>
                                    <div class='text text_helper text_color_l-grey'>
                                        Or expected graduation year
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class="form__actions">
                        <Button
                            type='submit'
                            typeColored
                            disabled={isDisabledSubmit}
                        >
                            Add
                        </Button>
                        <a class="link" href="" onClick={(event) => {
                            event.preventDefault()

                            dispatch(cancelEducationStep())
                        }}>
                            Cancel
                        </a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddEducationForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func,
    dropDownData: PropTypes.object
}

AddEducationForm.defaultProps = {
    dropDownData: {
        degrees: DEGREES_DROPDOWN_DATA
    }
}

export default AddEducationForm
