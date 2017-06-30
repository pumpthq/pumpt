//Form Components + Redux
import React, {Component} from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form'
//import { Form, renderField, PlaceField } from 'components/main/form';

//Places Autocomplete Library
import { Form, PlaceField} from 'components/main/form';

//General Components
import Button from './../../../../../components/main/button';

//Places Autocomplete Library
import PlacesAutocomplete from 'react-places-autocomplete'

//Actions
import {
    saveHeadquartersLocationStep,
    showNumberOfEmployeesStep,
} from 'actions/companyOnboarding';

//Field Validations
const required = value => (value ? undefined : 'Can\'t be Blank')

//Generalized Redux Field
export const renderField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

//Company Onboarding Location Info Form
let LocationInfoForm = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || asyncValidating || error

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveHeadquartersLocationStep(values))
			dispatch(showNumberOfEmployeesStep())
		}

        return (
					<form onSubmit={handleSubmit(submit)}>
							<div class="row">
									<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
											<fieldset class="form__row">
											<Field
												name="headquartersLocation"
												component={PlaceField}
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
	form: 'locationInfoForm'
})(LocationInfoForm)


LocationInfoForm = connect(
  state => ({
    initialValues: state.candidateOnboarding // pull previous values from onboarding state
  })
)(LocationInfoForm)

export default LocationInfoForm
