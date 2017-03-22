import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Form from './../../../../../components/main/form';
import Input from './../../../../../components/onboarding/onboardingInput';
import JobsFieldsetDropDown from './../../../../../components/jobs/jobsFieldsetDropdown';
import Button from './../../../../../components/main/button';
import ExperiencedInputDropdown from '../../../../../components/parts/experiencedInputDropdown';
import OtherActiveInput from '../../../../../components/application/otherActiveInput'
import LocationFilter from './../../../../../components/parts/locationFilter';
import { findById } from '../../../../../constants/dropdownData';
import {
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
} from './../../../../../constants/candidateOnboarding';
import {
    DEGREES_DROPDOWN_DATA,
    EMPLOYEMENTS_DROPDOWN_DATA,
} from './../../../../../constants/companyJobs';
import {
    saveSummaryData,
} from './../../../../../actions/companyJobs';
import { mapDropdown } from './../../../../../components/parts/mapDropdown';

const propTypes = {
    fields: PropTypes.object,
    ddData: PropTypes.object,
    onCheckItem: PropTypes.func,
    checkedElements: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
};

const defaultProps = {
    ddData: {
        salary: ANNUAL_INCOME_DROPDOWN_DATA,
        experience: EXPERIENCE_DROPDOWN_DATA,
        employment: EMPLOYEMENTS_DROPDOWN_DATA,
        degree: DEGREES_DROPDOWN_DATA,
        industry: FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    },
    onCheckItem: ({ dispatch, field, value }) => {
        dispatch({
            type: 'redux-form/CHANGE',
            field,
            value,
            touch: true,
            form: 'jobsAddNew',
        });
    },
};

@connect(
    (state) => {
        const ddCheckedSalary = findById({
            id: null,
            data: ANNUAL_INCOME_DROPDOWN_DATA,
        }) || {};
        const ddCheckedExperience = findById({
            id: null,
            data: EXPERIENCE_DROPDOWN_DATA,
        }) || {};
        const ddCheckedEmployment = findById({
            id: null,
            data: EMPLOYEMENTS_DROPDOWN_DATA,
        }) || {};
        const ddCheckedDegree = findById({
            id: null,
            data: DEGREES_DROPDOWN_DATA,
        }) || {};
        const ddCheckedIndustry = findById({
            id: null,
            data: FIELD_OF_EXPERTISE_DROPDOWN_DATA,
        }) || {};
        const checkedElements = {
            ddCheckedSalary,
            ddCheckedExperience,
            ddCheckedEmployment,
            ddCheckedDegree,
            ddCheckedIndustry,
        };

        const initialValues = {
            salary: 'Not specified',
            experience: 'Any',
            employment: 'Any',
            degree: 'Any',
            industry: 'Any',
        };

        return {
            checkedElements,
            initialValues,
        };
    }
)
@reduxForm({
    form: 'jobsAddNew',
    fields: [
        'jobTitle',
        'location',
        'salary',
        'experience',
        'employment',
        'degree',
        'industry',
        'alternativeIndustry',
    ],
})
class SummaryHeadActive extends Component {
    constructor(props) {
        super(props);
        const {
            ddData,
            checkedElements,
            onCheckItem,
        } = props;
        this.state = {
            ...checkedElements,
            ddSalary: mapDropdown({
                arr: ddData.salary,
                onClick: ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field: 'salary',
                        value,
                    });

                    this.setState({
                        ddCheckedSalary: element,
                    });
                },
            }),
            ddExperience: mapDropdown({
                arr: ddData.experience,
                onClick: ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field: 'experience',
                        value,
                    });

                    this.setState({
                        ddCheckedExperience: element,
                    });
                },
            }),
            ddEmployment: mapDropdown({
                arr: ddData.employment,
                onClick: ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field: 'employment',
                        value,
                    });

                    this.setState({
                        ddCheckedEmployment: element,
                    });
                },
            }),
            ddDegree: mapDropdown({
                arr: ddData.degree,
                onClick: ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field: 'degree',
                        value,
                    });

                    this.setState({
                        ddCheckedDegree: element,
                    });
                },
            }),
            ddIndustry: mapDropdown({
                arr: ddData.industry,
                onClick: ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field: 'industry',
                        value,
                    });

                    this.setState({
                        ddCheckedIndustry: element,
                    });
                },
            }),
        };

        this.onDropdownFieldsetChange = this.onDropdownFieldsetChange.bind(this);
    }

    onDropdownFieldsetChange({ checkedElement, event, onChange }) {
        if (checkedElement.alternative && !checkedElement.parent && !checkedElement.items) {
            onChange(event);
        }
    }

    render() {
        const {
            fields: {
                jobTitle,
                location,
                salary,
                experience,
                employment,
                degree,
                industry,
                alternativeIndustry,
            },
            handleSubmit,
            submitting,
            invalid,
        } = this.props;
        const {
            ddCheckedSalary,
            ddCheckedExperience,
            ddCheckedEmployment,
            ddCheckedDegree,
            ddCheckedIndustry,
        } = this.state;
        return (
            <div className="summary-head__title mdl-card__title">
                <Form
                    className="form_indent-size_none"
                    onSubmit={
                        handleSubmit((fields, dispatch) => {
                            const data = {
                                jobTitle: fields.jobTitle,
                                location: fields.location,
                                salary: {
                                    id: ddCheckedSalary.id,
                                    value: fields.salary,
                                },
                                experience: {
                                    id: ddCheckedExperience.id,
                                    value: fields.experience,
                                },
                                employment: {
                                    id: ddCheckedEmployment.id,
                                    value: fields.employment,
                                },
                                degree: {
                                    id: ddCheckedDegree.id,
                                    value: fields.degree,
                                },
                                industry: {
                                    id: ddCheckedIndustry.id,
                                    value: !fields.alternativeIndustry ?
                                    fields.industry : fields.alternativeIndustry,
                                },
                            };

                            dispatch(saveSummaryData(data));
                        })
                    }
                >
                    <fieldset className="form__row form__row_indent-size_s row">
                        <div className="col-lg-10">
                            <Input
                                {...jobTitle}
                                additionalClass="textfield_color_invert"
                                label="Enter Job Title"
                            />
                        </div>
                        <div className="col-lg-2 text-right">
                            <span className="text text_color_invert text_size_xxs text_opacity_30 text_helper">
                                {/*Created 2 s ago*/}
                            </span>
                        </div>
                    </fieldset>

                    <JobsFieldsetDropDown
                        {...industry}
                        label="Focus"
                        {...{
                            onChange: (event) => {
                                this.onDropdownFieldsetChange({
                                    event,
                                    onChange: industry.onChange,
                                    checkedElement: ddCheckedIndustry,
                                });
                            },
                            list: this.state.ddIndustry,
                            checkedElementId: ddCheckedIndustry.id,
                            otherChild: ddCheckedIndustry.alternative && ddCheckedIndustry.parent ?
                                <OtherActiveInput
                                    {...alternativeIndustry}
                                    colorInverted
                                    label="Other"
                                    error={alternativeIndustry.touched && alternativeIndustry.error}
                                /> :
                                null,
                        }}
                    />

                    <fieldset className="form__row row">
                        <div className="col-lg-2">
                            <label className="text text_size_xs text_color_invert text_opacity_half text_helper text_helper_s">
                                Location
                            </label>
                        </div>
                        <div className="col-lg-5">
                            <ExperiencedInputDropdown
                                {...{
                                    dropdownSize: 's',
                                    ctrl: location,
                                    listTypeSize: 'm',
                                    listTypeNowrapClass: false,
                                    textFieldSize: false,
                                    textSizeForEachList: false,
                                    additionalClass: 'textfield_color_invert',
                                    filter: LocationFilter,
                                    onFilter: ({ dispatch, value }) => {
                                        dispatch({
                                            type: 'redux-form/CHANGE',
                                            field: 'location',
                                            value,
                                            touch: true,
                                            form: 'jobsAddNew',
                                        });
                                    },
                                    onClickListItem: ({ place, filter }) => {
                                        const value = `${place.city}, ${place.state}`;
                                        this.setState({
                                            location: value,
                                        });
                                        filter({ value });
                                    },
                                }}
                            />
                        </div>
                    </fieldset>
                    <JobsFieldsetDropDown
                        {...salary}
                        label="Salary"
                        {...{
                            onChange: (event) => {
                                this.onDropdownFieldsetChange({
                                    event,
                                    onChange: salary.onChange,
                                    checkedElement: ddCheckedSalary,
                                });
                            },
                            list: this.state.ddSalary,
                            checkedElementId: ddCheckedSalary.id,
                        }}
                    />
                    <JobsFieldsetDropDown
                        {...experience}
                        label="Experience"
                        {...{
                            onChange: (event) => {
                                this.onDropdownFieldsetChange({
                                    event,
                                    onChange: experience.onChange,
                                    checkedElement: ddCheckedExperience,
                                });
                            },
                            list: this.state.ddExperience,
                            checkedElementId: ddCheckedExperience.id,
                        }}
                    />
                    <JobsFieldsetDropDown
                        {...employment}
                        label="Employment"
                        {...{
                            onChange: (event) => {
                                this.onDropdownFieldsetChange({
                                    event,
                                    onChange: employment.onChange,
                                    checkedElement: ddCheckedEmployment,
                                });
                            },
                            list: this.state.ddEmployment,
                            checkedElementId: ddCheckedEmployment.id,
                        }}
                    />
                    <JobsFieldsetDropDown
                        {...degree}
                        label="Degree"
                        {...{
                            onChange: (event) => {
                                this.onDropdownFieldsetChange({
                                    event,
                                    onChange: degree.onChange,
                                    checkedElement: ddCheckedDegree,
                                });
                            },
                            list: this.state.ddDegree,
                            checkedElementId: ddCheckedDegree.id,
                        }}
                    />
                    <div className="form__actions form__actions_indent-size_m">
                        <Button
                            type='submit'
                            buttonSize="m"
                            typeColored
                            buttonColor="white"
                            disabled={submitting || invalid}
                        >
                            Save Job Summary
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

SummaryHeadActive.propTypes = propTypes;
SummaryHeadActive.defaultProps = defaultProps;

export default SummaryHeadActive;
