import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import co from 'co'
import IconPhoto from '../../../../components/icons/photo'
import UploadImage from '../parts/uploadImage'
import ApplicationFieldset from'../../../../components/application/applicationFieldset'
import ApplicationFieldsetDropdown from'../../../../components/application/applicationFieldsetDropdown'
import OtherActiveInput from '../../../../components/application/otherActiveInput'
import Button from '../../../../components/main/button'
import {
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    INDUSTRY_DROPDOWN_DATA
} from './../../../../constants/candidateOnboarding'
import uuid from 'uuid'
import { findById } from '../../../../constants/dropdownData'
import { saveSummaryData } from './../../../../actions/applicationCandidate'
import { mapDropdown } from './../../../../components/parts/mapDropdown';

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            firstName,
            lastName,
            email,
            industry,
            fieldOfExpertise,
            jobTitle,
            income,
            experience
        } = state.applicationCandidate.summary
        const ddCheckedIndustry = findById({
            id : industry ? industry.id : null,
            data : INDUSTRY_DROPDOWN_DATA
        }) || {}
        const ddCheckedFieldOfExpertise = findById({
            id : fieldOfExpertise ? fieldOfExpertise.id : null,
            data : FIELD_OF_EXPERTISE_DROPDOWN_DATA
        }) || {}
        const ddCheckedJobTitle = findById({
            id : jobTitle ? jobTitle.id : null,
            data : JOB_TITLE_DROPDOWN_DATA
        }) || {}
        const ddCheckedIncome = findById({
            id : income ? income.id : null,
            data : ANNUAL_INCOME_DROPDOWN_DATA
        }) || {}
        const ddCheckedExperience = findById({
            id : experience ? experience.id : null,
            data : EXPERIENCE_DROPDOWN_DATA
        }) || {}
        const checkedElements = {
            ddCheckedIndustry,
            ddCheckedFieldOfExpertise,
            ddCheckedJobTitle,
            ddCheckedIncome,
            ddCheckedExperience
        }
        const initialValues = {
            firstName : firstName || 'Jane',
            lastName : lastName || 'Sullivan',
            email : email || 'j.sullivan@sd-ventures.com',
            industry : industry ? industry.value : 'Digital Media',
            income : income ? income.value : '$50–100K',
            experience : experience ? experience.value : '5–10 years'
        }
        
        if (ddCheckedExperience) {
            if (ddCheckedFieldOfExpertise.parent &&
                ddCheckedFieldOfExpertise.alternative) {

                initialValues.fieldOfExpertise = ddCheckedFieldOfExpertise.parent.title
                initialValues.alternativeFieldOfExpertise = fieldOfExpertise.value
            } else {
                initialValues.fieldOfExpertise = fieldOfExpertise ? fieldOfExpertise.value : 'Programmatic'
            }
        }

        if (ddCheckedJobTitle) {
            if (ddCheckedJobTitle.parent &&
                ddCheckedJobTitle.alternative) {

                initialValues.jobTitle = ddCheckedJobTitle.parent.title
                initialValues.alternativeJobTitle = jobTitle.value
            } else {
                initialValues.jobTitle = jobTitle ? jobTitle.value : 'Account Coordinator'
            }
        }

        return {
            state,
            onboardingState : state.applicationCandidate,
            initialValues,
            checkedElements
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
@reduxForm({
    form : 'applicationCandidateSummaryHeadEdit',
    fields : [
        'firstName',
        'lastName',
        'email',
        'industry',
        'fieldOfExpertise',
        'alternativeFieldOfExpertise',
        'jobTitle',
        'alternativeJobTitle',
        'income',
        'experience'
    ],
    validate : (values, context) => {
        const errors = {}

        if (!values.firstName) {
            errors.firstName = ' '
        }

        if (!values.lastName) {
            errors.lastName = ' '
        }

        if (!values.industry) {
            errors.industry = ' '
        }

        if (!values.fieldOfExpertise) {
            errors.fieldOfExpertise = ' '
        }

        // TODO somehow check if checked element is alternative
        if (values.alternativeFieldOfExpertise !== undefined &&
            !values.alternativeFieldOfExpertise) {
            errors.alternativeFieldOfExpertise = ' '
        }

        if (!values.jobTitle) {
            errors.jobTitle = ' '
        }

        // TODO somehow check if checked element is alternative
        if (values.alternativeJobTitle !== undefined &&
            !values.alternativeJobTitle) {
            errors.alternativeJobTitle = ' '
        }

        if (!values.income) {
            errors.income = ' '
        }

        if (!values.experience) {
            errors.experience = ' '
        }

        return errors
    },
    asyncBlurFields : ['email'],
    asyncValidate : (values, dispatch) => {
        const { email } = values

        // TODO add validation
        return co(function * () {
            return yield {
                email : function * () {
                    return {}
                }
            }
        })
    }
})
class SummaryHeadEdit extends Component {
    constructor(props) {
        super(props)
        const { ddData, checkedElements, onCheckItem } = props

        this.state = {
            ...checkedElements,
            ddIndustry : mapDropdown({
                arr : ddData.industry,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'industry',
                        value
                    })

                    this.setState({
                        ddCheckedIndustry : element
                    })
                }
            }),
            ddFieldOfExpertise : mapDropdown({
                arr : ddData.fieldOfExpertise,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'fieldOfExpertise',
                        value
                    })

                    this.setState({
                        ddCheckedFieldOfExpertise : element
                    })
                }
            }),
            ddJobTitle : mapDropdown({
                arr : ddData.jobTitle,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'jobTitle',
                        value
                    })

                    this.setState({
                        ddCheckedJobTitle : element
                    })
                }
            }),
            ddIncome : mapDropdown({
                arr : ddData.income,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'income',
                        value
                    })

                    this.setState({
                        ddCheckedIncome : element
                    })
                }
            }),
            ddExperience : mapDropdown({
                arr : ddData.experience,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'experience',
                        value
                    })

                    this.setState({
                        ddCheckedExperience : element
                    })
                }
            })
        }

        this.onDropdownFieldsetChange = this.onDropdownFieldsetChange.bind(this)
    }

    onDropdownFieldsetChange({ checkedElement, event, onChange, }) {
        if (checkedElement.alternative && !checkedElement.parent && !checkedElement.items) {
            onChange(event)
        }
    }

    render() {
        const {
            fields : {
                firstName,
                lastName,
                email,
                industry,
                fieldOfExpertise, alternativeFieldOfExpertise,
                jobTitle, alternativeJobTitle,
                income,
                experience
            },
            handleSubmit,
            submitting,
            invalid,
            onCancel
        } = this.props
        const {
            ddCheckedIndustry,
            ddCheckedFieldOfExpertise,
            ddCheckedJobTitle,
            ddCheckedIncome,
            ddCheckedExperience
        } = this.state

        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item">
                        <div class="summary-head__title-column">
                            <UploadImage
                                iconPhoto={<IconPhoto/>}
                                controllerId='SummaryHeadCandidate'
                                additionalClass='invisible-mobile'
                            />
                            <div class="summary-head__title-block">
            <form class="form" onSubmit={
                handleSubmit((fields, dispatch) => {
                    const data = {
                        firstName : fields.firstName,
                        lastName : fields.lastName,
                        email : fields.email,
                        industry : {
                            id : ddCheckedIndustry.id,
                            value : fields.industry
                        },
                        fieldOfExpertise : {
                            id : ddCheckedFieldOfExpertise.id,
                            value : !fields.alternativeFieldOfExpertise ?
                                fields.fieldOfExpertise : fields.alternativeFieldOfExpertise
                        },
                        jobTitle : {
                            id : ddCheckedJobTitle.id,
                            value : !fields.alternativeJobTitle ?
                                fields.jobTitle : fields.alternativeJobTitle
                        },
                        income : {
                            id : ddCheckedIncome.id,
                            value : fields.income
                        },
                        experience : {
                            id : ddCheckedExperience.id,
                            value : fields.experience
                        }
                    }

                    dispatch(saveSummaryData(data))
                    onCancel()
                })
            }>
                <ApplicationFieldset {...firstName}
                    label="First Name"
                    error={firstName.touched && firstName.error}
                />
                <ApplicationFieldset {...lastName}
                    label="Last Name"
                    error={lastName.touched && lastName.error}
                />
                <ApplicationFieldset {...email}
                    label="Email"
                    onChange={() => {}}
                    error={email.touched && email.error}
                />
                <ApplicationFieldsetDropdown {...industry}
                    label="Industry"
                    error={industry.touched && industry.error}
                    {...{
                        onChange : (event) => {
                            this.onDropdownFieldsetChange({
                                event,
                                onChange : industry.onChange,
                                checkedElement : ddCheckedIndustry
                            })
                        },
                        list : this.state.ddIndustry,
                        checkedElementId : ddCheckedIndustry.id
                    }}
                />
                <ApplicationFieldsetDropdown {...fieldOfExpertise}
                    label="Area of Expertise"
                    error={fieldOfExpertise.touched && fieldOfExpertise.error}
                    {...{
                        onChange : (event) => {
                            this.onDropdownFieldsetChange({
                                event,
                                onChange : fieldOfExpertise.onChange,
                                checkedElement : ddCheckedFieldOfExpertise
                            })
                        },
                        list : this.state.ddFieldOfExpertise,
                        checkedElementId : ddCheckedFieldOfExpertise.id,
                        otherChild : ddCheckedFieldOfExpertise.alternative && ddCheckedFieldOfExpertise.parent ?
                            <OtherActiveInput {...alternativeFieldOfExpertise}
                                label="Other"
                                error={alternativeFieldOfExpertise.touched && alternativeFieldOfExpertise.error}
                            /> :
                            null
                    }}
                />
                <ApplicationFieldsetDropdown {...jobTitle}
                    label="Job Title"
                    error={jobTitle.touched && jobTitle.error}
                    {...{
                        onChange : (event) => {
                            this.onDropdownFieldsetChange({
                                event,
                                onChange : jobTitle.onChange,
                                checkedElement : ddCheckedJobTitle
                            })
                        },
                        list : this.state.ddJobTitle,
                        checkedElementId : ddCheckedJobTitle.id,
                        otherChild : ddCheckedJobTitle.alternative && ddCheckedJobTitle.parent ?
                            <OtherActiveInput {...alternativeJobTitle}
                                label="Other"
                                error={alternativeJobTitle.touched && alternativeJobTitle.error}
                            /> :
                            null
                    }}
                />
                <ApplicationFieldsetDropdown
                    {...income}
                    label="Income"
                    error={income.touched && income.error}
                    onChange={(event) => {}}
                    {...{
                        list : this.state.ddIncome,
                        checkedElementId : ddCheckedIncome.id
                    }}
                />
                <ApplicationFieldsetDropdown {...experience}
                    label="Experience"
                    error={experience.touched && experience.error}
                    onChange={(event) => {}}
                    {...{
                        list : this.state.ddExperience,
                        checkedElementId : ddCheckedExperience.id
                    }}
                />
                <div class="form__actions">
                    <Button type='submit' typeColored disabled={submitting || invalid}>Save</Button>
                    <a href="" class="link" onClick={(event) => {
                        event.preventDefault()
                        onCancel()
                    }}>Cancel</a>
                </div>
            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SummaryHeadEdit.propTypes = {
    onboardingState : PropTypes.object,
    fields : PropTypes.object,
    asyncValidating : PropTypes.bool,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    onCancel : PropTypes.func,
    checkedElements : PropTypes.object,
    ddData : PropTypes.object,
    onCheckItem : PropTypes.func
}
SummaryHeadEdit.defaultProps = {
    ddData : {
        industry : INDUSTRY_DROPDOWN_DATA,
        fieldOfExpertise : FIELD_OF_EXPERTISE_DROPDOWN_DATA,
        jobTitle : JOB_TITLE_DROPDOWN_DATA,
        income : ANNUAL_INCOME_DROPDOWN_DATA,
        experience : EXPERIENCE_DROPDOWN_DATA
    },
    onCheckItem : ({ dispatch, field, value }) => {
        dispatch({
            type : 'redux-form/CHANGE',
            field,
            value,
            touch : true,
            form : 'applicationCandidateSummaryHeadEdit'
        })
    }
}

export default SummaryHeadEdit
