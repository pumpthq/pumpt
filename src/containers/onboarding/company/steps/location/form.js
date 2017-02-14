import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Form from './../../../../../components/main/form';
import Button from './../../../../../components/main/button';
import { OnboardingInput } from './../../../../../components/onboarding';
import ExperiencedInputDropdown from '../../../../../components/parts/experiencedInputDropdown';
import LocationFilter from './../../../../../components/parts/locationFilter';

import {
    saveHeadquatersLocationStep,
    showNumberOfEmployeesStep,
} from './../../../../../actions/companyOnboarding';

@connect(
    (state, ownProps) => {
        const { companyOnboarding } = state;
        const { headquatersCity, headquatersState } = companyOnboarding;

        return {
            initialValues: {
                headquatersCity,
                headquatersState,
            },
        };
    }
)
@reduxForm({
    form: 'headquatersLocationCompanyOnboarding',
    fields: [
        'headquatersCity',
        'headquatersState',
    ],
    validate: (values) => {
        const errors = {};
        const {
            headquatersCity,
            headquatersState,
        } = values;

        if (!headquatersCity) {
            errors.headquatersCity = ' ';
        }

        if (!headquatersState) {
            errors.headquatersState = ' ';
        }

        return errors;
    },
    onSubmit: (fields, dispatch) => {
        dispatch(saveHeadquatersLocationStep(fields));
        dispatch(showNumberOfEmployeesStep());
    },
})
class LocationInfoForm extends Component {

    render() {
        const {
            fields: {
                headquatersCity,
                headquatersState,
            },
            handleSubmit,
            submitting,
            invalid,
        } = this.props;
        const isDisabledSubmit = invalid || submitting;

        return (
            <Form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <fieldset class="form__row">
                            <ExperiencedInputDropdown
                                {...{
                                    label: 'City',
                                    ctrl: headquatersCity,
                                    additionalClass: 'dropdown__wrapper_type_autofill',
                                    error: headquatersCity.touched && headquatersCity.error,
                                    filter: LocationFilter,
                                    onFilter: ({ dispatch, value }) => {
                                        dispatch({
                                            type: 'redux-form/CHANGE',
                                            field: 'headquatersCity',
                                            value,
                                            touch: true,
                                            form: 'headquatersLocationCompanyOnboarding',
                                        });
                                    },
                                    onClickListItem: ({ dispatch, place, filter }) => {
                                        const { scrollTop } = this.props;

                                        filter({ value: place.city });
                                        dispatch({
                                            type: 'redux-form/CHANGE',
                                            field: 'headquatersState',
                                            value: place.state,
                                            touch: true,
                                            dirty: true,
                                            form: 'headquatersLocationCompanyOnboarding',
                                        });
                                        scrollTop();
                                    },
                                }}
                            />
                        </fieldset>
                    </div>
                    <div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
                        <fieldset class="form__row">
                            <OnboardingInput
                                {...headquatersState}
                                label="State"
                                error={headquatersState.touched && headquatersState.error}
                            />
                        </fieldset>
                    </div>
                </div>
                <div class="form__actions">
                    <Button
                        type="submit" typeColored buttonSize="l"
                        disabled={isDisabledSubmit}
                    >
                        Next
                    </Button>
                </div>
            </Form>
        );
    }
}

LocationInfoForm.propTypes = {
    fields: PropTypes.object,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    scrollTop: PropTypes.func,
};

export default LocationInfoForm;
