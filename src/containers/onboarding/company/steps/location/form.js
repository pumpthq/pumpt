//Form Components + Redux
import React from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form'
//Places Autocomplete Library
import {Form, PlaceField} from 'components/main/form/PlaceField';
//General Components
import Button from './../../../../../components/main/button';
//Places Autocomplete Library
//Actions
import {
    gotoNumberOfEmployeesStep,
    saveHeadquartersLocationStep,
    showNumberOfEmployeesStep,
} from 'actions/companyOnboarding';

import * as V from 'components/main/form/validations'
//import { Form, renderField, PlaceField } from 'components/main/form';

//Company Onboarding Location Info Form
let LocationInfoForm = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || asyncValidating || error

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveHeadquartersLocationStep(values))
      dispatch(showNumberOfEmployeesStep())
			dispatch(gotoNumberOfEmployeesStep())
		}

        return (
					<form onSubmit={handleSubmit(submit)} className="application-form medium">
							<div class="row">
									<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
											<fieldset class="form__row">
											<Field
												name="headquartersLocation"
												component={PlaceField}
												label="Headquarters Location"
                        validate={[V.required]}
											 />
											</fieldset>
									</div>
									<div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
											<fieldset class="form__row">
											</fieldset>
									</div>
							</div>
							<div class="form__actions">
									<Button
											type="submit" typeColored buttonSize="l"
											disabled={submitDisabled}
									>
											Next
									</Button>
							</div>
					</form>
		)
	}


//Form Export
LocationInfoForm = reduxForm({
	form: 'locationInfoForm',
})(LocationInfoForm)


LocationInfoForm = connect(
  state => ({
    initialValues: state.companyOnboarding // pull previous values from onboarding state
  })
)(LocationInfoForm)

export default LocationInfoForm
