import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import BuildingIcon from './../../../../components/icons/building';
import UploadImage from './../parts/uploadImage';
import ApplicationFieldset from'./../../../../components/application/applicationFieldset';
import ApplicationFieldsetDropdown from './../../../../components/application/applicationFieldsetDropdown';
import Button from './../../../../components/main/button';
import { updateJob } from './../../../../actions/applicationCompany';
import {
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA,
} from './../../../../constants/companyOnboarding';
import { findById } from './../../../../constants/dropdownData';
import { mapDropdown } from './../../../../components/parts/mapDropdown';

const InputProps = {
    type: 'number',
    min: 1,
    max: new Date().getFullYear(),
};

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            companyName,
            companyType,
            numberOfEmployees,
            foundationYear
        } = state.applicationCompany.summary
        const {
            email
        } = state.authorization

        const ddCheckedNumberOfEmployees = findById({
            id : numberOfEmployees ? numberOfEmployees.id : null,
            data : COMPANY_EMPLOYEES_DATA
        }) || {}
        const ddCheckedCompanyType = findById({
            id : companyType ? companyType.id : null,
            data : COMPANY_TYPE_DATA
        }) || {}
        const checkedElements = {
            ddCheckedNumberOfEmployees,
            ddCheckedCompanyType
        }

        const initialValues = {
            companyName : companyName || '{name}',
            email : email || '{email}',
            companyType : companyType ? companyType.value : 'type',
            numberOfEmployees : numberOfEmployees ? numberOfEmployees.value : '{numberOfEmployees}',
            foundationYear : foundationYear || '{founded}'
        }

        return {
            state,
            onboardingState : state.applicationCompany,
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
    form : 'applicationCompanySummaryHeadEdit',
    fields : [
        'companyName',
        'email',
        'companyType',
        'headquatersCity',
        'headquatersState',
        'numberOfEmployees',
        'foundationYear'
    ],
    validate : (values, context) => {
        const errors = {}

        if (!values.companyName){
            errors.firstName = ' '
        }

        return errors

    }
})
class SummaryHeadEdit extends Component {
    constructor(props){
        super(props)
        const { ddData, checkedElements, onCheckItem } = props

        this.state = {
            ...checkedElements,
            ddNumberOfEmployees : mapDropdown({
                arr : ddData.numberOfEmployees,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'numberOfEmployees',
                        value
                    })

                    this.setState({
                        ddCheckedNumberOfEmployees : element
                    })
                }
            }),
            ddCompanyType : mapDropdown({
               arr : ddData.companyType,
                onClick : ({ dispatch, element, value }) => {
                    onCheckItem({
                        dispatch,
                        field : 'companyType',
                        value
                    })

                    this.setState({
                        ddCheckedCompanyType : element
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
                companyName,
                email,
                companyType,
                headquatersCity,
                headquatersState,
                numberOfEmployees,
                foundationYear
            },
            handleSubmit,
            submitting,
            invalid,
            onCancel
        } = this.props

        const {
            ddCheckedNumberOfEmployees,
            ddCheckedCompanyType
        } = this.state

        return (
            <div class="summary-head">
                <div class="summary-head__title mdl-card__title">
                    <div class="summary-head__title-item">
                        <div class="summary-head__title-column">
                            <UploadImage
                                iconPhoto={<BuildingIcon/>}
                                controllerId='SummaryHeadCompany'
                                additionalClass='invisible-mobile'
                            />
                            <div class="summary-head__title-block">
                                <form class="form" onSubmit={
                                    handleSubmit((fields, dispatch) => {
                                    const data = {
                                        companyName : fields.companyName,
                                        email : fields.email,
                                        companyType : {
                                            id : ddCheckedCompanyType.id,
                                            value : fields.companyType
                                        },
                                        numberOfEmployees : {
                                            id : ddCheckedNumberOfEmployees.id,
                                            value : fields.numberOfEmployees
                                        },
                                        foundationYear : fields.foundationYear
                                    }
                                    // dispatch(updateJob(this.props.id,data))
                                    onCancel()
                                    })
                                }>
                                    <ApplicationFieldset {...companyName}
                                        label="Company Name"
                                    />
                                    <ApplicationFieldset {...email}
                                        label="Email"
                                        onChange={() => {}}
                                    />
                                    <ApplicationFieldsetDropdown {...companyType}
                                        label="Company Type"
                                        {...{
                                            onChange : (event) => {
                                                this.onDropdownFieldsetChange({
                                                    event,
                                                    onChange : companyType.onChange,
                                                    checkedElement : ddCheckedCompanyType
                                                })
                                            },
                                            list : this.state.ddCompanyType,
                                            checkedElementId : ddCheckedCompanyType.id
                                        }}
                                    />
                                    <ApplicationFieldsetDropdown {...numberOfEmployees}
                                        label="Number of Employees"
                                        {...{
                                            onChange : (event) => {
                                                this.onDropdownFieldsetChange({
                                                    event,
                                                    onChange : numberOfEmployees.onChange,
                                                    checkedElement : ddCheckedNumberOfEmployees
                                                })
                                            },
                                            list : this.state.ddNumberOfEmployees,
                                            checkedElementId : ddCheckedNumberOfEmployees.id
                                        }}
                                    />
                                    <ApplicationFieldset
                                        {...foundationYear}
                                        {...InputProps}
                                        label="Year founded"
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
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    onCancel : PropTypes.func,
    ddData : PropTypes.object,
    onCheckItem : PropTypes.func,
    checkedElements : PropTypes.object
}

SummaryHeadEdit.defaultProps = {
    ddData : {
        numberOfEmployees : COMPANY_EMPLOYEES_DATA,
        companyType : COMPANY_TYPE_DATA
    },
    onCheckItem : ({ dispatch, field, value }) => {
        dispatch({
            type : 'redux-form/CHANGE',
            field,
            value,
            touch : true,
            form : 'applicationCompanySummaryHeadEdit'
        })
    }
}

export default SummaryHeadEdit
